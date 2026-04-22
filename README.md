# Abhi Raj Portfolio

A static portfolio website with a Firebase Firestore contact form and Firebase Hosting deployment.

## Features

- Custom portfolio landing page
- Contact form that saves submissions to Firebase Firestore
- Dedicated thank-you page after successful submit
- Firebase Hosting deployment for the full site

## Firebase Setup

This project uses Firebase in two parts:

### 1. Firestore Database
The contact form saves messages into a Firestore collection named `submissions`.

Each submission stores these fields:
- `name`
- `email`
- `subject`
- `message`
- `timestamp`
- `userAgent`

The Firebase config is stored locally in `js/firebase-config.js` and is ignored by Git.
A safe template is available in `js/firebase-config.example.js`.

### 2. Firebase Hosting
The site is deployed to Firebase Hosting from the project root.

Current Hosting configuration:
- `firebase.json` uses `"public": "."`
- `public/` is ignored so the default Firebase starter page is not deployed
- The real portfolio files in the project root are deployed instead

## Firebase Console Links

- Project Console: https://console.firebase.google.com/project/portfolio-60651/overview
- Hosting URL: https://portfolio-60651.web.app

## How the form works

1. A visitor fills out the contact form.
2. The form sends data to Firestore using the Firebase web SDK.
3. A success message is shown.
4. The user is redirected to `pages/thank-you.html`.

## Files Related to Firebase

- `firebase.json` - Firebase Hosting configuration
- `.firebaserc` - Active Firebase project mapping
- `js/firebase-config.js` - Local Firebase credentials
- `js/firebase-config.example.js` - Public template for the config file
- `js/main.js` - Firestore write logic for the contact form
- `pages/thank-you.html` - Success page after form submission

## Commands Used

### Firebase CLI installation
```powershell
npm install -g firebase-tools
```

### Firebase login
```powershell
npx -y firebase-tools@latest login
```

### Check active project
```powershell
npx -y firebase-tools@latest use
```

### Initialize Hosting
```powershell
npx -y firebase-tools@latest init hosting
```

### Deploy Hosting
```powershell
npx -y firebase-tools@latest deploy --only hosting
```

### Check Hosting sites
```powershell
npx -y firebase-tools@latest hosting:sites:list
```

### Check Hosting channels
```powershell
npx -y firebase-tools@latest hosting:channel:list
```

## Notes

- The site is already deployed on Firebase Hosting.
- Firestore rules must allow document creation for contact form submissions to work.
- Do not commit `js/firebase-config.js` to GitHub.
- Use `js/firebase-config.example.js` as the public template instead.

## Live Deployment Status

- Live Hosting channel: `live`
- Live URL: https://portfolio-60651.web.app
- Firebase project ID: `portfolio-60651`
