import { LoginSchema } from "@/schemas";
import { z } from "zod";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  const response = await fetch(`${API_BASE_URL}/api/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(validatedFields.data),
  });
  if (!response.ok) {
    return { error: "Failed Login" };
  }
  const responseData = await response.json();
  localStorage.setItem("token", responseData.token);

  console.log(responseData);
  return { success: "Login successfull" };
};
