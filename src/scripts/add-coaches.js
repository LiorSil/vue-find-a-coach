import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../data/firebase.js";
import { readFileSync } from "fs";

// Read and parse the JSON file
const jsonFile = readFileSync("./coaches.json", "utf8");
const coachesData = JSON.parse(jsonFile);

// Initialize Firebase
const db = getFirestore(app);

// Function to add coaches to Firebase
async function addCoachesToFirebase() {
  try {
    const coachesCollection = collection(db, "coaches");

    // Add each coach to the collection
    for (const coach of coachesData.coaches) {
      await addDoc(coachesCollection, {
        firstName: coach.firstName,
        lastName: coach.lastName,
        pricePerHour: coach.pricePerHour,
        skills: coach.skills,
        description: coach.description,
      });
      console.log(`Added coach: ${coach.firstName} ${coach.lastName}`);
    }

    console.log("All coaches have been added successfully!");
  } catch (error) {
    console.error("Error adding coaches:", error);
  }
}
// Execute the function
addCoachesToFirebase();
