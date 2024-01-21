import React from 'react';
import { Link } from 'react-router-dom';
import './kiuHFooter.css';

export default function KiuHFooter({ footer_data }) {
  return (
    <div className="footer-container">
      <h1>{footer_data.h1}</h1>
      <Link to={footer_data.href} className="centered-link">
        {"Click Here >"}
      </Link>
    </div>
  );
}
