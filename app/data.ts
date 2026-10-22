export type Categoria = "Clásicas" | "Vegetarianas" | "De autor";

export type Empanada = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  /** Color del repulgue / marca superior, para diferenciar sabores */
  marca: string;
  destacada?: boolean;
};

export const empanadas: Empanada[] = [
  {
    id: "carne-cuchillo",
    nombre: "Carne a cuchillo",
    descripcion: "Vacío cortado a mano, cebolla de verdeo, huevo, aceituna y comino.",
    precio: 2400,
    categoria: "Clásicas",
    marca: "#8e3b22",
    destacada: true,
  },
  {
    id: "carne-picante",
    nombre: "Carne picante",
    descripcion: "Carne suave con ají molido, pimentón ahumado y un toque de llajua.",
    precio: 2400,
    categoria: "Clásicas",
    marca: "#b5532f",
  },
  {
    id: "pollo",
    nombre: "Pollo al verdeo",
    descripcion: "Pollo desmenuzado, morrón asado, verdeo y crema de leche.",
    precio: 2300,
    categoria: "Clásicas",
    marca: "#c8913a",
  },
  {
    id: "jamon-queso",
    nombre: "Jamón y queso",
    descripcion: "Jamón cocido natural y muzzarella que se estira. La que nunca falla.",
    precio: 2200,
    categoria: "Clásicas",
    marca: "#e0a85a",
  },
  {
    id: "humita",
    nombre: "Humita",
    descripcion: "Choclo fresco, zapallo, cebolla, salsa blanca y un toque de albahaca.",
    precio: 2200,
    categoria: "Vegetarianas",
    marca: "#d9b13b",
    destacada: true,
  },
  {
    id: "caprese",
    nombre: "Caprese",
    descripcion: "Tomate confitado, muzzarella, albahaca fresca y oliva extra virgen.",
    precio: 2300,
    categoria: "Vegetarianas",
    marca: "#9b2f22",
  },
  {
    id: "verdura",
    nombre: "Espinaca & ricota",
    descripcion: "Espinaca salteada, ricota cremosa, nuez moscada y parmesano.",
    precio: 2200,
    categoria: "Vegetarianas",
    marca: "#4a5a3c",
  },
  {
    id: "cebolla-queso",
    nombre: "Cebolla & queso azul",
    descripcion: "Cebolla caramelizada lentamente con roquefort y nueces tostadas.",
    precio: 2500,
    categoria: "Vegetarianas",
    marca: "#6b5a7a",
  },
  {
    id: "osobuco",
    nombre: "Osobuco al malbec",
    descripcion: "Braseado 8 horas en malbec mendocino, con su propio jugo reducido.",
    precio: 2900,
    categoria: "De autor",
    marca: "#5a1f2a",
    destacada: true,
  },
  {
    id: "bondiola",
    nombre: "Bondiola braseada",
    descripcion: "Bondiola de cerdo desmechada, barbacoa casera y cebolla morada.",
    precio: 2800,
    categoria: "De autor",
    marca: "#7a3b1e",
  },
  {
    id: "hongos",
    nombre: "Hongos & trufa",
    descripcion: "Mix de hongos de pino y portobello, queso brie y aceite de trufa.",
    precio: 3000,
    categoria: "De autor",
    marca: "#3d3529",
  },
  {
    id: "dulce",
    nombre: "Dulce de leche & queso",
    descripcion: "El postre: queso fresco, dulce de leche repostero y azúcar impalpable.",
    precio: 2400,
    categoria: "De autor",
    marca: "#a86b32",
  },
];

export const categorias: Categoria[] = ["Clásicas", "Vegetarianas", "De autor"];

export const combos = [
  {
    nombre: "La docena",
    detalle: "12 empanadas a elección",
    precio: 25000,
    nota: "Ahorrás hasta $4.000",
  },
  {
    nombre: "Media docena",
    detalle: "6 empanadas a elección",
    precio: 13200,
    nota: "Ideal para dos",
    destacado: true,
  },
  {
    nombre: "Picnic en Plaza Francia",
    detalle: "6 empanadas + 2 bebidas + alfajor",
    precio: 17500,
    nota: "Sábados y domingos",
  },
];

export const formatPrecio = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export const WHATSAPP = "5491100000000";
