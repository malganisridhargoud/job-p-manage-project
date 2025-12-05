# Job Portal - Node + Express + Firebase

## Prerequisites
- Node.js 18+ and npm
- Firebase project (Firestore)
- A Google service account JSON for Firebase Admin (downloaded)

## Setup (local)
1. Clone repo.
2. `cd jobportal`
3. `npm install`
4. Create a Firebase project and enable Firestore (Native mode).
5. Create a service account in Firebase Console -> Project Settings -> Service Accounts -> Generate new private key. Save file as `server/serviceAccountKey.json` (DO NOT commit).
6. Start server:
   - Dev: `npm run dev` (requires nodemon)
   - Prod: `npm start`
7. Open `http://localhost:3000` in your browser.

## Seeding sample jobs (local)
POST to `http://localhost:3000/api/jobs/seed` (e.g., using Postman or curl).
This creates three sample jobs.

## Using application pages
- Browse jobs: `/`
- My Applications: `/my-applications.html` (enter your email to fetch)

## Deploying to Heroku / Render
Because Heroku does not provide filesystem persistence for sensitive files, set env var `SERVICE_ACCOUNT` to the base64-encoded content of your service account JSON.

Example: (Linux / macOS)
```bash
cat serviceAccountKey.json | base64 | pbcopy   # copy base64 to clipboard
# on Heroku set config var SERVICE_ACCOUNT to that base64 string
