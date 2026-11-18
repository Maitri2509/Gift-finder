const supabase = require('../config/supabase');

const CategoryModel = {
  // Get all categories with total gifts count
  async getAll() {
    if (!supabase) return [];

    try {
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });

      if (catError) throw catError;
      if (!categories || categories.length === 0) return [];

      // Fetch gift counts from junction table
      const { data: giftCats, error: gcError } = await supabase
        .from('gift_categories')
        .select('category_id');

      const countMap = {};
      if (!gcError && Array.isArray(giftCats)) {
        giftCats.forEach((gc) => {
          countMap[gc.category_id] = (countMap[gc.category_id] || 0) + 1;
        });
      }

      return categories.map((c) => ({
        id: c.id,
        category_id: c.id,
        name: c.name,
        category_name: c.name,
        total_gifts: countMap[c.id] || 0,
      }));
    } catch (err) {
      console.error('[CategoryModel:getAll error]:', err.message);
      return [];
    }
  },

  // Get category by ID
  async getById(id) {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data
        ? {
            id: data.id,
            category_id: data.id,
            name: data.name,
            category_name: data.name,
          }
        : null;
    } catch (err) {
      console.error('[CategoryModel:getById error]:', err.message);
      return null;
    }
  },

  // Create new category
  async create({ name }) {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: name.trim() }])
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      category_id: data.id,
      name: data.name,
      category_name: data.name,
    };
  },
};

module.exports = CategoryModel;
