# Firebase Setup Instructions

Follow these steps to save form submissions to Firebase:

## Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it "portfolio" (or your choice)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Get Your Firebase Credentials
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Go to **General** tab
3. Scroll down to "Your apps" section
4. Click on the Web app icon `</>`
5. Copy the entire `firebaseConfig` object (it looks like below)

## Step 3: Update Firebase Config
1. Copy `js/firebase-config.example.js` to `js/firebase-config.js`
2. Replace the placeholder credentials in `js/firebase-config.js` with your credentials
3. Keep the structure the same, only replace the values
4. Do not commit `js/firebase-config.js` to GitHub (it is ignored by `.gitignore`)

Example of what you'll copy:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "portfolio-xxxxx.firebaseapp.com",
  projectId: "portfolio-xxxxx",
  storageBucket: "portfolio-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 4: Create Firestore Database
1. In Firebase Console left sidebar, go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (easier for development)
4. Select a region close to you
5. Click **Create**

## Step 5: Set Security Rules (Optional but Recommended)
1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rule with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```
3. Click **Publish**

This allows anyone to submit forms but prevents reading/deleting data.

## Step 6: GitHub Safety Check
1. Ensure `.gitignore` exists and includes `js/firebase-config.js`
2. Keep only `js/firebase-config.example.js` in GitHub

## Step 7: Done!
Your portfolio will now save all contact form submissions to Firebase Firestore.
View submissions anytime in Firebase Console → Firestore Database → Collection: `submissions`
