
import { TProducts } from '@/types';
import { createClient } from '@/utils/supabase/server';


class Products {
  async getAllProducts(): Promise<TProducts> {
    const supabase = createClient();
    try {
      const { error, data: products } = await supabase
        .from('products')
        .select()
        .order('id', { ascending: true });

      if (error) {
        throw new Error("couldn't read albums");
      }

      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const productsService = new Products();