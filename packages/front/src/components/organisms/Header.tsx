import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { USER } from "../../graphql/user";
import { useAuth } from "../../hooks";
import { LogoTHEHUB } from "../atoms";
import { Menu } from "./Menu";

export const Header = () => {
  const { data: userResponse } = useQuery(USER);
  const { auth } = useAuth();

  const onSignOut = () => {
    signOut(auth!);
    window.location.reload();
  };

  return (
    <div className="pt-4 px-6 flex flex-row justify-between">
      <LogoTHEHUB />
      {userResponse?.user && (
        <div className="flex flex-row items-center">
          <UserIcon className="w-5 h-5 mr-1" />
          {userResponse.user.name}
          <div className="w-2" />
          <Menu onSignOut={onSignOut} />
        </div>
      )}
    </div>
  );
};
