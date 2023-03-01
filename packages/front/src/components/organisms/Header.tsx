import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/20/solid";
import { USER } from "../../graphql/user";
import { LogoTHEHUB } from "../atoms";

export const Header = () => {
  const { data: userResponse } = useQuery(USER, {
    variables: { id: 1 },
  });

  if (!userResponse) return null;

  if (!userResponse.user) throw new Error("user not found");

  return (
    <div className="pt-4 px-6 flex flex-row justify-between">
      <LogoTHEHUB />
      <div className="flex flex-row items-center">
        <UserIcon className="w-5 h-5 mr-1" />
        {userResponse.user.name}
      </div>
    </div>
  );
};