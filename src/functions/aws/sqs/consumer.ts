import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";

import { fromEnv } from "@aws-sdk/credential-providers";

interface CredentialsProps {
  accessKeyId: string;
  secretAccessKey: string;
}

export class ConsumerLambdaSQS {
  private client: SQSClient;

  constructor(credentials?: CredentialsProps) {
    this.client = new SQSClient({
      credentials: credentials ?? fromEnv(),
      region: process.env.AWS_SQS_REGION,
    });
  }

  async consume(url?: string) {
    try {
      const message = new ReceiveMessageCommand({ QueueUrl: url });
      return await this.client.send(message);
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async deleteMessage(url: string, receiptHandle: string) {
    try {
      const message = new DeleteMessageCommand({
        QueueUrl: url,
        ReceiptHandle: receiptHandle,
      });
      return await this.client.send(message);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
