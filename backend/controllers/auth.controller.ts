import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { sign } from "hono/jwt";
import { comparePassword, encryptPassword } from "../utils/helpers";
import { CustomError } from "../core/CustomError";
import { CustomResponse } from "../core/CustomResponse";


const prisma = new PrismaClient();

export const register = async (c: Context) => {
  try {
    const { name, password } = await c.req.json<{
      name: string;
      password: string;
    }>();

    if (!name) throw CustomError.badRequest("Name Not Provided");
    if (!password) throw CustomError.badRequest("Password Not Provided");

    const hashedPassword = await encryptPassword(password);
    const createdStudent = await prisma.student.create({
      data: { name, password: hashedPassword },
    });

    const token = await sign(
      {
        id: createdStudent.studentId,
        name: createdStudent.name,
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

    const { password: _, ...rest } = createdStudent;

    return c.json(
      CustomResponse.success("Student registered successfully", {
        ...rest,
        token,
        refreshToken,
      })
    );
  } catch (error) {
    throw CustomError.fromPrismaError(error);
  }
};

export const login = async (c: Context) => {
  try {
    const { studentId, name, password } = await c.req.json<{
      studentId: number;
      name: string;
      password: string;
    }>();

    if (!studentId) throw CustomError.badRequest("Id Not Provided");
    if (!name) throw CustomError.badRequest("Name Not Provided");
    if (!password) throw CustomError.badRequest("Password Not Provided");

    const student = await prisma.student.findUnique({
      where: { studentId, name },
    });

    if (!student) throw CustomError.notFound("Student not found!");

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) throw CustomError.unauthorized("Incorrect password!");

    const token = await sign(
      {
        id: student.studentId,
        name: student.name,
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

    const { password: _, ...rest } = student;

    return c.json(
      CustomResponse.success("Student logged in successfully", {
        ...rest,
        token,
        refreshToken,
      })
    );
  } catch (error) {
    throw CustomError.fromPrismaError(error);
  }
};

export const teacherRegister = async (c: Context) => {
  try {
    const { email, name, password } = await c.req.json<{
      email: string;
      name: string;
      password: string;
    }>();

    if (!email) throw CustomError.badRequest("Email Not Provided");
    if (!name) throw CustomError.badRequest("Name Not Provided");
    if (!password) throw CustomError.badRequest("Password Not Provided");

    const hashedPassword = await encryptPassword(password);
    const teacher = await prisma.teacher.create({
      data: { name, password: hashedPassword, email },
    });

    const token = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
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

    const { password: _, ...rest } = teacher;

    return c.json(
      CustomResponse.success("Teacher registered successfully", {
        ...rest,
        token,
        refreshToken,
      })
    );
  } catch (error) {
    throw CustomError.fromPrismaError(error);
  }
};

export const teacherLogin = async (c: Context) => {
  try {
    const { teacherId, name, password } = await c.req.json<{
      teacherId: number;
      name: string;
      password: string;
    }>();

    if (!teacherId) throw CustomError.badRequest("Id Not Provided");
    if (!name) throw CustomError.badRequest("Name Not Provided");
    if (!password) throw CustomError.badRequest("Password Not Provided");

    const teacher = await prisma.teacher.findUnique({
      where: { teacherId, name },
    });

    if (!teacher) throw CustomError.notFound("Teacher not found!");

    const isMatch = await comparePassword(password, teacher.password);
    if (!isMatch) throw CustomError.unauthorized("Incorrect password!");

    const token = await sign(
      {
        id: teacher.teacherId,
        name: teacher.name,
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

    const { password: _, ...rest } = teacher;

    return c.json(
      CustomResponse.success("Teacher logged in successfully", {
        ...rest,
        token,
        refreshToken,
      })
    );
  } catch (error) {
    throw CustomError.fromPrismaError(error);
  }
};
