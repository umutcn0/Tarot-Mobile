import RootNavigation from "./navigation/rootNavigation";
import { Provider } from "react-redux";
import store from "./database/redux/reduxStore";
import AlertProvider from "./components/AlertProvider";
import mobileAds from 'react-native-google-mobile-ads';

// Initialize mobile ads SDK
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  })
  .catch(error => {
    console.error('Mobile ads initialization failed:', error);
  });

export default function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
        <RootNavigation />
      </AlertProvider>
    </Provider>
  );
}