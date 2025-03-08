import ejs from "ejs";
import { ZodError } from "zod";
import { fileURLToPath } from "url";
import path from "path";
import dayjs from "dayjs";
import { v4 as uuid4 } from "uuid";
import { supportMimes } from "./config/filesystem.js";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const formatError = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message;
  });
  return errors;
};

export const renderEmailTemplate = async (filename: string, payload: any) => {
  return await ejs.renderFile(
    __dirname + `/views/emails/${filename}.ejs`,
    payload
  );
};

export const checkDateHourDiff = (date: Date | string): number => {
  const now = dayjs();
  const tokenSendDate = dayjs(date);
  const difference = now.diff(tokenSendDate, "hours");
  return difference;
};

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 2) {
    return "Image size must be less than 2 MB.";
  } else if (!supportMimes.includes(mime)) {
    return "image must be of type png, jpg, jpeg, gif, webp";
  }
  return null;
};

export const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const uploadFile = async (image: UploadedFile) => {
  const imgExt = image?.name.split(".");
  const imageName = uuid4() + "." + imgExt[1];
  const uploadPath = process.cwd() + "/public/images/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });
  return imageName;
};

export const removeImage = (imageName: string) => {
  const path = process.cwd() + "/public/images/" + imageName;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
