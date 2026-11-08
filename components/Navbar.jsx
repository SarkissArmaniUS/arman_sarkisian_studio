"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "How it works" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors ${
                scrolled || open ? "bg-paper/90 backdrop-blur border-b border-line" : "border-b border-transparent"
            }`}
        >
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
                <a href="#" className="font-display text-xl font-bold tracking-tight">
                    Sarkisian<span className="text-cobalt">.</span>studio
                </a>

                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                                {l.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <ThemeToggle />
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-cobalt hover:text-white"
                        >
                            Get a quote
                        </a>
                    </li>
                </ul>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>
                </div>
            </nav>

            {open && (
                <ul className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">
                                {l.label}
                            </a>
                        </li>
                    ))}
                    <li className="pt-2">
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="block rounded-full bg-ink px-5 py-3 text-center font-medium text-paper"
                        >
                            Get a quote
                        </a>
                    </li>
                </ul>
            )}
        </header>
    );
}