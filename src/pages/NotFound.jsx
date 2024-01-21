import React from 'react';
import imgSrc from '../images/notFound.png'; // Replace with the actual path to your image

export default function NotFound() {
  return (
    <div style={{
      margin: "auto",
      
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width : "60%"
    }}>
      <img style={{
        width : "100%",
        marginTop : "-60px",
        zIndex : "-9999"
      }}

       src={imgSrc} alt="Not Found" />
      <h1 style={{
        fontFamily: "Montserrat",
        fontSize: "50px",
        fontWeight: "500",
        lineHeight: "27px",
        fontStyle: "normal",
        textAlign: "left",
        letterSpacing: "10px",
        color: "#5c5c5c"
      }}>Page Was Not Found</h1>
    </div>
  );
}
