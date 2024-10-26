import { Registerschema } from "@/schemas";
import { z } from "zod";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const regiser = async (values: z.infer<typeof Registerschema>) => {
  const validatedFields = Registerschema.safeParse(values);

  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(validatedFields.data),
  });
  if (!response.ok) {
    return { error: "Failed Register" };
  }
  const responseData = await response.json();
  localStorage.setItem("token", responseData.token);

  console.log(responseData);
  return { success: "Register successfull" };
};
