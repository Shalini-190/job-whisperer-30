Job Whisperer 3.0 – AI-Powered Job Application Assistant
Overview

Job Whisperer 3.0 is an AI-driven platform designed to streamline the job application process. It acts as a personal AI co-pilot to help users land their dream job efficiently by automating repetitive tasks, analyzing resumes, and generating tailored responses for applications.

This hybrid project consists of:

Web Application – Frontend built with React + Vite + TypeScript + Tailwind + shadcn, hosted on Render.

Autofill Agent (Browser Extension) – Securely stores user profile information to automatically fill application forms across websites.

Key Features
1. Autofill Agent (Browser Extension)

Securely stores a user's profile: name, contact info, work history, education, etc.

Automatically fills out job application forms on different websites.

Supports Chrome & Edge browsers.

Configurable via a local settings JSON or UI within the extension.

2. Resume-to-JD Scoring

Compares uploaded resumes with a job description (JD).

Generates a match score to quantify fit for the role.

Offers actionable recommendations to optimize the resume for the specific JD.

3. Tailored Answer Generator

Creates high-quality, personalized answers to common application questions such as:

"Why are you a good fit for this role?"

"What is your biggest strength?"

4. Application Dashboard

Tracks the status of user applications in a single view:

Not Submitted, Submitted, Initial Response Received, Interview Requested, Rejected, etc.

Tech Stack
Component	Technology
Frontend	React, TypeScript, Vite, Tailwind, shadcn-ui
State & Data	React Query, Supabase (cloud backend)
Forms & Validation	React Hook Form, Zod
Charts & UI	Recharts, Lucide React
Extension	Chrome Extension APIs, JS, HTML, CSS
Hosting	Render (Static Site)
Setup & Local Development
Web App

Clone the repository:

git clone https://github.com/Shalini-190/job-whisperer-30.git
cd job-whisperer-30


Install dependencies:

npm install


Set up environment variables
Create a .env file at the root with your Supabase credentials:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key


Run development server:

npm run dev


Open http://localhost:8080
 to view locally.

Build for production:

npm run build


The build output will be in the dist folder.

Autofill Extension

Navigate to the extension/ folder in the repo.

Open Chrome and go to chrome://extensions.

Enable Developer Mode.

Click Load unpacked and select the extension/ folder.

The extension will now appear in the browser toolbar and can fill forms automatically based on the saved user profile.

Deployment on Render (Web App)

Go to Render
 → New + → Static Site.

Connect your GitHub repository (job-whisperer-30).

Configure:

Branch: main

Build Command: npm run build

Publish Directory: dist

Node Version: 18+

Add environment variables (Supabase credentials).

Click Create Static Site → Render will build and publish automatically.

Note: The web app connects directly to Supabase via @supabase/supabase-js, so no separate backend server is needed.

Future Enhancements

Advanced NLP-based resume scoring and job-fit suggestions.

AI-driven interview preparation tips.

User authentication & profile management.

Notifications for application status updates.

Publishing the Autofill Agent on the Chrome Web Store for wider use.

License

This project is open-source and available under the MIT License.
