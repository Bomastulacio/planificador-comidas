import { Recipe, Exercise } from './types';

export const COMMON_INGREDIENTS = [
  'Huevos', 'Pollo', 'Avena', 'Palta', 
  'Atún', 'Arroz', 'Pan Integral', 'Lentejas', 
  'Yogurt', 'Fruta Fresca', 'Queso', 'Espinaca',
  'Quinoa', 'Tomate', 'Hummus', 'Nueces'
];

export const RECIPES: Recipe[] = [
  // --- EXISTING BREAKFASTS ---
  {
    id: 'b1',
    name: 'Huevos Revueltos con Pan',
    emoji: '🍳',
    type: 'breakfast',
    owner: 'Both',
    description: '2 huevos c/u + 1 rebanada pan integral',
    ingredients: [
      { name: 'Huevos', quantity: 4, unit: 'unidades', category: 'Mercado' },
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' }
    ]
  },
  {
    id: 'b2',
    name: 'Avena con Frutas',
    emoji: '🥣',
    type: 'breakfast',
    owner: 'Agos',
    description: '40g avena + media manzana',
    ingredients: [
      { name: 'Avena', quantity: 40, unit: 'g', category: 'Despensa' },
      { name: 'Manzana', quantity: 0.5, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'b3',
    name: 'Sandwich de Jamón de Pavo',
    emoji: '🥪',
    type: 'breakfast',
    owner: 'Tomas',
    description: '2 rebanadas pan + 100g jamón',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Jamón de Pavo', quantity: 100, unit: 'g', category: 'Carnicería' }
    ]
  },

  // --- NEW BREAKFASTS (From PDF List) ---
  {
    id: 'b4',
    name: 'Tostada Huevo y Palta',
    emoji: '🥑',
    type: 'breakfast',
    owner: 'Both',
    description: '1 Tostada, 2 huevos, 1/2 palta',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Huevos', quantity: 4, unit: 'unidades', category: 'Mercado' },
      { name: 'Palta', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'b5',
    name: 'Bowl Yogurt Proteico',
    emoji: '🥣',
    type: 'breakfast',
    owner: 'Both',
    description: 'Yogurt, proteina, quinoa pop, castañas, fruta',
    ingredients: [
      { name: 'Yogurt Natural', quantity: 400, unit: 'g', category: 'Lácteos' },
      { name: 'Proteína/Albúmina', quantity: 2, unit: 'scoop', category: 'Despensa' },
      { name: 'Quinoa Pop', quantity: 40, unit: 'g', category: 'Despensa' },
      { name: 'Castañas', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b6',
    name: 'Pancake Avena y Banana',
    emoji: '🥞',
    type: 'breakfast',
    owner: 'Both',
    description: 'Avena, banana, mantequilla maní',
    ingredients: [
      { name: 'Avena', quantity: 80, unit: 'g', category: 'Despensa' },
      { name: 'Banana', quantity: 2, unit: 'unidad', category: 'Mercado' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Mantequilla de Maní', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b7',
    name: 'Budín Integral y Nueces',
    emoji: '🥮',
    type: 'breakfast',
    owner: 'Both',
    description: 'Porción de budín sarraceno con nueces y fruta',
    ingredients: [
      { name: 'Harina Sarraceno', quantity: 100, unit: 'g', category: 'Despensa' },
      { name: 'Nueces', quantity: 30, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b8',
    name: 'Tostada Queso y Cherry',
    emoji: '🧀',
    type: 'breakfast',
    owner: 'Both',
    description: 'Port salut, tomates cherry, almendras',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Queso Port Salut', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Tomates Cherry', quantity: 100, unit: 'g', category: 'Mercado' },
      { name: 'Almendras', quantity: 20, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b9',
    name: 'Barrita Proteica y Fruta',
    emoji: '🍫',
    type: 'snack',
    owner: 'Both',
    description: 'Barrita cereal proteica, fruta, nueces',
    ingredients: [
      { name: 'Barrita Proteica', quantity: 2, unit: 'unidades', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Nueces', quantity: 20, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b10',
    name: 'Chia Pudding',
    emoji: '🍮',
    type: 'breakfast',
    owner: 'Both',
    description: 'Semillas chia, proteína, mantequilla maní, fruta',
    ingredients: [
      { name: 'Semillas de Chia', quantity: 40, unit: 'g', category: 'Despensa' },
      { name: 'Leche/Bebida Veg', quantity: 300, unit: 'ml', category: 'Lácteos' },
      { name: 'Proteína', quantity: 2, unit: 'scoop', category: 'Despensa' },
      { name: 'Mantequilla de Maní', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b11',
    name: 'Porridge de Avena',
    emoji: '🍲',
    type: 'breakfast',
    owner: 'Both',
    description: 'Avena cocida, frutos secos, fruta',
    ingredients: [
      { name: 'Avena', quantity: 80, unit: 'g', category: 'Despensa' },
      { name: 'Leche', quantity: 300, unit: 'ml', category: 'Lácteos' },
      { name: 'Frutos Secos', quantity: 30, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b12',
    name: 'Galletas Proteicas',
    emoji: '🍪',
    type: 'snack',
    owner: 'Both',
    description: 'Galletitas integrales proteicas y fruta',
    ingredients: [
      { name: 'Galletas Proteicas', quantity: 4, unit: 'unidades', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b13',
    name: 'Tostada Ricota y Miel',
    emoji: '🍯',
    type: 'breakfast',
    owner: 'Both',
    description: 'Ricota magra, miel, fruta',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Ricota Magra', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Miel', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b14',
    name: 'Tostada Hummus y Palta',
    emoji: '🥑',
    type: 'breakfast',
    owner: 'Both',
    description: 'Hummus garbanzo, 1/2 palta',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Hummus', quantity: 60, unit: 'g', category: 'Mercado' },
      { name: 'Palta', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'b15',
    name: 'Bowl Fruta y Frutos Secos',
    emoji: '🍇',
    type: 'snack',
    owner: 'Both',
    description: 'Arándanos, frutillas, mango, frutos secos',
    ingredients: [
      { name: 'Mix Frutos Rojos/Mango', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Mix Frutos Secos', quantity: 50, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b16',
    name: 'Tostada Francesa',
    emoji: '🍞',
    type: 'breakfast',
    owner: 'Both',
    description: 'Huevo, pan integral, miel, fruta',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Miel', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'b17',
    name: 'Brownie Saludable',
    emoji: '🍫',
    type: 'snack',
    owner: 'Both',
    description: 'Brownie fit con nueces y fruta',
    ingredients: [
      { name: 'Cacao en Polvo', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Nueces', quantity: 20, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Harina de Avena', quantity: 50, unit: 'g', category: 'Despensa' }
    ]
  },

  // --- EXISTING LUNCH/DINNER ---
  {
    id: 'l1',
    name: 'Pechuga a la Plancha y Vegetales',
    emoji: '🍗',
    type: 'lunch',
    owner: 'Both',
    description: 'Tomas 180g, Agos 150g. Vegetales al gusto.',
    ingredients: [
      { name: 'Pechuga de Pollo', quantity: 330, unit: 'g', category: 'Carnicería' },
      { name: 'Mix Vegetales', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Aceite de Oliva', quantity: 10, unit: 'ml', category: 'Despensa' }
    ]
  },
  {
    id: 'l2',
    name: 'Carne Molida con Arroz',
    emoji: '🍚',
    type: 'lunch',
    owner: 'Both',
    description: 'Tomas 200g carne/100g arroz. Agos 150g carne/80g arroz.',
    ingredients: [
      { name: 'Carne Molida', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Arroz', quantity: 180, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l3',
    name: 'Ensalada César con Pollo',
    emoji: '🥗',
    type: 'lunch',
    owner: 'Agos',
    description: '150g pollo + lechuga + aderezo light',
    ingredients: [
      { name: 'Pechuga de Pollo', quantity: 150, unit: 'g', category: 'Carnicería' },
      { name: 'Lechuga', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Aderezo Light', quantity: 30, unit: 'ml', category: 'Despensa' }
    ]
  },

  // --- NEW LUNCH/DINNER (From PDF List) ---
  {
    id: 'l4',
    name: 'Ensalada Quinoa y Pollo',
    emoji: '🥗',
    type: 'lunch',
    owner: 'Both',
    description: 'Pollo, quinoa/arroz, tomates secos, rúcula, nueces',
    ingredients: [
      { name: 'Pechuga de Pollo', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Quinoa', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Tomates Desecados', quantity: 50, unit: 'g', category: 'Mercado' },
      { name: 'Rúcula', quantity: 1, unit: 'paquete', category: 'Mercado' },
      { name: 'Nueces', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l5',
    name: 'Sándwich Integral Completo',
    emoji: '🥪',
    type: 'lunch',
    owner: 'Both',
    description: 'Huevo, queso, hummus, champiñones, espinaca',
    ingredients: [
      { name: 'Pan Integral', quantity: 4, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Queso en Fetas', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Hummus', quantity: 50, unit: 'g', category: 'Mercado' },
      { name: 'Champiñones', quantity: 100, unit: 'g', category: 'Mercado' },
      { name: 'Espinaca', quantity: 100, unit: 'g', category: 'Mercado' }
    ]
  },
  {
    id: 'l6',
    name: 'Ensalada Trigo Burgol y Atún',
    emoji: '🐟',
    type: 'lunch',
    owner: 'Both',
    description: 'Atún, trigo burgol, palta, mango, cherrys, almendras',
    ingredients: [
      { name: 'Atún al natural', quantity: 2, unit: 'latas', category: 'Despensa' },
      { name: 'Trigo Burgol', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Palta', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Mango', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Tomates Cherry', quantity: 150, unit: 'g', category: 'Mercado' },
      { name: 'Almendras', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l7',
    name: 'Wok Arroz Yamaní y Pollo',
    emoji: '🍛',
    type: 'lunch',
    owner: 'Both',
    description: 'Pollo, arroz yamaní, verduras wok, semillas zapallo',
    ingredients: [
      { name: 'Pechuga de Pollo', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Arroz Yamaní', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Mix Vegetales Wok', quantity: 400, unit: 'g', category: 'Mercado' },
      { name: 'Semillas de Zapallo', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l8',
    name: 'Milanesa Pollo y Repollo',
    emoji: '🍗',
    type: 'lunch',
    owner: 'Both',
    description: 'Milanesa al horno, repollo, berenjena',
    ingredients: [
      { name: 'Milanesa de Pollo', quantity: 4, unit: 'unidades', category: 'Carnicería' },
      { name: 'Repollo', quantity: 0.5, unit: 'unidad', category: 'Mercado' },
      { name: 'Berenjena', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l9',
    name: 'Ensalada Lentejas y Arroz',
    emoji: '🥗',
    type: 'lunch',
    owner: 'Both',
    description: 'Lentejas, arroz integral, rúcula, tomate, zucchini',
    ingredients: [
      { name: 'Lentejas', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Arroz Integral', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Rúcula', quantity: 1, unit: 'paquete', category: 'Mercado' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Zucchini', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l10',
    name: 'Hamburguesa Quinoa',
    emoji: '🍔',
    type: 'lunch',
    owner: 'Both',
    description: 'Hamburguesas quinoa, vegetales grillados, huevo duro',
    ingredients: [
      { name: 'Hamburguesa Quinoa', quantity: 4, unit: 'unidades', category: 'Despensa' },
      { name: 'Vegetales Grillados', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l11',
    name: 'Ensalada Garbanzos Crocantes',
    emoji: '🥙',
    type: 'lunch',
    owner: 'Both',
    description: 'Garbanzos, arroz, tomate, lechuga, chía',
    ingredients: [
      { name: 'Garbanzos', quantity: 250, unit: 'g', category: 'Despensa' },
      { name: 'Arroz', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Lechuga', quantity: 1, unit: 'planta', category: 'Mercado' },
      { name: 'Semillas de Chia', quantity: 20, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l12',
    name: 'Omelette Port Salut',
    emoji: '🍳',
    type: 'dinner',
    owner: 'Both',
    description: 'Huevos, queso, espinaca, cherry, girasol',
    ingredients: [
      { name: 'Huevos', quantity: 6, unit: 'unidades', category: 'Mercado' },
      { name: 'Queso Port Salut', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Espinaca', quantity: 100, unit: 'g', category: 'Mercado' },
      { name: 'Tomates Cherry', quantity: 100, unit: 'g', category: 'Mercado' },
      { name: 'Semillas Girasol', quantity: 20, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l13',
    name: 'Tarta Queso y Ricota',
    emoji: '🥧',
    type: 'dinner',
    owner: 'Both',
    description: 'Masa, cebolla, ricota, tomate, apio',
    ingredients: [
      { name: 'Tapa de Tarta', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Cebolla', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Ricota', quantity: 300, unit: 'g', category: 'Lácteos' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Queso', quantity: 100, unit: 'g', category: 'Lácteos' }
    ]
  },
  {
    id: 'l14',
    name: 'Tarta Calabaza y Roquefort',
    emoji: '🥧',
    type: 'dinner',
    owner: 'Both',
    description: 'Calabaza, morrones, queso roquefort',
    ingredients: [
      { name: 'Tapa de Tarta', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Calabaza', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Morrón Rojo', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Queso Roquefort', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Huevos', quantity: 3, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l15',
    name: 'Tacos Integrales Pollo',
    emoji: '🌮',
    type: 'dinner',
    owner: 'Both',
    description: 'Tortillas integrales, hummus, pollo, verduras',
    ingredients: [
      { name: 'Rapiditas Integrales', quantity: 6, unit: 'unidades', category: 'Despensa' },
      { name: 'Pechuga de Pollo', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Hummus', quantity: 100, unit: 'g', category: 'Mercado' },
      { name: 'Mix Vegetales', quantity: 300, unit: 'g', category: 'Mercado' }
    ]
  },
  {
    id: 'l16',
    name: 'Fideos con Lentejas',
    emoji: '🍝',
    type: 'dinner',
    owner: 'Both',
    description: 'Fideos integrales, lentejas, vegetales',
    ingredients: [
      { name: 'Fideos Integrales', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Lentejas', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Salsa de Tomate', quantity: 200, unit: 'ml', category: 'Despensa' },
      { name: 'Vegetales Picados', quantity: 200, unit: 'g', category: 'Mercado' }
    ]
  },
  {
    id: 'l17',
    name: 'Ensalada Caprese con Fideos',
    emoji: '🍜',
    type: 'dinner',
    owner: 'Both',
    description: 'Fideos integrales, cherrys, albahaca, bocconcinos',
    ingredients: [
      { name: 'Fideos Integrales', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Tomates Cherry', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Albahaca', quantity: 1, unit: 'atado', category: 'Mercado' },
      { name: 'Bocconcinos/Muzzarella', quantity: 150, unit: 'g', category: 'Lácteos' }
    ]
  },

  // --- EXISTING SNACKS (Re-added for context) ---
  {
    id: 's1',
    name: 'Yogurt Griego y Nueces',
    emoji: '🥛',
    type: 'snack',
    owner: 'Both',
    description: '1 taza yogurt + 15g nueces',
    ingredients: [
      { name: 'Yogurt Griego', quantity: 2, unit: 'taza', category: 'Lácteos' },
      { name: 'Nueces', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 's2',
    name: 'Batido de Proteína',
    emoji: '🥤',
    type: 'snack',
    owner: 'Tomas',
    description: '1 scoop whey protein',
    ingredients: [
      { name: 'Whey Protein', quantity: 1, unit: 'scoop', category: 'Despensa' }
    ]
  },

  // --- EXISTING DINNER ---
  {
    id: 'd1',
    name: 'Pescado al Horno',
    emoji: '🐟',
    type: 'dinner',
    owner: 'Both',
    description: 'Tomas 200g, Agos 150g',
    ingredients: [
      { name: 'Filete de Tilapia', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Espárragos', quantity: 200, unit: 'g', category: 'Mercado' }
    ]
  },
  {
    id: 'd2',
    name: 'Omelette de Claras',
    emoji: '🥚',
    type: 'dinner',
    owner: 'Both',
    description: '4 claras c/u + espinaca',
    ingredients: [
      { name: 'Huevos', quantity: 8, unit: 'unidades', category: 'Mercado' },
      { name: 'Espinaca', quantity: 100, unit: 'g', category: 'Mercado' }
    ]
  }
];

export const EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Sentadillas con Barra', category: 'Pierna', description: '4x12' },
  { id: 'e2', name: 'Press de Banca', category: 'Pecho', description: '4x10' },
  { id: 'e3', name: 'Peso Muerto', category: 'Espalda/Pierna', description: '3x8' },
  { id: 'e4', name: 'Press Militar', category: 'Hombro', description: '4x12' },
  { id: 'e5', name: 'Remo con Barra', category: 'Espalda', description: '4x12' },
  { id: 'e6', name: 'Zancadas', category: 'Pierna', description: '3x15 por pierna' },
  { id: 'e7', name: 'Plancha Abdominal', category: 'Core', description: '3x1 min' },
  { id: 'e8', name: 'Bicep Curl', category: 'Brazo', description: '3x12' },
  { id: 'e9', name: 'Tricep Pushdown', category: 'Brazo', description: '3x12' },
  { id: 'e10', name: 'Cardio HIIT', category: 'Cardio', description: '20 mins' },
];