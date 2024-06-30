import {useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetActivites = () => {
    const query = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const res = await client.api.workout.activities.$get();
            if (!res.ok) {
                throw new Error("failed to fetch activites")
            }
            const data = await res.json();
            const activities = data as {data:string[]}
            return activities;
        },
    });
    return query;
}