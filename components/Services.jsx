const services = [
    { name: "AI images", text: "Product shots, portraits and social visuals made from your brief, in your brand's style.", for: "Shops, cafés, personal brands" },
    { name: "Image to video", text: "Turn a still image into a short clip for ads, Reels and website backgrounds.", for: "Ads, social media" },
    { name: "Photo enhancing", text: "Fix lighting, sharpen, remove clutter and upscale photos so they look professional.", for: "Product photos, old pictures" },
    { name: "Landing pages", text: "A fast one-page website with your services, prices and a booking or contact button.", for: "Salons, coffee shops, local services" },
    { name: "3D for web", text: "3D models and viewers that visitors can rotate on your product page.", for: "Products, packaging" },
    { name: "Copywriting", text: "Headlines, product descriptions and social posts that say what you do in plain words.", for: "Websites, catalogs, posts" },
    { name: "Quick design", text: "Banners, menus, price lists and social templates, delivered fast.", for: "Promos, print, social media" },
    { name: "Sheets & dashboards", text: "Excel and Google Sheets for orders, stock and money, plus dashboards that show what the numbers mean.", for: "Small teams, owners" },
];

export default function Services() {
    return (
        <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">What I can make for you</h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
                Pick one service or combine several. A new website with photos, text and a price table is a common mix.
            </p>

            <ul className="mt-12 border-b border-line">
                {services.map((s) => (
                    <li key={s.name} className="grid gap-2 border-t border-line py-6 md:grid-cols-[1fr_1.4fr_0.8fr] md:gap-8">
                        <h3 className="font-display text-2xl font-bold">{s.name}</h3>
                        <p className="text-ink-soft">{s.text}</p>
                        <p className="text-sm text-ink-soft md:text-right">{s.for}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}