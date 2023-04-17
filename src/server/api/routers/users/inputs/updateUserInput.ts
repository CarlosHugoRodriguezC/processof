
import { Role } from "@prisma/client";
import { z } from "zod";

const roleEnum = z.nativeEnum(Role);
console.log(roleEnum);

export const updateUserInput = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1).max(255),
  role: z.nativeEnum(Role)
});
