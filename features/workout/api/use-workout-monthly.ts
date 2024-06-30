import {useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import {format} from "date-fns"
export const useGetWorkoutsMonthly = (date: Date) => {
    const formattedDate = format(date, "MM yyyy");
    const query = useQuery({
        queryKey: ["monthlyWorkouts",formattedDate],
        queryFn: async () => {
            const res = await client.api.workout.workouts[":date"].$get({
                param: { date:date.toString()}
            });
            if (!res.ok) {
                throw new Error(`failed to get workouts on month ${formattedDate}`)
            }
            const {data} = await res.json();
            return data;
        },
    });
    return query;
}