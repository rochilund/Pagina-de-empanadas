"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { empanadas, formatPrecio, WHATSAPP } from "../data";

type CartState = Record<string, number>;

type CartContextValue = {
  items: CartState;
  total: number;
  cantidad: number;
  agregar: (id: string) => void;
  quitar: (id: string) => void;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartState>({});
  const [abierto, setAbierto] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const cantidad = Object.values(items).reduce((a, b) => a + b, 0);
    const total = Object.entries(items).reduce((acc, [id, n]) => {
      const e = empanadas.find((x) => x.id === id);
      return acc + (e ? e.precio * n : 0);
    }, 0);
    return {
      items,
      total,
      cantidad,
      abierto,
      setAbierto,
      agregar: (id) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 })),
      quitar: (id) =>
        setItems((s) => {
          const n = (s[id] ?? 0) - 1;
          const next = { ...s };
          if (n <= 0) delete next[id];
          else next[id] = n;
          return next;
        }),
    };
  }, [items, abierto]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function CartButton() {
  const { cantidad, setAbierto } = useCart();
  return (
    <button
      onClick={() => setAbierto(true)}
      className="relative inline-flex items-center gap-2 rounded-full bg-tinta px-4 py-2 text-sm font-medium text-crema transition hover:bg-ladrillo"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      Pedido
      {cantidad > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-dorado px-1 text-xs font-semibold text-tinta">
          {cantidad}
        </span>
      )}
    </button>
  );
}

function CartDrawer() {
  const { items, total, cantidad, agregar, quitar, abierto, setAbierto } = useCart();
  const lineas = Object.entries(items)
    .map(([id, n]) => ({ e: empanadas.find((x) => x.id === id)!, n }))
    .filter((l) => l.e);

  const mensaje = encodeURIComponent(
    `¡Hola Recoleta Empanadas! Quiero pedir:\n${lineas
      .map((l) => `• ${l.n}x ${l.e.nombre}`)
      .join("\n")}\nTotal: ${formatPrecio(total)}`
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition ${abierto ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!abierto}
    >
      <div
        onClick={() => setAbierto(false)}
        className={`absolute inset-0 bg-tinta/40 backdrop-blur-sm transition-opacity duration-300 ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Tu pedido"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-papel shadow-2xl transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-tinta/10 px-6 py-5">
          <h2 className="font-serif text-2xl">Tu pedido</h2>
          <button
            onClick={() => setAbierto(false)}
            className="rounded-full p-2 text-tinta/60 transition hover:bg-tinta/5 hover:text-tinta"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lineas.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-tinta/50">
              <p>
                Todavía no agregaste empanadas.
                <br />
                <span className="font-serif italic">¿Arrancamos con una de carne?</span>
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-tinta/10">
              {lineas.map(({ e, n }) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{e.nombre}</p>
                    <p className="text-sm text-tinta/50">{formatPrecio(e.precio)} c/u</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => quitar(e.id)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-tinta/15 transition hover:border-tinta"
                      aria-label={`Quitar ${e.nombre}`}
                    >
                      −
                    </button>
                    <span className="w-5 text-center tabular-nums">{n}</span>
                    <button
                      onClick={() => agregar(e.id)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-tinta/15 transition hover:border-tinta"
                      aria-label={`Agregar ${e.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-tinta/10 px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-tinta/60">
              {cantidad} {cantidad === 1 ? "empanada" : "empanadas"}
            </span>
            <span className="font-serif text-2xl tabular-nums">{formatPrecio(total)}</span>
          </div>
          <a
            href={lineas.length ? `https://wa.me/${WHATSAPP}?text=${mensaje}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!lineas.length}
            className={`block w-full rounded-full py-3.5 text-center font-medium transition ${
              lineas.length
                ? "bg-terracota text-crema hover:bg-ladrillo"
                : "cursor-not-allowed bg-tinta/10 text-tinta/40"
            }`}
          >
            Enviar pedido por WhatsApp
          </a>
        </footer>
      </aside>
    </div>
  );
}
