"use client"
import { z } from "zod"
import  {useRouter} from "next/navigation"
import { toast } from "sonner"
import { WorkoutForm } from "./workout-form"
import { workoutStatSchema } from "@/lib/schema"
import { useCreateWorkout } from "../api/use-add-workout"
const formSchema = workoutStatSchema.omit({
  id: true
})
type FormValues = z.input<typeof formSchema >


export function NewWorkoutPage({ date }: { date: Date }) {

  const router = useRouter();
  const workoutMutation = useCreateWorkout();
  const onSubmit = (values:FormValues) => {
    workoutMutation.mutate(values, {
      onSuccess: (data,variables) => {
        toast.success("Workout added successfully")
        router.push(`/workout/${data.id}`)
      }
    })

  }
  return (
    <div>
      <div className="text-center text-3xl font-semibold mt-6">Add Workout</div>
      <p className="text-center">Fill the necessary details to add a workout</p>
    <div className="flex items-center justify-center py-12" >

        <WorkoutForm onSubmit={onSubmit} disabled={workoutMutation.isPending} defaultValues={{
            workoutName:"",
            activity: "",
            userWeight:0,
            startTime: {
                hour: 12,
                min: 0,
                period:"AM"
            },
            date: date,
            notes: "",
            duration: 0,
            caloriesBurned: 0
      }} />
      </div>
    </div>
  )
}