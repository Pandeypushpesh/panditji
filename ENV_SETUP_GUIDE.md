# .env File Setup Guide (हिंदी में)

## 📋 आवश्यक Environment Variables

`.env` file में निम्नलिखित variables add करें:

### 1. Server Configuration (सर्वर सेटिंग्स)

```env
PORT=3000
NODE_ENV=development
```

- **PORT**: Server किस port पर run होगा (default: 3000)
- **NODE_ENV**: Environment type (`development` या `production`)

### 2. SMTP Email Configuration (ईमेल सेटिंग्स)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECEIVER_EMAIL=your-email@gmail.com
```

#### Variables का विवरण:

- **SMTP_HOST**: Email service provider का SMTP server
  - Gmail के लिए: `smtp.gmail.com`
  - Outlook के लिए: `smtp-mail.outlook.com`
  - Yahoo के लिए: `smtp.mail.yahoo.com`

- **SMTP_PORT**: SMTP port number
  - Gmail के लिए: `587` (TLS) या `465` (SSL)
  - Default: `587`

- **SMTP_USER**: आपका email address (जहाँ से email भेजा जाएगा)
  - Example: `niranjanpandey72017@gmail.com`

- **SMTP_PASS**: Email account का password
  - **Gmail के लिए**: App Password use करें (regular password नहीं!)
  - App Password 16 characters का होता है (बिना spaces के)

- **RECEIVER_EMAIL**: जहाँ appointment requests भेजे जाएंगे
  - Example: `niranjanpandey72017@gmail.com`
  - यह SMTP_USER के समान भी हो सकता है

## 🔐 Gmail App Password कैसे बनाएं:

### Step-by-Step Instructions:

1. **Google Account में जाएं**: https://myaccount.google.com

2. **Security Section**: Left sidebar में "Security" पर click करें

3. **2-Step Verification Enable करें**:
   - अगर पहले से enable नहीं है, तो enable करें
   - Phone number verify करें

4. **App Passwords Generate करें**:
   - Security page पर वापस जाएं
   - "App passwords" search करें या directly जाएं
   - "Select app" dropdown में "Mail" चुनें
   - "Select device" में "Other (Custom name)" चुनें
   - Name में "Pandit Ji Website" type करें
   - "Generate" button click करें

5. **App Password Copy करें**:
   - 16-character का password दिखेगा (format: `xxxx xxxx xxxx xxxx`)
   - Spaces हटाकर copy करें
   - Example: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

6. **.env File में Paste करें**:
   ```env
   SMTP_PASS=abcdefghijklmnop
   ```

## 📝 Complete .env File Example:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=niranjanpandey72017@gmail.com
SMTP_PASS=your-16-character-app-password-here
RECEIVER_EMAIL=niranjanpandey72017@gmail.com
```

## ⚠️ Important Notes (महत्वपूर्ण नोट्स):

1. **.env file को कभी भी Git में commit न करें**
   - `.gitignore` में already add है
   - यह sensitive information है

2. **Gmail के लिए App Password जरूरी है**
   - Regular Gmail password काम नहीं करेगा
   - 2-Step Verification enable होना चाहिए

3. **Production में**:
   - `NODE_ENV=production` set करें
   - Strong passwords use करें
   - CORS settings को specific domain के लिए configure करें

4. **Testing के लिए**:
   - पहले `.env.example` को copy करके `.env` बनाएं
   - अपने actual credentials add करें
   - Server restart करें

## 🔍 Troubleshooting (समस्या निवारण):

### Email नहीं भेजा जा रहा?

1. **App Password सही है?**
   - Spaces नहीं होने चाहिए
   - 16 characters होने चाहिए

2. **2-Step Verification enable है?**
   - Google Account में check करें

3. **SMTP settings सही हैं?**
   - Gmail: `smtp.gmail.com:587`
   - Port 587 (TLS) या 465 (SSL) use करें

4. **Firewall/Network Issues?**
   - Port 587 blocked तो नहीं?
   - VPN disable करके try करें

## 📧 Alternative Email Providers:

### Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Custom SMTP:
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
```

---

**Note**: `.env` file बनाने के बाद server को restart करना जरूरी है!

