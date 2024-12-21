import RootNavigation from "./navigation/rootNavigation";
import { Provider } from "react-redux";
import store from "./database/redux/reduxStore";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}