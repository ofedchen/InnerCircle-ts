import * as React from "react";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const uuid = localStorage.getItem("userId");
    console.log("UserContext loaded userId:", uuid);
    setUserId(uuid || "");
  }, []);

  const login = (uuid: string) => {
    localStorage.setItem("userId", uuid);
    setUserId(uuid);
    console.log("User logged in:", uuid);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId("");
    console.log("User logged out");
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
