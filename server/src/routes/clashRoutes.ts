import { Router, Request, Response } from "express";
import {
  formatError,
  imageValidator,
  removeImage,
  uploadFile,
} from "../helpers.js";
import { ZodError } from "zod";
import { clashSchema } from "../validations/clashValidations.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const clash = await prisma.clash.findMany({
      where: {
        user_id: req.user?.id,
      },
    });
    res.json({
      message: "clash fetched successfully",
      data: clash,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    return;
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const clash = await prisma.clash.findUnique({
      where: {
        id: Number(req.params?.id),
      },
    });
    if (!clash) {
      res.json({
        message: "No Clash Found",
        data: clash,
      });
      return;
    }
    res.json({
      message: "clash fetched successfully",
      data: clash,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    return;
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      console.log({ image });
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        res.status(422).json({
          errors: { image: validMsg },
        });
        return;
      }
      payload.image = (await uploadFile(image)) || "";
    } else {
      res.status(422).json({
        errors: { image: "Image field is required" },
      });
      return;
    }

    await prisma.clash.create({
      data: {
        ...payload,
        image: payload.image,
        user_id: req.user?.id ?? 0,
        expire_at: new Date(payload.expire_at),
      },
    });
    res.json({ message: "Clash Created successfully!" });
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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const body = req.body;
    const payload = clashSchema.parse(body);
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      console.log({ image });
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        res.status(422).json({
          errors: { image: validMsg },
        });
        return;
      }
      const clash = await prisma.clash.findUnique({
        select: {
          id: true,
          image: true,
        },
        where: {
          id: Number(id),
        },
      });
      if (clash) removeImage(clash?.image);
      payload.image = (await uploadFile(image)) || "";
    }

    await prisma.clash.update({
      where: {
        id: Number(id),
      },
      data: {
        ...payload,
        expire_at: new Date(payload.expire_at),
      },
    });
    res.json({ message: "Clash Updated successfully!" });
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

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      select: {
        id: true,
        image: true,
      },
      where: {
        id: Number(id),
      },
    });
    if (clash) removeImage(clash?.image);

    await prisma.clash.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Clash Deleted successfully!" });
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
