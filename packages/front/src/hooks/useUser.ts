import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../App";

export const useUser = () => {
  const { token, user } = useContext(AuthContext);

  // ログイン後にしか呼ばれないため
  return {
    token: token as string,
    user: user as User,
  };
};
