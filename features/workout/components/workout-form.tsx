"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription } from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useState,useCallback } from "react"
import { workoutStatSchema } from "@/lib/schema";
import axios from "axios"
import { Button } from "@/components/ui/button"
import { TimeInput } from "@/components/time-input";
import { DatePicker } from "@/components/date-picker"
import { ActivitySelect } from "@/components/activity-select"
const formSchema = workoutStatSchema.omit({ id: true })
type FormValues = z.input<typeof formSchema>
type Props = {
    onSubmit: (values: FormValues) => void,
    disabled: boolean,
    defaultValues:FormValues
}
export const WorkoutForm = ({ onSubmit, disabled, defaultValues }: Props) => {
    console.log(defaultValues)
    const [dissableCalculate,setDissableCalculate] = useState(false);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })
    const handleSubmit = (values: FormValues) => {
        console.log(values);
        onSubmit(values)
    }
    // Watch for changes in the relevant form values
    const activity = form.watch('activity');
    const duration = form.watch('duration');
    const userWeight = form.watch('userWeight');

    // Use useEffect to trigger the fetch when the button is clicked
    
    const fetchData = useCallback(async () => {
        const url = "https://api.api-ninjas.com/v1/caloriesburned/";
        const xApi = "HWrN2VWGFHg12mb2arnKuA==IJlHCYaV6lwybonU";
        console.log(xApi);
        try {
          const response = await axios.get(url, {
            headers: {
              "X-Api-Key": xApi
            },
            params: {
              activity,
              duration,
              weight: userWeight
            }
          });
          const res = await response.data;
            setCaloriesBurned(res[0]["total_calories"]);
        } catch (e) {
          console.log("error ", e);
        }
        
      }, [activity, duration, userWeight]); // Dependencies for useCallback
           
// Button click handler just sets the trigger
    const handleCaloriesBurnedCalculation = async () => {
        setDissableCalculate(true);
    await fetchData();
        form.setValue('caloriesBurned', caloriesBurned);
        setDissableCalculate(false);
};
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="border-[1px] border-[#dee1e7] mx-[130px] p-[20px] w-[700px] space-y-4">
            <FormField
                control={form.control}
                name="workoutName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Workout name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="userWeight"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Body Weight</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Activity</FormLabel>
                        <FormControl>
                            <ActivitySelect
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                
                    </FormItem>
                )}
                />
                <div className="flex items-center gap-12">
            <FormField
                control={form.control}
                name="date"  
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                            <DatePicker value={field.value}
                                onChange={field.onChange}
                                disabled={disabled} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <FormControl>
                            <TimeInput value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                
                    </FormItem>
                )}
            />
            </div>
            
            <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                            <Input disabled={disabled} placeholder="Duration in minutes" {...field} type="number" />    
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="caloriesBurned"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Calories Burned(Kcal)</FormLabel>
                        <FormControl>
                            <div className="flex gap-3">
                            
                                <Input type="number" disabled={disabled || dissableCalculate} {...field}
                             />
                                <Button className="w-[100px] px-4 py-2" disabled={dissableCalculate} type="button" onClick={() => {
                                    handleCaloriesBurnedCalculation()
                                }}>
                            calculate
                                </Button>
                            </div>
                        </FormControl>
                    </FormItem>
                    
                )}
                />
                 <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                        <Textarea value={field.value} onChange={field.onChange} placeholder="Type your message here." disabled={disabled} />
                        </FormControl>
                    </FormItem>
                    
                )}
                />
                <Button
                    type="submit"
                    className="w-[100px] px-4 py-2"
                >
                    Save
                </Button>
                </form>
        </Form>
    );
}
