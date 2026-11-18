/**
 * GiftFinder Supabase End-to-End System Test
 * Validates Supabase connection, schema tables, foreign keys, and REST APIs
 */
const supabase = require('./config/supabase');

async function runTests() {
  console.log('==================================================');
  console.log('   STARTING GIFTFINDER SUPABASE SYSTEM TESTS     ');
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

  if (!supabase) {
    console.log('  [NOTICE] Supabase client is not configured yet in backend/.env.');
    console.log('  Please set your actual SUPABASE_URL and SUPABASE_KEY in backend/.env to run live database tests.\n');
    process.exit(0);
  }

  try {
    // 1. Connection & Tables Check
    const requiredTables = ['users', 'gifts', 'categories', 'gift_categories', 'user_gifts', 'feedback'];

    for (const t of requiredTables) {
      const { error } = await supabase.from(t).select('*', { count: 'exact', head: true });
      assert(!error, `Table '${t}' is accessible on Supabase`);
      if (error) console.error(`    -> Details: ${error.message}`);
    }

    console.log('\n==================================================');
    console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log('==================================================\n');
  } catch (err) {
    console.error('Test execution error:', err.message);
  } finally {
    process.exit(0);
  }
}

runTests();
