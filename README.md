# पंडित जी आध्यात्मिक सेवाएं | Pandit Ji Spiritual Services Website

एक पूर्ण रूप से responsive वेबसाइट जो Ranchi स्थित Pandit Ji की आध्यात्मिक सेवाओं के लिए बनाई गई है।

## 🌟 Features

- ✅ **Responsive Design** - सभी devices पर perfect काम करता है
- ✅ **Multi-language Support** - Hindi और English में switch करें
- ✅ **Beautiful UI** - Gold + Saffron + White devotional theme
- ✅ **Email Integration** - Appointment form submissions email के माध्यम से भेजे जाते हैं
- ✅ **Smooth Animations** - Modern और professional look

## 📁 Project Structure

```
pujaPath/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript for language switching & form handling
├── package.json        # Node.js dependencies
├── server.js           # Express server
├── .env.example         # Environment variables example
├── .gitignore          # Git ignore file
├── routes/
│   └── mailRoute.js    # Email route handler
├── controllers/
│   └── mailController.js # Email sending logic
└── lang/
    ├── en.json         # English translations
    └── hi.json         # Hindi translations
```

## 🚀 Setup Instructions

### Frontend Setup

1. **Static Files**: Frontend files (HTML, CSS, JS) को किसी भी web server पर serve करें
   - या Express server static files serve कर सकता है

### Backend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   - `.env.example` file को copy करें और `.env` नाम दें
   - अपने Gmail credentials add करें:
   ```env
   PORT=3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   RECEIVER_EMAIL=your-email@gmail.com
   ```

3. **Gmail App Password Setup**:
   - Google Account में 2-Step Verification enable करें
   - Google Account Settings > Security > App Passwords जाएं
   - "Mail" के लिए App Password generate करें
   - इस App Password को `SMTP_PASS` में use करें (regular password नहीं)

4. **Start Server**:
   ```bash
   npm start
   ```
   या development mode के लिए:
   ```bash
   npm run dev
   ```

5. **Server URL**: Server `http://localhost:3000` पर run होगा

## 📧 API Endpoint

### POST /api/send-mail

Appointment form submission के लिए endpoint।

**Request Body**:
```json
{
  "name": "User Name",
  "phone": "+91 1234567890",
  "email": "user@example.com",
  "service": "puja",
  "date": "2024-12-25",
  "message": "Optional message"
}
```

**Success Response**:
```json
{
  "success": true,
  "message": "Mail sent successfully",
  "messageId": "..."
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation errors"]
}
```

## 🌐 Language Switching

Website में Hindi और English के बीच switch करने के लिए:

1. Navbar में "EN" या "HI" button click करें
2. Page reload के बिना instantly language change होगा
3. सभी text elements `data-translate` attribute के साथ automatically update होंगे

## 🎨 Services Offered

1. **पूजा सेवाएं** (Puja Services)
2. **ज्योतिष परामर्श** (Astrology Consultation)
3. **कर्मकांड** (Karmkand)
4. **जप / अनुष्ठान** (Japa / Anushthan)
5. **विवाह पूजा** (Marriage / Vivah Puja)
6. **ग्रह दोष / पारिवारिक समस्याएं** (Grah Dosh / Family Issues)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px और ऊपर
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: 480px से नीचे

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Email**: Nodemailer
- **Fonts**: Poppins, Noto Sans Devanagari

## 📝 Notes

- Frontend files को serve करने के लिए, Express server में static files serve करने का option add किया जा सकता है
- Production में CORS settings को specific frontend URL के लिए configure करें
- Environment variables को कभी भी commit न करें

## 🔒 Security

- `.env` file को `.gitignore` में add किया गया है
- Form validation frontend और backend दोनों में है
- SMTP credentials secure रखें

## 📞 Contact Information

Website में contact information update करें:
- Phone number
- Email address
- Physical address (Ranchi, Jharkhand)

---

**Developed with ❤️ for Pandit Ji Spiritual Services**

