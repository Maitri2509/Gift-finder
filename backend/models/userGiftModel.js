const supabase = require('../config/supabase');

const UserGiftModel = {
  // Save recommendations into user_gifts table
  async saveRecommendations({ user_id, gift_ids }) {
    if (!supabase) return [];
    if (!user_id || !Array.isArray(gift_ids) || gift_ids.length === 0) return [];

    try {
      const rows = gift_ids.map((gift_id) => ({
        user_id,
        gift_id,
      }));

      const { data, error } = await supabase
        .from('user_gifts')
        .insert(rows)
        .select();

      if (error) {
        console.error('[UserGiftModel:saveRecommendations error]:', error.message);
        return [];
      }

      return data || rows;
    } catch (err) {
      console.error('[UserGiftModel:saveRecommendations exception]:', err.message);
      return [];
    }
  },

  // Get gifts saved for a specific user
  async getByUserId(userId) {
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('user_gifts')
        .select(`
          user_id,
          gift_id,
          gifts (
            id,
            name,
            price,
            image
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      return (data || []).map((row) => ({
        user_id: row.user_id,
        gift_id: row.gift_id,
        gift_name: row.gifts?.name,
        name: row.gifts?.name,
        price: row.gifts?.price,
        image: row.gifts?.image,
        image_url: row.gifts?.image,
      }));
    } catch (err) {
      console.error('[UserGiftModel:getByUserId error]:', err.message);
      return [];
    }
  },

  // Get all user gift recommendation history
  async getAll() {
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('user_gifts')
        .select(`
          user_id,
          gift_id,
          users (
            id,
            name,
            occasion,
            relationship,
            budget
          ),
          gifts (
            id,
            name,
            price,
            image
          )
        `);

      if (error) throw error;

      return (data || []).map((row) => ({
        user_id: row.user_id,
        user_name: row.users?.name || 'Guest User',
        occasion: row.users?.occasion,
        relationship: row.users?.relationship,
        budget: row.users?.budget,
        gift_id: row.gift_id,
        gift_name: row.gifts?.name,
        price: row.gifts?.price,
        image: row.gifts?.image,
      }));
    } catch (err) {
      console.error('[UserGiftModel:getAll error]:', err.message);
      return [];
    }
  },
};

module.exports = UserGiftModel;
