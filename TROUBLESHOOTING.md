# Troubleshooting Guide - Server Configuration Error

## ❌ Error: "Server configuration error. Please contact administrator."

यह error तब आता है जब `.env` file में required variables missing हैं या server restart नहीं किया गया है।

## 🔧 Solutions (समाधान):

### Solution 1: Server Restart करें (सबसे आम समस्या)

Environment variables को load करने के लिए server को restart करना जरूरी है:

1. **Server को stop करें** (Ctrl+C)
2. **Server को फिर से start करें**:
   ```bash
   npm start
   ```
   या
   ```bash
   node server.js
   ```

### Solution 2: .env File Check करें

`.env` file में ये variables होने चाहिए:

```env
SMTP_USER=niranjanpandey72017@gmail.com
SMTP_PASS=your-app-password
RECEIVER_EMAIL=niranjanpandey72017@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

**Important Points:**
- कोई spaces नहीं होने चाहिए `=` के आसपास
- Quotes की जरूरत नहीं (values में spaces हों तो quotes use करें)
- SMTP_PASS में spaces नहीं होने चाहिए

### Solution 3: Environment Variables Verify करें

Check script run करें:
```bash
node check-env.js
```

यह script बताएगी कि कौन सी variables missing हैं।

### Solution 4: .env File Location Check करें

`.env` file project root folder में होनी चाहिए:
```
pujaPath/
├── .env          ← यहाँ होनी चाहिए
├── server.js
├── package.json
└── ...
```

### Solution 5: Common Mistakes (आम गलतियाँ)

1. **File Name गलत**:
   - ❌ `.env.txt`
   - ❌ `env`
   - ✅ `.env` (exactly यही नाम)

2. **Spaces in Values**:
   ```env
   # ❌ गलत
   SMTP_PASS = abcdefghijklmnop
   
   # ✅ सही
   SMTP_PASS=abcdefghijklmnop
   ```

3. **Quotes की जरूरत नहीं** (usually):
   ```env
   # ❌ गलत (unnecessary quotes)
   SMTP_USER="niranjanpandey72017@gmail.com"
   
   # ✅ सही
   SMTP_USER=niranjanpandey72017@gmail.com
   ```

4. **App Password में Spaces**:
   ```env
   # ❌ गलत (spaces in password)
   SMTP_PASS=abcd efgh ijkl mnop
   
   # ✅ सही (no spaces)
   SMTP_PASS=abcdefghijklmnop
   ```

### Solution 6: Manual Test करें

Server console में check करें कि variables load हुए हैं या नहीं:

`server.js` में temporarily add करें (testing के लिए):
```javascript
console.log('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'NOT SET');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT SET');
console.log('RECEIVER_EMAIL:', process.env.RECEIVER_EMAIL ? 'SET' : 'NOT SET');
```

### Solution 7: File Encoding Check करें

`.env` file UTF-8 encoding में होनी चाहिए, BOM के बिना।

## ✅ Quick Fix Checklist:

- [ ] `.env` file project root में है
- [ ] File name exactly `.env` है (no extension)
- [ ] सभी required variables set हैं
- [ ] Variables में spaces नहीं हैं `=` के आसपास
- [ ] SMTP_PASS में spaces नहीं हैं
- [ ] Server restart किया गया है
- [ ] `node check-env.js` run करके verify किया है

## 🆘 Still Not Working?

अगर अभी भी problem है, तो:

1. Server logs check करें (console में errors)
2. Browser console check करें (F12)
3. Network tab में API request check करें
4. `check-env.js` script run करें

---

**Most Common Fix**: Server को restart करें! 🚀

