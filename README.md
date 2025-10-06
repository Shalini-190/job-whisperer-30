# Job Whisperer 3.0 – AI-Powered Job Application Assistant

## Overview

Job Whisperer 3.0 is an AI-driven platform designed to streamline the job application process. It acts as a personal AI co-pilot to help users land their dream job efficiently by automating repetitive tasks, analyzing resumes, and generating tailored responses for applications.

This hybrid project consists of:

- **Web Application** – Frontend built with React + Vite + TypeScript + Tailwind + shadcn, hosted on Render.
- **Autofill Agent (Browser Extension)** – Securely stores user profile information to automatically fill application forms across websites.

## Key Features

### 1. Autofill Agent (Browser Extension)

- Securely stores a user's profile: name, contact info, work history, education, etc.
- Automatically fills out job application forms on different websites.
- Supports Chrome & Edge browsers.
- Configurable via a local settings JSON or UI within the extension.

### 2. Resume-to-JD Scoring

- Compares uploaded resumes with a job description (JD).
- Generates a match score to quantify fit for the role.
- Offers actionable recommendations to optimize the resume for the specific JD.

### 3. Tailored Answer Generator

Creates high-quality, personalized answers to common application questions such as:

- "Why are you a good fit for this role?"
- "What is your biggest strength?"

### 4. Application Dashboard

Tracks the status of user applications in a single view:

- Not Submitted, Submitted, Initial Response Received, Interview Requested, Rejected, etc.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind, shadcn-ui |
| State & Data | React Query, Supabase (cloud backend) |
| Forms & Validation | React Hook Form, Zod |
| Charts & UI | Recharts, Lucide React |
| Extension | Chrome Extension APIs, JS, HTML, CSS |
| Hosting | Render (Static Site) |

## Setup & Local Development

### Web App

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shalini-190/job-whisperer-30.git
   cd job-whisperer-30
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file at the root with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` to view locally.

5. **Build for production:**
   ```bash
   npm run build
   ```
   The build output will be in the `dist` folder.

### Autofill Extension

1. Navigate to the `extension/` folder in the repo.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the `extension/` folder.
5. The extension will now appear in the browser toolbar and can fill forms automatically based on the saved user profile.

## Future Enhancements

- Advanced NLP-based resume scoring and job-fit suggestions.
- AI-driven interview preparation tips.
- User authentication & profile management.
- Notifications for application status updates.
- Publishing the Autofill Agent on the Chrome Web Store for wider use.

## License

This project is open-source and available under the MIT License.
