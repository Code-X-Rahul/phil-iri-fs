/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `registeredDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `joinedDate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `teacherTeacherId` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_teacherTeacherId_fkey";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "teacherId",
ADD COLUMN     "teacherProfileProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "studentId",
ADD COLUMN     "studentProfileProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "registeredDate",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "joinedDate",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "teacherTeacherId",
ADD COLUMN     "teacherProfileProfileId" INTEGER;

-- CreateTable
CREATE TABLE "StudentProfile" (
    "profileId" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "address" TEXT,
    "grade" TEXT,
    "parentName" TEXT,
    "parentContact" TEXT,
    "studentId" INTEGER NOT NULL,
    "registeredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "TeacherProfile" (
    "profileId" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "address" TEXT,
    "qualification" TEXT,
    "specialization" TEXT,
    "experience" INTEGER,
    "teacherId" INTEGER NOT NULL,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherProfile_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_teacherId_key" ON "TeacherProfile"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userName_key" ON "Student"("userName");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_teacherProfileProfileId_fkey" FOREIGN KEY ("teacherProfileProfileId") REFERENCES "TeacherProfile"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherProfileProfileId_fkey" FOREIGN KEY ("teacherProfileProfileId") REFERENCES "TeacherProfile"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentProfileProfileId_fkey" FOREIGN KEY ("studentProfileProfileId") REFERENCES "StudentProfile"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;
