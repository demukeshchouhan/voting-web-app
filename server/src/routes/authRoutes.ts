import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { registerSchema } from "../validations/authValidations.js";
import { formatError, renderEmailTemplate } from "../helpers.js";
import prisma from "../config/database.js";
import { emailQueue } from "../jobs/Email.jobs.js";
import { emailQueueName } from "../jobs/Email.jobs.js";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user) {
      res.status(422).json({
        errors: {
          email: "Email already taken, plesae use another one.",
        },
      });
      return;
    }

    // encrypt path
    const salt = await bcrypt.genSalt(10);
    const { confirm_password, ...requiredPayload } = payload;
    requiredPayload.password = await bcrypt.hash(
      requiredPayload.password,
      salt
    );
    const token = await bcrypt.hash(uuid(), salt);

    const url = `${process.env.APP_URL}/verify-email?email=${requiredPayload.email}&token=${token}`;
    const emailBody = await renderEmailTemplate("verify", {
      name: requiredPayload.name,
      url,
    });
    await emailQueue.add(emailQueueName, {
      to: requiredPayload.email,
      subject: "Voting App Email Verification",
      body: emailBody,
    });
    await prisma.user.create({
      data: {
        ...requiredPayload,
        email_verify_token: token,
      },
    });
    res.json({
      message: "Please check your email. We have sent you a verification link.",
    });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid Data", errors });
      return;
    }
    console.log({ error });
    res.status(500).json({
      message: "Something went wrong, please try again!",
    });
    return;
  }
});

export default router;
