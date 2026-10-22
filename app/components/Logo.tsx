/** Logo de La Esquina según el manual: bloque rojo con texto crema. No estirar ni cambiar colores. */
export default function Logo({ grande = false }: { grande?: boolean }) {
  return (
    <span
      className={`inline-flex flex-col items-center bg-rojo text-crema ${
        grande ? "px-8 py-5" : "px-3.5 py-2"
      }`}
    >
      <span
        className={`font-titulo font-bold leading-none tracking-wide ${
          grande ? "text-4xl" : "text-lg"
        }`}
      >
        LA ESQUINA
      </span>
      <span
        className={`uppercase leading-none tracking-[0.12em] text-crema/85 ${
          grande ? "mt-2.5 text-xs" : "mt-1 text-[8px]"
        }`}
      >
        Empanadas artesanales
      </span>
    </span>
  );
}
