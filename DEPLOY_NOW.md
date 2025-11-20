# 🚀 Vercel पर Deploy करें - Quick Guide

## ⚡ Fast Deployment (3 Steps)

### Step 1: Environment Variables Add करें

```bash
vercel env add SMTP_USER production
# Value: niranjanpandey72017@gmail.com

vercel env add SMTP_PASS production
# Value: your-gmail-app-password (no spaces)

vercel env add RECEIVER_EMAIL production
# Value: niranjanpandey72017@gmail.com

vercel env add SMTP_HOST production
# Value: smtp.gmail.com

vercel env add SMTP_PORT production
# Value: 587
```

### Step 2: Deploy करें

```bash
vercel --prod
```

### Step 3: Done! ✅

Website live हो जाएगी!

---

## 📋 Alternative: Vercel Dashboard से

1. **https://vercel.com** पर जाएं
2. **"New Project"** click करें
3. **GitHub repository** import करें (या files upload करें)
4. **Environment Variables** add करें:
   - SMTP_USER = niranjanpandey72017@gmail.com
   - SMTP_PASS = your-app-password
   - RECEIVER_EMAIL = niranjanpandey72017@gmail.com
   - SMTP_HOST = smtp.gmail.com
   - SMTP_PORT = 587
5. **"Deploy"** click करें

---

## ✅ Ready Files Created:

- ✅ `vercel.json` - Vercel configuration
- ✅ `api/index.js` - Serverless function entry
- ✅ `server.js` - Updated for Vercel
- ✅ `.vercelignore` - Files to ignore

**अब deploy करें!** 🚀

