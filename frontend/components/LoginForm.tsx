"use client";

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export default function LoginForm() {
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const response = await api.post("/users/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      login(response.data.access_token);
      notifications.show({
        title: "Success",
        message: "You have been logged in",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Invalid username or password",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
      <TextInput
        label="Username"
        placeholder="Enter your username"
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        {...form.getInputProps("password")}
      />
      <div className="w-full my-1 flex justify-end">
        <Link href={"/sign-up"}>Don't have an account?</Link>
      </div>
      <Button type="submit" fullWidth color="black">
        Sign in
      </Button>
    </form>
  );
}
