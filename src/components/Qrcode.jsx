import React from 'react'
// import ReactDOM from "react-dom";
import { QRCodeCanvas } from 'qrcode.react';
const Qrcode = () => {
    
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Scan this QR to open Login Page</h2>
      <QRCodeCanvas value="https://heroic-fairy-60c220.netlify.app/login" size={200} />

    </div>
  )
}

export default Qrcode