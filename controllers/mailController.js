const nodemailer = require('nodemailer');

const SERVICE_LABELS = {
  puja: 'पूजा सेवाएं',
  astrology: 'ज्योतिष परामर्श',
  karmkand: 'कर्मकांड',
  japa: 'जप / अनुष्ठान',
  marriage: 'विवाह पूजा',
  grahDosh: 'ग्रह दोष / पारिवारिक समस्याएं'
};

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

    const serviceLabel = SERVICE_LABELS[service] || service;

    // Email content for admin
    const adminMailOptions = {
      from: `"Pandit Ji Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Appointment Request - ${serviceLabel}`,
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
                <td style="padding: 10px;">${serviceLabel}</td>
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
Service: ${serviceLabel}
Date: ${date}
Message: ${message || 'N/A'}
      `
    };

    // Send email to admin
    const info = await transporter.sendMail(adminMailOptions);

    // Prepare धन्यवाद email for user
    const thankYouMailOptions = {
      from: `"Pandit निरंजन शास्त्री" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'धन्यवाद - आपका अपॉइंटमेंट अनुरोध प्राप्त हो गया है',
      html: `
        <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFF8E1; border-radius: 10px; padding: 24px;">
          <h2 style="color: #8B4513; margin-bottom: 16px;">प्रिय ${name},</h2>
          <p style="color: #2C2C2C; line-height: 1.6; margin-bottom: 16px;">
            आपके द्वारा पंडित निरंजन शास्त्री जी की सेवाओं के लिए भरोसा जताने के लिए हृदय से धन्यवाद। हमें आपका अनुरोध प्राप्त हो गया है।
          </p>
          <div style="background:#FFFFFF; border-radius: 8px; padding: 16px; border:1px solid #FFE0B2; margin-bottom:16px;">
            <p style="margin:0; color:#8B4513; font-weight:600;">आवश्यक सेवा:</p>
            <p style="margin:4px 0 0 0; color:#2C2C2C;">${serviceLabel}</p>
            <p style="margin:12px 0 0 0; color:#8B4513; font-weight:600;">पसंदीदा तारीख:</p>
            <p style="margin:4px 0 0 0; color:#2C2C2C;">${date}</p>
          </div>
          <p style="color: #2C2C2C; line-height: 1.6;">
            जल्द ही आपको हमारी टीम की ओर से कॉल या ईमेल प्राप्त होगा। यदि यह अत्यावश्यक है, तो कृपया सीधे हमें कॉल करें।
          </p>
          <p style="margin-top: 24px; color: #8B4513; font-weight: 600;">शुभेच्छा सहित,<br>पंडित निरंजन शास्त्री</p>
          <p style="margin-top: 16px; font-size: 0.9rem; color: #666666;">यह एक स्वचालित संदेश है। कृपया इस ईमेल का उत्तर न दें।</p>
        </div>
      `,
      text: `प्रिय ${name},

आपका अपॉइंटमेंट अनुरोध प्राप्त हो गया है। जल्द ही हमारी टीम आपसे संपर्क करेगी।

सेवा: ${serviceLabel}
पसंदीदा तारीख: ${date}

धन्यवाद,
पंडित निरंजन शास्त्री`
    };

    try {
      await transporter.sendMail(thankYouMailOptions);
    } catch (thankYouError) {
      console.error('Error sending thank you email:', thankYouError);
    }

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

