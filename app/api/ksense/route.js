import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY)

export async function POST(request) {
  let body = await request.json();
  const headersList = headers();
  let email_body = `THE BODY: ${JSON.stringify(body)} \n `;
  for (const pair of headersList.entries()) {
    email_body += `${pair[0]}: ${pair[1]} \n`;
  }
  let email = await resend.emails.send({
    to: process.env.EMAIL_TO,
    from: "onboarding@resend.dev",
    subject: "Secret code...!",
    text: email_body,
  })
  console.log( email)
  console.log(email_body)

  try {
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "error" });
  }
}
