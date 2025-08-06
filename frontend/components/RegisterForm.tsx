"use client";

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password is too short" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await api.post("/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      notifications.show({
        title: "Success",
        message: "Account created successfully",
        color: "green",
      });
      router.push("/sign-in");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Registration failed",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
      <TextInput
        label="Username"
        placeholder="Your username"
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Email"
        placeholder="Your email"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        {...form.getInputProps("password")}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        {...form.getInputProps("confirmPassword")}
      />
      <div className="w-full mb-1 flex justify-end">
        <Link href={"/sign-in"}>Already have an account?</Link>
      </div>
      <Button type="submit" fullWidth color="black">
        Sign up
      </Button>
    </form>
  );
}
