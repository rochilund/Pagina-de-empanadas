export type Categoria = "Clásicas" | "Veggie" | "Especiales";

export type Empanada = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  favorita?: boolean;
};

export const empanadas: Empanada[] = [
  {
    id: "carne-cuchillo",
    nombre: "Carne cortada a cuchillo",
    descripcion: "Con cebolla de verdeo, huevo y aceituna. La que pide todo el mundo.",
    precio: 2400,
    categoria: "Clásicas",
    favorita: true,
  },
  {
    id: "carne-picante",
    nombre: "Carne picante",
    descripcion: "Pica, pero poquito. Con ají molido y pimentón ahumado.",
    precio: 2400,
    categoria: "Clásicas",
  },
  {
    id: "pollo",
    nombre: "Pollo",
    descripcion: "Pollo desmenuzado, morrón asado y verdeo.",
    precio: 2300,
    categoria: "Clásicas",
  },
  {
    id: "jamon-queso",
    nombre: "Jamón y queso",
    descripcion: "Jamón cocido y mucha muzzarella. Nunca falla.",
    precio: 2200,
    categoria: "Clásicas",
    favorita: true,
  },
  {
    id: "humita",
    nombre: "Humita",
    descripcion: "Choclo, zapallo y salsa blanca. Como la de la abuela.",
    precio: 2200,
    categoria: "Veggie",
    favorita: true,
  },
  {
    id: "caprese",
    nombre: "Caprese",
    descripcion: "Tomate, muzzarella y albahaca fresca.",
    precio: 2300,
    categoria: "Veggie",
  },
  {
    id: "verdura",
    nombre: "Verdura",
    descripcion: "Espinaca, ricota y un toque de nuez moscada.",
    precio: 2200,
    categoria: "Veggie",
  },
  {
    id: "cebolla-queso",
    nombre: "Cebolla y queso",
    descripcion: "Cebolla caramelizada con queso azul.",
    precio: 2500,
    categoria: "Veggie",
  },
  {
    id: "osobuco",
    nombre: "Osobuco al malbec",
    descripcion: "Cocinado 8 horas a fuego lento. Vale la espera.",
    precio: 2900,
    categoria: "Especiales",
  },
  {
    id: "bondiola",
    nombre: "Bondiola braseada",
    descripcion: "Bondiola desmechada con barbacoa casera.",
    precio: 2800,
    categoria: "Especiales",
  },
  {
    id: "hongos",
    nombre: "Hongos y brie",
    descripcion: "Hongos salteados, queso brie y un toque de trufa.",
    precio: 3000,
    categoria: "Especiales",
  },
  {
    id: "dulce",
    nombre: "Queso y dulce de leche",
    descripcion: "Para el final. Sí, es una empanada de postre.",
    precio: 2400,
    categoria: "Especiales",
  },
];

export const categorias: Categoria[] = ["Clásicas", "Veggie", "Especiales"];

export const combos = [
  { nombre: "Media docena", detalle: "6 empanadas a elección", precio: 13200, nota: "Ideal para dos" },
  { nombre: "Docena", detalle: "12 empanadas a elección", precio: 25000, nota: "La más pedida", destacado: true },
  { nombre: "Picnic", detalle: "6 empanadas + 2 bebidas", precio: 16500, nota: "Para llevar a Plaza Francia" },
];

export const local = {
  direccion: "Av. Pueyrredón 2100",
  barrio: "Recoleta, CABA",
  horarios: [
    { dias: "Lunes a jueves", horas: "11 a 23 h" },
    { dias: "Viernes a domingo", horas: "11 a 01 h" },
  ],
  delivery: "Recoleta, Barrio Norte, Palermo Chico y Retiro",
};

export const formatPrecio = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export const WHATSAPP = "5491100000000";

export const whatsappLink = (texto?: string) =>
  `https://wa.me/${WHATSAPP}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
