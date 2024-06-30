"use Client"
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, CalendarDays, List,Plus} from "lucide-react";
import { CustomSelect } from "./custom-select-month-year";
import { CalenderView } from "./calender-view";
import { cn } from "@/lib/utils";
import { ListView } from "@/components/list-view";
import { Button } from "@/components/ui/button";
import { UserWorkoutSummary } from "./user-workout-summary";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export const DashboardMonthlyView = () => {
    const router = useRouter(); 
    const [selectCustomMonthYear, setSelectCustomMonthYear] = useState(false);
    const [currDate, setCurrdate] = useState(new Date());

    const [calenderView, setCalenderView] = useState(true)
    const getMonthYearFromDate = () => {
        const currMonth = currDate.toLocaleString('en-us', { month: "long" });
        const currYear = currDate.getFullYear();
        return {
            month: currMonth,
            year: currYear
        }
    }
    const handleMonthChange = (change: number) => {
        const currYear = currDate.getFullYear();
        const currMonth = currDate.getMonth();
        setCurrdate(new Date(currYear, currMonth + change))
    }

    const handleViewChange = () => {
        setCalenderView(!calenderView);
    }
    return (
        <div className="px-3 py-5 border-black border-[1px] m-9">
            <div className=" p-4 flex flex-col gap-9">
                <div className="flex items-center justify-between">
                {
                    !selectCustomMonthYear ?
                        <div className="flex gap-3 items-center">
                            <span className="cursor-pointer" onClick={() => handleMonthChange(-1)}><ChevronLeft /></span>
                            <span className="cursor-pointer" onClick={() => setSelectCustomMonthYear(true)}>{getMonthYearFromDate().month} {getMonthYearFromDate().year}</span>
                            <span className="cursor-pointer" onClick={() => handleMonthChange(1)}><ChevronRight /></span>
                        </div>
                        :
                        <CustomSelect
                            value={currDate}
                            onChange={setCurrdate}
                            setSelectCustomMonthYear={setSelectCustomMonthYear}
                        />
                    }
                    <div>
                        <Button variant="addWorkout" className="bg-[#e3e3e5]" onClick={() => router.push(`/workout/create/${currDate}`)}>
                            <div className="flex item-center gap-2">
                                <Plus width={20} />
                                <div className="text-sm">Add Workout</div>
                            </div>
                            
                            
                        </Button>
      </div>
                </div>
                
                <div className="flex flex-col gap-2 px-2">
                    <div className= "font-bold text-[#dc0019] text-lg "
                        >
                        view
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className={cn(
                        "border-[1px] border-[#9b9b9b] px-1 py-2 cursor-pointer",
                        calenderView && "border-black border-2"
                        )}
                        onClick={handleViewChange}
                        >
                            <CalendarDays width={30}/>
                        </div>
                        <div className={cn(
                        "border-[1px] border-[#9b9b9b] px-1 py-2 cursor-pointer",
                        !calenderView && "border-black border-2"
                        )}
                            onClick={handleViewChange}
                        >
                        <List width={30}/>
                        </div>
                        
                    </div>
                    
                </div>
                <UserWorkoutSummary date={currDate}/>
            </div>
            {
                calenderView ?
                    <CalenderView
                        value={currDate}
                    />
                    :
                    <ListView date={currDate}/>
            }
        </div>
    );
}