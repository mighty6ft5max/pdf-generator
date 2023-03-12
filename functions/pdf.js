const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/pdf", async (req, res) => {
  const { html } = req.body;

  try {
    chromium.args.push("--disable-gpu");
    chromium.args.push("--disable-software-rasterizer");
    chromium.args.push("--disable-web-security");
    chromium.args.push("--user-data-dir=/tmp/user-data");
    chromium.args.push("--data-path=/tmp/data-path");
    chromium.args.push("--homedir=/tmp");
    chromium.args.push("--disk-cache-dir=/tmp/cache-dir");
    chromium.args.push("--no-sandbox");
    chromium.args.push("--disable-setuid-sandbox");
    chromium.args.push("--single-process");
    chromium.args.push("--disable-dev-shm-usage");
    chromium.args.push("--disable-accelerated-2d-canvas");

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
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
    await browser.close();

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
