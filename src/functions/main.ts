import { Callback, Context, Handler, ScheduledEvent } from "aws-lambda";
import { FindAllPublishedJobs } from "../core/infra/aws/storage/s3/storageS3";
import { HandleFilesS3 } from "./aws/s3/handleFile";
import { ConsumerLambdaSQS } from "./aws/sqs/consumer";

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID ?? "";
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";
const publishQueueUrl = process.env.AWS_SQS_PUBLISH_JOB ?? "";
const unpublishQueueUrl = process.env.AWS_SQS_UNPUBLISH_JOB ?? "";

export const publishJobs: Handler = async (
  _e: ScheduledEvent,
  _context: Context,
  callback: Callback,
) => {
  try {
    const sqs = new ConsumerLambdaSQS({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const s3 = new HandleFilesS3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const json = await s3.getFileForFeed();

    const message = await sqs.consume(process.env.AWS_SQS_PUBLISH_JOB);
    if (message?.Messages?.length) {
      const messageParse =
        message.Messages.map((m) => m?.Body && JSON.parse(m.Body)) || [];
      const combinedArray = json.concat(messageParse);
      await s3.updateFileForFeed(combinedArray);
      if (message.Messages[0].ReceiptHandle)
        await sqs.deleteMessage(
          publishQueueUrl,
          message.Messages[0].ReceiptHandle,
        );

      callback(null, "job runned");
    }
  } catch (error) {
    const err = new Error(error as string) ?? null;
    callback(err, "failed to run function");
  }
};

export const unpublishJobs: Handler = async (
  _e: ScheduledEvent,
  _context: Context,
  callback: Callback,
) => {
  try {
    const sqs = new ConsumerLambdaSQS({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const s3 = new HandleFilesS3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const json = await s3.getFileForFeed();
    const message = await sqs.consume(process.env.AWS_SQS_UNPUBLISH_JOB);
    if (message?.Messages?.length) {
      const guid =
        message.Messages.map((m) => m?.Body && JSON.parse(m.Body))[0] || "";
      const filterArray: FindAllPublishedJobs[] = json
        .filter((item: FindAllPublishedJobs) => item.id !== guid.id)
        .filter((it: FindAllPublishedJobs) => it.id);
      await s3.updateFileForFeed(filterArray);
      if (message.Messages[0].ReceiptHandle)
        await sqs.deleteMessage(
          unpublishQueueUrl,
          message.Messages[0].ReceiptHandle,
        );
      callback(null, "job runned");
    }
  } catch (error) {
    const err = new Error(error as string) ?? null;
    callback(err, "failed to run function");
  }
};
