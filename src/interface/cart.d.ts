import { IProduct } from './product';

export type CartType = IProduct & { quantity: number };
