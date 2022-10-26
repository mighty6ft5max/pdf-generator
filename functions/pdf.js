const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const {
  AWS_BUCKET,
  REACT_APP_AWS_ACCESS_KEY_ID,
  REACT_APP_AWS_SECRET_ACCESS_KEY,
} = process.env;

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/pdf", async (req, res) => {
  const { html } = req.query;

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
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: "60px",
        bottom: "75px",
      },
    });
    await browser.close();

    let upload_name = "invoice_number";
    /**
     * @type AWS.S3.PutObjectRequest
     */
    const input = {
      Body: Buffer.from(pdf, "binary"),
      Bucket: AWS_BUCKET,
      Key: upload_name,
    };
    const command = new PutObjectCommand(input);

    const response = await client.sent(command);
    res.send(response || "Generation Failed");
  } catch (error) {
    console.log("Error CreatPDF", error);
    return error;
  }
});
