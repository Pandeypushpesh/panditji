const nodemailer = require('nodemailer');

// Create transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Validation function
const validateFormData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.phone || !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(data.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.push('Service selection is required');
  }

  if (!data.date) {
    errors.push('Date is required');
  }

  return errors;
};

// Send mail controller
const sendMail = async (req, res) => {
  try {
    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECEIVER_EMAIL) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.'
      });
    }

    // Extract form data
    const { name, phone, email, service, date, message } = req.body;

    // Validate form data
    const validationErrors = validateFormData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"Pandit Ji Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Appointment Request - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B35; background: #FFF8E1; padding: 15px; border-radius: 5px;">
            नया अपॉइंटमेंट अनुरोध | New Appointment Request
          </h2>
          <div style="background: #FFF; padding: 20px; border: 1px solid #E0E0E0; border-radius: 5px; margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #8B4513; width: 150px;">नाम / Name:</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr style="background: #FFF8E1;">
                <td style="padding: 10px; font-weight: bold; color: #8B4513;">फोन / Phone:</td>
                <td style="padding: 10px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #8B4513;">ईमेल / Email:</td>
                <td style="padding: 10px;">${email}</td>
              </tr>
              <tr style="background: #FFF8E1;">
                <td style="padding: 10px; font-weight: bold; color: #8B4513;">सेवा / Service:</td>
                <td style="padding: 10px;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #8B4513;">तारीख / Date:</td>
                <td style="padding: 10px;">${date}</td>
              </tr>
              ${message ? `
              <tr style="background: #FFF8E1;">
                <td style="padding: 10px; font-weight: bold; color: #8B4513; vertical-align: top;">संदेश / Message:</td>
                <td style="padding: 10px;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #FFF8E1; border-radius: 5px; text-align: center; color: #8B4513;">
            <p style="margin: 0;">यह ईमेल Pandit Ji की वेबसाइट से स्वचालित रूप से भेजा गया है।</p>
            <p style="margin: 5px 0 0 0;">This email was automatically sent from Pandit Ji's website.</p>
          </div>
        </div>
      `,
      text: `
New Appointment Request

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Date: ${date}
Message: ${message || 'N/A'}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Mail sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);

    // Handle specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Authentication failed. Please check SMTP credentials.'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Connection failed. Please check SMTP settings.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  sendMail
};

