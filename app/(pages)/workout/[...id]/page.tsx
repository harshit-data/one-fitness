import { WorkoutPage } from "@/components/workout-page";

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div className="my-5">
            <WorkoutPage id={params.id} />
        </div>
    );
}

export default page;