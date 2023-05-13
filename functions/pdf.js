const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/pdf", async (req, res) => {
  const { html } = req.body;

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
