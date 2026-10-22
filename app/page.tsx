import { CartProvider } from "./components/Cart";
import EmpanadaIcon from "./components/EmpanadaIcon";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { combos, formatPrecio, WHATSAPP } from "./data";

const lugares = [
  {
    nombre: "Cementerio de la Recoleta",
    texto: "A dos cuadras. Después de recorrer sus pasillos, una de carne cae siempre bien.",
  },
  {
    nombre: "Plaza Francia",
    texto: "Los fines de semana armamos el combo picnic para la feria artesanal.",
  },
  {
    nombre: "Floralis Genérica",
    texto: "La flor de acero se abre al sol; nosotros abrimos el horno a las 11.",
  },
  {
    nombre: "Basílica del Pilar",
    texto: "Desde 1732 en el barrio. Nosotros, desde hace un poco menos.",
  },
];

const resenas = [
  {
    texto: "La de osobuco al malbec es de otro planeta. Masa finita, repulgue perfecto.",
    autor: "Martina G.",
    detalle: "Vecina de Av. Alvear",
  },
  {
    texto: "Paramos después del cementerio y terminamos pidiendo dos docenas para llevar.",
    autor: "Lucas & Sofi",
    detalle: "De visita desde Córdoba",
  },
  {
    texto: "La humita me recordó a la de mi abuela tucumana. No digo más.",
    autor: "Ana P.",
    detalle: "Clienta desde 2019",
  },
];

const marquee = [
  "Horno de barro",
  "Masa casera",
  "Repulgue a mano",
  "Recoleta, Buenos Aires",
  "Desde 2016",
  "Hechas cada mañana",
];

