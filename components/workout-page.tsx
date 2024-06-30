"use client"
import { useGetWorkout } from "@/features/workout/api/use-get-workout";
import loadingImg from "@/public/Loading-image.gif"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {format} from "date-fns"
export const WorkoutPage = ({ id }: { id:string }) => {
    const {user} = useUser()
    const workoutQuery = useGetWorkout(id);
    const workoutData = workoutQuery.data;

    const loading = workoutQuery.isLoading;
    if (loading) {
        return (
            <div className="ml-4">
                <p className="text-lg font-semibold">Loading...</p>
                <Image className="" height={100} width={100} src={loadingImg} alt="loading-image" />
            </div>
        );
    }
    if (!workoutData) {
        return (
            <div>
                workout Not found
            </div>
        )
    }
    return (
        <div className="flex items-center justify-between p-12 border-[1px] border-[#dee1e7]">
            <div className="left-side flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">{workoutData?.workoutName}</h1>
                <p className="text-base">{workoutData?.notes}</p>
                <div className="workout-details flex items-center gap-16">
                    <div>
                    <p className="font-semibold text-3xl">{workoutData?.duration}</p>
                        <p className="text-base text-[#6d717a]">Duration(min)</p>
                    </div>
                    <div>
                    <p className="font-semibold text-3xl">{workoutData?.caloriesBurned}</p>
                        <p className="text-base text-[#6d717a]">Calories(kcal)</p>
                    </div>
                </div>
            </div>
            <div className="right-side flex flex-col gap-2 border-l-2 border-[#dee1e7] h-full p-5">
                <div></div>
                <div>
                    <div className="text-[#0076c0] text-lg">{user?.firstName} {user?.lastName}</div>
                </div>
                <div>
                    <div className="text-[#6d717a] text-base">{format(new Date(workoutData?.startTime),"PPpp")}</div>
                </div>
                <div>
                    <div className="text-base text-[#6d717a]">{workoutData?.activity}</div>
                </div>

            </div>
        </div>
    );
}