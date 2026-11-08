import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const clean = (v, max) => String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(request) {
    let data;
    try {
        data = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Hidden field: real visitors leave it empty, simple bots fill it in
    if (data.website) return NextResponse.json({ ok: true });

    const name = clean(data.name, 80);
    const email = clean(data.email, 120);
    const service = clean(data.service, 60);
    const message = String(data.message || "").trim().slice(0, 2000);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || message.length < 10) {
        return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
        return NextResponse.json({ error: "Server is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio site" <${GMAIL_USER}>`,
            to: CONTACT_TO || GMAIL_USER,
            replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
            subject: `New request: ${service} (${name})`,
            text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Send failed:", err);
        return NextResponse.json({ error: "Could not send" }, { status: 500 });
    }
}