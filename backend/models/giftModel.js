const pool = require('../config/db');

// Helper to determine budget bounds from budget label
function getBudgetPriceRange(budgetLabel) {
  if (!budgetLabel) return null;
  const label = budgetLabel.trim();
  if (label.includes('Under') || label.includes('1,000') && !label.includes('2,500')) {
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
  return null;
}

const GiftModel = {
  // Get all gifts with linked category names
  async getAll({ occasion, relationship, gender, budget, minPrice, maxPrice, search } = {}) {
    let query = `
      SELECT 
        g.gift_id,
        g.gift_name,
        g.description,
        g.price,
        g.image_url,
        g.occasion,
        g.relationship,
        g.gender,
        g.budget,
        g.created_at,
        GROUP_CONCAT(DISTINCT c.category_name SEPARATOR ', ') AS categories
      FROM gifts g
      LEFT JOIN gift_categories gc ON g.gift_id = gc.gift_id
      LEFT JOIN categories c ON gc.category_id = c.category_id
      WHERE 1=1
    `;
    const params = [];

    if (occasion) {
      query += ` AND g.occasion LIKE ?`;
      params.push(`%${occasion}%`);
    }

    if (relationship) {
      query += ` AND g.relationship LIKE ?`;
      params.push(`%${relationship}%`);
    }

    if (gender && gender !== 'Unisex / Any') {
      query += ` AND (g.gender = ? OR g.gender = 'Unisex / Any' OR g.gender = 'Unisex')`;
      params.push(gender);
    }

    if (budget) {
      query += ` AND (g.budget = ? OR g.budget LIKE ?)`;
      params.push(budget, `%${budget}%`);
    }

    if (minPrice != null && !isNaN(Number(minPrice))) {
      query += ` AND g.price >= ?`;
      params.push(Number(minPrice));
    }

    if (maxPrice != null && !isNaN(Number(maxPrice))) {
      query += ` AND g.price <= ?`;
      params.push(Number(maxPrice));
    }

    if (search) {
      query += ` AND (g.gift_name LIKE ? OR g.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` GROUP BY g.gift_id ORDER BY g.gift_id ASC`;

    const [rows] = await pool.query(query, params);
    return rows;
  },

  // Get single gift by ID with category list
  async getById(giftId) {
    const [rows] = await pool.query(
      `
      SELECT 
        g.gift_id,
        g.gift_name,
        g.description,
        g.price,
        g.image_url,
        g.occasion,
        g.relationship,
        g.gender,
        g.budget,
        g.created_at,
        GROUP_CONCAT(DISTINCT c.category_name SEPARATOR ', ') AS categories
      FROM gifts g
      LEFT JOIN gift_categories gc ON g.gift_id = gc.gift_id
      LEFT JOIN categories c ON gc.category_id = c.category_id
      WHERE g.gift_id = ?
      GROUP BY g.gift_id
    `,
      [giftId]
    );

    return rows[0] || null;
  },

  // Add new gift
  async create({ gift_name, description, price, image_url, occasion, relationship, gender, budget, category_ids = [] }) {
    const [result] = await pool.query(
      `INSERT INTO gifts (gift_name, description, price, image_url, occasion, relationship, gender, budget)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [gift_name, description, price, image_url, occasion, relationship, gender || 'Unisex / Any', budget]
    );

    const giftId = result.insertId;

    if (Array.isArray(category_ids) && category_ids.length > 0) {
      const values = category_ids.map((catId) => [giftId, catId]);
      await pool.query(
        'INSERT INTO gift_categories (gift_id, category_id) VALUES ?',
        [values]
      );
    }

    return this.getById(giftId);
  },

  // Update existing gift
  async update(giftId, { gift_name, description, price, image_url, occasion, relationship, gender, budget }) {
    await pool.query(
      `UPDATE gifts 
       SET gift_name = COALESCE(?, gift_name),
           description = COALESCE(?, description),
           price = COALESCE(?, price),
           image_url = COALESCE(?, image_url),
           occasion = COALESCE(?, occasion),
           relationship = COALESCE(?, relationship),
           gender = COALESCE(?, gender),
           budget = COALESCE(?, budget)
       WHERE gift_id = ?`,
      [gift_name, description, price, image_url, occasion, relationship, gender, budget, giftId]
    );

    return this.getById(giftId);
  },

  // Recommendation engine: finds matching gifts based on occasion, relationship, gender, budget, and notes
  async recommend({ occasion, relationship, gender, budget, notes }) {
    // 1. Fetch all candidate gifts with their categories
    const [allGifts] = await pool.query(`
      SELECT 
        g.gift_id,
        g.gift_name,
        g.description,
        g.price,
        g.image_url,
        g.occasion,
        g.relationship,
        g.gender,
        g.budget,
        g.created_at,
        GROUP_CONCAT(DISTINCT c.category_name SEPARATOR ', ') AS categories
      FROM gifts g
      LEFT JOIN gift_categories gc ON g.gift_id = gc.gift_id
      LEFT JOIN categories c ON gc.category_id = c.category_id
      GROUP BY g.gift_id
    `);

    const priceRange = getBudgetPriceRange(budget);
    const notesLower = (notes || '').toLowerCase();
    const noteWords = notesLower.split(/[\s,]+/).filter((w) => w.length > 2);

    // 2. Score candidate gifts
    const scored = allGifts.map((gift) => {
      let score = 0;

      // Gender compatibility check
      const giftGender = gift.gender || 'Unisex / Any';
      const isUnisex = giftGender.includes('Unisex') || giftGender === 'Unisex / Any';
      const isGenderMismatch =
        gender &&
        gender !== 'Unisex / Any' &&
        !isUnisex &&
        giftGender !== gender;

      if (isGenderMismatch) {
        return { gift, score: -1 };
      }

      // Occasion match (+5)
      if (occasion && gift.occasion && gift.occasion.toLowerCase().includes(occasion.toLowerCase())) {
        score += 5;
      }

      // Relationship match (+4)
      if (relationship && gift.relationship && gift.relationship.toLowerCase().includes(relationship.toLowerCase())) {
        score += 4;
      }

      // Budget label match (+5)
      if (budget && gift.budget && gift.budget.toLowerCase().includes(budget.toLowerCase())) {
        score += 5;
      }

      // Price range check (+3)
      if (priceRange) {
        const p = Number(gift.price);
        if (p >= priceRange.min && p <= priceRange.max) {
          score += 3;
        }
      }

      // Exact gender specific boost (+3)
      if (gender && (gender === 'Women' || gender === 'Men') && giftGender === gender) {
        score += 3;
      }

      // Notes keyword matches (+2 for each matching word)
      for (const word of noteWords) {
        if (
          gift.gift_name.toLowerCase().includes(word) ||
          gift.description.toLowerCase().includes(word) ||
          (gift.categories && gift.categories.toLowerCase().includes(word))
        ) {
          score += 2;
        }
      }

      return { gift, score };
    });

    // 3. Filter valid matches and sort by highest score
    const filtered = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.gift);

    // If matches are found, return up to 12
    if (filtered.length >= 4) {
      return filtered.slice(0, 12);
    }

    // Fallback: If strict match produced too few, supplement with budget/gender compatible gifts
    const seenIds = new Set(filtered.map((g) => g.gift_id));
    const fallback = allGifts.filter((g) => {
      if (seenIds.has(g.gift_id)) return false;
      const gGender = g.gender || 'Unisex / Any';
      const genderOk = !gender || gender === 'Unisex / Any' || gGender.includes('Unisex') || gGender === gender;
      return genderOk;
    });

    const combined = [...filtered, ...fallback];
    return combined.slice(0, 12);
  },
};

module.exports = GiftModel;

