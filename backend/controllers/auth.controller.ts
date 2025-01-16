import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { ResponseUtil } from "../core/ResponseUtil";
import { comparePassword, encryptPassword, generateTokens } from "../utils/helpers";


const prisma = new PrismaClient();


// Student Authentication
export const register = async (c: Context) => {
  try {
    const { name, password } = await c.req.json<{
      name: string;
      password: string;
    }>();

    // Validation
    if (!name || !password) {
      return c.json(
        ResponseUtil.validationError("Name and password are required", {
          name: !name ? "Name is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const hashedPassword = await encryptPassword(password);
    const createdStudent = await prisma.student.create({
      data: { name, password: hashedPassword },
    });

    const tokens = await generateTokens(
      {
        id: createdStudent.studentId,
        name: createdStudent.name,
        sub: createdStudent.studentId,
        role: "student",
      },
      env(c, "node").JWT_SECRET
    );

    const { password: _, ...studentData } = createdStudent;

    return c.json(
      ResponseUtil.success(
        {
          ...studentData,
          ...tokens,
        },
        "Student registered successfully"
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(ResponseUtil.internalError(error.message));
    }
    return c.json(ResponseUtil.internalError());
  }
};

export const login = async (c: Context) => {
  try {
    const { studentId, name, password } = await c.req.json<{
      studentId: number;
      name: string;
      password: string;
    }>();

    // Validation
    if (!studentId || !name || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          studentId: !studentId ? "Student ID is required" : null,
          name: !name ? "Name is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const student = await prisma.student.findUnique({
      where: { studentId, name },
    });

    if (!student) {
      return c.json(ResponseUtil.notFound("Student not found"));
    }

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) {
      return c.json(ResponseUtil.unauthorized("Incorrect password"));
    }

    const tokens = await generateTokens(
      {
        id: student.studentId,
        name: student.name,
        sub: student.studentId,
        role: "student",
      },
      env(c, "node").JWT_SECRET
    );

    const { password: _, ...studentData } = student;

    return c.json(
      ResponseUtil.success(
        {
          ...studentData,
          ...tokens,
        },
        "Student logged in successfully"
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(ResponseUtil.internalError(error.message));
    }
    return c.json(ResponseUtil.internalError());
  }
};

// Teacher Authentication
export const teacherRegister = async (c: Context) => {
  try {
    const { email, name, password } = await c.req.json<{
      email: string;
      name: string;
      password: string;
    }>();

    // Validation
    if (!email || !name || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          email: !email ? "Email is required" : null,
          name: !name ? "Name is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const hashedPassword = await encryptPassword(password);
    const teacher = await prisma.teacher.create({
      data: { name, password: hashedPassword, email },
    });

    const tokens = await generateTokens(
      {
        id: teacher.teacherId,
        name: teacher.name,
        sub: teacher.teacherId,
        role: "teacher",
      },
      env(c, "node").JWT_SECRET
    );

    const { password: _, ...teacherData } = teacher;

    return c.json(
      ResponseUtil.success(
        {
          ...teacherData,
          ...tokens,
        },
        "Teacher registered successfully"
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(ResponseUtil.internalError(error.message));
    }
    return c.json(ResponseUtil.internalError());
  }
};

export const teacherLogin = async (c: Context) => {
  try {
    const { teacherId, name, password } = await c.req.json<{
      teacherId: number;
      name: string;
      password: string;
    }>();

    // Validation
    if (!teacherId || !name || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          teacherId: !teacherId ? "Teacher ID is required" : null,
          name: !name ? "Name is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: { teacherId, name },
    });

    if (!teacher) {
      return c.json(ResponseUtil.notFound("Teacher not found"));
    }

    const isMatch = await comparePassword(password, teacher.password);
    if (!isMatch) {
      return c.json(ResponseUtil.unauthorized("Incorrect password"));
    }

    const tokens = await generateTokens(
      {
        id: teacher.teacherId,
        name: teacher.name,
        sub: teacher.teacherId,
        role: "teacher",
      },
      env(c, "node").JWT_SECRET
    );

    const { password: _, ...teacherData } = teacher;

    return c.json(
      ResponseUtil.success(
        {
          ...teacherData,
          ...tokens,
        },
        "Teacher logged in successfully"
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(ResponseUtil.internalError(error.message));
    }
    return c.json(ResponseUtil.internalError());
  }
};