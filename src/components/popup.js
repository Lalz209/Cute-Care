import react from 'react';
import "./popup.css";

const popup = ({children, isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close-btn" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
        );
    }

export default popup;