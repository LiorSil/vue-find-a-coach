import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read and parse the JSON file
const jsonFile = readFileSync(
  join(__dirname, "../data/requests_template.json"),
  "utf8"
);
const requestsData = JSON.parse(jsonFile);

// Function to add requests to Firebase
async function addRequestsToFirebase() {
  try {
    const requestsCollection = collection(db, "requests");

    // Add each request to the collection
    for (const request of requestsData.requests) {
      // Convert the date string to a Firebase Timestamp
      const requestDate = new Date(request.requestDate);
      const firebaseTimestamp = Timestamp.fromDate(requestDate);

      await addDoc(requestsCollection, {
        firstname: request.firstname,
        lastname: request.lastname,
        message: request.message,
        requestDate: firebaseTimestamp,
        requestedBy: request.requestedBy,
        email: request.email,
        id: request.id,
      });
    }

    console.log("Successfully added all requests to Firebase!");
  } catch (error) {
    console.error("Error adding requests:", error);
  }
}

// Execute the function
addRequestsToFirebase();
