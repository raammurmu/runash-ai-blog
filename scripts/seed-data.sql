-- Seed data for RunAsh AI Blog

-- Insert sample users
INSERT INTO users (id, username, email, name, avatar, bio, followers, following) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'alexchen', 'alex@runash.ai', 'Alex Chen', '/placeholder.svg?height=40&width=40', 'Full-stack developer passionate about live streaming technology', 1250, 340),
('550e8400-e29b-41d4-a716-446655440002', 'sarahkim', 'sarah@runash.ai', 'Sarah Kim', '/placeholder.svg?height=40&width=40', 'AI researcher and e-commerce enthusiast', 890, 220),
('550e8400-e29b-41d4-a716-446655440003', 'mikej', 'mike@runash.ai', 'Mike Johnson', '/placeholder.svg?height=40&width=40', 'API architect and GraphQL expert', 2100, 450),
('550e8400-e29b-41d4-a716-446655440004', 'emmad', 'emma@runash.ai', 'Emma Davis', '/placeholder.svg?height=40&width=40', 'Fintech specialist and security expert', 670, 180),
('550e8400-e29b-41d4-a716-446655440005', 'davidw', 'david@runash.ai', 'David Wilson', '/placeholder.svg?height=40&width=40', 'Real-time systems engineer', 1450, 380),
('550e8400-e29b-41d4-a716-446655440006', 'lisaz', 'lisa@runash.ai', 'Lisa Zhang', '/placeholder.svg?height=40&width=40', 'Retail tech innovator and AI consultant', 920, 260);

-- Insert sample posts
INSERT INTO posts (id, title, slug, excerpt, content, category, gradient, emoji, author_id, read_time, likes, comments_count, upvotes) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Building Real-time Live Streaming with WebRTC', 'building-realtime-live-streaming-webrtc', 'Learn how to implement low-latency live streaming using WebRTC technology for modern web applications.', '<h2>Introduction to WebRTC Live Streaming</h2><p>WebRTC (Web Real-Time Communication) has revolutionized how we approach live streaming on the web. Unlike traditional streaming protocols, WebRTC offers peer-to-peer communication with ultra-low latency.</p><h3>Key Benefits</h3><ul><li>Sub-second latency</li><li>No plugins required</li><li>Built-in security</li><li>Adaptive bitrate</li></ul>', 'Live Streaming', 'bg-gradient-to-r from-orange-400 to-yellow-400', '📹', '550e8400-e29b-41d4-a716-446655440001', '8 min read', 124, 23, 89),
('650e8400-e29b-41d4-a716-446655440002', 'AI-Powered Live Shopping: The Future of E-commerce', 'ai-powered-live-shopping-future-ecommerce', 'Discover how artificial intelligence is transforming live shopping experiences with personalized recommendations and real-time analytics.', '<h2>The Rise of Live Shopping</h2><p>Live shopping has emerged as a powerful combination of entertainment and commerce, with AI playing a crucial role in enhancing the experience.</p>', 'Live Shopping', 'bg-gradient-to-r from-blue-400 to-purple-400', '🛒', '550e8400-e29b-41d4-a716-446655440002', '6 min read', 98, 17, 67),
('650e8400-e29b-41d4-a716-446655440003', 'Building Scalable API Platforms with GraphQL', 'building-scalable-api-platforms-graphql', 'Learn how to design and implement scalable API platforms using GraphQL for modern applications.', '<h2>Why GraphQL for API Platforms?</h2><p>GraphQL provides a more efficient, powerful and flexible alternative to REST APIs, especially for complex applications.</p>', 'API Platform', 'bg-gradient-to-r from-green-400 to-blue-400', '🔗', '550e8400-e29b-41d4-a716-446655440003', '12 min read', 156, 34, 112),
('650e8400-e29b-41d4-a716-446655440004', 'Implementing Secure Payment Systems', 'implementing-secure-payment-systems', 'A comprehensive guide to building secure, PCI-compliant payment systems for modern applications.', '<h2>Payment Security Fundamentals</h2><p>Building secure payment systems requires understanding of encryption, tokenization, and compliance requirements.</p>', 'Payment Systems', 'bg-gradient-to-r from-pink-400 to-red-400', '💳', '550e8400-e29b-41d4-a716-446655440004', '10 min read', 87, 19, 73),
('650e8400-e29b-41d4-a716-446655440005', 'Real-time Chat Platforms: Architecture & Implementation', 'realtime-chat-platforms-architecture-implementation', 'Design patterns and technologies for building scalable real-time chat platforms.', '<h2>Chat Platform Architecture</h2><p>Building scalable chat platforms requires careful consideration of real-time communication, message persistence, and user presence.</p>', 'Chat Platform', 'bg-gradient-to-r from-purple-400 to-pink-400', '💬', '550e8400-e29b-41d4-a716-446655440005', '9 min read', 143, 28, 95),
('650e8400-e29b-41d4-a716-446655440006', 'AI-Driven Grocery Store Management', 'ai-driven-grocery-store-management', 'How artificial intelligence is revolutionizing inventory management and customer experience in grocery stores.', '<h2>AI in Grocery Operations</h2><p>Modern grocery stores are leveraging AI for demand forecasting, inventory optimization, and personalized shopping experiences.</p>', 'Grocery Store', 'bg-gradient-to-r from-green-400 to-yellow-400', '🥬', '550e8400-e29b-41d4-a716-446655440006', '7 min read', 76, 15, 58);

-- Insert sample tags
INSERT INTO post_tags (post_id, tag) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'webrtc'),
('650e8400-e29b-41d4-a716-446655440001', 'streaming'),
('650e8400-e29b-41d4-a716-446655440001', 'javascript'),
('650e8400-e29b-41d4-a716-446655440002', 'ai'),
('650e8400-e29b-41d4-a716-446655440002', 'ecommerce'),
('650e8400-e29b-41d4-a716-446655440002', 'shopping'),
('650e8400-e29b-41d4-a716-446655440003', 'graphql'),
('650e8400-e29b-41d4-a716-446655440003', 'api'),
('650e8400-e29b-41d4-a716-446655440003', 'backend'),
('650e8400-e29b-41d4-a716-446655440004', 'payments'),
('650e8400-e29b-41d4-a716-446655440004', 'security'),
('650e8400-e29b-41d4-a716-446655440004', 'fintech'),
('650e8400-e29b-41d4-a716-446655440005', 'chat'),
('650e8400-e29b-41d4-a716-446655440005', 'websockets'),
('650e8400-e29b-41d4-a716-446655440005', 'realtime'),
('650e8400-e29b-41d4-a716-446655440006', 'ai'),
('650e8400-e29b-41d4-a716-446655440006', 'retail'),
('650e8400-e29b-41d4-a716-446655440006', 'grocery');

-- Insert sample comments
INSERT INTO comments (id, post_id, author_id, content, likes) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Great insights on live streaming technology! The real-time processing capabilities you mentioned are game-changing.', 12),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Would love to see more technical details about the implementation. Any chance of a follow-up post?', 8),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Absolutely agree! The latency improvements are incredible.', 5);

-- Insert sample follows
INSERT INTO user_follows (follower_id, following_id) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003');
