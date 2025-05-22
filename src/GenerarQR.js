import * as QRCode from "qrcode";

// URL local de registrar asistencia al que apunta el QR 
const url = 'http://192.168.20.10:5173/cliente/registrar-asistencia';

// Generar el QR y guardarlo como imagen PNG
QRCode.toFile('qr-asistencia.png', url, {
  color: {
    dark: '#000',  // color del QR
    light: '#FFF'  // fondo blanco
  }
}, function (err) {
  if (err) throw err;
  console.log('Código QR generado: qr-asistencia.png');
});
