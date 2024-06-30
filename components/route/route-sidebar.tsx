"use client"
import { useRef, useState } from "react";
import Image from "next/image";
import { Bike, Car } from "lucide-react";
import walking from "@/public/route-create-images/man-walking-svgrepo-com (1).svg"
import { CircleEllipsis, CircleHelp, X, LocateFixed ,ChevronLeft,ChevronRight} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { CustomSwitch } from "./route-switch";
import { Button } from "../ui/button";

type Props = {
    sidebarOpen: boolean,
    setSidebarOpen:(val:boolean)=>void
}

export const CreateRouteSideBar = ({sidebarOpen,setSidebarOpen}:Props) => {
    const [searchInputActive, setSearchInputActive] = useState(false)
    
    const searchLocationRef = useRef<HTMLInputElement | null>(null);
    const handleClearSearchInput = () => {
        if (searchLocationRef.current) {
            searchLocationRef.current.value = "";
        }
    }
    return (
        <>
        <div className={cn("flex transition-transform w-[400px] z-10",
            sidebarOpen && " -translate-x-[400px]"
        )}>
        <div className="min-h-[540px] w-[400px] border-[1px] border-black flex flex-col gap-6 px-3 py-2">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Route Name</h1>
                <div><CircleEllipsis /></div>
            </div>

            <div className="flex gap-2">
                <p>Help</p>
                <CircleHelp width={14} />
            </div>
            <div className="h-[2px] bg-gray-300"></div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline"><h1 className="font-semibold text-xl">Controls</h1></AccordionTrigger>
                    <AccordionContent className="h-[300px] overflow-y-scroll overflow-x-hidden">
                        <div onMouseLeave={() => setSearchInputActive(false)} onMouseEnter={() => setSearchInputActive(true)} className="py-3 relative">
                            <Input onFocus={() => setSearchInputActive(true)} className={cn(
                                searchInputActive && "border-black"
                            )} ref={searchLocationRef} placeholder="search locaton" />
                            <X onClick={handleClearSearchInput} height={28} width={30} className={cn("absolute right-12 top-5 text-gray-600 hover:text-black hidden cursor-pointer",
                                searchInputActive && "block"
                            )} />
                            <LocateFixed height={28} width={30} className="absolute right-4 text-gray-600 hover:text-black top-5 cursor-pointer" />
                        </div>
                        <div className="flex flex-col gap-7">
                            <h2 className="text-red-600 font-bold text-sm">PREFERENCES</h2>
                            <div>
                                <ToggleGroup type="single">
                                    <ToggleGroupItem value="walk" className="border-[1px] border-black">
                                        <div className="w-[150px] lg:w-[100px] flex items-center justify-center py-2 "><Image width={20} src={walking} alt="walk" /></div>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="bike" className="border-[1px] border-black">
                                        <div className="w-[150px] lg:w-[100px] flex items-center justify-center py-2"><Bike width={20} className="text-black"/></div>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="car" className="border-[1px] border-black">
                                        <div className="w-[150px] lg:w-[100px] flex items-center justify-center py-2"><Car width={20} className="text-black"/></div>
                                    </ToggleGroupItem>
                                </ToggleGroup>

                            </div>
                            <div>
                                <CustomSwitch label={"Avoid Highways"} id={"avoid-highways"} />
                            </div>

                        </div>
                        <div className="flex flex-col gap-4 my-4">
                            <h2 className="text-red-600 font-bold text-sm">DISPLAY</h2>

                            <CustomSwitch label={"Show Distance Markers"} id={"show-distance-markers"} />
                            <CustomSwitch label={"Show ELevation"} id={"show-elevation"} />
                            <CustomSwitch label={"Show Traffic"} id={"show-traffic"} />
                            <CustomSwitch label={"Show Bike Paths"} id={"show-bike-paths"} />
                            <Select defaultValue="imperial-units">
                                <SelectTrigger className="w-full border-none px-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="imperial-units">Imperial Units</SelectItem>
                                        <SelectItem value="metric-units">Metric Units</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:no-underline"><h1 className="font-semibold text-xl">Directions</h1></AccordionTrigger>
                    <AccordionContent>
                       
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            </div>
            
            </div>
            <div className={cn("absolute top-[100px] left-[400px] w-[30px] transition-transform",
                sidebarOpen && " -translate-x-[400px]"
            )}>
                <Button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-white text-black px-2 py-1 border-[1px] border-black rounded-none border-l-0"
                >
                    {
                        sidebarOpen ? <ChevronRight /> : <ChevronLeft />
                    }
                </Button>
            </div>
            </>
    );
}