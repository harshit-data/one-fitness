import { useGetWorkoutsMonthly } from "@/features/workout/api/use-workout-monthly";
import { Skeleton } from "./ui/skeleton";
import { useCallback, useEffect, useState } from "react";
type Props = {
    date:Date
}
export const UserWorkoutSummary = ({date}:Props) => {
    const [workoutSummary, setWorkoutSummary] = useState({
        duration: 0,
        caloriesBurned: 0,
        totalWorkouts:0
    })
    const monthlyWorkoutsQuery = useGetWorkoutsMonthly(date);
    
    const isLoading = monthlyWorkoutsQuery.isLoading;
    const disabled = monthlyWorkoutsQuery.isPending;

    const handleWorkoutSummary = useCallback(() => {
        const monthlyWorkouts = monthlyWorkoutsQuery.data || [];
        const totalWorkouts = monthlyWorkouts.length;
        let netDuration = 0;
        let netCaloriesBurned = 0;
        for (const workout of monthlyWorkouts) {
            netDuration += workout.duration;
            netCaloriesBurned += workout.caloriesBurned
        }
        setWorkoutSummary({
            duration: netDuration,
            caloriesBurned: netCaloriesBurned,
            totalWorkouts
        })
    },[monthlyWorkoutsQuery.data])
    useEffect(() => {
        handleWorkoutSummary();
    },[handleWorkoutSummary])
    if (isLoading) {
        return (
            <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                    <Skeleton className="h-[40px] w-[100px]"/>
                <Skeleton className="h-[15px] w-[60px]"/>
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-[40px] w-[100px]"/>
                <Skeleton className="h-[15px] w-[60px]"/>
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-[40px] w-[100px]"/>
                <Skeleton className="h-[15px] w-[60px]" />
            </div>
        </div>
        );
    }
    return (
        <div className="flex items-center justify-between">
            <div>
                <div className="text-3xl font-semibold my-2">{workoutSummary.duration}</div>
                <div className="text-sm">duration (min)</div>
            </div>
            <div>
                <div className="text-3xl font-semibold my-2">{workoutSummary.caloriesBurned}</div>
                <div className="text-sm">Calories (Kcal)</div>
            </div>
            <div >
                <div className="text-3xl font-semibold my-2">{workoutSummary.totalWorkouts}</div>
                <div className="text-sm">workouts (min)</div>
            </div>
        </div>
    );
    
}