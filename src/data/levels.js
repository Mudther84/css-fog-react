import { BASE } from './levelsBase';
import { MORE } from './levelsMore';
/* the mini project + final challenge stay last */
export const LV = [...BASE.slice(0, -2), ...MORE, ...BASE.slice(-2)];
