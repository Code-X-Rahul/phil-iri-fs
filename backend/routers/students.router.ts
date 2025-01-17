import { Hono } from "hono";
import { createStudentProfile, getLoggedInStudent } from "../controllers/student.controller";


const studentRouter = new Hono({ strict: true });

studentRouter.post("/v1/students", createStudentProfile);

studentRouter.get("/v1/student/me", getLoggedInStudent)
// auth.post("/student/register",);

// auth.post("/teacher/login",);
// auth.post("/teacher/register",);

export default studentRouter;
