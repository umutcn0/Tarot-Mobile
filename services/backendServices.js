import {getAuth} from 'firebase/auth'
import Config from 'react-native-config';

const SERVER_URL = __DEV__ ? Config.API_SERVER_DEV_URL : Config.API_SERVER_URL;

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

      const response = await fetch(
        `${SERVER_URL}/api/chat-test`,
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