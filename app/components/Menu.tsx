"use client";

import { useState } from "react";
import { categorias, empanadas, formatPrecio, type Categoria } from "../data";
import { useCart } from "./Cart";
import EmpanadaIcon from "./EmpanadaIcon";

export default function Menu() {
  const [filtro, setFiltro] = useState<Categoria | "Todas">("Todas");
  const { agregar, items } = useCart();

  const lista = filtro === "Todas" ? empanadas : empanadas.filter((e) => e.categoria === filtro);

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {(["Todas", ...categorias] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              filtro === c
                ? "border-tinta bg-tinta text-crema"
                : "border-tinta/15 text-tinta/70 hover:border-tinta/40 hover:text-tinta"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <li
            key={e.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-tinta/10 bg-papel p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(29,26,22,0.35)]"
          >
            {e.destacada && (
              <span className="absolute right-5 top-5 rounded-full bg-dorado/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ladrillo">
                Favorita
              </span>
            )}
            <div className="mb-4 grid h-36 place-items-center rounded-2xl bg-crema">
              <EmpanadaIcon
                marca={e.marca}
                className="h-24 w-auto transition duration-500 group-hover:-rotate-6 group-hover:scale-110"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-musgo">{e.categoria}</p>
            <h3 className="mt-1 font-serif text-2xl">{e.nombre}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta/65">{e.descripcion}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-serif text-xl tabular-nums">{formatPrecio(e.precio)}</span>
              <button
                onClick={() => agregar(e.id)}
                className="inline-flex items-center gap-2 rounded-full bg-terracota px-4 py-2 text-sm font-medium text-crema transition hover:bg-ladrillo active:scale-95"
              >
                {items[e.id] ? `Agregar (${items[e.id]})` : "Agregar"}
                <span aria-hidden>+</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
