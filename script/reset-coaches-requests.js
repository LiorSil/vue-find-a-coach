import fs from "fs";
import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

// Parse the service account JSON (stored in env var)
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function deleteCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
  await Promise.all(deletePromises);
  console.log(`Deleted all documents from "${collectionName}"`);
}

async function addDocuments(collectionName, documents) {
  const collectionRef = db.collection(collectionName);
  const addPromises = documents.map((doc) => collectionRef.add(doc));
  await Promise.all(addPromises);
  console.log(`Added ${documents.length} documents to "${collectionName}"`);
}

async function resetCollections() {
  try {
    const coachesData = JSON.parse(
      fs.readFileSync(new URL("./coaches.json", import.meta.url))
    );

    const requestsData = JSON.parse(
      fs.readFileSync(new URL("./requests.json", import.meta.url))
    );

    await deleteCollection("coaches");
    await deleteCollection("requests");

    await addDocuments("coaches", coachesData.coaches);
    await addDocuments("requests", requestsData.requests);

    console.log("✅ Successfully reset all collections!");
  } catch (error) {
    console.error("❌ Error resetting collections:", error);
  }
}

resetCollections();
