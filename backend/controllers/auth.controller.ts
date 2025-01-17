import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { ResponseUtil } from "../core/ResponseUtil";
import { comparePassword, encryptPassword, generateTokens } from "../utils/helpers";


const prisma = new PrismaClient();


// Student Authentication
export const register = async (c: Context) => {
  try {
    const { userName, password } = await c.req.json<{
      userName: string;
      password: string;
    }>();

    // Validation
    if (!userName || !password) {
      return c.json(
        ResponseUtil.validationError("Name and password are required", {
          name: !userName ? "userName is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const hashedPassword = await encryptPassword(password);
    const createdStudent = await prisma.student.create({
      data: { userName, password: hashedPassword },
    });

    const tokens = await generateTokens(
      {
        id: createdStudent.studentId,
        userName: createdStudent.userName,
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
    const { userName, password } = await c.req.json<{

      userName: string;
      password: string;
    }>();

    // Validation
    if (!userName || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          userName: !userName ? "userName is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const student = await prisma.student.findUnique({
      where: { userName },
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
        userName: student.userName,
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
    const { email, password } = await c.req.json<{
      email: string;

      password: string;
    }>();

    // Validation
    if (!email || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const hashedPassword = await encryptPassword(password);
    const teacher = await prisma.teacher.create({
      data: { password: hashedPassword, email },
    });

    const tokens = await generateTokens(
      {
        id: teacher.teacherId,
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
    const { email, password } = await c.req.json<{
      email: string;
      password: string;
    }>();

    // Validation
    if (!email || !password) {
      return c.json(
        ResponseUtil.validationError("All fields are required", {
          email: !email ? "email is required" : null,
          password: !password ? "Password is required" : null,
        })
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: { email },
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