import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { comparePassword, encryptPassword } from "../utils/helpers";
import CustomError from "../response/CustomError";
import { customResponse } from "../response/customResponse";

const prisma = new PrismaClient();

export const register = async (c: Context) => {
  try {
    const { name, password } = await c.req.json<{
      name: string;
      password: string;
    }>();

    if (!name) {
      throw new CustomError("Name Not Provided", 400);
    }
    if (!password) {
      throw new CustomError("Password Not Provided", 400);
    }

    const hashedPassword = await encryptPassword(password);
    const createdStudent = await prisma.student.create({
      data: { name, password: hashedPassword },
    });

    const token = await sign(
      {
        id: createdStudent.studentId,
        name: createdStudent.name,
        email: createdStudent.email,
        sub: createdStudent.studentId,
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
      },
      env(c, "node").JWT_SECRET
    );

    const refreshToken = await sign(
      {
        id: createdStudent.studentId,
        name: createdStudent.name,
        sub: createdStudent.studentId,
        role: "student",
        exp: Math.floor(Date.now() / 1000) + 2592000, // Token expires in 30 days
      },
      env(c, "node").JWT_SECRET
    );
    const { password: studentPassword, ...rest } = createdStudent;
    return customResponse(c, {
      data: {
        ...rest,
        token,
        refreshToken,
      },
      message: "Student registered successfully",
      status: true,
    });
  } catch (error) {
    throw new HTTPException(500, {
      res: customResponse(c, {
        data: null,
        error: error,
        message: "Internal server error",
        status: false,
      }),
    });
  }
};

export const login = async (c: Context) => {
  try {
    const { studentId, name, password } = await c.req.json<{
      studentId: number;
      name: string;
      password: string;
    }>();

    if (!studentId) {
      throw new CustomError("Id Not Provided", 400);
    }

    if (!name) {
      throw new CustomError("Name Not Provided", 400);
    }
    if (!password) {
      throw new CustomError("Password Not Provided", 400);
    }

    const student = await prisma.student.findUnique({
      where: {
        studentId,
        name,
      },
    });

    if (!student) {
      throw new CustomError("Student not found!", 404);
    }

    const isMatch = await comparePassword(password, student.password);

    if (!isMatch) {
      throw new CustomError("Incorrect password!", 402);
    }

    const token = await sign(
      {
        id: student.studentId,
        name: student.name,
        email: student.email,
        sub: student.studentId,
        role: "student",
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
      },
      env(c, "node").JWT_SECRET
    );
    const refreshToken = await sign(
      {
        id: student.studentId,
        name: student.name,
        sub: student.studentId,
        role: "student",
        exp: Math.floor(Date.now() / 1000) + 2592000, // Token expires in 30 days
      },
      env(c, "node").JWT_SECRET
    );

    const { password: studentPassword, ...rest } = student;

    return customResponse(c, {
      data: {
        ...rest,
        token,
        refreshToken,
      },
      message: "Student logged in successfully",
      status: true,
    });
  } catch (error) {
    throw new HTTPException(500, {
      res: customResponse(c, {
        data: null,
        error: error,
        message: "Internal server error",
        status: false,
      }),
    });
  }
};

export const teacherRegister = async (c: Context) => {
  try {
    const { email, name, password } = await c.req.json<{
      email: string;
      name: string;
      password: string;
    }>();


    if (!email) {
      throw new CustomError("Email Not Provided", 400);
    }

    if (!name) {
      throw new CustomError("Name not provided!", 400);
    }
    if (!password) {
      throw new CustomError("Password not provided!", 400);
    }

    const hashedPassword = await encryptPassword(password);
    const teacher = await prisma.teacher.create({
      data: { name, password: hashedPassword, email },
    });

    if (!teacher) throw new CustomError("Failed to register!", 500);

    const token = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
        email: teacher.email,
        sub: teacher.teacherId,
        role: "teacher",
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
      },
      env(c, "node").JWT_SECRET
    );

    const refreshToken = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
        sub: teacher.teacherId,
        role: "teacher",
        exp: Math.floor(Date.now() / 1000) + 2592000, // Token expires in 30 days
      },
      env(c, "node").JWT_SECRET
    );

    const { password: teacherPassword, ...rest } = teacher;

    return customResponse(c, {
      data: {
        ...rest,
        token,
        refreshToken,
      },
      message: "Teacher registered successfully",
      status: true,
    });
  } catch (error) {
    throw new CustomError("Failed to register!", 500);
  }
};

export const teacherLogin = async (c: Context) => {
  try {
    const { teacherId, name, password } = await c.req.json<{
      teacherId: number;
      name: string;
      password: string;
    }>();

    if (!teacherId) {
      throw new CustomError("Id not provided!", 400);
    }

    if (!name) {
      throw new CustomError("Name not provided!", 400);
    }
    if (!password) {
      throw new CustomError("Password not provided!", 400);
    }

    const teacher = await prisma.teacher.findUnique({
      where: {
        teacherId,
        name,
      },
    });

    if (!teacher) {
      throw new CustomError("Teacher not found!", 400);
    }

    const isMatch = await comparePassword(password, teacher.password);

    if (!isMatch) {
      throw new CustomError("Incorrect password!", 400);
    }

    const token = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
        email: teacher.email,
        sub: teacher.teacherId,
        role: "teacher",
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
      },
      env(c, "node").JWT_SECRET
    );
    const refreshToken = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
        sub: teacher.teacherId,
        role: "teacher",
        exp: Math.floor(Date.now() / 1000) + 2592000, // Token expires in 30 days
      },
      env(c, "node").JWT_SECRET
    );

    const { password: teacherPassword, ...rest } = teacher;

    return customResponse(c, {
      data: {
        ...rest,
        token,
        refreshToken,
      },
      message: "Teacher logged in successfully",
      status: true,
    });
  } catch (error) {
    throw new CustomError("Internal server error", 500)
  }
};
