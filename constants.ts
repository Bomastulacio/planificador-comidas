import { Recipe, Exercise } from './types';

// Structured Ingredients with Categories
export const INGREDIENTS_LIST = [
  // 🍖 Proteínas
  { name: 'Huevos', category: 'protein' },
  { name: 'Pollo', category: 'protein' },
  { name: 'Atún', category: 'protein' },
  { name: 'Carne Roja Magra', category: 'protein' },
  { name: 'Jamón Cocido', category: 'protein' },
  
  // 🥦 Verduras
  { name: 'Lechuga', category: 'veggie' },
  { name: 'Tomate', category: 'veggie' },
  { name: 'Zanahoria', category: 'veggie' },
  { name: 'Cebolla', category: 'veggie' },
  { name: 'Morrón', category: 'veggie' },
  { name: 'Brócoli / Espinaca', category: 'veggie' },
  { name: 'Acelga', category: 'veggie' },
  { name: 'Calabaza / Zapallo', category: 'veggie' },
  { name: 'Palta', category: 'veggie' },

  // 🍞 Carbos y Despensa
  { name: 'Arroz', category: 'carb' },
  { name: 'Pasta Integral (Fideos)', category: 'carb' },
  { name: 'Avena', category: 'carb' },
  { name: 'Pan Integral', category: 'carb' },
  { name: 'Garbanzos / Lentejas', category: 'carb' },
  { name: 'Papa / Batata', category: 'carb' },
  { name: 'Tapas de Tarta', category: 'carb' },
  { name: 'Turrón / Barrita', category: 'carb' },
  { name: 'Galletas de Arroz', category: 'carb' },
  { name: 'Hummus', category: 'carb' },

  // 🥛 Lácteos y Frutas
  { name: 'Queso', category: 'dairy' },
  { name: 'Yogurt', category: 'dairy' },
  { name: 'Leche', category: 'dairy' },
  { name: 'Fruta Fresca', category: 'dairy' },
  { name: 'Frutos Secos', category: 'dairy' },
];

// Helper for backward compatibility or simple lists
export const COMMON_INGREDIENTS = INGREDIENTS_LIST.map(i => i.name);

