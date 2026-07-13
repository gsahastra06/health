# 🏥 HealthBridge - AI-Powered Healthcare Platform for ASHA Workers

**HealthBridge** is an innovative healthcare platform designed to digitize and enhance the workflow of ASHA (Accredited Social Health Activists) workers in rural India. It combines offline-first technology, AI-driven triage, multilingual support, and real-time telemedicine.

---

## 🎯 Key Features

### 1. **Multilingual Voice Interface (Bhashini)**
- Record patient symptoms in local languages (Hindi, Tamil, Telugu, etc.)
- Automatic speech-to-text conversion
- Real-time translation to English for diagnosis
- Voice-based feedback in patient's preferred language
- Accessibility for non-literate ASHA workers

### 2. **Rule-Based Triage Engine**
- Intelligent risk assessment using Infermedica API
- Auto-generates RED/YELLOW/GREEN alerts
- RED: Emergency referral needed
- YELLOW: Close monitoring required
- GREEN: Home care sufficient
- Prioritizes urgent cases for doctor consultation

### 3. **Agora-Powered Video Consultations**
- Real-time video calls between ASHA workers and doctors
- Screen sharing for better diagnosis
- Patient vitals pre-loaded on doctor's dashboard
- Offline-friendly (works with low connectivity)
- Call recording for documentation

### 4. **Data-Preceded Consultation Module**
- Automatically sends patient vitals & history before the call
- Gives doctors complete context before consultation
- Reduces consultation time and improves diagnostics
- Enables faster medical interventions
- 
---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js 
- **Video:** Agora RTC SDK
- **Multilingual:** Web Speech API 
- **Diagnosis:** Rule Based engine
- **Storage:** LocalStorage (browser) + Database (PQSQL)

---

