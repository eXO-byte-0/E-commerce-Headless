import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_CONTENT_TYPE } from '$env/static/private';

export interface ContentfulItem {
  title: string;
  description?: string;
  price?: number;
  category?: string;
  gallery: string[];
}

export async function getContentfulItems(): Promise<ContentfulItem[]> {
  const url = new URL(`https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries`);
  
  url.searchParams.append('access_token', CONTENTFUL_ACCESS_TOKEN);
  url.searchParams.append('content_type', CONTENTFUL_CONTENT_TYPE);
  url.searchParams.append('include', '2');

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => {
      const fields = item.fields;

      // Catégorie
      let category: string | undefined;
      if (fields.category?.sys?.id) {
        const categoryEntry = data.includes?.Entry?.find(
          (entry: any) => entry.sys.id === fields.category.sys.id
        );
        category = categoryEntry?.fields?.title || categoryEntry?.fields?.name;
      }

      // Galerie
      let gallery: string[] = [];
      if (fields.gallery && Array.isArray(fields.gallery)) {
        gallery = fields.gallery
          .map((mediaRef: any) => {
            const asset = data.includes?.Asset?.find(
              (a: any) => a.sys.id === mediaRef.sys.id
            );
            return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : null;
          })
          .filter((url): url is string => url !== null);
      }

      return {
        title: fields.title || 'Sans titre',
        description: fields.description,
        price: fields.price,
        category,
        gallery
      };
    });

  } catch (error) {
    console.error('❌ Erreur Contentful:', error);
    return [];
  }
}