import { Prisma, PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { ResponseUtil } from "../core/ResponseUtil";

const prisma = new PrismaClient();


export const createStudentProfile = async (c: Context) => {
    try {
        // const { id } = c.req.param();
        const { id }: {
            id: number,
            userName: string,
            sub: number,
            role: "student" | "teacher",
            exp: number
        } = c.get('jwtPayload')

        const body = await c.req.json();

        // Validate student ID
        if (!id) {
            return c.json(
                ResponseUtil.validationError("Student ID is required", {
                    id: "Student ID is required"
                })
            );
        }

        // Check if student exists
        const student = await prisma.student.findUnique({
            where: {
                studentId: +id
            }
        });

        if (!student) {
            return c.json(
                ResponseUtil.notFound("Student not found", {
                    studentId: +id
                })
            );
        }

        // Check if profile already exists
        const existingStudentProfile = await prisma.studentProfile.findUnique({
            where: {
                studentId: +id
            }
        });

        if (existingStudentProfile) {
            return c.json(
                ResponseUtil.badRequest("Student profile already exists", {
                    profileId: existingStudentProfile.profileId
                })
            );
        }

        // Validate required fields
        if (!body.teacherId) {
            return c.json(
                ResponseUtil.validationError("Teacher ID is required", {
                    teacherId: "Teacher ID is required"
                })
            );
        }

        // Check if teacher exists
        const teacher = await prisma.teacher.findUnique({
            where: {
                teacherId: body.teacherId
            }
        });

        if (!teacher) {
            return c.json(
                ResponseUtil.notFound("Teacher not found", {
                    teacherId: body.teacherId
                })
            );
        }

        // Create profile with validated data
        const studentProfile = await prisma.studentProfile.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
                grade: body.grade,
                studentId: +id,
                teacherId: body.teacherId
            }
        });


        return c.json(
            ResponseUtil.success(
                studentProfile,
                "Student profile created successfully"
            )
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return c.json(
                    ResponseUtil.badRequest("Profile already exists for this student", {})
                );
            }
            if (error.code === 'P2003') {
                return c.json(
                    ResponseUtil.badRequest("Invalid student ID or teacher ID provided", {})
                );
            }
        }

        if (error instanceof Error) {
            return c.json(ResponseUtil.internalError(error.message));
        }

        return c.json(ResponseUtil.internalError());
    }
};

export const getLoggedInStudent = async (c: Context) => {
    try {
        const { id }: {
            id: number,
            userName: string,
            sub: number,
            role: "student" | "teacher",
            exp: number
        } = c.get('jwtPayload')


        const student = await prisma.student.findUnique({
            where: {
                studentId: id
            },
            include: {
                StudentProfile: true,
            },
        })

        if (!student) {
            return c.json(ResponseUtil.forbidden("Invalid token"))
        }

        const { password: _, ...rest } = student

        return c.json(ResponseUtil.success({ ...rest }, "Logged in student details"))


    } catch (error) {
        if (error instanceof Error) {
            return c.json(ResponseUtil.internalError(error.message));
        }
        return c.json(ResponseUtil.internalError());
    }
}