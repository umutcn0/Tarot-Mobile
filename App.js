import RootNavigation from "./navigation/rootNavigation";
import { Provider } from "react-redux";
import store from "./database/redux/reduxStore";
import AlertProvider from "./components/AlertProvider";
import mobileAds from 'react-native-google-mobile-ads';
import { useNetInfo } from './hooks/useNetInfo';

const AppContent = () => {
  useNetInfo(); // This will handle connectivity checks and alerts
  
  return (
    <AlertProvider>
      <RootNavigation />
    </AlertProvider>
  );
};

export default function App() {
  // Initialize mobile ads SDK
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      // Initialization complete!
    })
    .catch(error => {
      console.error('Mobile ads initialization failed:', error);
    });

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}