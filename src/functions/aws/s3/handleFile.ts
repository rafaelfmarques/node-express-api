import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { Readable } from "stream";

export interface FindAllPublishedJobs {
  id: string;
  title: string;
  description: string;
  company: string;
}

interface CredentialsProps {
  accessKeyId: string;
  secretAccessKey: string;
}
export class HandleFilesS3 {
  private s3: S3Client;

  constructor(credentials?: CredentialsProps) {
    this.s3 = new S3Client({
      credentials: credentials ?? fromEnv(),
      region: process.env.AWS_SQS_REGION,
    });
  }

  async getFileForFeed() {
    const params = {
      Bucket: "published-jobs",
      Key: "published_jobs.json",
    };
    try {
      const s3Command = new GetObjectCommand(params);
      const feed: any = await this.s3.send(s3Command);
      const streamResponse = await streamToString(feed.Body);
      return JSON.parse(streamResponse);
    } catch (err) {
      const error = err as S3ServiceException;

      if (error.$metadata.httpStatusCode) return [];

      throw new Error(error?.message ?? "Failed to get file from s3");
    }
  }

  async updateFileForFeed(file: FindAllPublishedJobs[]): Promise<void> {
    const params = {
      Bucket: "published-jobs",
      Key: "published_jobs.json",
      Body: JSON.stringify(file),
    };
    try {
      const s3Command = new PutObjectCommand(params);
      await this.s3.send(s3Command);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

function streamToString(stream: Readable): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
