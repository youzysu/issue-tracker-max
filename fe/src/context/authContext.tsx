import { ReactNode, createContext, useContext, useState } from "react";

type UserInfo = {
  username: string;
  profileUrl: string;
};

type LoginResponse = {
  accessToken: string;
  expirationTime: number;
  userInfo: UserInfo;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  onLogin: ({ accessToken, userInfo, expirationTime }: LoginResponse) => void;
  onLogout: () => void;
};

const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    profileUrl: "",
  });

  const onLogin = ({
    accessToken,
    expirationTime,
    userInfo,
  }: LoginResponse) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expirationTime", expirationTime.toString());

    setUserInfo(userInfo);
    setIsLoggedIn(true);
  };

  // TODO: 이후 로그아웃 버튼에 추가 필요
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");

    setUserInfo({ username: "", profileUrl: "" });
    setIsLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ isLoggedIn, userInfo, onLogin, onLogout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Cannot find UserProvider");
  }

  return context;
};
