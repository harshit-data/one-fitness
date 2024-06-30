import { InferRequestType,InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.workout["add-workout"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.workout["add-workout"]["$post"]>["json"]; 

export const useCreateWorkout = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.workout["add-workout"]["$post"]({ json });
            console.log(response);
            return await response.json();
        },
        onSuccess: () => {
            toast.success("workout added succcessfully")
            // it will refetch all the accounts if a account is successfully created in useget accounts hook
            queryClient.invalidateQueries({ queryKey: ["workout-summary"] });
        },
        onError: () => {
            toast.error("workout addition failed")

        }
    }) 
    return mutation;
}