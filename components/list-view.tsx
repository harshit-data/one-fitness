"use client"

import { useRouter } from "next/navigation";
import { useGetWorkoutsMonthly } from "@/features/workout/api/use-workout-monthly";
import { Skeleton } from "./ui/skeleton";
import { format } from "date-fns";
type Props = {
    date:Date
}
export const ListView = ({ date }: Props) => {
    const router = useRouter();
    const monthlyWorkoutQuery = useGetWorkoutsMonthly(date);
    const isLoading = monthlyWorkoutQuery.isLoading;
    const monthlyWorkouts = monthlyWorkoutQuery.data || [];
    return (
        <div className="bg-[#f3f3f3] border-[1px] border-[#e3e3e5] flex flex-col gap-3">
            <div className="grid grid-cols-6 gap-y-3  px-5 py-7">
                <div className="text-base font-semibold ">Name</div>
                    <div className="text-base font-semibold ">Date</div>
                    <div className="text-base font-semibold col-span-2">Activity</div>
                    <div className="text-base font-semibold ">Duration (min)</div>
                <div className="text-base font-semibold ">Calories</div>
            </div>
                 
            {
                isLoading ? <div className="flex flex-col gap-1 col-span-5 px-3 my-2">
                    <Skeleton className="h-[20px] w-[900px]"/>
                    <Skeleton className="h-[15px] w-[700px]"/>
                    <Skeleton className="h-[10px] w-[400px]"/>
                </div> :
                        monthlyWorkouts.map((workout,index)=>{
                            return (
                                <div key={index} onClick={() => router.push(`/workout/${workout.id}`)} className="grid grid-cols-6 px-3 mx-2 cursor-pointer rounded-lg py-3 bg-white h-[65px] border-2 border-transaparent hover:border-black">
                                <div>{workout.workoutName}</div>
                                    <div>{format(workout.date,'dd/MM')}</div>
                                    <div className="col-span-2">{workout.activity}</div>
                                <div>{workout.duration}</div>
                                    <div>{workout.caloriesBurned} Kcal</div>
                                </div>
                            );
                        })
                    
                    
            }
            
        </div>
    );
}