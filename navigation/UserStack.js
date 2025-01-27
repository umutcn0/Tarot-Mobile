import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "../components/TabNavigator";
import { CardSelection, FaithFortune, FortuneDetail } from "../screens/fortunes";
import { AppSettings, ProfileSettings, Support } from "../screens/settings";
import { VerifyEmail } from "../screens/login";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const emailVerified = useSelector((state) => state.userAuth.emailVerified);

  return (
    <Stack.Navigator initialRouteName={emailVerified ? "MainTabs" : "VerifyEmail"}>
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardSelection"
        component={CardSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FaithFortune"
        component={FaithFortune}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppSettings"
        component={AppSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FortuneDetail"
        component={FortuneDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
