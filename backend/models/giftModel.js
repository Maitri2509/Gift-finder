const supabase = require('../config/supabase');

function getBudgetPriceRange(budgetLabel) {
  if (!budgetLabel) return null;
  if (typeof budgetLabel === 'number') {
    return { min: 0, max: budgetLabel };
  }
  const label = String(budgetLabel).trim();
  if (label.includes('Under') || (label.includes('1,000') && !label.includes('2,500'))) {
    return { min: 0, max: 1000 };
  }
  if (label.includes('1,000 – ₹2,500') || (label.includes('1,000') && label.includes('2,500'))) {
    return { min: 999, max: 2500 };
  }
  if (label.includes('2,500 – ₹5,000') || (label.includes('2,500') && label.includes('5,000'))) {
    return { min: 2499, max: 5000 };
  }
  if (label.includes('5,000+') || label.includes('5000')) {
    return { min: 5000, max: 999999 };
  }
  const digits = label.replace(/[^\d.]/g, '');
  if (digits) {
    const num = Number(digits);
    return { min: 0, max: num };
  }
  return null;
}

const GiftModel = {
  // Get all gifts with linked categories
  async getAll({ minPrice, maxPrice, search } = {}) {
    if (!supabase) return [];

    try {
      // 1. Fetch gifts
      let query = supabase.from('gifts').select('*').order('id', { ascending: true });

      if (minPrice != null && !isNaN(Number(minPrice))) {
        query = query.gte('price', Number(minPrice));
      }
      if (maxPrice != null && !isNaN(Number(maxPrice))) {
        query = query.lte('price', Number(maxPrice));
      }

      const { data: gifts, error: giftError } = await query;
      if (giftError) throw giftError;
      if (!gifts || gifts.length === 0) return [];

      // 2. Fetch linked categories for all gifts
      const { data: giftCats } = await supabase
        .from('gift_categories')
        .select('gift_id, category_id, categories(id, name)');

      const catMap = {};
      if (Array.isArray(giftCats)) {
        giftCats.forEach((gc) => {
          if (!catMap[gc.gift_id]) catMap[gc.gift_id] = [];
          if (gc.categories && gc.categories.name) {
            catMap[gc.gift_id].push(gc.categories.name);
          }
        });
      }

      // 3. Format and normalize gifts
      const formatted = gifts.map((g) => {
        const categories = catMap[g.id] || [];
        return {
          id: g.id,
          gift_id: g.id,
          name: g.name,
          gift_name: g.name,
          title: g.name,
          price: Number(g.price),
          image: g.image,
          image_url: g.image,
          created_at: g.created_at,
          categories: categories.join(', '),
          tags: categories.length > 0 ? categories : ['Curated', 'Gift'],
          description: `${g.name} - Handpicked gift recommendation`,
          why: `Curated choice for your recipient`,
        };
      });

      if (search) {
        const s = search.toLowerCase();
        return formatted.filter(
          (g) =>
            g.name.toLowerCase().includes(s) ||
            g.categories.toLowerCase().includes(s)
        );
      }

      return formatted;
    } catch (err) {
      console.error('[GiftModel:getAll error]:', err.message);
      return [];
    }
  },

  // Get single gift by ID
  async getById(id) {
    if (!supabase) return null;

    try {
      const { data: gift, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!gift) return null;

      // Fetch categories
      const { data: giftCats } = await supabase
        .from('gift_categories')
        .select('category_id, categories(id, name)')
        .eq('gift_id', id);

      const categories = (giftCats || [])
        .map((gc) => gc.categories?.name)
        .filter(Boolean);

      return {
        id: gift.id,
        gift_id: gift.id,
        name: gift.name,
        gift_name: gift.name,
        title: gift.name,
        price: Number(gift.price),
        image: gift.image,
        image_url: gift.image,
        created_at: gift.created_at,
        categories: categories.join(', '),
        tags: categories.length > 0 ? categories : ['Curated', 'Gift'],
        description: `${gift.name} - Handpicked gift recommendation`,
        why: `Curated choice for your recipient`,
      };
    } catch (err) {
      console.error('[GiftModel:getById error]:', err.message);
      return null;
    }
  },

  // Add new gift
  async create({ name, gift_name, price, image, image_url, category_ids = [] }) {
    if (!supabase) throw new Error('Supabase client not initialized');

    const finalName = name || gift_name;
    const finalImage = image || image_url;

    const { data: newGift, error } = await supabase
      .from('gifts')
      .insert([{
        name: finalName,
        price: Number(price),
        image: finalImage,
      }])
      .select()
      .single();

    if (error) throw error;

    if (Array.isArray(category_ids) && category_ids.length > 0) {
      const gcRows = category_ids.map((catId) => ({
        gift_id: newGift.id,
        category_id: catId,
      }));
      await supabase.from('gift_categories').insert(gcRows);
    }

    return this.getById(newGift.id);
  },

  // Update existing gift
  async update(id, { name, gift_name, price, image, image_url, category_ids }) {
    if (!supabase) throw new Error('Supabase client not initialized');

    const updatePayload = {};
    if (name || gift_name) updatePayload.name = name || gift_name;
    if (price != null) updatePayload.price = Number(price);
    if (image || image_url) updatePayload.image = image || image_url;

    if (Object.keys(updatePayload).length > 0) {
      const { error } = await supabase
        .from('gifts')
        .update(updatePayload)
        .eq('id', id);

      if (error) throw error;
    }

    if (Array.isArray(category_ids)) {
      await supabase.from('gift_categories').delete().eq('gift_id', id);
      if (category_ids.length > 0) {
        const gcRows = category_ids.map((catId) => ({
          gift_id: id,
          category_id: catId,
        }));
        await supabase.from('gift_categories').insert(gcRows);
      }
    }

    return this.getById(id);
  },

  // Recommendation engine: scores gifts against budget, occasion, relationship, and notes
  async recommend({ occasion, relationship, gender, budget, notes }) {
    const allGifts = await this.getAll();
    if (allGifts.length === 0) return [];

    const priceRange = getBudgetPriceRange(budget);
    const notesLower = (notes || '').toLowerCase();
    const noteWords = notesLower.split(/[\s,]+/).filter((w) => w.length > 2);

    const scored = allGifts.map((gift) => {
      let score = 0;
      const p = Number(gift.price);
      const catText = (gift.categories || '').toLowerCase();
      const nameText = (gift.name || '').toLowerCase();

      // Budget scoring
      if (priceRange) {
        if (p >= priceRange.min && p <= priceRange.max) {
          score += 6;
        } else if (p <= priceRange.max) {
          score += 3;
        }
      }

      // Occasion match in categories or name (+5)
      if (occasion) {
        const occ = occasion.toLowerCase();
        if (catText.includes(occ) || nameText.includes(occ)) {
          score += 5;
        }
      }

      // Relationship match in categories or name (+4)
      if (relationship) {
        const rel = relationship.toLowerCase();
        if (catText.includes(rel) || nameText.includes(rel)) {
          score += 4;
        }
      }

      // Gender preference (+3)
      if (gender && gender !== 'Unisex / Any') {
        const gen = gender.toLowerCase();
        if (catText.includes(gen) || nameText.includes(gen)) {
          score += 3;
        }
      }

      // Notes keyword matches (+2 each)
      for (const word of noteWords) {
        if (nameText.includes(word) || catText.includes(word)) {
          score += 2;
        }
      }

      return { gift, score };
    });

    const filtered = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.gift);

    if (filtered.length >= 4) {
      return filtered.slice(0, 12);
    }

    // Fallback: If strict score match produces fewer than 4, include other gifts within budget
    const seenIds = new Set(filtered.map((g) => g.id));
    const fallback = allGifts.filter((g) => {
      if (seenIds.has(g.id)) return false;
      if (priceRange) {
        return Number(g.price) <= priceRange.max * 1.25;
      }
      return true;
    });

    const combined = [...filtered, ...fallback];
    return combined.length > 0 ? combined.slice(0, 12) : allGifts.slice(0, 12);
  },
};

module.exports = GiftModel;
