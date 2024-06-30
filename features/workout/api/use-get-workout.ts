import {useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetWorkout = (id: string) => {
    const query = useQuery({
        queryKey: ["workout",id],
        queryFn: async () => {
            const res = await client.api.workout[":id"].$get({
                param: { id }
            });
            if (!res.ok) {
                throw new Error("failed to get workout")
            }
            const {data} = await res.json();
            return data;
        },
    });
    return query;
}