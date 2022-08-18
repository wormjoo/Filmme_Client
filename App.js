import React from "react";
import { UserProvider } from "./src/contexts/User";
import Navigation from "./src/navigations";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
