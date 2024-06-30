"use client"
import headerImage1 from "@/public/Home-Header-images/header-image-1.jpg"
import headerImage2 from "@/public/Home-Header-images/header-image-2.jpg"
import headerImage3 from "@/public/Home-Header-images/header-image-3.jpg"
import headerImage4 from "@/public/Home-Header-images/header-image-4.jpg"
import Image from "next/image";
import { cn } from "@/lib/utils"
import {useEffect, useState} from "react"
const HEADER_IMAGES = [headerImage1, headerImage2, headerImage3, headerImage4];


export const HomepageHeader = () => {
    const [headerImage, setHeaderImage] = useState(0);    
    useEffect(() => {
        setTimeout(() => {
            setHeaderImage((headerImage+1)%4)
        }, 5000)
        
    },[headerImage])
    return (
        <div>
            <div className="relative h-[700px] overflow-hidden">
                <div className={cn(
                    "w-full flex transition-transform duration-1000 ease-in",
                )}
                style={{ transform: `translateX(-${headerImage * 100}%)` }}
                > 
                {
                        HEADER_IMAGES.map((img,index) => {
                            return (
                                <div key={index} className="min-w-full">
                                    <Image src={img} alt="workout-image" />
                                </div>
                            );
                    })
                }
                </div>
                
            </div>
            
        </div>
    );
}