export const RECIPES: Recipe[] = [
  // =================================================================
  // SNACKS (s1 - s10) - NUEVOS
  // =================================================================
  {
    id: 's1',
    name: 'Fruta Fresca (Pieza)',
    emoji: '🍎',
    type: 'snack',
    owner: 'Both',
    description: 'Manzana, Banana, Pera o Naranja.',
    ingredients: [
      { name: 'Fruta Fresca', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 's2',
    name: 'Yogur con Cereales/Granola',
    emoji: '🥣',
    type: 'snack',
    owner: 'Both',
    description: 'Pote de yogur con un puñado de cereales.',
    ingredients: [
      { name: 'Yogurt', quantity: 1, unit: 'unidad', category: 'Lácteos' },
      { name: 'Avena', quantity: 30, unit: 'g', category: 'Despensa' } // Proxy para granola
    ]
  },
  {
    id: 's3',
    name: 'Turrón o Barrita de Cereal',
    emoji: '🍫',
    type: 'snack',
    owner: 'Both',
    description: 'Clásico kiosquero bajo en calorías.',
    ingredients: [
      { name: 'Turrón / Barrita', quantity: 1, unit: 'unidad', category: 'Despensa' }
    ]
  },
  {
    id: 's4',
    name: 'Puñado de Frutos Secos',
    emoji: '🥜',
    type: 'snack',
    owner: 'Both',
    description: 'Nueces, almendras o mix energético.',
    ingredients: [
      { name: 'Frutos Secos', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 's5',
    name: 'Tostada con Queso y Mermelada',
    emoji: '🍞',
    type: 'snack',
    owner: 'Both',
    description: '1 Tostada de pan integral con queso untable.',
    ingredients: [
      { name: 'Pan Integral', quantity: 1, unit: 'rebanada', category: 'Despensa' },
      { name: 'Queso', quantity: 30, unit: 'g', category: 'Lácteos' }
    ]
  },
  {
    id: 's6',
    name: 'Galletas de Arroz con Queso',
    emoji: '🍘',
    type: 'snack',
    owner: 'Both',
    description: '2 Galletas de arroz con queso untable.',
    ingredients: [
      { name: 'Galletas de Arroz', quantity: 2, unit: 'unidades', category: 'Despensa' },
      { name: 'Queso', quantity: 30, unit: 'g', category: 'Lácteos' }
    ]
  },
  {
    id: 's7',
    name: 'Huevo Duro',
    emoji: '🥚',
    type: 'snack',
    owner: 'Both',
    description: 'Proteína pura y rápida.',
    ingredients: [
      { name: 'Huevos', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },

  // =================================================================
  // DESAYUNOS (b1 - b10)
  // =================================================================
  {
    id: 'b1',
    name: 'Huevos Revueltos Clásicos',
    emoji: '🍳',
    type: 'breakfast',
    owner: 'Both',
    description: '2 huevos c/u + 1 tostada integral',
    ingredients: [
      { name: 'Huevos', quantity: 4, unit: 'unidades', category: 'Mercado' },
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' }
    ]
  },
  {
    id: 'b2',
    name: 'Porridge de Avena y Fruta',
    emoji: '🥣',
    type: 'breakfast',
    owner: 'Both',
    description: 'Avena cocida con leche/agua y fruta fresca',
    ingredients: [
      { name: 'Avena', quantity: 100, unit: 'g', category: 'Despensa' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Frutos Secos', quantity: 20, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b3',
    name: 'Pancakes de Avena y Huevo',
    emoji: '🥞',
    type: 'breakfast',
    owner: 'Both',
    description: 'Licuar avena, huevo y chorrito de leche/agua',
    ingredients: [
      { name: 'Avena', quantity: 80, unit: 'g', category: 'Despensa' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Fruta Fresca', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'b4',
    name: 'Tostadón con Huevo y Palta',
    emoji: '🥑',
    type: 'breakfast',
    owner: 'Both',
    description: 'Pan tostado, palta pisada y huevo poché o revuelto',
    ingredients: [
      { name: 'Pan Integral', quantity: 2, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Huevos', quantity: 4, unit: 'unidades', category: 'Mercado' },
      { name: 'Palta', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'b5',
    name: 'Bowl de Yogurt y Granola',
    emoji: '🥛',
    type: 'breakfast',
    owner: 'Both',
    description: 'Yogurt natural con fruta y frutos secos',
    ingredients: [
      { name: 'Yogurt', quantity: 400, unit: 'g', category: 'Lácteos' },
      { name: 'Fruta Fresca', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Frutos Secos', quantity: 30, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'b6',
    name: 'Tostadas con Queso y Mermelada Light',
    emoji: '🍞',
    type: 'breakfast',
    owner: 'Both',
    description: 'Clásico rápido y liviano',
    ingredients: [
      { name: 'Pan Integral', quantity: 4, unit: 'rebanadas', category: 'Despensa' },
      { name: 'Queso', quantity: 100, unit: 'g', category: 'Lácteos' },
      { name: 'Fruta Fresca', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },

  // =================================================================
  // ALMUERZOS Y CENAS - BASICOS Y RAPIDOS (l1 - l15)
  // =================================================================
  {
    id: 'l1',
    name: 'Pollo Grillé con Ensalada Mixta',
    emoji: '🥗',
    type: 'lunch',
    owner: 'Both',
    description: 'Pechuga a la plancha con lechuga, tomate y zanahoria',
    ingredients: [
      { name: 'Pollo', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Lechuga', quantity: 1, unit: 'planta', category: 'Mercado' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Zanahoria', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l2',
    name: 'Pollo a la Plancha con Arroz',
    emoji: '🍚',
    type: 'lunch',
    owner: 'Both',
    description: 'Básico infalible de pre-entreno',
    ingredients: [
      { name: 'Pollo', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Arroz', quantity: 150, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l3',
    name: 'Arroz con Atún (La Vieja Confiable)',
    emoji: '🐟',
    type: 'lunch',
    owner: 'Both',
    description: 'Arroz blanco mezclado con atún al natural',
    ingredients: [
      { name: 'Arroz', quantity: 150, unit: 'g', category: 'Despensa' },
      { name: 'Atún', quantity: 2, unit: 'latas', category: 'Despensa' }
    ]
  },
  {
    id: 'l4',
    name: 'Wraps de Pollo y Vegetales',
    emoji: '🌯',
    type: 'lunch',
    owner: 'Both',
    description: 'Tortillas de trigo rellenas de pollo salteado y verduras',
    ingredients: [
      { name: 'Pollo', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Pan Integral', quantity: 4, unit: 'tortillas', category: 'Despensa' },
      { name: 'Lechuga', quantity: 1, unit: 'planta', category: 'Mercado' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l5',
    name: 'Omelette de Jamón y Queso',
    emoji: '🍳',
    type: 'dinner',
    owner: 'Both',
    description: 'Cena rápida alta en proteína',
    ingredients: [
      { name: 'Huevos', quantity: 5, unit: 'unidades', category: 'Mercado' },
      { name: 'Jamón Cocido', quantity: 100, unit: 'g', category: 'Carnicería' },
      { name: 'Queso', quantity: 80, unit: 'g', category: 'Lácteos' }
    ]
  },
  {
    id: 'l6',
    name: 'Ensalada Completa de Atún',
    emoji: '🥗',
    type: 'dinner',
    owner: 'Both',
    description: 'Atún, huevo duro, choclo, tomate y lechuga',
    ingredients: [
      { name: 'Atún', quantity: 2, unit: 'latas', category: 'Despensa' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Lechuga', quantity: 1, unit: 'planta', category: 'Mercado' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l7',
    name: 'Bife Magro con Puré de Calabaza',
    emoji: '🥩',
    type: 'dinner',
    owner: 'Both',
    description: 'Carne roja magra con puré dulce',
    ingredients: [
      { name: 'Carne Roja Magra', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Calabaza / Zapallo', quantity: 400, unit: 'g', category: 'Mercado' }
    ]
  },

  // =================================================================
  // ALMUERZOS Y CENAS - ARGENTINOS ELABORADOS (l18 - l40)
  // =================================================================
  {
    id: 'l18',
    name: 'Pastel de Papa Saludable',
    emoji: '🥧',
    type: 'lunch',
    owner: 'Both',
    description: 'Base de carne magra, puré de calabaza y papa gratinado.',
    ingredients: [
      { name: 'Carne Roja Magra', quantity: 400, unit: 'g', category: 'Carnicería' },
      { name: 'Papa / Batata', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Calabaza / Zapallo', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l19',
    name: 'Bife con Ensalada Rusa Fit',
    emoji: '🥩',
    type: 'lunch',
    owner: 'Both',
    description: 'Bife a la plancha con papa, zanahoria y arvejas (mayo light).',
    ingredients: [
      { name: 'Carne Roja Magra', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Papa / Batata', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Zanahoria', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l20',
    name: 'Calabaza Rellena con Carne',
    emoji: '🎃',
    type: 'dinner',
    owner: 'Both',
    description: 'Media calabaza rellena de carne picada y queso.',
    ingredients: [
      { name: 'Calabaza / Zapallo', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Carne Roja Magra', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Queso', quantity: 80, unit: 'g', category: 'Lácteos' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l21',
    name: 'Milanesa de Pollo con Puré Mixto',
    emoji: '🍗',
    type: 'lunch',
    owner: 'Both',
    description: 'Milanesa al horno con puré de papa y calabaza.',
    ingredients: [
      { name: 'Pollo', quantity: 350, unit: 'g', category: 'Carnicería' }, // Milanesas
      { name: 'Papa / Batata', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Calabaza / Zapallo', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Huevos', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l22',
    name: 'Wok de Pollo, Arroz y Vegetales',
    emoji: '🥢',
    type: 'lunch',
    owner: 'Both',
    description: 'Salteado estilo oriental con salsa de soja.',
    ingredients: [
      { name: 'Pollo', quantity: 300, unit: 'g', category: 'Carnicería' },
      { name: 'Brócoli / Espinaca', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Zanahoria', quantity: 2, unit: 'unidades', category: 'Mercado' },
      { name: 'Arroz', quantity: 150, unit: 'g', category: 'Despensa' }
    ]
  },
  {
    id: 'l23',
    name: 'Pechuga con Batatas al Horno',
    emoji: '🍠',
    type: 'dinner',
    owner: 'Both',
    description: 'Pechuga grillada con bastones de batata crocantes.',
    ingredients: [
      { name: 'Pollo', quantity: 350, unit: 'g', category: 'Carnicería' },
      { name: 'Papa / Batata', quantity: 300, unit: 'g', category: 'Mercado' } // Batata
    ]
  },
  {
    id: 'l24',
    name: 'Fideos Integrales a la Boloñesa',
    emoji: '🍝',
    type: 'lunch',
    owner: 'Both',
    description: 'Con carne picada magra y salsa de tomate casera.',
    ingredients: [
      { name: 'Pasta Integral (Fideos)', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Carne Roja Magra', quantity: 250, unit: 'g', category: 'Carnicería' },
      { name: 'Tomate', quantity: 3, unit: 'unidades', category: 'Mercado' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l25',
    name: 'Pasta con Brócoli, Ajo y Pollo',
    emoji: '🥦',
    type: 'lunch',
    owner: 'Both',
    description: 'Salteado liviano sin crema.',
    ingredients: [
      { name: 'Pasta Integral (Fideos)', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Brócoli / Espinaca', quantity: 250, unit: 'g', category: 'Mercado' },
      { name: 'Pollo', quantity: 200, unit: 'g', category: 'Carnicería' }
    ]
  },
  {
    id: 'l26',
    name: 'Fideos con Atún y Tomate',
    emoji: '🐟',
    type: 'dinner',
    owner: 'Both',
    description: 'Salsa rápida de tomate natural y atún.',
    ingredients: [
      { name: 'Pasta Integral (Fideos)', quantity: 200, unit: 'g', category: 'Despensa' },
      { name: 'Atún', quantity: 170, unit: 'g', category: 'Despensa' },
      { name: 'Tomate', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l27',
    name: 'Guiso de Lentejas Argentino',
    emoji: '🍲',
    type: 'lunch',
    owner: 'Both',
    description: 'Con trocitos de carne magra, papa y calabaza.',
    ingredients: [
      { name: 'Garbanzos / Lentejas', quantity: 250, unit: 'g', category: 'Despensa' },
      { name: 'Carne Roja Magra', quantity: 200, unit: 'g', category: 'Carnicería' },
      { name: 'Papa / Batata', quantity: 150, unit: 'g', category: 'Mercado' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' },
      { name: 'Tomate', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l28',
    name: 'Tortilla de Papa y Espinaca',
    emoji: '🍳',
    type: 'dinner',
    owner: 'Both',
    description: 'Hecha al horno para reducir aceite, alta y esponjosa.',
    ingredients: [
      { name: 'Papa / Batata', quantity: 300, unit: 'g', category: 'Mercado' },
      { name: 'Brócoli / Espinaca', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Huevos', quantity: 5, unit: 'unidades', category: 'Mercado' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l29',
    name: 'Hamburguesas Caseras de Garbanzo',
    emoji: '🍔',
    type: 'dinner',
    owner: 'Both',
    description: 'Procesar garbanzos con condimentos y arroz.',
    ingredients: [
      { name: 'Garbanzos / Lentejas', quantity: 300, unit: 'g', category: 'Despensa' },
      { name: 'Arroz', quantity: 50, unit: 'g', category: 'Despensa' },
      { name: 'Lechuga', quantity: 1, unit: 'planta', category: 'Mercado' }
    ]
  },
  {
    id: 'l30',
    name: 'Revuelto Gramajo Fit',
    emoji: '🍟',
    type: 'dinner',
    owner: 'Both',
    description: 'Huevo revuelto, jamón, arvejas y papas al horno (no fritas).',
    ingredients: [
      { name: 'Huevos', quantity: 4, unit: 'unidades', category: 'Mercado' },
      { name: 'Papa / Batata', quantity: 200, unit: 'g', category: 'Mercado' },
      { name: 'Jamón Cocido', quantity: 100, unit: 'g', category: 'Carnicería' },
      { name: 'Zanahoria', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l31',
    name: 'Tarta de Acelga y Huevo',
    emoji: '🥬',
    type: 'lunch',
    owner: 'Both',
    description: 'Tarta pascualina con masa integral si es posible.',
    ingredients: [
      { name: 'Tapas de Tarta', quantity: 1, unit: 'unidad', category: 'Despensa' },
      { name: 'Acelga', quantity: 1, unit: 'atado', category: 'Mercado' },
      { name: 'Huevos', quantity: 3, unit: 'unidades', category: 'Mercado' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', category: 'Mercado' }
    ]
  },
  {
    id: 'l32',
    name: 'Tarta de Jamón y Queso',
    emoji: '🧀',
    type: 'lunch',
    owner: 'Both',
    description: 'Clásica tarta de J&Q con huevo batido.',
    ingredients: [
      { name: 'Tapas de Tarta', quantity: 1, unit: 'unidad', category: 'Despensa' },
      { name: 'Jamón Cocido', quantity: 150, unit: 'g', category: 'Carnicería' },
      { name: 'Queso', quantity: 150, unit: 'g', category: 'Lácteos' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' }
    ]
  },
  {
    id: 'l33',
    name: 'Tarta de Calabaza y Choclo',
    emoji: '🌽',
    type: 'lunch',
    owner: 'Both',
    description: 'Relleno suave de calabaza pisada y granos de choclo.',
    ingredients: [
      { name: 'Tapas de Tarta', quantity: 1, unit: 'unidad', category: 'Despensa' },
      { name: 'Calabaza / Zapallo', quantity: 400, unit: 'g', category: 'Mercado' },
      { name: 'Queso', quantity: 50, unit: 'g', category: 'Lácteos' },
      { name: 'Huevos', quantity: 2, unit: 'unidades', category: 'Mercado' }
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