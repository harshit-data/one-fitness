
"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton"
type Props = { 
    workouts: {
        id:string,
        duration: number,
        activity: string,
    }[],
    key: number,
    disabled: boolean,
    isLoading:boolean
}
export const WorkoutCard = ({ workouts,key,disabled,isLoading }: Props) => {
    const router = useRouter();
    if (isLoading) {
        return (
            <Skeleton className="w-[145px] h-[30px]"/>
        );
    }
    return (
        <>
        {
                workouts.map((workout,index) => {
                    return (
                        <div key={index}>
                            <Button onClick={() => {
                                console.log("hellllo")
                                router.push(`/workout/${workout.id}`)
                            }
                            } className="w-[140px] pl-[2px] pr-[4px] py-[2px] mx-2 border-[2px] border-transparent bg-[#f3f3f3] text-black font-semibold hover:text-white" disabled={disabled}>
                            <div className="text-wrap">{workout.duration} min {workout.activity.split(" ")[0]}</div>
                            </Button>
                        </div>
                );
            })
            }
        </>
    );
}