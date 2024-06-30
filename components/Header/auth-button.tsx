"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
type Props = {
    label: string
    href:string
}
export const AuthButton = ({ label,href }: Props) => {
    const router = useRouter();
    const handleClick = (href:string) => {
        router.push(href)
    }
    return (
        <Button
            variant="authButton"
            size="md"
            onClick={()=>handleClick(href)}
        >
            {label}
        </Button>
    );
}