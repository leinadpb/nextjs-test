"use client";

import { signin } from "@/lib/api";
import { AuthPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import Input from "../input/Input";

const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    // Get Data and submit!
    // @ts-ignore
    const formState = new FormData(e.target);

    const payload: AuthPayload = {
      email: String(formState.get("email")),
      password: String(formState.get("password")),
    };

    setLoading(true);

    try {
      await signin(payload);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      router.replace("/");
    }, 200);
  };

  return (
    <form
      onSubmit={handlesubmit}
      className={"p-12 rounded shadow bg-white min-w-large"}
    >
      <Heading className="mb-8 text-center">Let&apos;s get you inside</Heading>
      <Input label="Email" id="email" />
      <Input label="Password" id="password" type={"password"} />
      <Button loading={loading} fullWidth>
        Login
      </Button>
    </form>
  );
};

export default AuthForm;
