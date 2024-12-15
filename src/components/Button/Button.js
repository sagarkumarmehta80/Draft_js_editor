import React from 'react';
import './Button.module.css';

const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};

export default Button;
