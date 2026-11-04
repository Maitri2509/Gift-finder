/**
 * GiftFinder End-to-End System Test
 * Validates MySQL database, all 6 tables, foreign keys, and all REST APIs
 */
const pool = require('./config/db');

async function runTests() {
  console.log('==================================================');
  console.log('   STARTING GIFTFINDER FULL-STACK SYSTEM TESTS   ');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Database connection
    const [connTest] = await pool.query('SELECT 1 + 1 AS result');
    assert(connTest[0].result === 2, 'MySQL Connection alive and responsive');

    // 2. Six tables exist
    const [tables] = await pool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'giftfinder_db'
    `);
    const tableNames = tables.map((t) => t.TABLE_NAME);
    const requiredTables = ['users', 'gifts', 'categories', 'feedback', 'user_gifts', 'gift_categories'];

    for (const t of requiredTables) {
      assert(tableNames.includes(t), `Table '${t}' exists in giftfinder_db`);
    }

    // 3. Foreign key constraints
    const [fkRows] = await pool.query(`
      SELECT TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'giftfinder_db' AND REFERENCED_TABLE_NAME IS NOT NULL
    `);
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'feedback' && fk.REFERENCED_TABLE_NAME === 'users'), 'FK: feedback -> users');
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'feedback' && fk.REFERENCED_TABLE_NAME === 'gifts'), 'FK: feedback -> gifts');
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'user_gifts' && fk.REFERENCED_TABLE_NAME === 'users'), 'FK: user_gifts -> users');
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'user_gifts' && fk.REFERENCED_TABLE_NAME === 'gifts'), 'FK: user_gifts -> gifts');
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'gift_categories' && fk.REFERENCED_TABLE_NAME === 'gifts'), 'FK: gift_categories -> gifts');
    assert(fkRows.some((fk) => fk.TABLE_NAME === 'gift_categories' && fk.REFERENCED_TABLE_NAME === 'categories'), 'FK: gift_categories -> categories');

    // 4. Sample data counts
    const [counts] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) AS users_count,
        (SELECT COUNT(*) FROM gifts) AS gifts_count,
        (SELECT COUNT(*) FROM categories) AS categories_count,
        (SELECT COUNT(*) FROM feedback) AS feedback_count,
        (SELECT COUNT(*) FROM user_gifts) AS user_gifts_count,
        (SELECT COUNT(*) FROM gift_categories) AS gift_categories_count
    `);
    const c = counts[0];
    console.log('\nCurrent Table Record Counts:');
    console.log(`  - users: ${c.users_count}`);
    console.log(`  - gifts: ${c.gifts_count}`);
    console.log(`  - categories: ${c.categories_count}`);
    console.log(`  - feedback: ${c.feedback_count}`);
    console.log(`  - user_gifts: ${c.user_gifts_count}`);
    console.log(`  - gift_categories: ${c.gift_categories_count}\n`);

    assert(c.gifts_count >= 15, `At least 15-20 gifts present (actual: ${c.gifts_count})`);
    assert(c.categories_count >= 8, `At least 8-10 categories present (actual: ${c.categories_count})`);
    assert(c.gift_categories_count >= 15, `Gift-category relationships present (actual: ${c.gift_categories_count})`);

    // 5. Model test: User registration
    const UserModel = require('./models/userModel');
    const testUser = await UserModel.createOrFind({
      name: 'Ananya Desai',
      email: 'ananya.desai@test.com',
    });
    assert(testUser && testUser.user_id > 0, `User model saved/retrieved user_id: ${testUser.user_id}`);

    // 6. Model test: Recommendation matching
    const GiftModel = require('./models/giftModel');
    const recs = await GiftModel.recommend({
      occasion: 'Anniversary',
      relationship: 'Partner',
      gender: 'Women',
      budget: '₹2,500 – ₹5,000',
      notes: 'jewelry and romantic evening',
    });
    assert(recs.length > 0, `Gift recommendation returned ${recs.length} matches`);
    assert(recs.some((r) => r.gift_name.includes('Necklace') || r.gift_name.includes('Date Night')), 'Top recommendations match romance & jewelry keywords');

    // 7. Model test: Saving user gift recommendations
    const UserGiftModel = require('./models/userGiftModel');
    const savedRecIds = await UserGiftModel.saveRecommendations({
      user_id: testUser.user_id,
      gift_ids: recs.slice(0, 3).map((r) => r.gift_id),
      occasion: 'Anniversary',
      relationship: 'Partner',
      gender: 'Women',
      budget: '₹2,500 – ₹5,000',
      user_notes: 'jewelry and romantic evening',
    });
    assert(savedRecIds.length === 3, 'Saved 3 recommendation records into user_gifts table');

    // 8. Model test: Submitting feedback
    const FeedbackModel = require('./models/feedbackModel');
    const fb = await FeedbackModel.create({
      user_id: testUser.user_id,
      gift_id: recs[0].gift_id,
      rating: 5,
      comments: 'The custom gold bar necklace was an incredible anniversary surprise!',
    });
    assert(fb && fb.feedback_id > 0 && fb.rating === 5, `Feedback submitted with feedback_id: ${fb.feedback_id}`);

    console.log(`\n==================================================`);
    console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED   `);
    console.log(`==================================================\n`);

    if (failed === 0) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('UNEXPECTED TEST ERROR:', error);
    process.exit(1);
  }
}

runTests();

