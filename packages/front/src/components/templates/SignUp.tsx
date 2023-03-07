import { useState } from "react";

export type SignUpProps = {
  step: "firebase" | "server";
  onSignUpFirebase: () => void;
  onSignUpServer: (params: { name: string; plannedWorkTime: number }) => void;
};

export const SignUp = ({
  step,
  onSignUpFirebase,
  onSignUpServer,
}: SignUpProps) => {
  const [form, setForm] = useState<{
    name: string;
    plannedWorkTime: number | undefined;
  }>({ name: "", plannedWorkTime: undefined });

  const formDisabled =
    form.name === "" ||
    form.plannedWorkTime === undefined ||
    isNaN(form.plannedWorkTime);

  if (step === "firebase")
    return (
      <div className="w-full h-screen pb-[80px] flex flex-row justify-center items-center">
        <div className=" bg-gray-700 rounded-xl px-10 py-10 mt-10 w-[500px] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-medium">サインイン</h2>
          <button
            className="inline-flex items-center px-6 py-2 mt-8 border border-transparent text-base rounded-full shadow-sm text-slate-900 bg-white mr-4"
            onClick={onSignUpFirebase}
          >
            <img src="google.png" alt="google" className="w-8 h-8 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen  pb-[80px] flex flex-row justify-center items-center">
      <div className=" bg-gray-700 rounded-xl px-10 py-10 mt-10 w-[500px] flex flex-col justify-center ">
        <h2 className="text-2xl font-medium mb-8">
          続行するにはユーザー情報を入力
        </h2>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-slate-100"
        >
          名前
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>

        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 mt-8 text-slate-100"
        >
          毎月の目標稼働時間
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="plannedWorktime"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={form.plannedWorkTime}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                plannedWorkTime: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-row justify-end mt-8">
          <button
            type="button"
            className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm ${
              formDisabled ? "bg-gray-300" : "bg-green-600"
            } ${formDisabled ? "text-gray-400" : "text-title"} ml-2`}
            onClick={() =>
              onSignUpServer({
                name: form.name!,
                plannedWorkTime: form.plannedWorkTime!,
              })
            }
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
};
