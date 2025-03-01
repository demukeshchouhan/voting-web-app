import { Job, Queue, Worker } from "bullmq";
import { redisConnection, defaultQueueOptions } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data: EmailJobDatatType = job.data;
    await sendEmail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  }
);

export type EmailJobDatatType = {
  to: string;
  subject: string;
  body: string;
};
