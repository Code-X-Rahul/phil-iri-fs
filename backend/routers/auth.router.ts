import { Hono } from "hono";
import {
  getAccessToken,
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

auth.get("/refresh", getAccessToken);

export default auth;
