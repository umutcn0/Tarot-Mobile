import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useSelector } from "react-redux";

const rootNavigation = () => {
  const auth = useSelector((state) => state.userAuth.isAuth);
  return (
    <NavigationContainer>
      {!auth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default rootNavigation;
