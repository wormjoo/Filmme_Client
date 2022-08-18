import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import MainStack from "./mainStack";
import { UserContext } from "../contexts/User";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
