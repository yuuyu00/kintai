import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/20/solid";
import { USER } from "../../graphql/user";
import { useUser } from "../../hooks";
import { LogoTHEHUB } from "../atoms";

export const Header = () => {
  const { token } = useUser();
  const { data: userResponse } = useQuery(USER, {
    variables: { token: token },
  });

  return (
    <div className="pt-4 px-6 flex flex-row justify-between">
      <LogoTHEHUB />
      {userResponse?.userByToken && (
        <div className="flex flex-row items-center">
          <UserIcon className="w-5 h-5 mr-1" />
          {userResponse.userByToken.name}
        </div>
      )}
    </div>
  );
};
