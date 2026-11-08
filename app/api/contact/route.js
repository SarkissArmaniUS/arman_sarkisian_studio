import { NextResponse } from "next/server";

export async function POST(request) {
    let data;
    try {
        data = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const name = String(data.name || "").trim().slice(0, 80);
    const email = String(data.email || "").trim().slice(0, 120);
    const service = String(data.service || "").trim().slice(0, 60);
    const message = String(data.message || "").trim().slice(0, 2000);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || message.length < 10) {
        return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
    }

    // For now the message only goes to the server log (Vercel dashboard > Logs).
    console.log("New contact:", { name, email, service, message });

    return NextResponse.json({ ok: true });
}