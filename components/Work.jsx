"use client";
import { useState } from "react";

const filters = ["All", "AI images", "Video", "Landing pages", "3D", "Dashboards"];

const projects = [
    { title: "Nail studio landing page", category: "Landing pages", note: "One page with services, prices and a booking button", bg: "linear-gradient(135deg,#ff9ec4,#ffe1ec)" },
    { title: "Coffee shop landing page", category: "Landing pages", note: "Menu, opening hours and map", bg: "linear-gradient(135deg,#7a4b2a,#d9a870)" },
    { title: "Product photo set", category: "AI images", note: "Studio-style shots without a photoshoot", bg: "linear-gradient(135deg,#4b3fd1,#ff7a8a)" },
    { title: "Photo before and after", category: "AI images", note: "Dull photo made sharp and bright", bg: "linear-gradient(135deg,#2c6e63,#bfe8d8)" },
    { title: "Still image to short clip", category: "Video", note: "A 5-second loop for Instagram Reels", bg: "linear-gradient(135deg,#14172b,#3d4bff)" },
    { title: "Rotating product model", category: "3D", note: "A 3D viewer for an online shop", bg: "linear-gradient(135deg,#f4c95d,#e8825a)" },
    { title: "Sales dashboard", category: "Dashboards", note: "Monthly revenue, top products, trends", bg: "linear-gradient(135deg,#1d3557,#7fb3d5)" },
    { title: "Stock and orders sheet", category: "Dashboards", note: "Google Sheet that updates totals by itself", bg: "linear-gradient(135deg,#2b9348,#d8f3dc)" },
];

export default function Work() {
    const [active, setActive] = useState("All");
    const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

    return (
        <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Examples</h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">Sample projects for the kinds of businesses I work with.</p>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter examples">
                {filters.map((f) => (
                    <button
                        key={f}
                        aria-pressed={active === f}
                        onClick={() => setActive(f)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            active === f ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink hover:text-ink"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p) => (
                    <li key={p.title}>
                        {/* To use a real image: <Image src="/work/name.jpg" alt={p.title} fill className="object-cover" /> inside this div */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line" style={{ background: p.bg }} />
                        <h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3>
                        <p className="text-sm text-ink-soft">
                            {p.category}. {p.note}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}