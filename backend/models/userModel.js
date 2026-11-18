const supabase = require('../config/supabase');

function parseBudgetToNumeric(val) {
  if (val == null || val === '') return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  const str = String(val).trim();
  if (str.includes('Under') || (str.includes('1,000') && !str.includes('2,500'))) return 1000;
  if (str.includes('2,500')) return 2500;
  if (str.includes('5,000+')) return 10000;
  if (str.includes('5,000')) return 5000;
  const cleaned = str.replace(/[^\d.]/g, '');
  return cleaned ? Number(cleaned) : null;
}

const UserModel = {
  // Create a new user record in Supabase
  async create({ name, occasion, relationship, budget }) {
    if (!supabase) {
      console.warn('[UserModel] Supabase client not initialized, using local session user.');
      return { id: 1, user_id: 1, name: name || 'Guest User', occasion, relationship, budget };
    }

    const payload = {
      name: name ? name.trim() : 'Guest User',
      occasion: occasion || null,
      relationship: relationship || null,
      budget: parseBudgetToNumeric(budget),
    };

    const { data, error } = await supabase
      .from('users')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('[UserModel:create error]:', error.message);
      throw error;
    }

    return {
      ...data,
      user_id: data.id,
    };
  },

  // Create or find user (compatible with older caller formats)
  async createOrFind({ name, occasion, relationship, budget }) {
    return this.create({ name, occasion, relationship, budget });
  },

  // Get user by ID
  async getById(id) {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[UserModel:getById error]:', error.message);
      return null;
    }

    return data ? { ...data, user_id: data.id } : null;
  },

  // Get all users
  async getAll() {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('[UserModel:getAll error]:', error.message);
      return [];
    }

    return (data || []).map((u) => ({
      ...u,
      user_id: u.id,
    }));
  },
};

module.exports = UserModel;
