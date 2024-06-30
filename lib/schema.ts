import { z } from "zod"

export const workoutStatSchema = z.object({
    id: z.string(),
    userWeight:z.coerce.number(),
    workoutName:z.string(),
    activity: z.string(),
    date: z.coerce.date(),
    duration: z.coerce.number(),
    caloriesBurned: z.coerce.number().int(),
    startTime: z.object({
        hour: z.coerce.number().int(),
        min: z.coerce.number().int(),
        period:z.string()
    }),
    notes: z.string().optional()
})

export const getCaloriesBurnedSchema = z.object({
    activity: z.string(),
    duration: z.number(),
    userWeight:z.number()
})