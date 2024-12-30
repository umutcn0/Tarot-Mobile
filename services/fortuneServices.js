import { db } from "../database/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { useSelector } from "react-redux";

const fortuneCollection = collection(db, "fortune_history");

/**
 * Fetches a specific fortune by user ID and fortune ID
 * @param {string} userId - The user's ID
 * @param {string} fortuneId - The fortune's ID
 * @returns {Promise<Object>} The fetched fortune
 */
export const getFortune = async (userId, fortuneId) => {
  const q = query(fortuneCollection, [where("user_id", "==", userId), where("id", "==", fortuneId)]);
  const querySnapshot = await getDocs(q);
  const fortune = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return fortune;
};

/**
 * Fetches all fortunes for a specific user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array<Object>>} An array of fortunes
 */
export const getFortuneHistory = async (userId) => {
  const q = query(fortuneCollection, where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  const fortunes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return fortunes;
};