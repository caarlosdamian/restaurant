export type Menutype = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type Product = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};
export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  createdAt: Date;
  products: object[];
  status: string;
  intent_id: string;
};
