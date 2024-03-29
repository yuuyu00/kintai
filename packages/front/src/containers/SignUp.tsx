import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { SignUp as Component, SignUpProps } from "../components/templates";
import { CREATE_USER, USER_BY_TOKEN } from "../graphql/user";

type Props = {
  onSignUpFirebase: () => Promise<{ token: string | undefined } | undefined>;
  onCompleteSigunUp: () => void;
};
export const SignUp = ({ onSignUpFirebase, onCompleteSigunUp }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const { refetch: refetchUser } = useQuery(USER_BY_TOKEN, {
    fetchPolicy: "no-cache",
  });
  const [createUserMutation] = useMutation(CREATE_USER);

  const [step, setStep] = useState<"firebase" | "server">("firebase");

  const onSignUp = async () => {
    const signUpResult = await onSignUpFirebase();

    if (signUpResult?.token === undefined) throw new Error("Sign up failed");

    const refetchResult = await refetchUser({ token: signUpResult.token });

    if (refetchResult.data.userByToken) {
      onCompleteSigunUp();
      return;
    }

    setToken(signUpResult.token);
    setStep("server");
  };

  const onSignUpServer = async (params: {
    name: string;
    plannedWorkTime: number;
  }) => {
    if (!token) throw new Error("token is not set");

    await createUserMutation({
      variables: {
        input: {
          name: params.name,
          plannedWorkTime: params.plannedWorkTime,
          token,
        },
      },
    });

    onCompleteSigunUp();
    window.location.reload();
  };

  const props: SignUpProps = {
    step,
    onSignUpFirebase: onSignUp,
    onSignUpServer,
  };

  return <Component {...props} />;
};
