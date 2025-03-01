import ejs from "ejs";
import { ZodError } from "zod";
import { fileURLToPath } from "url";
import path from "path";

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
