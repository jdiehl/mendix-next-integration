Next.js & Mendix Integration Project

## Getting Started

1. Start your Mendix server (ensure [http://localhost:8080] is accessible)
2. Start Next.js server (`npm run dev`)
3. Access [http://localhost:3000] and see a Mendix App integrated into a Next.js App

## How it works

All requests that are not handled by Next.js are forwarded to the Mendix App (via `server.js`)

The Mendix component (`Mendix.tsx`) retrieves the Mendix App via `/index.html` and attaches the stylesheets and scripts to the Next.js app.
