import React, { useEffect, useRef } from 'react';

import "../styles/CustomPopup.css"

type CustomPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomPopup: React.FC<CustomPopupProps> = ({ isOpen, onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : 'hide'}`} ref={overlayRef}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default CustomPopup;
