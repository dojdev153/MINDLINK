const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWaitlistConfirmation = async (to, name) => {
  await transporter.sendMail({
    from: `"MindLink" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You're on the MindLink waitlist 🌿",
    html: `
      <div style="background:#050d0f;color:white;font-family:sans-serif;padding:40px;border-radius:16px;">
        <h1 style="color:#00c8d4;">Welcome, ${name}</h1>
        <p>You've secured your spot on the MindLink waitlist.</p>
        <p>We're building the first AI-powered mental health companion for Rwandan youth — in Kinyarwanda, private by design, available 24/7.</p>
        <p style="color:#00c8d4;">We'll notify you the moment we launch.</p>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">MindLink · Kigali, Rwanda · 2026</p>
      </div>
    `
  });
};

const sendLaunchNotification = async (to, name) => {
  await transporter.sendMail({
    from: `"MindLink" <${process.env.EMAIL_USER}>`,
    to,
    subject: "MindLink is live — you're first in 🚀",
    html: `
      <div style="background:#050d0f;color:white;font-family:sans-serif;padding:40px;border-radius:16px;">
        <h1 style="color:#00c8d4;">MindLink is here, ${name}</h1>
        <p>The wait is over. MindLink is now available.</p>
        <p>Download the app and start your journey toward better mental health — private, empathetic, and always available.</p>
        <a href="https://mindlink.rw" style="background:#00c8d4;color:#050d0f;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600;">Open MindLink</a>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:32px;">MindLink · Kigali, Rwanda · 2026</p>
      </div>
    `
  });
};

module.exports = { sendWaitlistConfirmation, sendLaunchNotification };
