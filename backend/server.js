const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {availableServices} = require('../my-app/src/data');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5
});
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/opinionsDB', {
    });


const OpinionSchema = new mongoose.Schema({
    name: String,
    services: [String],
    comment: String,
    date: {type: Date, default: Date.now},
    });

const Opinion = mongoose.model('Opinion', OpinionSchema);

app.get('/opinions', async (req, res) => {

    const { services, page = 1, limit = 5} = req.query;

    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = parseInt(limit);

    const filter = services ? {services: {$in: services.split(',')}} : {};
    const skip = (page - 1) * limitNumber;


    try {
        const opinions = await Opinion.find(filter).skip(skip).limit(parseInt(limitNumber));
        const total = await Opinion.countDocuments(filter);
        
        res.json({
            opinions,
            totalPages: Math.ceil(total / limitNumber),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('error fetching opinions', error);   
        res.status(500).json({error: 'internal server error'});
        }
    }); 

    


app.post('/opinions', [
    check('name').isString().isLength({max: 20}).withMessage('Por favor, ingrese un nombre válido (máximo 20 caracteres).'),
    check('services').isArray().isLength({min: 1, max: 13}).custom(services => services.every(service => availableServices.includes(service))).withMessage('Por favor introduce al menos un servicio.'),
    check('comment').isString().isLength({max: 400}).withMessage('Por favor, ingrese un comentario válido (máximo 400 caracteres).'),
    check('captchaToken').notEmpty().withMessage('Por favor, complete el CAPTCHA.'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, services, comment} = req.body;

        const isHuman = await validateCaptcha(captchaToken);
        if (!isHuman) {
            return res.status(400).json({error: 'Por favor, complete el CAPTCHA.'});
        }

        const newopinion =  new Opinion({name, services, comment});
        await newopinion.save();
        res.json ({ message: 'Opinion saved',  newopinion});
        });
    
async function validateCaptcha(token) {
    const secretKey = '6LeVXckqAAAAAIvO0RgUqIM_rWuuXfKfv9_X9C-R';
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
        method: 'POST',
    });
    const data = await response.json();
    return data.success;
}

app.listen(5000, () => { console.log('Server is running on port 5000')});