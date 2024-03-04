import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

import { fromEnv } from "@aws-sdk/credential-providers";

export class ProducerSQS {
  private client: SQSClient;

  constructor() {
    this.client = new SQSClient({
      credentials: fromEnv(),
      region: process.env.AWS_SQS_REGION,
    });
  }

  async send(body: any, url?: string): Promise<void> {
    try {
      const message = new SendMessageCommand({
        QueueUrl: url,
        MessageBody: JSON.stringify(body),
      });
      await this.client.send(message);
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async remove(id: string, url?: string) {
    try {
      const message = new SendMessageCommand({
        QueueUrl: url,
        MessageBody: JSON.stringify({ id }),
      });
      await this.client.send(message);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
