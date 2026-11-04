-- ========================================================
-- GiftFinder Database Schema & Seed Data
-- Database: giftfinder_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS giftfinder_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE giftfinder_db;

-- --------------------------------------------------------
-- Table 1: users
-- Stores registered users and individuals seeking gift ideas
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table 2: gifts
-- Master catalog of curated gifts with pricing in INR (₹)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS gifts (
  gift_id INT AUTO_INCREMENT PRIMARY KEY,
  gift_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  occasion VARCHAR(255) NOT NULL,
  relationship VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL DEFAULT 'Unisex / Any',
  budget VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_gifts_price (price),
  INDEX idx_gifts_gender (gender),
  INDEX idx_gifts_budget (budget)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table 3: categories
-- Product categories for organizing gift types
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table 4: feedback
-- User feedback and ratings for overall service or specific gifts
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gift_id INT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_feedback_gift FOREIGN KEY (gift_id)
    REFERENCES gifts (gift_id) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX idx_feedback_user (user_id),
  INDEX idx_feedback_gift (gift_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table 5: user_gifts
-- Tracks recommended gifts generated for users along with their preferences
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_gifts (
  user_gift_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gift_id INT NOT NULL,
  occasion VARCHAR(100),
  relationship VARCHAR(100),
  gender VARCHAR(50),
  budget VARCHAR(50),
  user_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_gifts_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_gifts_gift FOREIGN KEY (gift_id)
    REFERENCES gifts (gift_id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_user_gifts_user (user_id),
  INDEX idx_user_gifts_gift (gift_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table 6: gift_categories
-- Many-to-many junction table connecting gifts and categories
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS gift_categories (
  gift_category_id INT AUTO_INCREMENT PRIMARY KEY,
  gift_id INT NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_gc_gift FOREIGN KEY (gift_id)
    REFERENCES gifts (gift_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_gc_category FOREIGN KEY (category_id)
    REFERENCES categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_gift_category (gift_id, category_id),
  INDEX idx_gc_gift (gift_id),
  INDEX idx_gc_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- SEED DATA
-- ========================================================

-- 1. Insert Categories (10 distinct categories)
INSERT INTO categories (category_id, category_name, description) VALUES
(1, 'Scented & Home Decor', 'Artisan candles, aesthetic lamps, diffusers, and cozy home accessories'),
(2, 'Gourmet Treats & Beverages', 'Artisanal coffees, teas, imported chocolates, and festive hampers'),
(3, 'Personal Care & Grooming', 'Handmade soap sets, organic skincare, bath rituals, and perfumes'),
(4, 'Keepsakes & Personalized', 'Custom photo frames, personalized jewelry, keychains, and star maps'),
(5, 'Tech & Gadgets', 'Wireless earbuds, Bluetooth speakers, desk gadgets, and smart mug warmers'),
(6, 'Fashion & Apparel', 'Handloom dupattas, stoles, fine leather wallets, and tote bags'),
(7, 'Stationery & Books', 'Hardbound journals, executive pen sets, and inspiring planners'),
(8, 'Plants & Greenery', 'Air-purifying desk plants, succulent planters, and ceramic pots'),
(9, 'Kitchen & Dining', 'Premium cookware, ceramic mug sets, and modern dining accessories'),
(10, 'Luxury & Experiences', 'Fine watches, weekend dining experiences, and premium gift hampers')
ON DUPLICATE KEY UPDATE category_name = VALUES(category_name), description = VALUES(description);

-- 2. Insert Gifts (22 realistic, curated gifts with Indian prices in INR)
INSERT INTO gifts (gift_id, gift_name, description, price, image_url, occasion, relationship, gender, budget) VALUES
(1, 'Artisan Scented Candle Duo', 'Warm vanilla and sandalwood hand-poured soy wax candles. Perfect for soothing evenings.', 799.00, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Just Because, Housewarming', 'Partner, Best friend, Family, Colleague, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(2, 'Ceramic Mug + Filter Coffee Kit', 'Handcrafted ceramic mug paired with artisanal South Indian filter coffee blend.', 899.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Just Because, Graduation', 'Best friend, Colleague, Family, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(3, 'Lucky Desk Plant in Ceramic Pot', 'Air-purifying Jade / Money plant in a pastel ceramic planter for workspaces.', 649.00, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80', 'Housewarming, Thank You, Just Because, Graduation', 'Colleague, Best friend, Family, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(4, 'Premium Journal & Pen Set', 'Eco-friendly faux leather ruled journal with a brass finish ballpoint pen.', 999.00, 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80', 'Birthday, Graduation, Just Because, Thank You', 'Partner, Best friend, Family, Colleague, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(5, 'Royal Dry Fruit Gift Box', 'Assortment of roasted California almonds, cashews, raisins, and Afghan pistachios.', 999.00, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=80', 'Thank You, Birthday, Housewarming, Just Because, Anniversary', 'Family, Colleague, Someone special, Best friend', 'Unisex / Any', 'Under ₹1,000'),
(6, 'Handmade Botanical Soap & Scrub Set', 'Cold-pressed coconut and essential oil soaps with a natural loofah in a gift box.', 749.00, 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Just Because', 'Best friend, Family, Colleague, Someone special, Partner', 'Women', 'Under ₹1,000'),
(7, 'Custom Engraved Photo Keychain', 'Stainless steel personalized keychain featuring your memorable photo and date.', 499.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', 'Birthday, Anniversary, Just Because, Thank You', 'Partner, Best friend, Family, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(8, 'Assorted Gourmet Chocolate Box', 'Selection of rich dark truffles, hazelnut pralines, and salted caramel treats.', 899.00, 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Just Because, Anniversary', 'Partner, Best friend, Family, Colleague, Someone special', 'Unisex / Any', 'Under ₹1,000'),
(9, 'Soft Lavender Self-Care Box', 'Calming lavender mist, herbal chamomile tea, bath salts, and a satin sleep mask.', 1799.00, 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&w=900&q=80', 'Birthday, Just Because, Thank You, Anniversary', 'Partner, Best friend, Family, Someone special', 'Women', '₹1,000 – ₹2,500'),
(10, 'Custom Floating Photo Frame Keepsake', 'Minimalist oak and glass frame preserving a cherished photographic memory.', 1499.00, 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=900&q=80', 'Anniversary, Birthday, Thank You, Just Because', 'Partner, Family, Best friend, Someone special', 'Unisex / Any', '₹1,000 – ₹2,500'),
(11, 'Cozy Waffle Knit Throw Blanket', 'Super-soft breathable knit blanket in warm beige. Ideal for reading and relaxing.', 2199.00, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80', 'Birthday, Housewarming, Just Because, Anniversary', 'Partner, Family, Best friend, Someone special', 'Unisex / Any', '₹1,000 – ₹2,500'),
(12, 'Gourmet Snack & Artisanal Tea Hamper', 'Curated hamper with premium green tea, imported cookies, nuts, and ceramic saucer.', 2299.00, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Housewarming, Just Because', 'Partner, Best friend, Family, Colleague, Someone special', 'Unisex / Any', '₹1,000 – ₹2,500'),
(13, 'Luxury Fragrance Discovery Set', 'Miniature eau de parfum sampler featuring floral, woody, and citrus notes.', 2499.00, 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80', 'Birthday, Anniversary, Just Because', 'Partner, Someone special, Best friend', 'Women', '₹1,000 – ₹2,500'),
(14, 'Wireless Bluetooth Earbuds with ANC', 'Crisp acoustics, active noise cancellation, and 30-hour battery life with charging case.', 2499.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80', 'Birthday, Graduation, Just Because, Thank You', 'Best friend, Partner, Family, Someone special, Colleague', 'Unisex / Any', '₹1,000 – ₹2,500'),
(15, 'Pure Handloom Silk & Zari Stole', 'Handwoven Indian celebratory stole with traditional subtle border craftsmanship.', 1799.00, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', 'Birthday, Thank You, Anniversary, Just Because', 'Family, Partner, Someone special, Best friend', 'Women', '₹1,000 – ₹2,500'),
(16, 'Full-Grain Leather Bi-Fold Wallet', 'Handcrafted genuine leather wallet with RFID protection and coin pocket.', 1699.00, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80', 'Birthday, Anniversary, Graduation, Thank You', 'Partner, Best friend, Family, Someone special, Colleague', 'Men', '₹1,000 – ₹2,500'),
(17, 'Smart Temperature-Controlled Mug Warmer', 'Keeps coffee, tea, and warm beverages at the optimal drinking temperature all day.', 3299.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', 'Birthday, Graduation, Thank You, Just Because', 'Partner, Best friend, Family, Colleague, Someone special', 'Unisex / Any', '₹2,500 – ₹5,000'),
(18, 'Romantic At-Home Date Night Box', 'Gourmet fondue set, soy candles, conversational card deck, and playlist access.', 3999.00, 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80', 'Anniversary, Birthday, Just Because', 'Partner, Someone special', 'Unisex / Any', '₹2,500 – ₹5,000'),
(19, 'Waterproof Portable Bluetooth Speaker', 'Room-filling 360-degree sound with deep bass and IPX7 waterproof design.', 4499.00, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80', 'Birthday, Graduation, Just Because, Housewarming', 'Best friend, Partner, Family, Someone special', 'Unisex / Any', '₹2,500 – ₹5,000'),
(20, 'Personalized 18K Gold Plated Bar Necklace', 'Dainty custom bar necklace delicately stamped with initials, coordinates, or name.', 3499.00, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80', 'Anniversary, Birthday, Just Because', 'Partner, Someone special, Best friend', 'Women', '₹2,500 – ₹5,000'),
(21, 'Classic Chronograph Stainless Steel Watch', 'Sleek sapphire glass dial with genuine leather strap and Japanese quartz movement.', 6499.00, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80', 'Anniversary, Birthday, Graduation', 'Partner, Best friend, Family, Someone special', 'Men', '₹5,000+'),
(22, 'Luxury Couples Spa & Wellness Voucher', 'Full-body rejuvenating aromatherapy and deep tissue massage at an authentic luxury spa.', 7999.00, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80', 'Anniversary, Birthday, Just Because', 'Partner, Someone special', 'Unisex / Any', '₹5,000+')
ON DUPLICATE KEY UPDATE 
  gift_name = VALUES(gift_name),
  description = VALUES(description),
  price = VALUES(price),
  image_url = VALUES(image_url),
  occasion = VALUES(occasion),
  relationship = VALUES(relationship),
  gender = VALUES(gender),
  budget = VALUES(budget);

-- 3. Link Gifts with Categories (gift_categories junction table)
INSERT INTO gift_categories (gift_id, category_id) VALUES
-- Gift 1: Scented Candle Duo -> Home Decor, Keepsakes
(1, 1),
-- Gift 2: Filter Coffee Kit -> Gourmet Treats, Kitchen & Dining
(2, 2), (2, 9),
-- Gift 3: Desk Plant -> Plants & Greenery, Home Decor
(3, 8), (3, 1),
-- Gift 4: Journal & Pen Set -> Stationery & Books
(4, 7),
-- Gift 5: Dry Fruit Gift Box -> Gourmet Treats
(5, 2),
-- Gift 6: Handmade Soap Set -> Personal Care & Grooming
(6, 3),
-- Gift 7: Photo Keychain -> Keepsakes & Personalized
(7, 4),
-- Gift 8: Gourmet Chocolates -> Gourmet Treats
(8, 2),
-- Gift 9: Soft Lavender Self-Care Box -> Personal Care, Scented & Home
(9, 3), (9, 1),
-- Gift 10: Custom Photo Frame -> Keepsakes, Home Decor
(10, 4), (10, 1),
-- Gift 11: Knit Throw Blanket -> Home Decor
(11, 1),
-- Gift 12: Snack & Tea Hamper -> Gourmet Treats
(12, 2),
-- Gift 13: Fragrance Discovery Set -> Personal Care
(13, 3),
-- Gift 14: Wireless Earbuds -> Tech & Gadgets
(14, 5),
-- Gift 15: Silk Stole -> Fashion & Apparel
(15, 6),
-- Gift 16: Leather Wallet -> Fashion & Apparel
(16, 6),
-- Gift 17: Smart Mug Warmer -> Tech & Gadgets, Kitchen & Dining
(17, 5), (17, 9),
-- Gift 18: Date Night Box -> Luxury & Experiences, Scented & Home
(18, 10), (18, 1),
-- Gift 19: Bluetooth Speaker -> Tech & Gadgets
(19, 5),
-- Gift 20: Gold Plated Bar Necklace -> Keepsakes, Fashion & Apparel
(20, 4), (20, 6),
-- Gift 21: Chronograph Watch -> Fashion & Apparel, Luxury & Experiences
(21, 6), (21, 10),
-- Gift 22: Spa & Wellness Voucher -> Luxury & Experiences, Personal Care
(22, 10), (22, 3)
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id);

-- 4. Sample Users
INSERT INTO users (user_id, name, email) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@example.com'),
(2, 'Priya Patel', 'priya.patel@example.com'),
(3, 'Rohan Verma', 'rohan.verma@example.com')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- 5. Sample User Gifts (tracking prior recommendations)
INSERT INTO user_gifts (user_id, gift_id, occasion, relationship, gender, budget, user_notes) VALUES
(1, 1, 'Birthday', 'Partner', 'Women', 'Under ₹1,000', 'Loves soothing vanilla fragrances and reading'),
(1, 7, 'Birthday', 'Partner', 'Women', 'Under ₹1,000', 'Sentimental keepsake with our trip photo'),
(2, 14, 'Graduation', 'Best friend', 'Unisex / Any', '₹1,000 – ₹2,500', 'College graduation gift, loves music and podcasts'),
(3, 18, 'Anniversary', 'Partner', 'Unisex / Any', '₹2,500 – ₹5,000', 'Celebrating 2nd anniversary at home')
ON DUPLICATE KEY UPDATE occasion = VALUES(occasion);

-- 6. Sample Feedback
INSERT INTO feedback (user_id, gift_id, rating, comments) VALUES
(1, 1, 5, 'My partner absolutely loved the artisan scented candles! The fragrance filled the room softly.'),
(2, 14, 5, 'The earbuds recommendation was spot-on for my best friend graduation!'),
(3, 18, 4, 'Great date night box ideas, made our anniversary evening memorable.')
ON DUPLICATE KEY UPDATE rating = VALUES(rating), comments = VALUES(comments);

