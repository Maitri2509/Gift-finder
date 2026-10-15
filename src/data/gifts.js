/**
 * Gift catalog for GiftFinder (India-focused).
 * Matching uses: occasions[], relationships[], budgets[]
 * Budget keys: under-1000 | 1000-2500 | 2500-5000 | 5000-plus
 */

export const BUDGET_MAP = {
  'Under ₹1,000': 'under-1000',
  '₹1,000 – ₹2,500': '1000-2500',
  '₹2,500 – ₹5,000': '2500-5000',
  '₹5,000+': '5000-plus',
}

const ALL_RELATIONS = ['Partner', 'Best friend', 'Family', 'Colleague', 'Someone special']
const ALL_GENDERS = ['Women', 'Men', 'Unisex']
const WOMEN = ['Women']
const MEN = ['Men']
const UNISEX = ['Unisex', 'Women', 'Men']

/** Gender lean per gift id — anything missing defaults to unisex. */
const GENDER_BY_ID = {
  'perfume-mini': WOMEN,
  'skincare-ritual': WOMEN,
  'personalized-necklace': WOMEN,
  'jewellery-earrings': WOMEN,
  'ethnic-stole': WOMEN,
  'handmade-soap-set': WOMEN,
  'spa-voucher': [...WOMEN, 'Unisex'],
  'baby-hamper': UNISEX,
  'perfume-for-him': MEN,
  'watch-strap-set': MEN,
  'wallet-cardholder': [...MEN, 'Unisex'],
  'premium-watch': [...MEN, 'Unisex'],
  'gaming-accessory': [...MEN, 'Unisex'],
  'couple-mugs': UNISEX,
  'couple-jewelry': UNISEX,
  'couple-date-box': UNISEX,
  'star-map': UNISEX,
  'experience-dinner': UNISEX,
  'custom-illustration': UNISEX,
  'leather-tote': [...WOMEN, 'Unisex'],
}

