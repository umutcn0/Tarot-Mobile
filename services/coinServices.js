import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase/firebaseConfig';
import { setCoinAmount } from '../database/redux/slices/coinSlice';
import { useDispatch } from 'react-redux';

// Collection reference
const userCollection = collection(db, 'users');

/**
 * Fetches the user's token/coin amount from Firestore
 * @param {string} userId - The user's ID
 * @returns {Promise<number>} The user's coin amount
 */
export const getUserCoin = async (userId) => {
  try { 
    const q = query(userCollection, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
    return user.coinAmount;
  } catch (error) {
    console.error('Error fetching user token:', error);
    return 0;
  }
};

/**
 * Updates the user's token/coin amount in Firestore
 * @param {string} userId - The user's ID
 * @param {number} coinAmount - Amount of coins to add
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserCoin = async (userId, coinAmount) => {
  const docRef = doc(userCollection, userId);
  const currentCoinAmount = await getUserCoin(userId);
  const newCoinAmount = currentCoinAmount + coinAmount;
  
  await updateDoc(docRef, { coinAmount: newCoinAmount });
  return { id: userId, coinAmount: newCoinAmount };
};
