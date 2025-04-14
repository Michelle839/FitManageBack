import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gymklinsmann@gmail.com", 
    pass: "glbczvjzbzjvdyod", 
  },
});

export async function enviarCorreo(destinatario, asunto, mensaje) {
  try {
    const mailOptions = {
      from: `"Soporte Gym Klinsmann" <gymklinsmann@gmail.com>`,
      to: destinatario,
      subject: asunto,
      html: mensaje,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
}