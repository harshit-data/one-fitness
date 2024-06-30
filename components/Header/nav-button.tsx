"use client"
import { useRouter } from "next/navigation"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import { cn } from "@/lib/utils"

type props = {
    key: number,
    isActive?: boolean,
    route: {
        href: string,
        label: string,
        children?: Array<{
            href: string,
            label: string
        }> | undefined
    }
}

export const NavButton = ({ isActive, route }: props) => {
    const router = useRouter();
    const onClick = (href:string) => {
        router.push(href)
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {route.children ? (<NavigationMenuItem>
                        <NavigationMenuTrigger onClick={()=>{onClick(route.href)}} className="bg-transparent text-white text-base">{route.label}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-black text-white">
                        <ul className=" gap-3 p-4 w-44">
                            {
                                route.children.map((childRoute, index) => {
                                    return (
                                        <li key={index} className="w-full">
                                            <NavigationMenuLink asChild>
                                                    <div onClick={()=>{onClick(childRoute.href)}} className=
                                                        "select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    >{childRoute.label}</div>
                                            </NavigationMenuLink>
                                        </li>
                                    );

                                })
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                ) : (
                    <NavigationMenuItem>
                                <NavigationMenuLink onClick={()=>{onClick(route.href)}}  className={cn(navigationMenuTriggerStyle(),
                                "bg-black text-white text-base cursor-pointer w-22"
                                )}>
                                {route.label}
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                )
                }

            </NavigationMenuList>
        </NavigationMenu>

    );
}

