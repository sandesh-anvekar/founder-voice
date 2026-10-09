# Founder Voice - Setup & Build Instructions

This document provides step-by-step instructions to set up, run, and build the "Founder Voice" project.

## Prerequisites

Before starting, ensure you have the following installed:

1.  **Node.js**: Version 18.17 or later (Next.js 14 requirement).
2.  **Package Manager**: `npm` (packaged with Node.js) or `pnpm` / `yarn`.
3.  **Supabase Account**: For authentication and database.
4.  **API Keys** for the following services:
    *   **OpenAI**: For the Realtime API (Voice Interaction).
    *   **Google Gemini**: For Fundability Report Generation.
    *   **Groq**: For "VC Brain" logic (Llama 3.1 70B).
    *   **Deepgram**: For Speech-to-Text and Text-to-Speech used by the browser client.
    *   **Tavily**: For the "Search Competitors" tool.

---

## 1. Installation

Clone the repository and install the dependencies:

```bash
# Clone the repo (if not already done)
git clone <repository-url>
cd founder-voice

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

---

## 2. Environment Configuration

1.  Copy the example environment file:
    ```bash
    cp env.local.template .env.local
    ```

2.  Open `.env.local` in your text editor and fill in the required API keys and Supabase credentials.

    **Required Environment Variables:**

    *   `GOOGLE_API_KEY`: Your Google AI Studio key.
    *   `GROQ_API_KEY`: Your Groq Cloud API key.
    *   `DEEPGRAM_API_KEY`: Your Deepgram Project API key.
    *   `TAVILY_API_KEY`: Your Tavily Search API key.
    *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon (Public) Key.
    *   `OPENAI_API_KEY`: Your OpenAI API Key.

---

## 3. Supabase Auth Configuration Tip

> 💡 **Local Testing Tip:** In your **Supabase Dashboard → Authentication → Providers → Email**, turn **OFF** `Confirm email` during local testing. Otherwise, new email signups will be blocked waiting for an activation email.

## 3. Database Setup (Supabase)

This project uses Supabase for storing user profiles, pitch decks, and session logs.

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Go to the **SQL Editor**.
3.  Open the `schema.sql` file located in the root of this project.
4.  Copy the entire content of `schema.sql` and paste it into the Supabase SQL Editor.
5.  Click **Run** to execute the script.

This will:
*   Enable the `uuid-ossp` extension.
*   Create `profiles`, `pitch_decks`, and `sessions` tables.
*   Enable Row Level Security (RLS) policies for secure access.

---

## 4. Running Locally

To start the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files.

---

## 5. Building for Production

To create an optimized production build:

```bash
npm run build
# or
pnpm build
# or
yarn build
```

The output will be in the `.next` folder.

To start the production server locally:

```bash
npm start
# or
pnpm start
# or
yarn start
```

---

## Troubleshooting

*   **Supabase Connection Error**: Ensure your `.env.local` has the correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
*   **Voice/Audio Issues**: Check if `DEEPGRAM_API_KEY` and `OPENAI_API_KEY` are valid. Ensure your browser has microphone permissions enabled for `localhost:3000`.
*   **Build Errors**: Check the console output. Common issues are type errors or linting warnings. Run `npm run lint` to check for code issues.
