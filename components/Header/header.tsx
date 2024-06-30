import { HeaderLogo } from "./header-logo"
import { Navigation } from "./navigations";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
export const Header = () => {
    return (
        <div className="bg-black flex items-center justify-between pr-8">
            <HeaderLogo />
            <Navigation />
        </div>

    );
}