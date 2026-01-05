export interface ContentfulItem {
  title: string;
  description?: string;
  price?: number;
  category?: string;
  gallery: string[];
}

export interface ContentfulResponse {
  items: any[];
  includes?: {
    Asset?: any[];
    Entry?: any[];
  };
}