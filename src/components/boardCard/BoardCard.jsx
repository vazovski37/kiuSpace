import React from 'react';
import { Link } from 'react-router-dom';
import './boardCard.css';

export default function BoardCard({ data }) {
  return (
    <div className="main_container">
      <div></div>
      {data.map((item, index) => (
        <div key={index} className={`cardbg`}>
          <div className={`card ${item.for === 'host' ? 'host-style' : 'help-style'}`}>
            <h1 >{item.h1}</h1>
            <h2 >{item.h2}</h2>
            <p >{item.p}</p>
              <Link  to={item.href}>
                Go to {item.h1}
              </Link>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
