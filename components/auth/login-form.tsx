"use client";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";

// import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";

import FormError from "./form-error";
import FormSuccess from "./form-success";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setsuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error || "");
        setsuccess(data?.success || "");
        if (data.success) {
          router.push("/home");
        }
      });
      //   login(values).then((data) => {
      //     setError(data?.error || "");
      //     setsuccess(data?.success || "");
      //   });
    });
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an acoount"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="email"
                    className="text-base font-semibold"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="hello@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="password"
                    className="text-base font-semibold"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="********"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full py-2 bg-rose-400 rounded-md font-medium"
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="relative pt-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
      </div>
    </CardWrapper>
  );
}

export default LoginForm;
