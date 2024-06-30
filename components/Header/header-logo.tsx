import Image from "next/image";

import logoImage from "@/public/ONE FITNESS_transparent.png"
import logoImage2 from "@/public/Home-Header-images/Logo maker project (1) (1).png"
export const HeaderLogo = () => {
    return (
        <div className="flex gap-2 bg-[#101213] h-24 items-center p-2 pr-24">
            {/* <Image width={300} height={140} src={logoImage2} alt="header-logo" unoptimized /> */}
        </div>
    );
}