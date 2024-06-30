/*
  Warnings:

  - You are about to drop the column `workoutType` on the `UserWorkoutStats` table. All the data in the column will be lost.
  - Added the required column `activity` to the `UserWorkoutStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `UserWorkoutStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutName` to the `UserWorkoutStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserWorkoutStats" DROP COLUMN "workoutType",
ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workoutName" TEXT NOT NULL;
