import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { registerSchema } from "../validations/authValidations.js";
import { formatError } from "../helpers.js";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    res.json(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid Data", errors });
    }
    res.status(422).json(error);
  }
});

export default router;
