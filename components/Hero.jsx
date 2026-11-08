"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import CompareSlider from "./CompareSlider";

const services = ["AI images", "Image to video", "Photo enhancing", "Landing pages", "3D for web", "Copywriting", "Sheets & dashboards"];

export default function Hero() {
    const root = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.from("[data-line]", { yPercent: 110, duration: 0.9, stagger: 0.12 })
                .from("[data-fade]", { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, "-=0.5")
                .from("[data-slider]", { opacity: 0, scale: 0.97, duration: 0.8 }, "-=0.7");
        }, root);
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_1fr] lg:pt-36">
            <div>
                <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                    <span className="block overflow-hidden pb-1"><span data-line className="block">Visuals, sites and</span></span>
                    <span className="block overflow-hidden pb-1"><span data-line className="block">dashboards that make</span></span>
                    <span className="block overflow-hidden pb-1"><span data-line className="block">your business look</span></span>
                    <span className="block overflow-hidden pb-1"><span data-line className="block text-cobalt">finished.</span></span>
                </h1>

                <p data-fade className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                    I make AI images and video, improve your photos, build landing pages, and set up the spreadsheets that run
                    your day. Built for cafés, salons and small teams.
                </p>

                <div data-fade className="mt-8 flex flex-wrap gap-3">
                    <a href="#contact" className="rounded-full bg-cobalt px-7 py-3.5 font-medium text-white transition-transform hover:-translate-y-0.5">
                        Start a project
                    </a>
                    <a href="#work" className="rounded-full border border-ink/20 px-7 py-3.5 font-medium transition-colors hover:border-ink">
                        See examples
                    </a>
                </div>

                <ul data-fade className="mt-10 flex max-w-lg flex-wrap gap-2">
                    {services.map((s) => (
                        <li key={s} className="rounded-full border border-line bg-ink/5 px-3.5 py-1.5 text-sm text-ink-soft">
                            {s}
                        </li>
                    ))}
                </ul>
            </div>

            <div data-slider>
                <CompareSlider />
                <p className="mt-3 text-sm text-ink-soft">Drag to compare. Same photo, before and after enhancement.</p>
            </div>
        </section>
    );
}