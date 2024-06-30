
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const StatsPage = () => {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">week</SelectItem>
                        <SelectItem value="banana">5 weeks</SelectItem>
                        <SelectItem value="blueberry">52 weeks</SelectItem>
                        <SelectItem value="grapes">Calender Year</SelectItem>
                        <SelectItem value="pineapple">All Time</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}