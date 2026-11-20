const nodemailer = require('nodemailer');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendContactEmail(formData) {
  const {
    name,
    email,
    phone,
    organisation,
    message,
    ipAddress,
  } = formData;

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || 'Not provided'),
    organisation: escapeHtml(organisation || 'Not provided'),
    message: escapeHtml(message).replace(/\n/g, '<br>'),
    ip: escapeHtml(ipAddress || 'Not available'),
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background:#0F5C4C;color:#fff;padding:20px;">
        <h2 style="margin:0;">New UGTA Foundation enquiry</h2>
      </div>
      <div style="padding:24px;background:#f7f9f8;">
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Organisation:</strong> ${safe.organisation}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#fff;padding:16px;border-left:4px solid #E8910F;">${safe.message}</div>
        <p style="margin-top:16px;color:#666;font-size:12px;">
          Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br/>
          IP: ${safe.ip}
        </p>
      </div>
    </div>
  `;

  const transporter = createTransporter();
  if (!transporter) {
    console.log('[contact] SMTP not configured — logging enquiry only');
    console.log({ name, email, phone, organisation, message });
    return { success: true, mocked: true };
  }

  const result = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_FORM_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `UGTA Foundation enquiry from ${String(name).replace(/[\r\n]/g, ' ').slice(0, 80)}`,
    html,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nOrganisation: ${organisation || 'N/A'}\n\n${message}`,
  });

  return { success: true, messageId: result.messageId };
}

module.exports = { sendContactEmail, escapeHtml };
