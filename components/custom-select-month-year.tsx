"use client"
import { useState } from "react"
import {toast} from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from "@/components/ui/select"
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "./ui/button";

const MONTH_ARRAY = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const getYearArray = () => {
    const YEARS_ARRAY = [];
    const currYear = new Date().getFullYear();
    for (let i = currYear; i >= 2010; i--){
        YEARS_ARRAY.push(i.toString());
    }
    return YEARS_ARRAY;
}
type Props = {
    value: Date,
    onChange: (date:Date)=>void,
    setSelectCustomMonthYear:(val:boolean)=>void
}
export const CustomSelect = ({value,onChange,setSelectCustomMonthYear}:Props) => {
    const [year, setYear] = useState(value.getFullYear());
    const [month, setMonth] = useState(value.getMonth());

    const handleMonthChange = (month: string) => {
        const newMonth = MONTH_ARRAY.indexOf(month);
        setMonth(newMonth)
    }
    const handleYearChange = (year: string) => {
        const currYear = new Date().getFullYear();
        const newYear = currYear - getYearArray().indexOf(year);
        setYear(newYear)
    }
    const handleMonthYearUpdation = () => {
        const date = new Date(year, month, 1);
        onChange(date);
        setSelectCustomMonthYear(false)
    }
    const handleDisabledSelect = () => {
        const currYear = new Date().getFullYear();
        const currMonth = new Date().getMonth();
        if (year === currYear && month > currMonth) {
            return true;
        }
        return false;
    }
    return (
        <div className="flex items-center gap-5">
            {/* this is for selecting the month */}
        < Select onValueChange={handleMonthChange} defaultValue={MONTH_ARRAY[month]}>
            <SelectTrigger className="w-[180px]">
                <SelectValue  />
            </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                <SelectLabel>Select Month</SelectLabel>
                {
                    MONTH_ARRAY.map((item, index)=>{
                    return (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                    )})
                        }
                    </SelectGroup>
            </SelectContent>
            </Select >

            {/* this is for the slection of year */}
            < Select onValueChange={handleYearChange} defaultValue={getYearArray()[new Date().getFullYear() - year]}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                <SelectLabel>Select Year</SelectLabel>
                {
                    getYearArray().map((item, index)=>{
                    return (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                    )})
                    }
            </SelectGroup>        
            </SelectContent>
            </Select >
            <Button
                variant="outline"
                onClick={handleMonthYearUpdation}
                disabled={handleDisabledSelect()}
            >
                ok
            </Button>
        </div>

    )
}