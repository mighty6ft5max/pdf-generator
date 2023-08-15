const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const { REACT_APP_ENVIRONMENT, REACT_APP_LOCAL_CHROME: executablePath } =
  process.env;
const is_local = REACT_APP_ENVIRONMENT === "local";
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/pdf", async (req, res) => {
  const { html } = req.body;
  console.log("ENVIRONMENT", is_local);
  try {
    const launch_configs = is_local
      ? {
          args: [],
          executablePath,
        }
      : {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        };

    const browser = await puppeteer.launch(launch_configs);
    console.log("LAUNCHED");
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
