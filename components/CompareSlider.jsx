"use client";
import { useRef, useState } from "react";

function Scene({ className = "" }) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#4b3fd1] via-[#ff7a8a] to-[#ffc38a]" />
            <div className="absolute left-1/2 top-[46%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#fff1c9] shadow-[0_0_80px_30px_#ffd9a0] sm:h-36 sm:w-36" />
            <div className="absolute -bottom-10 -left-10 h-48 w-[70%] rounded-[50%] bg-[#2a2a6e]" />
            <div className="absolute -bottom-14 -right-12 h-56 w-[75%] rounded-[50%] bg-[#1b1b4a]" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-[#10102e]" />
        </div>
    );
}

export default function CompareSlider() {
    const ref = useRef(null);
    const [pos, setPos] = useState(50);

    const move = (clientX) => {
        const r = ref.current.getBoundingClientRect();
        setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    };

    return (
        <div
            ref={ref}
            className="relative aspect-[4/5] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[28px] border border-line sm:aspect-[5/4]"
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                move(e.clientX);
            }}
            onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
        >
            <Scene />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Scene className="[filter:saturate(0.25)_contrast(0.65)_brightness(0.8)_blur(2px)]" />
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-paper">
        Original
      </span>
            <span className="absolute right-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">
        Enhanced
      </span>

            <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
                <button
                    role="slider"
                    aria-label="Compare original and enhanced"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pos)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
                        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
                    }}
                    className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-bold text-ink shadow-lg"
                >
                    ⇄
                </button>
            </div>
        </div>
    );
}