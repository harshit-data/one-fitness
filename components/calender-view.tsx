"use client"
import { Button } from "./ui/button";
import { Plus } from "lucide-react";    
import { useRouter } from "next/navigation";

import { WorkoutCard } from "./workout-card";
import { useGetWorkoutsMonthly } from "@/features/workout/api/use-workout-monthly";
import { useState,useEffect, useCallback } from "react";
type Props = {
    value: Date
}
type Workout = {
    date: string;
    id: string;
    workoutName: string;
    activity: string;
    duration: number;
    caloriesBurned: number;
    startTime: string;
    notes: string | null;
}
export const CalenderView = ({ value }: Props) => {
    const router = useRouter();
    const monthlyWorkoutsQuery = useGetWorkoutsMonthly(value);
    const isLoading = monthlyWorkoutsQuery.isLoading;
    const disabled = monthlyWorkoutsQuery.isPending;
    const getMonthDetails = useCallback(() => {
        const currYear = value.getFullYear();
        const currMonth = value.getMonth();
        const totalDays = new Date(currYear, currMonth + 1, 0).getDate();  
        const firstWeekDay = new Date(currYear, currMonth, 1).getDay();
        const lastWeekDay = new Date(currYear, currMonth + 1, 0).getDay();
        return {
            totalDays,
            firstWeekDay,
            lastWeekDay
        };
    }, [value]);

    const [workoutByDate, setWorkoutByDate] = useState<Workout[][]>(Array.from({ length: getMonthDetails().totalDays }, () => [])); 

    const getNumberOfBoxes = useCallback(() => {
        const monthDetails = getMonthDetails();
        const firstWeekDay = monthDetails.firstWeekDay;
        const lastWeekDay = monthDetails.lastWeekDay;
        const totalDays = monthDetails.totalDays;
        const noOfStartBlankBox = (firstWeekDay + 6) % 7;
        const noOfEndBlankBox = (7 - lastWeekDay) % 7;
        const startBlankBoxes = [];
        const dateBoxes = [];
        const endBlankBoxes = [];
        for (let i = 1; i <= noOfStartBlankBox; i++) {
            startBlankBoxes.push(i);
        }
        for (let i = 1; i <= totalDays; i++) {
            dateBoxes.push(i);
        }
        for (let i = 1; i <= noOfEndBlankBox; i++) {
            endBlankBoxes.push(i);
        } 
        return {
            startBlankBoxes,
            dateBoxes,
            endBlankBoxes
        };
    }, [getMonthDetails]);

    const handleAddWorkout = (date: number) => {
        const currYear = value.getFullYear();
        const currMonth = value.getMonth();
        const workoutDate = new Date(currYear, currMonth, date);
        const stringDate = workoutDate.toLocaleDateString();
        router.push(`/workout/create/${stringDate}`);
    };

    const handleMonthlyWorkouts = useCallback(() => {
        const monthlyWorkouts = monthlyWorkoutsQuery.data || [];
        const newArray: Workout[][] = Array.from({ length: getMonthDetails().totalDays }, () => []);
        for (const workout of monthlyWorkouts) {
            const index = new Date(workout.date).getDate();
            newArray[index - 1].push(workout);
        }
        setWorkoutByDate(newArray);
    }, [monthlyWorkoutsQuery.data, getMonthDetails]);

    useEffect(() => {
        handleMonthlyWorkouts();   
    }, [monthlyWorkoutsQuery.data, handleMonthlyWorkouts]);
    return (
        <div className="px-2 py-10">
            <div className="bg-[#f3f3f3] grid grid-cols-7 p-[16px] gap-x-10 gap-y-2 justify-around items-center">
                {
                    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item,index) => {
                        return (
                            <div key={index} className="font-bold text-base text-center">
                                {item}
                            </div>
                            
                        );
                    })
                }
                {
                    getNumberOfBoxes().startBlankBoxes.map((item,index) => {
                        return (
                            <div key = {item} className="h-[185px] w-[160px] bg-[#bbbbbb]">  
                            </div>
                        );
                    })
                }
                {
                    getNumberOfBoxes().dateBoxes.map((item,index) => {
                        return (
                            <div key = {item} className="dateBox h-[185px] w-[160px] bg-white text-black">
                                {item}
                                <div className="px-1 py-2 relative">
                                    <div className="flex flex-col gap-2 h-[145px] box-border overflow-y-auto overflow-x-hidden"> 
                                        
                                        <WorkoutCard key={index} workouts={workoutByDate[index]?.map((workout, _) => {
                                            return {
                                                id: workout.id,
                                                duration: workout.duration,
                                                activity: workout.activity
                                            }
                                        })} disabled={disabled} isLoading={isLoading} />
                                        
                                        
                                        <div className="addWorkoutButton" onClick={() => handleAddWorkout(item)}> 
                                        <Button
                                            variant="addWorkout"
                                            className="ml-2 w-[140px]"
                                        ><Plus width={15} /></Button>
                                    </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        );
                    })
                }
                {
                    getNumberOfBoxes().endBlankBoxes.map((item,index) => {
                        return (
                            <div key = {item} className="h-[185px] w-[160px] bg-[#bbbbbb]">
                                
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}