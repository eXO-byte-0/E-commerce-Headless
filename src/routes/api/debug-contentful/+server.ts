import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const SPACE_ID = "ci2s3anww4fk";
  const ACCESS_TOKEN = "0D1fJmNGwu37Vi82AWUdKv_8gq1Nxi3DbPAavsu2OyU";

  try {
    // Liste tous les content types
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/content_types?access_token=${ACCESS_TOKEN}`
    );
    
    const data = await response.json();
    
    return json({
      success: true,
      contentTypes: data.items.map((type: any) => ({
        nom: type.name,
        id: type.sys.id,  // ← C'EST CET ID QU'IL FAUT COPIER
        champs: type.fields.map((f: any) => f.id)
      }))
    });
  } catch (error) {
    return json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
};