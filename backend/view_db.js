const supabase = require('./config/supabase');

async function viewDatabase() {
  console.log('\n======================================================');
  console.log('       GIFTFINDER DATABASE VIEWER (Supabase)         ');
  console.log('======================================================\n');

  if (!supabase) {
    console.error('[Error] Supabase client is not configured. Please add SUPABASE_URL and SUPABASE_KEY to backend/.env.');
    process.exit(1);
  }

  try {
    // 1. Users Table
    console.log('--- 1. USERS TABLE (users) ---');
    const { data: users, error: uErr } = await supabase
      .from('users')
      .select('id, name, occasion, relationship, budget, created_at')
      .order('id', { ascending: false })
      .limit(10);
    if (uErr) console.error('Users error:', uErr.message);
    else console.table(users);

    // 2. User Gift Recommendations History Table
    console.log('\n--- 2. USER RECOMMENDATIONS HISTORY (user_gifts) ---');
    const { data: userGifts, error: ugErr } = await supabase
      .from('user_gifts')
      .select('user_id, gift_id, users(name), gifts(name)')
      .limit(10);
    if (ugErr) console.error('User gifts error:', ugErr.message);
    else {
      console.table(
        (userGifts || []).map((ug) => ({
          user_id: ug.user_id,
          user_name: ug.users?.name,
          gift_id: ug.gift_id,
          gift_name: ug.gifts?.name,
        }))
      );
    }

    // 3. Feedback Table
    console.log('\n--- 3. USER FEEDBACK TABLE (feedback) ---');
    const { data: feedback, error: fErr } = await supabase
      .from('feedback')
      .select('id, user_id, rating, comments, created_at, users(name)')
      .order('id', { ascending: false })
      .limit(10);
    if (fErr) console.error('Feedback error:', fErr.message);
    else {
      console.table(
        (feedback || []).map((f) => ({
          id: f.id,
          user_name: f.users?.name,
          rating: f.rating,
          comments: f.comments,
          created_at: f.created_at,
        }))
      );
    }

    // 4. Gifts Catalog
    console.log('\n--- 4. GIFTS CATALOG (gifts - First 10 items) ---');
    const { data: gifts, error: gErr } = await supabase
      .from('gifts')
      .select('id, name, price, image, created_at')
      .order('id', { ascending: true })
      .limit(10);
    if (gErr) console.error('Gifts error:', gErr.message);
    else console.table(gifts);

    // 5. Categories
    console.log('\n--- 5. CATEGORIES (categories) ---');
    const { data: categories, error: cErr } = await supabase
      .from('categories')
      .select('id, name')
      .order('id', { ascending: true });
    if (cErr) console.error('Categories error:', cErr.message);
    else console.table(categories);

    console.log('\nSupabase inspection complete!\n');
  } catch (err) {
    console.error('Error viewing database:', err.message);
  } finally {
    process.exit(0);
  }
}

viewDatabase();
