const supabase = require('../config/supabase');

const FeedbackModel = {
  // Create a new feedback entry in Supabase
  async create({ user_id, rating, comments }) {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          user_id,
          rating: Number(rating),
          comments: comments ? comments.trim() : null,
        },
      ])
      .select(`
        id,
        user_id,
        rating,
        comments,
        created_at,
        users (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error('[FeedbackModel:create error]:', error.message);
      throw error;
    }

    return {
      id: data.id,
      feedback_id: data.id,
      user_id: data.user_id,
      user_name: data.users?.name || 'Customer',
      name: data.users?.name || 'Customer',
      rating: data.rating,
      comments: data.comments,
      created_at: data.created_at,
    };
  },

  // Get feedback by ID
  async getById(id) {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          id,
          user_id,
          rating,
          comments,
          created_at,
          users (
            id,
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        feedback_id: data.id,
        user_id: data.user_id,
        user_name: data.users?.name || 'Customer',
        name: data.users?.name || 'Customer',
        rating: data.rating,
        comments: data.comments,
        created_at: data.created_at,
      };
    } catch (err) {
      console.error('[FeedbackModel:getById error]:', err.message);
      return null;
    }
  },

  // Get all feedback ordered by latest first
  async getAll() {
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          id,
          user_id,
          rating,
          comments,
          created_at,
          users (
            id,
            name
          )
        `)
        .order('id', { ascending: false });

      if (error) throw error;

      return (data || []).map((item) => ({
        id: item.id,
        feedback_id: item.id,
        user_id: item.user_id,
        user_name: item.users?.name || 'Customer',
        name: item.users?.name || 'Customer',
        rating: item.rating,
        comments: item.comments,
        created_at: item.created_at,
      }));
    } catch (err) {
      console.error('[FeedbackModel:getAll error]:', err.message);
      return [];
    }
  },
};

module.exports = FeedbackModel;
