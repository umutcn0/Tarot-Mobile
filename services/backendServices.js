import {getAuth} from 'firebase/auth'

const SERVER_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_API_SERVER_DEV_URL || 'http://localhost:8000'  // fallback dev URL
  : process.env.EXPO_PUBLIC_API_SERVER_URL || 'https://api.yourproduction.com';  // fallback prod URL

if (!SERVER_URL) {
  console.error('SERVER_URL is not properly configured. Check your environment variables.');
}

const auth = getAuth();

export const getAuthToken = async () => {
  try {
    const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
    return token;
  } catch (error) {
    throw new Error('Failed to get authentication token');
  }
};

/**
 * Sends a fortune to the backend services
 * @param {Object} items - The items to send
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} The response from the backend
 */
export const sendFortune = async (items, userId) => {
    try {
      const token = await getAuthToken();

      const request_body = {
        "selected_cards": items.selectedCards,
        "user_id": userId,
        "category_title": items.category_title,
        "category_description": items.category_description,
      };

      if (items.message) {
        request_body.message = items.message;
      }

      console.log(request_body)
      console.log(SERVER_URL)

      const response = await fetch(
        `${SERVER_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(request_body),
        }
      );
      return true;
    } catch (error) {
      console.error('Fortune sending error:', error);
      throw error;
    }
};