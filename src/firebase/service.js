import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerDB = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered:", userCredential.user);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
