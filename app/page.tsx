import Image from "next/image";
import { CartProvider, WhatsappIcon } from "./components/Cart";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { combos, formatPrecio, local, whatsappLink } from "./data";

const resenas = [
  { texto: "La de carne a cuchillo es un viaje de ida. Pedimos una docena y no sobró nada.", autor: "Martina G." },
  { texto: "Paramos después del cementerio y terminamos llevando dos docenas.", autor: "Lucas y Sofi" },
  { texto: "La humita me hizo acordar a la de mi abuela. No digo más.", autor: "Ana P." },
];

export default function Home() {
  return (
    <CartProvider>
      <Navbar />

      <main className="pt-[68px]">
        {/* INICIO */}
        <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-6 md:grid-cols-2 md:items-center md:gap-12 md:pb-20 md:pt-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:order-2 md:aspect-[4/5]">
            <Image
              src="/fotos/bandeja.jpg"
              alt="Bandeja de empanadas doradas recién horneadas"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-crema px-4 py-2 text-sm font-semibold shadow-lg">
              🔥 Recién salidas del horno
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-oliva">
              Empanadas artesanales · Recoleta
            </p>
            <h1 className="mt-3 font-titulo text-4xl font-bold leading-[1.1] text-rojo sm:text-5xl lg:text-6xl">
              El sabor de siempre, en cada repulgue.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed">
              ¿De carne cortada a cuchillo o de jamón y queso? Elegí tus favoritas y te las
              tenemos calentitas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="rounded-full bg-rojo px-8 py-4 text-center font-semibold text-white transition hover:bg-rojo-oscuro"
              >
                Pedir empanadas
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-tinta/15 px-8 py-4 font-semibold transition hover:border-oliva hover:text-oliva"
              >
                <WhatsappIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Datos clave, siempre visibles */}
        <section className="bg-rojo text-white">
          <ul className="mx-auto grid max-w-6xl gap-4 px-5 py-6 text-sm sm:grid-cols-3 sm:gap-6">
            <Dato titulo="Horarios">
              {local.horarios.map((h) => `${h.dias}: ${h.horas}`).join(" · ")}
            </Dato>
            <Dato titulo="Dónde estamos">
              {local.direccion}, {local.barrio}
            </Dato>
            <Dato titulo="Delivery">{local.delivery}</Dato>
          </ul>
        </section>

        {/* MENÚ */}
        <section id="menu" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Titulo
              kicker="Menú"
              titulo="Elegí tus favoritas"
              bajada="Todas al horno, todas hechas a mano. Tocá “Agregar” y armá tu pedido."
            />
            <Menu />
          </div>
        </section>

        {/* COMBOS */}
        <section id="combos" className="scroll-mt-20 bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.3fr] md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/fotos/relleno.jpg"
                alt="Empanadas abiertas mostrando el relleno"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <Titulo kicker="Combos" titulo="Porque una nunca alcanza" alinear="izquierda" />
              <ul className="space-y-3">
                {combos.map((c) => (
                  <li
                    key={c.nombre}
                    className={`flex items-center justify-between gap-4 rounded-2xl p-5 ${
                      c.destacado ? "bg-dorado/25 ring-2 ring-dorado" : "border border-tinta/10 bg-crema"
                    }`}
                  >
                    <div>
                      <h3 className="font-titulo text-xl font-semibold">{c.nombre}</h3>
                      <p className="text-sm text-tinta/70">{c.detalle}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-oliva">
                        {c.nota}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-titulo text-xl font-bold text-rojo tabular-nums">
                        {formatPrecio(c.precio)}
                      </p>
                      <a
                        href={whatsappLink(`¡Hola La Esquina! Quiero pedir el combo "${c.nombre}".`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block rounded-full bg-rojo px-4 py-2 text-sm font-semibold text-white transition hover:bg-rojo-oscuro"
                      >
                        Pedir
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl md:order-2">
              <Image
                src="/fotos/repulgue.jpg"
                alt="Empanadas crudas con repulgue hecho a mano, listas para el horno"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <Titulo kicker="Nosotros" titulo="Una esquina con olor a horno" alinear="izquierda" />
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Somos una casa de empanadas de Recoleta. Todos los días amasamos, rellenamos y
                  repulgamos a mano. Sin congelados, sin vueltas.
                </p>
                <p>
                  Estamos a pocas cuadras del Cementerio y de Plaza Francia. Si venís de pasear,
                  pasá a buscar unas calentitas.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {resenas.map((r) => (
                  <li key={r.autor} className="rounded-2xl bg-white p-4 text-sm">
                    <p className="text-dorado">★★★★★</p>
                    <p className="mt-2 leading-snug">“{r.texto}”</p>
                    <p className="mt-2 font-semibold">{r.autor}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* UBICACIÓN Y HORARIOS */}
        <section id="ubicacion" className="scroll-mt-20 bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.3fr]">
            <div>
              <Titulo kicker="Ubicación y horarios" titulo="Vení a buscarlas" alinear="izquierda" />
              <div className="space-y-6">
                <Info titulo="Dirección">
                  {local.direccion}
                  <br />
                  {local.barrio}
                </Info>
                <Info titulo="Horarios">
                  {local.horarios.map((h) => (
                    <span key={h.dias} className="block">
                      {h.dias} · <strong>{h.horas}</strong>
                    </span>
                  ))}
                </Info>
                <Info titulo="Delivery">{local.delivery}</Info>
              </div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rojo px-8 py-4 font-semibold text-white transition hover:bg-rojo-oscuro sm:w-auto"
              >
                <WhatsappIcon />
                Escribinos por WhatsApp
              </a>
            </div>
            <div className="min-h-80 overflow-hidden rounded-3xl border border-tinta/10">
              <iframe
                title="Mapa de La Esquina en Recoleta"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${local.direccion}, Recoleta, Buenos Aires`
                )}&z=16&output=embed`}
                className="h-full min-h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-rojo pb-28 pt-12 text-crema md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
          <Logo grande />
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:underline">Instagram</a>
            <a href={whatsappLink()} className="hover:underline">WhatsApp</a>
          </div>
          <p className="text-xs text-crema/70">© {new Date().getFullYear()} La Esquina · Recoleta</p>
        </div>
      </footer>
    </CartProvider>
  );
}

function Titulo({
  kicker,
  titulo,
  bajada,
  alinear = "centro",
}: {
  kicker: string;
  titulo: string;
  bajada?: string;
  alinear?: "centro" | "izquierda";
}) {
  return (
    <div className={`mb-8 md:mb-10 ${alinear === "centro" ? "mx-auto max-w-xl text-center" : ""}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-oliva">{kicker}</p>
      <h2 className="mt-2 font-titulo text-3xl font-bold leading-tight text-rojo sm:text-4xl">
        {titulo}
      </h2>
      {bajada && <p className="mt-3 text-lg text-tinta/80">{bajada}</p>}
    </div>
  );
}

function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <li>
      <p className="font-titulo text-xs font-semibold uppercase tracking-wider text-crema/75">{titulo}</p>
      <p className="mt-0.5 text-crema">{children}</p>
    </li>
  );
}

function Info({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-dorado pl-4">
      <p className="font-titulo text-sm font-semibold uppercase tracking-wider text-oliva">{titulo}</p>
      <p className="mt-1 text-lg leading-relaxed">{children}</p>
    </div>
  );
}
