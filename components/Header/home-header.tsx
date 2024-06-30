"use client"
import { useUser } from "@clerk/nextjs";
import { ClerkLoaded,ClerkLoading,UserButton} from "@clerk/nextjs";

import { HeaderLogo } from "@/components/Header/header-logo"
import { Navigation } from "@/components/Header/navigations";
import { AuthButton } from "@/components/Header/auth-button";

import { Loader2 } from "lucide-react";
export const HomeHeader = () => {
    const { isSignedIn } = useUser();
  return (
        <div className="bg-[#101213] flex items-center justify-between pr-8 fixed top-0 w-full z-10">
            <HeaderLogo />
            <Navigation />
            {
                isSignedIn ?
                <div className='w-8'>
                <ClerkLoaded>
                  <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
                <ClerkLoading>
                  <Loader2 className='size-8 animate-spin text-white' />
                </ClerkLoading>
              </div>
                :
                <div className="flex gap-7">
                    <AuthButton label="LOG IN" href="/sign-in" />
                    <AuthButton label="SIGN UP" href="/sign-up" />
                </div>
            }
        </div>
    );
}