# DCG Monthly Report Generator

This project is an automated Node.js and TypeScript application that generates and emails a periodic Excel report for pending DCG contracts. 

It connects to a MongoDB database, extracts the relevant contract data, aggregates it by dealership and product coverage, and sends a formatted Excel spreadsheet via SendGrid. The process is fully automated using GitHub Actions.

## Features

- **Data Extraction**: Pulls pending contracts (Status: "P", Agent: "DCGDS") from MongoDB.
- **Data Transformation**: Aggregates contract counts and net costs by dealership and product.
- **Excel Generation**: Creates a multi-tab Excel workbook containing a structured summary and a raw data dump.
- **Email Delivery**: Automatically emails the generated report as an attachment using SendGrid.
- **CI/CD Automation**: Scheduled to run automatically on the 24th of every month using GitHub Actions.

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **MongoDB Atlas** account/cluster access
- **SendGrid** API Key for email delivery

## Environment Variables

To run this project locally, you must create a `.env` file in the root directory of the project with the following variables:

| Variable | Description |
| :--- | :--- |
| `NODE_ENV` | (Optional) Identifies the environment (e.g., `PRODUCTION` or `LOCAL`). Appended to the generated file name. Defaults to `LOCAL`. |
| `MONGO_URI` | The connection string for your MongoDB database. |
| `SENDGRID_API_KEY` | Your SendGrid API key for sending emails. |
| `SENDER_EMAIL` | The verified email address you are sending the report *from*. |
| `RECEIVER_EMAIL` | Comma-separated list of email addresses receiving the report. |
| `CC_EMAIL` | (Optional) Comma-separated list of email addresses to CC. |



## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd DCG_Monthly_Report
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running Locally

To run the report generation process locally:

```bash
npm start
```

This will execute `src/index.ts` using `ts-node`. The script will connect to the database, generate the Excel file in the root directory (named `YYYY-MM-DD.xlsx`), and send the email.

## Project Structure

```text
DCG_Monthly_Report/
├── .github/workflows/
│   └── scheduled-report.yml    # GitHub Action CI/CD schedule pipeline
├── src/
│   ├── models/
│   │   └── report.types.ts     # TypeScript interfaces and types
│   ├── services/
│   │   ├── email.service.ts    # SendGrid email logic
│   │   ├── excel.service.ts    # ExcelJS workbook generation logic
│   │   └── mongo.service.ts    # MongoDB connection and querying logic
│   ├── utils/
│   │   └── report.transformer.ts # Data aggregation and mapping
│   └── index.ts                # Main application entry point
├── package.json
├── tsconfig.json
└── .env                        # Local environment variables (Not in source control)
```

## Automation

This tool is deployed and scheduled via GitHub Actions. The workflow is configured to run at **11:00 AM ET on the 24th of every month**. It automatically injects the required environment variables using GitHub Repository Secrets.