export default function Home() {
  return (
    <CartProvider>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="grain relative overflow-hidden pt-28 md:pt-32">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-[1.1fr_1fr] md:pb-28">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-tinta/15 bg-papel/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-musgo">
                <span className="h-1.5 w-1.5 rounded-full bg-terracota" />
                Abierto hoy · 11 a 00 h
              </p>
              <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Empanadas con
                <br />
                <em className="font-normal text-terracota">alma de barrio</em>
                <br />
                y aire de París.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-tinta/70">
                Masa casera, rellenos jugosos y repulgue hecho a mano. Horneadas cada mañana a
                pasos del Cementerio de la Recoleta.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#menu"
                  className="rounded-full bg-tinta px-7 py-3.5 font-medium text-crema transition hover:bg-ladrillo"
                >
                  Ver el menú
                </a>
                <a
                  href="#visitanos"
                  className="rounded-full border border-tinta/20 px-7 py-3.5 font-medium transition hover:border-tinta"
                >
                  Cómo llegar
                </a>
              </div>
              <dl className="mt-12 flex gap-10 border-t border-tinta/10 pt-6">
                {[
                  ["12", "sabores"],
                  ["4.9★", "en Google"],
                  ["+80k", "repulgues al año"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="font-serif text-3xl">{n}</dt>
                    <dd className="text-sm text-tinta/55">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Arco tipo fachada francesa */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="arco relative aspect-[4/5] overflow-hidden bg-oliva">
                <div className="absolute inset-4 arco border border-masa/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(200,145,58,0.45),transparent_60%)]" />
                <div className="absolute inset-x-0 top-14 text-center">
                  <p className="font-serif text-sm uppercase tracking-[0.35em] text-masa/80">
                    Est. 2016
                  </p>
                  <p className="mt-2 font-serif text-3xl italic text-crema">Recoleta</p>
                </div>
                <div className="absolute inset-x-0 bottom-10 grid place-items-center">
                  <EmpanadaIcon className="w-[78%] animate-float drop-shadow-2xl" marca="#8e3b22" />
                </div>
              </div>
              <div className="absolute -left-6 bottom-16 hidden rotate-[-8deg] rounded-2xl bg-papel px-4 py-3 shadow-xl sm:block">
                <p className="text-xs uppercase tracking-widest text-tinta/50">Recién salidas</p>
                <p className="font-serif text-lg">Carne a cuchillo</p>
              </div>
              <div className="absolute -right-4 top-24 hidden rotate-[6deg] rounded-full bg-dorado px-5 py-5 text-center shadow-xl sm:block">
                <p className="font-serif text-2xl leading-none text-tinta">12</p>
                <p className="text-[10px] uppercase tracking-wider text-tinta/80">por docena</p>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="overflow-hidden border-y border-tinta/10 bg-tinta py-4 text-crema">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {[...marquee, ...marquee].map((t, i) => (
                <span key={i} className="flex items-center gap-10 font-serif text-xl italic">
                  {t}
                  <span className="text-dorado not-italic">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* MENÚ */}
        <section id="menu" className="scroll-mt-20 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <SectionTitle kicker="La carta" titulo="Nuestras empanadas">
              Doce sabores, todos al horno. Elegí las tuyas y armá el pedido en segundos.
            </SectionTitle>
            <Menu />
          </div>
        </section>

        {/* COMBOS */}
        <section id="combos" className="scroll-mt-20 bg-oliva py-24 text-crema">
          <div className="mx-auto max-w-6xl px-5">
            <SectionTitle kicker="Para compartir" titulo="Combos" dark>
              Porque una nunca alcanza.
            </SectionTitle>
            <div className="grid gap-6 md:grid-cols-3">
              {combos.map((c) => (
                <div
                  key={c.nombre}
                  className={`relative rounded-3xl p-8 transition hover:-translate-y-1 ${
                    c.destacado
                      ? "bg-crema text-tinta shadow-2xl md:-translate-y-4 md:hover:-translate-y-5"
                      : "border border-crema/15 bg-crema/5"
                  }`}
                >
                  {c.destacado && (
                    <span className="absolute -top-3 left-8 rounded-full bg-terracota px-3 py-1 text-xs font-semibold uppercase tracking-wider text-crema">
                      Más pedido
                    </span>
                  )}
                  <h3 className="font-serif text-3xl">{c.nombre}</h3>
                  <p className={`mt-2 ${c.destacado ? "text-tinta/60" : "text-crema/60"}`}>
                    {c.detalle}
                  </p>
                  <p className="mt-8 font-serif text-4xl tabular-nums">{formatPrecio(c.precio)}</p>
                  <p className={`mt-1 text-sm ${c.destacado ? "text-terracota" : "text-masa"}`}>
                    {c.nota}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                      `¡Hola! Quiero pedir el combo "${c.nombre}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 block rounded-full py-3 text-center font-medium transition ${
                      c.destacado
                        ? "bg-tinta text-crema hover:bg-ladrillo"
                        : "border border-crema/30 hover:bg-crema hover:text-tinta"
                    }`}
                  >
                    Pedir combo
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EL BARRIO */}
        <section id="barrio" className="scroll-mt-20 py-24">
          <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-musgo">Nuestra historia</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Un rincón del norte argentino
                <em className="text-terracota"> entre fachadas francesas.</em>
              </h2>
              <p className="mt-6 leading-relaxed text-tinta/70">
                Abrimos en 2016 con un horno de barro, la receta de la abuela Elvira y la idea de
                que el barrio más elegante de Buenos Aires también merecía una empanada honesta.
                Cada mañana amasamos, rellenamos y repulgamos a mano: sin congelados, sin atajos.
              </p>
              <p className="mt-4 leading-relaxed text-tinta/70">
                Hoy somos parada obligada entre el Cementerio, la Feria de Plaza Francia y los
                cafés de Av. Alvear.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {lugares.map((l, i) => (
                <li
                  key={l.nombre}
                  className={`rounded-3xl border border-tinta/10 bg-papel p-6 ${
                    i % 2 === 1 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <span className="font-serif text-sm text-terracota">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl">{l.nombre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/60">{l.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RESEÑAS */}
        <section className="grain border-y border-tinta/10 bg-masa/30 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <SectionTitle kicker="Lo que dicen" titulo="Vecinos y visitantes" />
            <div className="grid gap-6 md:grid-cols-3">
              {resenas.map((r) => (
                <figure key={r.autor} className="rounded-3xl bg-papel p-8 shadow-sm">
                  <p className="text-dorado">★★★★★</p>
                  <blockquote className="mt-4 font-serif text-xl leading-snug">
                    “{r.texto}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-medium">{r.autor}</span>
                    <span className="text-tinta/50"> · {r.detalle}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* VISITANOS */}
        <section id="visitanos" className="scroll-mt-20 py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-musgo">Visitanos</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Te esperamos con el horno prendido.</h2>
              <div className="mt-8 space-y-6">
                <Info titulo="Dirección">
                  Av. Pueyrredón 2100
                  <br />
                  Recoleta, CABA
                </Info>
                <Info titulo="Horarios">
                  Lunes a jueves · 11 a 23 h
                  <br />
                  Viernes a domingo · 11 a 01 h
                </Info>
                <Info titulo="Delivery">Recoleta, Barrio Norte, Palermo Chico y Retiro.</Info>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex rounded-full bg-terracota px-7 py-3.5 font-medium text-crema transition hover:bg-ladrillo"
              >
                Escribinos por WhatsApp
              </a>
            </div>
            <div className="arco min-h-96 overflow-hidden border border-tinta/10">
              <iframe
                title="Mapa de Recoleta"
                src="https://www.google.com/maps?q=Cementerio+de+la+Recoleta,+Buenos+Aires&z=15&output=embed"
                className="h-full min-h-96 w-full grayscale-[40%] sepia-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-tinta py-14 text-crema/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl text-crema">
              Recoleta <em className="text-dorado">empanadas</em>
            </p>
            <p className="mt-2 text-sm">Hechas a mano en Buenos Aires desde 2016.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition hover:text-crema">Instagram</a>
            <a href="#" className="transition hover:text-crema">PedidosYa</a>
            <a href={`https://wa.me/${WHATSAPP}`} className="transition hover:text-crema">WhatsApp</a>
          </div>
          <p className="text-xs text-crema/40">© {new Date().getFullYear()} Recoleta Empanadas</p>
        </div>
      </footer>
    </CartProvider>
  );
}

function SectionTitle({
  kicker,
  titulo,
  children,
  dark,
}: {
  kicker: string;
  titulo: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-xl text-center">
      <p className={`text-xs uppercase tracking-[0.25em] ${dark ? "text-masa" : "text-musgo"}`}>
        {kicker}
      </p>
      <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{titulo}</h2>
      {children && (
        <p className={`mt-4 text-lg ${dark ? "text-crema/65" : "text-tinta/60"}`}>{children}</p>
      )}
    </div>
  );
}

function Info({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-terracota pl-4">
      <p className="text-xs uppercase tracking-[0.2em] text-tinta/50">{titulo}</p>
      <p className="mt-1 leading-relaxed">{children}</p>
    </div>
  );
}
