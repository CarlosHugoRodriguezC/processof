import { z } from "zod";



export const deleteUserInput = z.object({
    id: z.string(),
});

