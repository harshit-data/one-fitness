
import * as React from "react"

import { format } from "date-fns"

import { Calendar as CalandarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type Props = {
    value?: Date,
    onChange?: SelectSingleEventHandler
    disabled: boolean
}

export const DatePicker = ({ value, onChange, disabled }: Props) => {
    return (
        <Popover >
            <PopoverTrigger asChild>
            <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-[305px] h-[40px] px-4 py-3 justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalandarIcon className="size-4 mr-2" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent> 
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        disabled={disabled}
                    initialFocus
                    />
                </PopoverContent>
        </Popover>
    );
}
