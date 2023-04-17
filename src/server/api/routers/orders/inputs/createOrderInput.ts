import { Order } from "@prisma/client";
import { z } from "zod";





export const createOrderInput = z.object({
    customerEmail: z.string().email(),
    customerName: z.string(),
});