import { NewWorkoutPage } from "@/features/workout/components/new-workout-sheet";

const WorkoutCreatePage = ({ params }: { params: { date: string } }) => {
    
    const date = new Date(params.date);
    console.log(date)
    return (
        <div>
            <NewWorkoutPage date={date} />
        </div>
    );
}

export default WorkoutCreatePage;