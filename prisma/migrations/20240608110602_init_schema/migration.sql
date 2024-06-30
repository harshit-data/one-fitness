-- CreateTable
CREATE TABLE "UserWorkoutStats" (
    "id" TEXT NOT NULL,
    "workoutType" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "caloriesBurned" INTEGER NOT NULL DEFAULT 0,
    "startTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "UserWorkoutStats_pkey" PRIMARY KEY ("id")
);