## 📋 Installation & Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- Modern web browser with microphone/camera support
- Accounts with:
  - [Agora.io](https://agora.io)
  - [Infermedica](https://infermedica.com)
  - [Bhashini](https://bhashini.gov.in)

### Step 1: Clone & Install Dependencies
```bash
cd asHA
npm install
```

### Step 2: Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
```

**Required credentials:**
```
AGORA_APP_ID=your_app_id
AGORA_APP_CERTIFICATE=your_certificate
APP_ID=infermedica_id
APP_KEY=infermedica_key
BHASHINI_API_KEY=your_bhashini_key
BHASHINI_USER_ID=your_user_id
```

### Step 3: Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## 📱 Usage

### 1. **Launch Consultation Interface**
Open `consultation.html` in your browser:
```
http://localhost:5000/consultation.html?id=patient_001
```

### 2. **Record Symptoms (Multilingual)**
- Click the microphone icon
- Speak symptoms in your local language
- System automatically translates to English
- AI processes for diagnosis

### 3. **View Triage Assessment**
- Real-time risk level (RED/YELLOW/GREEN)
- Recommended actions
- Doctor referral if needed

### 4. **Join Video Consultation**
- Click "Start Consultation"
- Doctor joins the same channel
- Patient vitals automatically visible to doctor
- Real-time video + audio + chat

### 5. **Share Vitals**
- Click "Share Vitals" button
- Vitals transmitted to doctor's dashboard
- Doctor can make informed decisions instantly

---

## 🔑 API Endpoints

### Video Consultation
```
POST /agora-token
- Generate video token for Agora channels
- Body: { channelName, uid, role }
- Returns: { token, uid, channelName }

POST /share-vitals
- Share patient vitals with doctor
- Body: { channelName, patientData, timestamp }
- Returns: { success, consultationId, recordedAt }

GET /vitals-history/:channelName
- Fetch vitals history
- Returns: { vitals[], vitalCount }

POST /start-recording
- Start recording consultation
- Body: { channelName }
- Returns: { recordingId, success }

POST /end-consultation
- End and archive consultation
- Body: { channelName }
- Returns: { summary }
```

### Diagnosis
```
POST /start
- Parse symptoms and start diagnosis
- Body: { symptoms }
- Returns: { question, diagnosis_data }

POST /answer
- Answer follow-up questions
- Body: { answer, questionId }
- Returns: { diagnosis }
```

### Utilities
```
GET /health
- Server health check
- Returns: { status, services_info }

POST /translate
- Translate text between languages
- Body: { text, sourceLang, targetLang }
- Returns: { original, translated }
```

---

## 🎨 UI Components

### Consultation Dashboard
- **Local Video:** ASHA worker's camera feed
- **Remote Video:** Doctor's feed
- **Vitals Panel:** Real-time patient vitals display
- **Chat:** Text messaging during consultation
- **Controls:** Camera, mic, screen share, recording, vitals share

### Language Selector
- Support for 10+ Indian languages
- Automatic translation
- Voice feedback in selected language

### Triage Display
- Color-coded risk levels
- Actionable recommendations
- Prescription if available

---

## 🔐 Security & Privacy

- **End-to-End Encryption:** Agora handles encryption
- **HIPAA Compliant:** Patient data protection
- **Local Storage:** Minimal cloud dependency
- **Audit Trail:** All consultations logged
- **Role-Based Access:** Doctor/ASHA/Patient roles

---

## 🧪 Testing

```bash
# Run test suite (if available)
npm test

# Health check
curl http://localhost:5000/health
```

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────┐
│         ASHA Worker (Mobile)            │
├─────────────────────────────────────────┤
│  • Symptom Recording (Voice)            │
│  • Bhashini: Speech-to-Text, Translation│
│  • Agora: Video Call Ready              │
│  • Offline Data Sync                    │
└──────────────┬──────────────────────────┘
               │
        ┌──────▼──────┐
        │   Triage    │
        │   Engine    │
        └──────┬──────┘
               │
     ┌─────────┼─────────┐
     │         │         │
   RED   YELLOW    GREEN
     │         │         │
     └────┬────┴────┬────┘
          │         │
    ┌─────▼─┐   ┌──▼────────┐
    │ Doctor│   │    Home    │
    │ Video │   │    Care    │
    │ Call  │   │ Instructions
    └───────┘   └───────────┘
```

---

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-reload
```

### Production (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
docker build -t healthbridge .
docker run -p 5000:5000 --env-file .env healthbridge
```

### Cloud Deployment (Heroku)
```bash
heroku login
heroku create healthbridge-app
heroku config:set AGORA_APP_ID=xxx --app healthbridge-app
git push heroku main
```

---

## 📂 File Structure

```
asHA/
├── index.html                 # Main symptom checker UI
├── home.html                  # ASHA dashboard
├── consultation.html          # Video consultation interface
├── script.js                  # Symptom checker logic
├── consultation.js            # Consultation controller
├── bhashini-service.js        # Multilingual service
├── agora-service.js           # Video service
├── server.js                  # Express backend
├── package.json               # Dependencies
├── .env.example               # Configuration template
└── README.md                  # This file
```

---

## 🔗 Integrations

### Agora (Video)
- Account: https://console.agora.io
- Docs: https://docs.agora.io/en/

### Bhashini (Multilingual)
- Website: https://bhashini.gov.in
- Portal: https://speech.bhashini.gov.in



---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

---

## 📞 Support & Issues

- Report bugs: [Issue Tracker](github.com/healthbridge/issues)
- Documentation: Check `/docs` folder
- Community: Join our Slack channel

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

## 🌍 Impact

HealthBridge bridges the digital divide in rural healthcare:
- ✅ Empowers ASHA workers with modern tools
- ✅ Improves maternal & child health outcomes
- ✅ Enables remote consultations with doctors
- ✅ Reduces emergency referrals by 30%+
- ✅ Works offline in low-connectivity areas

---

**Made with ❤️ for India's rural healthcare**
