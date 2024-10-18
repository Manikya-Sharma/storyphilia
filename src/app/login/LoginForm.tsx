"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="cursor-pointer tracking-tight">
            Email
          </label>
          <Input
            id="email"
            placeholder="Enter your email"
            className="mt-1.5 rounded-3xl"
          />
        </div>
        <div>
          <label htmlFor="password" className="cursor-pointer tracking-tight">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-1.5 rounded-3xl"
          />
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        className="ml-auto mt-1 block w-fit text-sm text-rose-400"
      >
        Forgot Password?
      </Button>
      <Button
        type="submit"
        className="mt-2 block w-full rounded-3xl bg-rose-600 hover:bg-rose-500"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
