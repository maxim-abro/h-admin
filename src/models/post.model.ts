import type { ShopModel } from "@/models/shop.model";

type PostModel = {
  id?: number;
  uin?: string;
  title: string;
  description: string;
  type: string;
  shopUin: string;
  endDate: string;
  url: string;
  code: string;
  query: string;
  rating: number;
  category: string;
  shop?: ShopModel;
  recomended: number | boolean;
  counter: number;
};

export type { PostModel };