const RAW_GIFTS = [
  {
    id: 'scented-candle-set',
    title: 'Artisan Scented Candle Duo',
    price: '₹799',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Housewarming'],
    relationships: ALL_RELATIONS,
    tags: ['cozy', 'home', 'soft colors', 'calm'],
    why: 'Warm, pretty, and easy — works when you want something thoughtful without overthinking.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coffee-mug-kit',
    title: 'Ceramic Mug + Filter Coffee Kit',
    price: '₹899',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Graduation'],
    relationships: ['Best friend', 'Colleague', 'Family', 'Someone special'],
    tags: ['coffee', 'cozy', 'desk'],
    why: 'Great for chai/coffee people who love a daily ritual.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mini-plant',
    title: 'Lucky Desk Plant + Pot',
    price: '₹649',
    budgets: ['under-1000'],
    occasions: ['Housewarming', 'Thank You', 'Just Because', 'Graduation'],
    relationships: ['Colleague', 'Best friend', 'Family', 'Someone special'],
    tags: ['plants', 'home', 'fresh'],
    why: 'Brightens a desk or new flat — practical and cheerful.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'journal-set',
    title: 'Premium Journal & Pen Set',
    price: '₹999',
    budgets: ['under-1000', '1000-2500'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Thank You'],
    relationships: ALL_RELATIONS,
    tags: ['writing', 'calm', 'thoughtful'],
    why: 'Perfect for new chapters, exams done, or a fresh start at work.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dry-fruit-box',
    title: 'Premium Dry Fruit Box',
    price: '₹999',
    budgets: ['under-1000', '1000-2500'],
    occasions: ['Thank You', 'Birthday', 'Housewarming', 'Just Because'],
    relationships: ['Family', 'Colleague', 'Someone special', 'Best friend'],
    tags: ['food', 'festive', 'traditional'],
    why: 'A classic Indian gifting staple — useful, respectful, and always appreciated.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'handmade-soap-set',
    title: 'Handmade Soap & Scrub Set',
    price: '₹749',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Thank You', 'Just Because'],
    relationships: ['Best friend', 'Family', 'Colleague', 'Someone special', 'Partner'],
    tags: ['self-care', 'soft colors', 'calm'],
    why: 'Small but spa-like — great for soft, caring vibes.',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'photo-keychain',
    title: 'Custom Photo Keychain',
    price: '₹499',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Anniversary', 'Just Because', 'Thank You'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special'],
    tags: ['personal', 'memories', 'sentimental'],
    why: 'Tiny, personal, and emotional — people actually use it every day.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'chocolate-tower',
    title: 'Assorted Gourmet Chocolate Box',
    price: '₹899',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Anniversary'],
    relationships: ALL_RELATIONS,
    tags: ['food', 'celebration', 'sweet'],
    why: 'Safe, joyful, and crowd-pleasing for almost every occasion.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'self-care-box',
    title: 'Soft Self-Care Box',
    price: '₹1,799',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Just Because', 'Thank You', 'Anniversary'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special'],
    tags: ['cozy', 'self-care', 'soft colors', 'calm'],
    why: 'Bath, tea, and calm — packaged like a hug after a long week.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'photo-frame',
    title: 'Custom Photo Frame Keepsake',
    price: '₹1,499',
    budgets: ['1000-2500'],
    occasions: ['Anniversary', 'Birthday', 'Thank You', 'Just Because'],
    relationships: ['Partner', 'Family', 'Best friend', 'Someone special'],
    tags: ['memories', 'personal', 'sentimental'],
    why: 'Turns one shared memory into something they can keep forever.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'throw-blanket',
    title: 'Cozy Knit Throw',
    price: '₹2,199',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Birthday', 'Housewarming', 'Just Because', 'Anniversary'],
    relationships: ['Partner', 'Family', 'Best friend', 'Someone special'],
    tags: ['cozy', 'home', 'soft colors'],
    why: 'Soft and useful for monsoon evenings and AC rooms.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gourmet-hamper',
    title: 'Gourmet Snack & Tea Hamper',
    price: '₹2,299',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Birthday', 'Thank You', 'Housewarming', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['food', 'coffee', 'celebration', 'tea'],
    why: 'Easy to love and share — works for family, friends, and colleagues.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'perfume-mini',
    title: 'Fragrance Discovery Set',
    price: '₹2,499',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Birthday', 'Anniversary', 'Just Because'],
    relationships: ['Partner', 'Someone special', 'Best friend'],
    tags: ['beauty', 'soft colors', 'luxury'],
    why: 'Feels special without going overboard — great for partners and close friends.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wireless-earbuds',
    title: 'Wireless Earbuds',
    price: '₹2,499',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Thank You'],
    relationships: ['Best friend', 'Partner', 'Family', 'Someone special', 'Colleague'],
    tags: ['tech', 'music', 'practical'],
    why: 'Modern and useful — ideal for students, office goers, and travel.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cookware-kadhai',
    title: 'Non-Stick Kadhai / Cookware Set',
    price: '₹1,999',
    budgets: ['1000-2500'],
    occasions: ['Housewarming', 'Birthday', 'Thank You'],
    relationships: ['Family', 'Partner', 'Someone special'],
    tags: ['home', 'kitchen', 'practical'],
    why: 'Very practical for Indian kitchens — especially new homes and newlyweds.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ethnic-stole',
    title: 'Handloom Dupatta / Stole',
    price: '₹1,799',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Thank You', 'Anniversary', 'Just Because'],
    relationships: ['Family', 'Partner', 'Someone special', 'Best friend'],
    tags: ['ethnic', 'traditional', 'style'],
    why: 'Elegant Indian gifting that feels cultural and personal.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'smart-mug-warmer',
    title: 'Smart Mug Warmer Set',
    price: '₹3,299',
    budgets: ['2500-5000'],
    occasions: ['Birthday', 'Graduation', 'Thank You', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['coffee', 'desk', 'practical', 'tea'],
    why: 'A practical upgrade for tea/coffee people who work long hours.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'couple-date-box',
    title: 'At-Home Date Night Box',
    price: '₹3,999',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special'],
    tags: ['romance', 'cozy', 'memories'],
    why: 'Built for two — candles, treats, and a shared evening plan.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wireless-speaker',
    title: 'Compact Bluetooth Speaker',
    price: '₹4,499',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Housewarming'],
    relationships: ['Best friend', 'Partner', 'Family', 'Someone special'],
    tags: ['music', 'tech', 'fun'],
    why: 'Fun for parties, hostels, and home evenings — add a playlist note.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'home-decor-vase',
    title: 'Handcrafted Ceramic Vase',
    price: '₹2,799',
    budgets: ['2500-5000'],
    occasions: ['Housewarming', 'Anniversary', 'Birthday', 'Thank You'],
    relationships: ['Family', 'Partner', 'Best friend', 'Someone special'],
    tags: ['home', 'decor', 'soft colors'],
    why: 'A beautiful piece new homes and calm spaces actually want.',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'watch-strap-set',
    title: 'Leather Watch Strap Duo',
    price: '₹1,899',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Graduation', 'Thank You', 'Anniversary'],
    relationships: ['Partner', 'Family', 'Colleague', 'Someone special'],
    tags: ['style', 'practical'],
    why: 'A sharp upgrade that still feels personal and wearable.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'luxury-hamper',
    title: 'Premium Celebration Hamper',
    price: '₹5,999',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Anniversary', 'Housewarming', 'Thank You'],
    relationships: ['Partner', 'Family', 'Someone special', 'Best friend'],
    tags: ['celebration', 'luxury', 'food'],
    why: 'A fuller “wow” gift when you want to go bigger for family or partners.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'skincare-ritual',
    title: 'Clean Skincare Ritual Kit',
    price: '₹4,799',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Birthday', 'Just Because', 'Anniversary', 'Thank You'],
    relationships: ['Partner', 'Best friend', 'Someone special', 'Family'],
    tags: ['beauty', 'self-care', 'soft colors'],
    why: 'Feels premium and personal — especially for self-care lovers.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'travel-pouch',
    title: 'Leather Travel Pouch Set',
    price: '₹3,499',
    budgets: ['2500-5000'],
    occasions: ['Graduation', 'Birthday', 'Thank You', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['travel', 'practical', 'style'],
    why: 'Great for grads, frequent travellers, and office bag clutter.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tea-ritual',
    title: 'Heirloom Tea Ritual Set',
    price: '₹1,699',
    budgets: ['1000-2500'],
    occasions: ['Thank You', 'Just Because', 'Birthday', 'Housewarming'],
    relationships: ALL_RELATIONS,
    tags: ['tea', 'cozy', 'calm'],
    why: 'Gentle and elegant — perfect for slower evenings and elders too.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'personalized-necklace',
    title: 'Personalized Initial Necklace',
    price: '₹3,799',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special', 'Best friend', 'Family'],
    tags: ['jewelry', 'personal', 'sentimental'],
    why: 'A keepsake gift that feels intimate and lasting.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'book-bundle',
    title: 'Curated Book + Bookmark Bundle',
    price: '₹1,299',
    budgets: ['1000-2500', 'under-1000'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Thank You'],
    relationships: ALL_RELATIONS,
    tags: ['books', 'calm', 'thoughtful'],
    why: 'Thoughtful for readers — add a sticky note on why you chose that book.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'desk-organizer',
    title: 'Designer Desk Organizer',
    price: '₹2,699',
    budgets: ['2500-5000'],
    occasions: ['Graduation', 'Thank You', 'Birthday', 'Just Because'],
    relationships: ['Colleague', 'Family', 'Best friend', 'Someone special'],
    tags: ['desk', 'practical', 'style'],
    why: 'Useful for WFH setups, first jobs, and tidy aesthetic desks.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'couple-jewelry',
    title: 'Matching Promise Bracelets',
    price: '₹2,199',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Anniversary', 'Just Because', 'Birthday'],
    relationships: ['Partner', 'Someone special'],
    tags: ['romance', 'jewelry', 'personal'],
    why: 'Sweet and wearable — made for “us” moments.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'kitchen-starter',
    title: 'Artisan Kitchen Starter Set',
    price: '₹4,299',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Housewarming', 'Birthday', 'Thank You'],
    relationships: ['Family', 'Partner', 'Best friend', 'Someone special'],
    tags: ['home', 'kitchen', 'practical'],
    why: 'Ideal for new flats and first kitchens — useful and gift-worthy.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'luxury-perfume',
    title: 'Signature Perfume Bottle',
    price: '₹6,499',
    budgets: ['5000-plus'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special'],
    tags: ['luxury', 'beauty', 'romance'],
    why: 'A classic elevated gift when the budget allows a bigger gesture.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'smartwatch',
    title: 'Fitness Smartwatch',
    price: '₹7,999',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Graduation', 'Anniversary', 'Just Because'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special'],
    tags: ['tech', 'fitness', 'practical'],
    why: 'High-value gift for health-conscious partners, grads, and siblings.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'air-purifier-mini',
    title: 'Compact Air Purifier',
    price: '₹8,499',
    budgets: ['5000-plus'],
    occasions: ['Housewarming', 'Birthday', 'Thank You'],
    relationships: ['Family', 'Partner', 'Someone special'],
    tags: ['home', 'practical', 'health'],
    why: 'Especially thoughtful for new homes in polluted cities.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'instagram-polaroid',
    title: 'Instant Photo Printer / Polaroid Mini',
    price: '₹5,499',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Anniversary', 'Just Because', 'Graduation'],
    relationships: ['Partner', 'Best friend', 'Someone special', 'Family'],
    tags: ['memories', 'fun', 'personal'],
    why: 'Memory-making gift for couples and friend groups who love photos.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'board-game',
    title: 'Premium Board Game Night Set',
    price: '₹1,899',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Housewarming', 'Just Because'],
    relationships: ['Best friend', 'Family', 'Partner', 'Someone special'],
    tags: ['fun', 'family', 'cozy'],
    why: 'Perfect for family nights and friend hangouts — experience over stuff.',
    image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'yoga-mat-kit',
    title: 'Yoga Mat + Block Kit',
    price: '₹1,599',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Just Because', 'Thank You', 'Graduation'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special', 'Colleague'],
    tags: ['fitness', 'calm', 'self-care'],
    why: 'Supportive gift for wellness routines without being generic.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'powerbank',
    title: 'Fast-Charge Power Bank',
    price: '₹1,499',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Graduation', 'Thank You', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['tech', 'practical', 'travel'],
    why: 'Always useful in India — travel, office, college, daily commute.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wallet-cardholder',
    title: 'Slim Leather Card Holder',
    price: '₹1,299',
    budgets: ['1000-2500', 'under-1000'],
    occasions: ['Birthday', 'Graduation', 'Thank You', 'Anniversary'],
    relationships: ['Partner', 'Family', 'Colleague', 'Someone special', 'Best friend'],
    tags: ['style', 'practical'],
    why: 'Clean everyday gift for men/women who carry light wallets.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'scented-diffuser',
    title: 'Reed Diffuser for Home',
    price: '₹1,199',
    budgets: ['1000-2500'],
    occasions: ['Housewarming', 'Thank You', 'Birthday', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['home', 'soft colors', 'calm'],
    why: 'Makes a room smell intentional — great housewarming energy.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'couple-mugs',
    title: 'His & Hers Couple Mugs',
    price: '₹999',
    budgets: ['under-1000', '1000-2500'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special'],
    tags: ['romance', 'coffee', 'cozy', 'tea'],
    why: 'Cute daily reminder of “us” — especially for tea/coffee couples.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'silver-coin',
    title: 'Silver Coin / Token Gift',
    price: '₹2,999',
    budgets: ['2500-5000'],
    occasions: ['Housewarming', 'Thank You', 'Birthday', 'Graduation'],
    relationships: ['Family', 'Colleague', 'Someone special'],
    tags: ['traditional', 'festive', 'respect'],
    why: 'Traditional Indian gesture — respectful for elders, hosts, and formal thanks.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sweet-mithai-box',
    title: 'Assorted Mithai Gift Box',
    price: '₹899',
    budgets: ['under-1000'],
    occasions: ['Thank You', 'Birthday', 'Housewarming', 'Just Because'],
    relationships: ['Family', 'Colleague', 'Someone special', 'Best friend'],
    tags: ['food', 'traditional', 'festive', 'sweet'],
    why: 'Timeless Indian gift — especially for family and formal thank-yous.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'portable-blender',
    title: 'Portable Smoothie Blender',
    price: '₹2,799',
    budgets: ['2500-5000'],
    occasions: ['Birthday', 'Just Because', 'Graduation'],
    relationships: ['Best friend', 'Partner', 'Family', 'Someone special'],
    tags: ['fitness', 'practical', 'health'],
    why: 'Fun for health-focused friends who love juice/protein routines.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wall-art',
    title: 'Framed Motivational Wall Art',
    price: '₹1,499',
    budgets: ['1000-2500'],
    occasions: ['Housewarming', 'Graduation', 'Birthday', 'Just Because'],
    relationships: ['Best friend', 'Family', 'Colleague', 'Someone special', 'Partner'],
    tags: ['home', 'decor', 'soft colors'],
    why: 'Easy decor upgrade for hostels, first apartments, and home offices.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'experience-dinner',
    title: 'Fine-Dining Voucher for Two',
    price: '₹4,999',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special'],
    tags: ['romance', 'experience', 'celebration'],
    why: 'Give a memory, not a thing — ideal for anniversaries and dates.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'spa-voucher',
    title: 'Spa / Salon Relaxation Voucher',
    price: '₹2,999',
    budgets: ['2500-5000'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Anniversary'],
    relationships: ['Partner', 'Best friend', 'Someone special', 'Family'],
    tags: ['self-care', 'calm', 'experience'],
    why: 'Rest is a luxury — especially for busy partners, moms, and best friends.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'kindle-or-ebook',
    title: 'E-Reader / Book Subscription',
    price: '₹9,999',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Graduation', 'Just Because'],
    relationships: ['Best friend', 'Partner', 'Family', 'Someone special'],
    tags: ['books', 'tech', 'thoughtful'],
    why: 'Big gift for devoted readers who always want the next book.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'headphones',
    title: 'Over-Ear Noise Cancelling Headphones',
    price: '₹8,999',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Anniversary'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special'],
    tags: ['music', 'tech', 'travel'],
    why: 'Premium daily-use gift for music lovers and frequent travellers.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'perfume-for-him',
    title: 'Men’s Everyday Cologne',
    price: '₹3,499',
    budgets: ['2500-5000'],
    occasions: ['Birthday', 'Anniversary', 'Thank You', 'Just Because'],
    relationships: ['Partner', 'Family', 'Someone special', 'Best friend'],
    tags: ['beauty', 'style', 'luxury'],
    why: 'Classic partner/sibling gift that feels grown-up and useful.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'jewellery-earrings',
    title: 'Daily-Wear Earrings Set',
    price: '₹1,999',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Anniversary', 'Just Because', 'Thank You'],
    relationships: ['Partner', 'Best friend', 'Family', 'Someone special'],
    tags: ['jewelry', 'style', 'personal'],
    why: 'Pretty and wearable — better than one-time party jewellery.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lunchbox-steel',
    title: 'Insulated Steel Lunch Box Set',
    price: '₹1,499',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Graduation'],
    relationships: ['Family', 'Colleague', 'Partner', 'Someone special'],
    tags: ['practical', 'office', 'home'],
    why: 'Very India-practical for office/college tiffin life.',
    image: 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'picnic-mat',
    title: 'Outdoor Picnic / Beach Mat',
    price: '₹1,299',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Just Because', 'Anniversary'],
    relationships: ['Partner', 'Best friend', 'Someone special', 'Family'],
    tags: ['fun', 'travel', 'cozy'],
    why: 'Encourages outings — parks, beaches, and sunset dates.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'custom-illustration',
    title: 'Custom Couple / Pet Illustration',
    price: '₹2,499',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special', 'Best friend', 'Family'],
    tags: ['personal', 'memories', 'art'],
    why: 'Unique and emotional — especially if they love their pet or couple photos.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'portable-fan',
    title: 'Cute Portable Neck Fan',
    price: '₹999',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Just Because', 'Thank You'],
    relationships: ALL_RELATIONS,
    tags: ['practical', 'travel', 'fun'],
    why: 'Summer-survival gift in India — surprisingly useful and cute.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'recipe-kit',
    title: 'Gourmet Homemade Recipe Kit',
    price: '₹1,699',
    budgets: ['1000-2500'],
    occasions: ['Birthday', 'Housewarming', 'Just Because', 'Anniversary'],
    relationships: ['Partner', 'Family', 'Best friend', 'Someone special'],
    tags: ['food', 'home', 'fun'],
    why: 'Fun shared activity gift — cook together instead of just ordering in.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'plants-bundle',
    title: 'Indoor Plant Trio Bundle',
    price: '₹1,999',
    budgets: ['1000-2500'],
    occasions: ['Housewarming', 'Birthday', 'Thank You', 'Just Because'],
    relationships: ALL_RELATIONS,
    tags: ['plants', 'home', 'fresh'],
    why: 'Instant freshness for balconies, windows, and work-from-home corners.',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'leather-tote',
    title: 'Everyday Leather Tote / Work Bag',
    price: '₹4,499',
    budgets: ['2500-5000', '5000-plus'],
    occasions: ['Graduation', 'Birthday', 'Thank You', 'Just Because'],
    relationships: ['Colleague', 'Best friend', 'Partner', 'Someone special', 'Family'],
    tags: ['style', 'practical', 'office'],
    why: 'Strong graduation / first-job gift that looks polished every day.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'star-map',
    title: 'Custom Star Map Poster',
    price: '₹1,899',
    budgets: ['1000-2500'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    relationships: ['Partner', 'Someone special'],
    tags: ['romance', 'personal', 'memories'],
    why: 'Mark a first date, proposal, or wedding night sky — deeply romantic.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee73?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gaming-accessory',
    title: 'RGB Mouse + Mousepad Combo',
    price: '₹2,299',
    budgets: ['1000-2500', '2500-5000'],
    occasions: ['Birthday', 'Graduation', 'Just Because'],
    relationships: ['Best friend', 'Family', 'Someone special', 'Partner'],
    tags: ['tech', 'fun', 'desk'],
    why: 'Hits well for gamers, students, and setup-obsessed friends.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'baby-hamper',
    title: 'Soft Baby Essentials Hamper',
    price: '₹3,499',
    budgets: ['2500-5000'],
    occasions: ['Thank You', 'Birthday', 'Just Because', 'Housewarming'],
    relationships: ['Family', 'Someone special', 'Best friend'],
    tags: ['family', 'soft colors', 'practical'],
    why: 'Thoughtful when gifting new parents in the family/friend circle.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'premium-watch',
    title: 'Classic Analog Wristwatch',
    price: '₹6,999',
    budgets: ['5000-plus'],
    occasions: ['Birthday', 'Anniversary', 'Graduation', 'Thank You'],
    relationships: ['Partner', 'Family', 'Someone special'],
    tags: ['style', 'luxury', 'practical'],
    why: 'Timeless milestone gift for partners, siblings, and grads.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coffee-machine',
    title: 'Home Coffee Maker',
    price: '₹7,499',
    budgets: ['5000-plus'],
    occasions: ['Housewarming', 'Birthday', 'Anniversary', 'Just Because'],
    relationships: ['Partner', 'Family', 'Someone special', 'Best friend'],
    tags: ['coffee', 'home', 'practical'],
    why: 'Big home upgrade for serious coffee households.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'handmade-diary-india',
    title: 'Handmade Paper Diary from Local Artisan',
    price: '₹699',
    budgets: ['under-1000'],
    occasions: ['Birthday', 'Thank You', 'Just Because', 'Graduation'],
    relationships: ALL_RELATIONS,
    tags: ['writing', 'traditional', 'thoughtful'],
    why: 'Supports local craft and feels more special than a plain notebook.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tiffin-service-voucher',
    title: 'Cloud Kitchen / Meal Voucher Pack',
    price: '₹1,499',
    budgets: ['1000-2500'],
    occasions: ['Thank You', 'Just Because', 'Birthday'],
    relationships: ['Colleague', 'Best friend', 'Family', 'Someone special', 'Partner'],
    tags: ['food', 'practical', 'experience'],
    why: 'Modern helpful gift for busy colleagues and friends who skip cooking.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
]

export const GIFTS = RAW_GIFTS.map((gift) => ({
  ...gift,
  genders: GENDER_BY_ID[gift.id] || ALL_GENDERS,
}))

function noteScore(gift, notes) {
  if (!notes) return 0
  const text = notes.toLowerCase()
  return gift.tags.reduce((score, tag) => (text.includes(tag) ? score + 2 : score), 0)
}

function genderMatches(gift, gender) {
  if (!gender || gender === 'Unisex / Any') return true
  return gift.genders.includes(gender) || gift.genders.includes('Unisex')
}

function uniqueById(list) {
  const seen = new Set()
  return list.filter((gift) => {
    if (seen.has(gift.id)) return false
    seen.add(gift.id)
    return true
  })
}

export function matchGifts({ occasion, relationship, gender, budget, notes }) {
  const budgetKey = BUDGET_MAP[budget] || ''

  const scored = GIFTS.map((gift) => {
    let score = 0

    if (!genderMatches(gift, gender)) {
      return { gift, score: -1 }
    }

    if (gift.occasions.includes(occasion)) score += 5
    if (gift.relationships.includes(relationship)) score += 4
    if (gift.budgets.includes(budgetKey)) score += 5

    // Strong boost when gift is gender-specific and matches
    if (gender === 'Women' && gift.genders.includes('Women') && !gift.genders.includes('Men')) {
      score += 3
    }
    if (gender === 'Men' && gift.genders.includes('Men') && !gift.genders.includes('Women')) {
      score += 3
    }

    score += noteScore(gift, notes)

    if (relationship === 'Partner' || relationship === 'Someone special') {
      if (gift.tags.some((tag) => ['romance', 'personal', 'sentimental', 'jewelry'].includes(tag))) {
        score += 1
      }
    }
    if (relationship === 'Colleague') {
      if (gift.tags.some((tag) => ['practical', 'desk', 'office', 'traditional'].includes(tag))) {
        score += 1
      }
    }
    if (relationship === 'Family') {
      if (gift.tags.some((tag) => ['traditional', 'home', 'family', 'festive'].includes(tag))) {
        score += 1
      }
    }

    return { gift, score }
  })
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)

  let picks = scored.filter((item) => item.score >= 9).map((item) => item.gift)

  if (picks.length < 12) {
    picks = [
      ...picks,
      ...scored.filter((item) => item.score >= 5).map((item) => item.gift),
    ]
  }

  if (picks.length < 12) {
    picks = [
      ...picks,
      ...scored.map((item) => item.gift),
    ]
  }

  if (picks.length < 12 && budgetKey) {
    picks = [
      ...picks,
      ...GIFTS.filter(
        (gift) => gift.budgets.includes(budgetKey) && genderMatches(gift, gender),
      ),
    ]
  }

  return uniqueById(picks).slice(0, 12)
}
