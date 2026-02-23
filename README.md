<!-- Dynamic Header with Capsule Render -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:166534,50:16a34a,100:22c55e&height=240&section=header&text=Gemini%20API%20Key%20Health%20Check&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Validate%20%C2%B7%20Check%20%C2%B7%20Analyze&descFontSize=22&descAlignY=60&descAlign=50" alt="Gemini API Key Health Check Header" />
</div>

<!-- Typing SVG Tagline -->
<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Outfit&weight=600&size=22&duration=3500&pause=1500&color=14b8a6&center=true&vCenter=true&random=false&width=580&height=40&lines=One+dashboard+for+all+Gemini+models;Real-time+key+validation;Working+%C2%B7+Blocked+%C2%B7+Quota+%C2%B7+Error" alt="Typing SVG" />
</p>

<br/>

<!-- Tech Stack Badges -->
<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" alt="Gemini" />
</div>

<br/>

---

## ✨ What is this?

You get a **Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)—but **which models** can you actually use with it? This app checks your key against **every listed Gemini model**, one by one, and shows you **Working**, **Blocked**, **Quota exceeded**, or **Error** in a single dashboard.

> **"One place to validate your key and see exactly which models work—no guessing."**

---

## 🎯 What you get

| Feature | Description |
|--------|--------------|
| **Instant validation** | Key checked against the official API as soon as you submit. |
| **Per-model status** | Each row shows real status for that key (not placeholder data). |
| **Model details** | Type, context window, and "Test with your key" in a modal. |
| **Smart errors** | Optional AI-powered error messages when something goes wrong. |
| **Sync** | Re-run all checks with one click. |

---

## 🚀 Quick start

**Prerequisites:** Node.js 18+ (20+ recommended), npm.

```bash
git clone https://github.com/anandhusajan/gemini-api-key-check.git
cd gemini-api-key-check
npm install
npm run dev
```

Open **http://localhost:3000**, paste your Gemini API key, and watch the dashboard fill with live status for each model.

**Production:**

```bash
npm run build
npm start
```

---

## 🛠️ Tech stack

<div align="left">
  <h3>Framework & UI</h3>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black" alt="Tailwind" />
</div>

<br/>

<div align="left">
  <h3>API & AI</h3>
  <img src="https://img.shields.io/badge/Google_GenAI-@google/genai-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google GenAI" />
  <img src="https://img.shields.io/badge/Genkit-Smart_Errors-8E75B2?style=for-the-badge" alt="Genkit" />
</div>

<br/>

---

## ⚙️ Environment (optional)

Copy `.env.example` to `.env` if you want **smart error interpretation** (friendlier error messages). Set `GEMINI_API_KEY` or `GOOGLE_API_KEY`; the app works without it—users type their own key in the browser.

---

## 🔒 Security

- **This repository contains no API keys or secrets.** Safe to clone and make public.
- Your API key is sent **only server-side** (Next.js server action) to the Gemini API.
- It is **not logged or stored**; it lives in React state for the session only.
- **Never commit keys.** Create and manage them in [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## 📄 License & Contributing

**License:** MIT · see [LICENSE](LICENSE).

**Contributing:** PRs welcome. Run `npm run lint` and `npm run typecheck` before submitting. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

<div align="center">
  <h3>If you find this useful, don't forget to star ⭐ the repo!</h3>
  <p>Made with ❤️ by <a href="https://github.com/anandhusajan">Anandhu Sajan</a></p>
</div>
