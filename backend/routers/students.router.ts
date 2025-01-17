import { Hono } from "hono";
import { createStudentProfile } from "../controllers/student.controller";


const studentRouter = new Hono({ strict: true });

studentRouter.post("/v1/students/:id", createStudentProfile);
// auth.post("/student/register",);

// auth.post("/teacher/login",);
// auth.post("/teacher/register",);

export default studentRouter;
