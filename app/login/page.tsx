"use client";

import { useFormState } from "react-dom";
import Input from "../components/input";
import FormButton from "../components/button";
import { login } from "./action";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-6 px-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">Welcome!</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          required
          placeholder="Email"
          errors={state?.fieldErrors?.email}
        />
        <Input
          name="username"
          type="username"
          required
          placeholder="Username"
          errors={state?.fieldErrors?.username}
        />
        <Input
          name="password"
          type="password"
          required
          placeholder="Password"
          errors={state?.fieldErrors?.password}
        />

        <FormButton text="Log in" />
      </form>
      {state && "success" in state && state.success && (
        <button className="w-full bg-green-500 text-white font-medium rounded-md text-center hover:bg-green-400 transition-colors h-10">
          Welcome
        </button>
      )}
    </div>
  );
}
