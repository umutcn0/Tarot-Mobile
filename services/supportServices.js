import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../database/firebase/firebaseConfig';

const supportCollection = collection(db, 'support_tickets');

export const createSupportTicket = async (userId, userEmail, message) => {
  try {
    // Check daily ticket limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
      supportCollection,
      where('user_id', '==', userId),
      where('created_at', '>=', today)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size >= 2) {
      throw new Error('Daily ticket limit reached (2 tickets per day)');
    }

    // Create new ticket
    const ticketData = {
      user_id: userId,
      user_email: userEmail,
      message: message,
      status: 'pending',
      created_at: Timestamp.now()
    };

    const docRef = await addDoc(supportCollection, ticketData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
}; 