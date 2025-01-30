"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function FormButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full bg-orange-500 text-white font-medium rounded-md text-center hover:bg-orange-400 transition-colors h-10 disabled:bg-neutral-500"
    >
      {pending ? "Loading......" : text}
    </button>
  );
}
