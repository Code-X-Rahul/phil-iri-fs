import { Hono } from "hono";
import {
  login,
  register,
  teacherLogin,
  teacherRegister,
} from "../controllers/auth.controller";

const auth = new Hono({ strict: true });

auth.post("/student/login", login);
auth.post("/student/register", register);

auth.post("/teacher/login", teacherLogin);
auth.post("/teacher/register", teacherRegister);

export default auth;
