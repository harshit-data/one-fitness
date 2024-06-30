"use client"
import { useState } from "react"
import { useMedia } from "react-use"
import { usePathname, useRouter } from "next/navigation"

import { routes } from "@/routes/routes"

import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Accordion,AccordionContent,AccordionTrigger,AccordionItem} from "@radix-ui/react-accordion"
import { Divide, MenuIcon, Route } from "lucide-react"
import { NavButton } from "./nav-button"

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isMobileView = useMedia("(max-width:1024px)", false)
    const router = useRouter();
    const pathName = usePathname()
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false)
    };
    if (isMobileView) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="default"
                        size="sm"
                        className="font-normal bg-black hover:bg-black/90 border-none"
                    >
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full bg-black text-white">
                    <nav className="flex flex-col gap-y-2 pt-6">
                    <Accordion type="single" collapsible className="w-full">
                        {routes.map((route,index) => {
                            return (
                                    <AccordionItem value={`item-${index}`} key={route.href} className="w-full">
                                        <AccordionTrigger className="text-lg h-24 cursor-pointer rounded-2xl hover:bg-gray-900 w-full text-left px-4">{route.label}</AccordionTrigger>
                                        {
                                            route.children?<AccordionContent className="cursor-pointer">
                                                {
                                                    route.children.map((childRoute) => {
                                                        return (
                                                            <div
                                                                key={childRoute.href}
                                                                onClick={() => onClick(childRoute.href)}
                                                                className="px-7 py-3 h-12 bg-gray-500 hover:bg-gray-900 w-full"
                                                            >
                                                                {childRoute.label}
                                                           </div>

                                                        );
                                                    })
                                            }
                                        </AccordionContent>:null
                                        }
                                    </AccordionItem>
                                

                            );
                        })}
                        </Accordion>
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }
    return (
        <nav className="text-white flex items-start gap-12">
            {
                routes.map((route, index) => {
                    return (
                        <NavButton
                            key={index}
                            isActive={pathName === route.href}
                            route={route}
                        />
                    );
                })
            }
        </nav>
    );
}
