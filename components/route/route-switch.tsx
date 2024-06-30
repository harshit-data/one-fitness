import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Props = {
    label: string,
    id:string
}
export const CustomSwitch = ({label,id}:Props) => {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} />
    </div>
    );
}
