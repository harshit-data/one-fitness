import {z} from 'zod'
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { Hono } from 'hono'
import { workoutStatSchema } from "@/lib/schema"
import { zValidator } from "@hono/zod-validator"
import axios from "axios" 
import prisma from "@/db"
const app = new Hono().get('/workouts/:date', clerkMiddleware(), zValidator('param', z.object({ date: z.string() })), async(c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json("user is not authenticated",401)
    }
    const { date }  = c.req.valid('param');
    const parsedDate = new Date(date);
    const currYear = parsedDate.getFullYear();
    const currMonth = parsedDate.getMonth();
    const startDate = new Date(currYear, currMonth,1);
    const endDate = new Date(currYear, currMonth+1,0);
    // console.log("startDate ",startDate, "  endDate  ",endDate)
    try {
        const data = await prisma.userWorkoutStats.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte:endDate
                }
            }
        })
        if (!data) {
            return c.json({error:"workout not found"},404)
        }
        return c.json({
            data
        })
    }
    catch (e) {
        console.log(e);
        return c.json({error:"something went wrong"},400)
    }
}).
    get("/activities", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json("user is not authenticated",401)
        }
        const url = "https://api.api-ninjas.com/v1/caloriesburnedactivities"
        const xApi = process.env.X_API_KEY;
        try {
            const response = await axios.get(url, {
                headers: {
                    "X-Api-Key": xApi
                }
            })
            const { activities
            } = await response.data;
            return c.json({ data: activities })
        }
        catch (e) {
            return c.json({ error: e })
        }
        
    })
    .get('/:id', clerkMiddleware(), zValidator('param', z.object({ id: z.string() })), async(c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json("user is not authenticated",401)
        }
        const { id } = c.req.valid('param');
        try {
            const data = await prisma.userWorkoutStats.findFirst({
                where: {
                    id
                }
            })
            if (!data) {
                return c.json({error:"workout not found"},404)
            }
            return c.json({
                data
            })
        }
        catch (e) {
            console.log(e);
            return c.json({error:"something went wrong"},400)
        }
    }).post("/add-workout", clerkMiddleware(), zValidator('json', workoutStatSchema.omit({ id: true })), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json("user is not authenticated",401)
    }
    const values = c.req.valid('json') 
    console.log(values)
    const startTime = values.date;
    startTime.setHours(values.startTime.hour + values.startTime.period === "PM"?+12:+0);
    startTime.setMinutes(values.startTime.min);
    try {
        const data = await prisma.userWorkoutStats.create({
            data: {
                workoutName: values.workoutName,
                activity: values.activity,
                caloriesBurned: values.caloriesBurned,
                date: values.date,
                duration: values.duration,
                startTime
            }
        })
        return c.json({id:data.id})
    }
    catch (e) {
        console.log("error in backend " , e);
        return c.json({msg:"something went wrong, try again later",e:e},400)
    }
})
export default app;