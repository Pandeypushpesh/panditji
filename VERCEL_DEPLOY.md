# Vercel Deployment Guide (हिंदी में)

## 🚀 Quick Deployment Steps

### Step 1: Vercel CLI Install करें (अगर नहीं है)

```bash
npm install -g vercel
```

### Step 2: Vercel में Login करें

```bash
vercel login
```

### Step 3: Project Deploy करें

```bash
vercel
```

पहली बार deploy करने पर:
- Set up and deploy? → **Y**
- Which scope? → अपना account चुनें
- Link to existing project? → **N**
- Project name? → Enter दबाएं (default name use होगा)
- Directory? → Enter दबाएं (current directory)
- Override settings? → **N**

### Step 4: Environment Variables Add करें

Vercel Dashboard में जाएं या CLI से:

```bash
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add RECEIVER_EMAIL
vercel env add SMTP_HOST
vercel env add SMTP_PORT
```

या Vercel Dashboard में:
1. Project → Settings → Environment Variables
2. निम्नलिखित variables add करें:

```
SMTP_USER = niranjanpandey72017@gmail.com
SMTP_PASS = your-app-password
RECEIVER_EMAIL = niranjanpandey72017@gmail.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
```

### Step 5: Production Deploy करें

```bash
vercel --prod
```

## 📋 Alternative: GitHub से Deploy

### Option 1: Vercel Dashboard से

1. https://vercel.com पर जाएं
2. "New Project" click करें
3. GitHub repository import करें
4. Environment Variables add करें
5. "Deploy" click करें

### Option 2: Vercel CLI से

```bash
vercel --prod
```

## ⚙️ Environment Variables Setup

Vercel Dashboard में जाकर ये variables add करें:

| Variable | Value |
|----------|-------|
| `SMTP_USER` | niranjanpandey72017@gmail.com |
| `SMTP_PASS` | your-gmail-app-password |
| `RECEIVER_EMAIL` | niranjanpandey72017@gmail.com |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `NODE_ENV` | production |

**Important**: 
- Production, Preview, और Development environments के लिए अलग-अलग set करें
- SMTP_PASS में spaces नहीं होने चाहिए

## 🔍 Deployment Check

Deploy होने के बाद:

1. **Website URL**: Vercel आपको एक URL देगा (जैसे: `your-project.vercel.app`)
2. **API Test**: `/api/health` endpoint check करें
3. **Form Test**: Appointment form submit करके test करें

## 🐛 Troubleshooting

### Error: Environment variables not found

- Vercel Dashboard में variables add करें
- Production environment select करें
- Redeploy करें

### Error: Module not found

- `package.json` में सभी dependencies check करें
- `vercel.json` configuration check करें

### Email नहीं भेजा जा रहा

- SMTP credentials verify करें
- Vercel logs check करें
- Gmail App Password सही है या नहीं check करें

## 📝 Important Notes

1. **.env file**: Vercel में `.env` file use नहीं होती, Environment Variables use करें
2. **Static Files**: Images और language files automatically serve होंगे
3. **API Routes**: `/api/*` routes serverless functions के रूप में run होंगे
4. **Custom Domain**: Vercel Dashboard से custom domain add कर सकते हैं

## 🔗 Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel remove
```

## ✅ Post-Deployment Checklist

- [ ] Environment variables add किए गए हैं
- [ ] Website accessible है
- [ ] API endpoints काम कर रहे हैं
- [ ] Form submission test किया है
- [ ] Email receive हो रहा है
- [ ] Language switching काम कर रहा है
- [ ] Images load हो रही हैं

---

**Ready to Deploy!** 🚀

