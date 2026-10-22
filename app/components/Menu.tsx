"use client";

import { useState } from "react";
import { categorias, empanadas, formatPrecio, type Categoria } from "../data";
import { useCart } from "./Cart";

export default function Menu() {
  const [filtro, setFiltro] = useState<Categoria | "Todas">("Todas");
  const { agregar, quitar, items } = useCart();

  const lista = filtro === "Todas" ? empanadas : empanadas.filter((e) => e.categoria === filtro);

  return (
    <div>
      {/* En celular los filtros se deslizan horizontalmente */}
      <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:justify-center md:px-0">
        {(["Todas", ...categorias] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
              filtro === c
                ? "border-rojo bg-rojo text-white"
                : "border-tinta/20 bg-white text-tinta hover:border-rojo hover:text-rojo"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
        {lista.map((e) => {
          const n = items[e.id] ?? 0;
          return (
            <li
              key={e.id}
              className="flex items-center gap-4 rounded-2xl border border-tinta/10 bg-white p-4 transition hover:border-dorado md:p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-titulo text-lg font-semibold leading-tight">{e.nombre}</h3>
                  {e.favorita && (
                    <span className="rounded-full bg-dorado/25 px-2 py-0.5 text-[11px] font-semibold text-rojo">
                      Favorita
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-snug text-tinta/70">{e.descripcion}</p>
                <p className="mt-2 font-titulo font-semibold text-rojo tabular-nums">
                  {formatPrecio(e.precio)}
                </p>
              </div>

              {n === 0 ? (
                <button
                  onClick={() => agregar(e.id)}
                  className="shrink-0 rounded-full bg-rojo px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rojo-oscuro active:scale-95"
                  aria-label={`Agregar ${e.nombre}`}
                >
                  Agregar
                </button>
              ) : (
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-rojo p-1 text-white">
                  <button
                    onClick={() => quitar(e.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-lg transition hover:bg-white/15"
                    aria-label={`Quitar ${e.nombre}`}
                  >
                    −
                  </button>
                  <span className="w-4 text-center font-semibold tabular-nums">{n}</span>
                  <button
                    onClick={() => agregar(e.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-lg transition hover:bg-white/15"
                    aria-label={`Agregar otra ${e.nombre}`}
                  >
                    +
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
