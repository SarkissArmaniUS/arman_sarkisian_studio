const steps = [
    { title: "Tell me what you need", text: "Send a short message with your goal, examples you like and any deadline." },
    { title: "See a first draft", text: "I send a draft or a few options so you can react to something real." },
    { title: "Ask for changes", text: "You say what to adjust, and I update it until it fits." },
    { title: "Get the final files", text: "You receive everything ready to use: images, a live website, or your sheet." },
];

export default function Process() {
    return (
        <section id="process" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How it works</h2>

            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, i) => (
                    <li key={s.title} className="border-t-2 border-ink pt-4">
                        <span className="font-display text-3xl font-bold text-cobalt">{i + 1}</span>
                        <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
                        <p className="mt-2 text-ink-soft">{s.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}