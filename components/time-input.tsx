"use client"
import { useState } from "react";
import { Clock,X,ChevronDown,ChevronUp} from "lucide-react";


type Props = {
    value: {
        hour: number,
        min: number,
        period:string
    },
    onChange: (...event: any[]) => void,
    disabled:boolean
}
export const TimeInput = ({value,onChange,disabled}:Props) => {
    const [open,setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open);
    }
    // this funtionality is used to increase the number of hours min or change period with up arrow 
    const handleTimeUp = (index:number) => {
        if (index === 0) {
            const newTime = value.hour === 11?{ ...value, hour: (value.hour) % 12 + 1,period:value.period === "AM"?"PM":"AM"}:{ ...value, hour: (value.hour) % 12 + 1 };
            onChange(newTime)
        }
        else if (index === 1) {
            const newTime = value.min === 59 && value.hour === 11?{ ...value, min:0,hour:12,period:value.period === "AM"?"PM":"AM"}:value.min === 59?{ ...value, min:1,hour:value.hour+1}:{ ...value, min: value.min + 1 };
            onChange(newTime)
        }
        else {
            const newTime = { ...value, period: value.period === "AM" ? "PM" : "AM" };
            onChange(newTime)
        }
    }
    // this funtionality is used to decrease the number of hours min or change period with down arrow 
    const handleTimeDown = (index:number) => {
        if (index === 0) {
            const newTime = value.hour === 12 ? { ...value, hour: 11, period: value.period === "AM" ? "PM" : "AM" } : value.hour === 1 ?{...value,hour:12}:{ ...value, hour:value.hour-1};
            onChange(newTime)
        }
        else if (index === 1) {
            const newTime = value.min === 0 && value.hour === 1 ? { ...value, min: 59, hour: 12 }:value.min === 0 && value.hour === 12?{...value,min:59,hour:11,period:value.period === "AM"?"PM":"AM"}:value.min === 0?{ ...value, min:59,hour:value.hour-1}:{ ...value, min: value.min - 1 };
            onChange(newTime)
        }
        else {
            const newTime = { ...value, period: value.period === "AM" ? "PM" : "AM" };
            onChange(newTime)
        }
    }
    return (
        <div  className="relative w-[305px] flex items-center justify-between h-[40px] pl-2 py-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <div className="">{value.hour}:{value.min < 10 ? "0" + `${value.min}`:`${value.min}`} {value.period}
            </div>
            
            <div onClick={handleClick}  className="bg-gray-100 h-[40px] px-2 py-2 rounded-md bg-transparent hover:bg-gray-300">
            {
                        open?<X />:<Clock />
                } 
            </div>
            {
                open && 
                <div className="absolute top-9 right-3 bg-black text-white w-44 h-28 flex flex-col justify-center gap-4">
                        <div className="flex justify-between">
                            {
                                [1, 2, 3].map((_, index) => {
                                    return (
                                    <ChevronUp key={index} onClick={()=>handleTimeUp(index)}  className = "hover:bg-gray-700 w-8"/>
                                )})
                            }
                        
                    </div>
                        <div className="flex justify-between pl-2">
                            <div className="w-7">{value.hour}</div>
                            <div className="w-7">:</div>
                            <div className="w-7">{value.min < 10 ? "0" + `${value.min}`:`${value.min}`}</div>
                            <div className="w-7"></div>
                            <div className="w-7">{value.period}</div>
                        </div>
                        <div className="flex justify-between">
                        {
                                [1, 2, 3].map((_, index) => {
                                    return (
                                        <ChevronDown key={index} className="hover:bg-gray-700 w-8" onClick={()=> handleTimeDown(index)} />
                                )})
                            }
                    </div>
                </div>
            }
        </div>
    );
}