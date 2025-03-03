import { Router, Request, Response } from "express";
import prisma from "../config/database.js";
import { authLimiter } from "../config/rateLimit.js";
import {
  checkDateHourDiff,
  formatError,
  renderEmailTemplate,
} from "../helpers.js";
import { ZodError } from "zod";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/passwordValidation.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue } from "../jobs/Email.jobs.js";
import { emailQueueName } from "../jobs/Email.jobs.js";

const router = Router();

router.post(
  "/forgot-password",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = forgotPasswordSchema.parse(body);
      let user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "no user found with this email",
          },
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const token = await bcrypt.hash(uuid4(), salt);
      await prisma.user.update({
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
        where: {
          email: payload.email,
        },
      });
      const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;
      const html = await renderEmailTemplate("forgot-password", {
        url,
      });
      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Reset your Password",
        body: html,
      });
      res.json({
        message:
          "Password reset link sent successully! Please check you email.",
      });
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        res.status(422).json({ message: "Invalid Data", errors });
        return;
      }
      res.status(500).json({
        message: "Something went wrong, please try again!",
      });
      return;
    }
  }
);

router.post(
  "/reset-password",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = resetPasswordSchema.parse(body);
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "Link is not correct make sure you copied correct link.",
          },
        });
        return;
      }

      if (user.password_reset_token !== payload.token) {
        res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "Link is not correct make sure you copied correct link.",
          },
        });
        return;
      }
      const hoursDiff = checkDateHourDiff(user.token_send_at!);
      if (hoursDiff > 2) {
        res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "Password reset token got expired. Please use new token",
          },
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(payload.password, salt);
      await prisma.user.update({
        data: {
          password: newPass,
          password_reset_token: null,
          token_send_at: null,
        },
        where: {
          email: payload.email,
        },
      });
      res.json({
        message: "Password reset successully! Please try to login now.",
      });
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        res.status(422).json({ message: "Invalid Data", errors });
        return;
      }
      res.status(500).json({
        message: "Something went wrong, please try again!",
      });
      return;
    }
  }
);

export default router;
