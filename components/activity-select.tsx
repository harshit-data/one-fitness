"use client"
import { Input } from "@/components/ui/input";
import { useGetActivites } from "@/features/workout/api/use-get-workouts";
import { useState } from "react"

// importing icons from lucide react

type Props = {
    value: any,
    onChange: any,
    disabled: boolean
}

export const ActivitySelect = ({ value, onChange, disabled }: Props) => {
    const [open, setOpen] = useState(false);
    const handelClick = () => {
        setOpen(!open);
    }
    const activitesQuery = useGetActivites();
    const activities = activitesQuery.data?.data || [];
    return (
        <div className="relative">
            <Input placeholder="Select an Activity type" value={value} onClick={handelClick} />
            {open && 
            <div className="absolute top-8 z-10 w-full h-[200px] overflow-auto rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"> 
                    {

                        activities.map((activity, index) => {
                            return (
                                <div onClick={() => {
                                    onChange(activity);
                                    setOpen(false)
                                }
                                } key={index} className="h-6 hover:bg-blue-300">
                                    {activity}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}