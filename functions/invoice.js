const serverless = require("serverless-http");
const express = require("express");
const { upperCase } = require("lodash");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const UUID = require("uuid");
const { SESClient, SendRawEmailCommand } = require("@aws-sdk/client-ses");

const { REACT_APP_AWS_ACCESS_KEY_ID, REACT_APP_AWS_SECRET_ACCESS_KEY } =
  process.env;

const client = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/invoice/raw_email", async (req, res) => {
  const { html, transaction } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(false);
    await page.emulateMediaType("screen");
    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle0", "networkidle2"],
    });

    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
    });

    const pdfOutput = await page.screenshot({ encoding: "base64" });
    await browser.close();

    const body_text = "This is for those who cannot read HTML.",
      body_html = html,
      content = pdfOutput,
      encoding = "base64",
      filename = `invoice_${transaction}.pdf`,
      subject = `Order Confirmation ${upperCase(transaction)}`,
      Source = "RSC Health <accounts-system@rschealth.com>",
      ToAddresses = "maxime.and.associates@gmail.com";

    const date = new Date();
    const boundary = `----=_Part${Math.random().toString().substr(2)}`;
    const rawMessage = [
      `From: ${Source}`, // Can be just the email as well without <>
      `To: ${ToAddresses}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Date: ${date}`, // Will be replaced by SES
      `Content-Type: multipart/alternative; boundary="${boundary}"`, // For sending both plaintext & html content
      // ... you can add more headers here as decribed in https://docs.aws.amazon.com/ses/latest/DeveloperGuide/header-fields.html
      `\n`,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      `\n`,
      body_text,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      `\n`,
      body_html,
      `\n`,
      `--${boundary}`,
      `Content-Type: application/pdf; name="${filename}"`,
      `Content-Description: ${filename}`,
      `Content-Disposition: attachment;filename="${filename}";`,
      `creation-date="${date}"`,
      `Content-Transfer-Encoding: ${encoding}`,
      `\n`,
      content,
      `\n`,
      `--${boundary}--`,
    ];

    console.log("SENDING RAW EMAIL");
    const input = {
      RawMessage: { Data: new Buffer(rawMessage.join("\n")) },
      Source,
    };
    const command = new SendRawEmailCommand(input);
    const response = await client.send(command);
    console.log("EMAIL SENT", response);

    res.send(pdf);
  } catch (error) {
    console.log("Error CreatPDF", error);
    return error;
  }
});

const handler = serverless(app, {
  binary(headers) {
    return ["application/pdf"];
  },
});

exports.handler = async (event, context) => {
  return await handler(event, context);
};
