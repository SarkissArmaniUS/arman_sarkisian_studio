"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const options = ["AI images", "Image to video", "Photo enhancing", "Landing page", "3D for web", "Copywriting", "Quick design", "Sheets & dashboards", "Something else"];

const fieldClass = "border-line bg-transparent text-ink placeholder:text-ink-soft/70";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Request failed");
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-5 py-24 lg:grid-cols-[1fr_1.1fr]">
            <div>
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Tell me about your project</h2>
                <p className="mt-4 max-w-md text-lg text-ink-soft">
                    Write what you need and any examples you like. I will reply by email with questions or a first idea.
                </p>
                <ul className="mt-8 space-y-2 text-ink-soft">
                    <li>Email: <a className="text-ink underline underline-offset-4" href="mailto:hello@yourname.com">hello@yourname.com</a></li>
                    <li>Telegram: <a className="text-ink underline underline-offset-4" href="https://t.me/yourname">@yourname</a></li>
                    <li>Instagram: <a className="text-ink underline underline-offset-4" href="https://instagram.com/yourname">@yourname</a></li>
                </ul>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line p-6 sm:p-8">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your name</label>
                    <Input id="name" name="name" required maxLength={80} autoComplete="name" className={fieldClass} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" name="email" type="email" required maxLength={120} autoComplete="email" className={fieldClass} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">What do you need?</label>
                    <select
                        id="service"
                        name="service"
                        defaultValue={options[0]}
                        className="h-10 w-full rounded-md border border-line bg-transparent px-3 text-sm text-ink"
                    >
                        {options.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} className={fieldClass} />
                </div>

                <Button type="submit" disabled={status === "sending"} className="h-12 rounded-full bg-cobalt px-7 text-white hover:bg-cobalt/90">
                    {status === "sending" ? "Sending..." : "Send message"}
                </Button>

                <p role="status" className="min-h-6 text-sm">
                    {status === "sent" && "Thanks, your message was sent. I will reply by email."}
                    {status === "error" && "Could not send the message. Try again or write to me by email."}
                </p>
            </form>
        </section>
    );
}