# Backend Developer Technical Assessment

## Local Setup

#### API REST

Add a `.env` file at the root of the project following the example in `.env.example`.

At the root of the project, run:

```bash
$ npm run setup
```

This command installs project dependencies, starts and runs a Docker Postgres image (must be installed), configures the Prisma ORM, connects to and adds tables to the database, and seeds data.

After setup, run:

```bash
$ npm run dev
```

This command starts the app in watch mode.

To run all tests:

```bash
$ npm run test
```

#### SERVERLESS - Lambda

To run the lambda locally:

##### Queue to publish jobs to S3

```bash
$ serverless:publish
```

##### Queue to remove jobs from S3

```bash
$ serverless:unpublish
```

## Documentation

Swagger was used for endpoint documentation in this project. Simply access the URL:

##### [http://localhost:3000/docs](http://localhost:3000/docs)


### Additional Information

1. **Relational Database**: There is no need to worry about the DDL of the Company table; the seed is basically done through setup, persisting the same data as the DDL.

2. **REST API**: An additional endpoint was developed: `/jobs/not-published`. This route is used to return all jobs that are not `published`.

Note: The validation by `OPENAI` occurs when trying to publish a job with words containing `sensitive content`, saving an array of strings containing `description` and `title`.

Note: The commands below run on pre-commit and validate through `tests e2e`, `eslint` and `prettier`:

```json
   "test:staged": "jest __tests__/@e2e --passWithNoTests --detectOpenHandles  --no-cache",
   "eslint:fix": "npx eslint 'src/**' --fix",
   "prettier:check": "npx prettier --check 'src/**'",
```

3.  **Serverless Environment**: Two queues were developed, `publish-jobs`, which the Lambda reads to publish to S3, and `unpublish-jobs`, which is used to remove jobs from the S3 JSON.

Note: `The lambda function was configured to run every 5 minutes.`