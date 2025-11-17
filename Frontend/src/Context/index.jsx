import React from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [getNotes, setGetNotes] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    date: null,
  });

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <AppContext.Provider
      value={{
        isShowPassword,
        setIsShowPassword,
        toggleShowPassword,
        password,
        setPassword,
        email,
        setEmail,
        name,
        setName,
        error,
        setError,
        searchQuery,
        setSearchQuery,
        openEditModal,
        setOpenEditModal,
        inputValue,
        setInputValue,
        userInfo,
        setUserInfo,
        getNotes,
        setGetNotes,
        showToastMsg,
        setShowToastMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
