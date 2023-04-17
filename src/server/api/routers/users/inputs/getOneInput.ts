import { z } from "zod";



export const getOneInput = z.object({
    id: z.string(),
});