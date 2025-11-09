export interface SearchProductType {
  keyword?: string;
  brand?: number[];
  category?: number[];
  price?: number[];
  [key: string]: any;
}
