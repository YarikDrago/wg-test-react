export type TankData = {
  name: string;
  img: string;
  coef: number;
};

export const tanksData: TankData[] = [
  { name: 'KV-1/85', img: 'kv-1-85.png', coef: 3 },
  { name: 'Т-34', img: 'T-34.png', coef: 2 },
  { name: 'Т-150', img: 'T-150.png', coef: 1.4 },
  { name: 'ИС-3', img: 'IS-3.png', coef: 2.5 },
  { name: 'ST-1', img: 'ST-1.png', coef: 3.3 },
  { name: 'Object-752', img: 'Object_752.png', coef: 2.2 },
  { name: 'КВ-2', img: 'KV-2.png', coef: 2.7 },
  { name: 'VK 36.01 (H)', img: 'VK3601H.png', coef: 2.8 },
  { name: 'VK 16.02 Leopard', img: 'VK1602.png', coef: 3 },
  { name: 'AMX 50 B', img: 'AMX_50B.png', coef: 3 },
  { name: 'Centurion Mk. 7/1', img: 'GB24_Centurion_Mk3.png', coef: 1.9 },
  { name: 'Churchill VII', img: 'GB09_Churchill_VII.png', coef: 2.9 },
  { name: 'Hetzer', img: 'Hetzer.png', coef: 2.7 },
];

export const tankOptions = [
  { value: 1, label: 'Стандартная' },
  { value: 1.1, label: 'Элитная' },
  { value: 1.2, label: 'Премиум' },
];
