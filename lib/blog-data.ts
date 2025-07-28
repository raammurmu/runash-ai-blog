import type { BlogPost } from "./types"

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Real-Time Live Streaming Platform with WebRTC",
    slug: "real-time-live-streaming-webrtc",
    excerpt: "Learn how to build a scalable live streaming platform using WebRTC, Node.js, and modern web technologies. Complete guide with code examples.",
    content: `# Building Real-Time Live Streaming Platform with WebRTC

Live streaming has become an essential part of modern web applications. In this comprehensive guide, we'll explore how to build a real-time live streaming platform using WebRTC technology.

## What is WebRTC?

WebRTC (Web Real-Time Communication) is a free, open-source project that provides web browsers and mobile applications with real-time communication capabilities via simple APIs.

## Key Features

- **Low Latency**: Sub-second latency for real-time interaction
- **Peer-to-Peer**: Direct communication between browsers
- **Cross-Platform**: Works on all modern browsers and mobile devices
- **Secure**: Built-in encryption and security features

## Implementation Steps

### 1. Setting Up the Signaling Server

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });
  
  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });
});
\`\`\`

### 2. Client-Side Implementation

\`\`\`javascript
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
});

// Get user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });
  });
\`\`\`

## Advanced Features

- **Screen Sharing**: Share desktop or application windows
- **Recording**: Save streams for later playback
- **Chat Integration**: Real-time messaging during streams
- **Quality Adaptation**: Automatic quality adjustment based on network conditions

## Conclusion

WebRTC provides a powerful foundation for building real-time streaming applications. With proper implementation, you can create engaging live streaming experiences with minimal latency.`,
    category: "Live Streaming",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    emoji: "📹",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexchen"
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    likes: 234,
    comments: 45,
    upvotes: 189,
    tags: ["WebRTC", "Live Streaming", "JavaScript", "Node.js", "Real-time"]
  },
  {
    id: "2",
    title: "AI-Powered Video Generation for Live Streaming",
    slug: "ai-video-generation-streaming",
    excerpt: "Discover how AI models can generate real-time video content for live streaming platforms. Explore the latest techniques and implementations.",
    content: `# AI-Powered Video Generation for Live Streaming

Artificial Intelligence is revolutionizing the live streaming industry by enabling real-time video generation, enhancement, and personalization.

## Overview

AI-powered video generation combines machine learning models with streaming technology to create dynamic, personalized content in real-time.

## Key Technologies

### 1. Generative Adversarial Networks (GANs)
- Real-time face generation
- Style transfer
- Background replacement

### 2. Computer Vision
- Object detection and tracking
- Facial recognition
- Gesture recognition

### 3. Natural Language Processing
- Automated captions
- Content moderation
- Chat analysis

## Implementation Example

\`\`\`python
import cv2
import tensorflow as tf
from tensorflow import keras

# Load pre-trained model
model = keras.models.load_model('video_generation_model.h5')

def generate_frame(input_frame):
    # Preprocess frame
    processed_frame = preprocess(input_frame)
    
    # Generate enhanced frame
    enhanced_frame = model.predict(processed_frame)
    
    return enhanced_frame

# Real-time processing
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if ret:
        enhanced_frame = generate_frame(frame)
        cv2.imshow('AI Enhanced Stream', enhanced_frame)
\`\`\`

## Use Cases

- **Virtual Backgrounds**: AI-generated backgrounds
- **Avatar Creation**: Real-time avatar generation
- **Content Enhancement**: Automatic video quality improvement
- **Interactive Elements**: AI-driven interactive overlays

## Future Trends

The future of AI in live streaming includes:
- Real-time deepfake detection
- Automated content creation
- Personalized viewing experiences
- Advanced content moderation`,
    category: "AI Platform",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    emoji: "🤖",
    author: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahkim"
    },
    publishedAt: "2024-01-12",
    readTime: "12 min read",
    likes: 456,
    comments: 78,
    upvotes: 342,
    tags: ["AI", "Machine Learning", "Video Generation", "TensorFlow", "Computer Vision"]
  },
  {
    id: "3",
    title: "Complete Guide to Live Shopping Integration",
    slug: "live-shopping-integration-guide",
    excerpt: "Build engaging live shopping experiences with real-time product showcases, interactive features, and seamless checkout processes.",
    content: `# Complete Guide to Live Shopping Integration

Live shopping combines the engagement of live streaming with the convenience of e-commerce, creating interactive shopping experiences.

## What is Live Shopping?

Live shopping allows viewers to purchase products directly during live streams, creating an interactive and engaging shopping experience.

## Core Components

### 1. Live Stream Infrastructure
- High-quality video streaming
- Low-latency communication
- Scalable architecture

### 2. Product Integration
- Real-time product displays
- Inventory management
- Price updates

### 3. Interactive Features
- Live chat
- Product questions
- Polls and reactions

## Technical Implementation

### Frontend Components

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { StreamPlayer } from './StreamPlayer';
import { ProductCarousel } from './ProductCarousel';
import { LiveChat } from './LiveChat';

const LiveShoppingStream = ({ streamId }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    // Fetch stream products
    fetchStreamProducts(streamId).then(setProducts);
  }, [streamId]);

  return (
    <div className="live-shopping-container">
      <StreamPlayer streamId={streamId} />
      <ProductCarousel 
        products={products}
        onProductSelect={setCurrentProduct}
      />
      <LiveChat streamId={streamId} />
    </div>
  );
};
\`\`\`

### Backend API

\`\`\`javascript
// Express.js API for live shopping
app.post('/api/streams/:streamId/products', async (req, res) => {
  const { streamId } = req.params;
  const { productId, action } = req.body;

  try {
    if (action === 'showcase') {
      await showcaseProduct(streamId, productId);
      io.to(streamId).emit('product-showcase', { productId });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

## Key Features

### Real-time Product Showcase
- Instant product highlighting
- Detailed product information
- Price and availability updates

### Interactive Shopping Cart
- Add to cart during stream
- Quick checkout process
- Multiple payment options

### Social Features
- Share products with friends
- Wishlist integration
- Social proof indicators

## Best Practices

1. **Optimize for Mobile**: Most live shopping happens on mobile devices
2. **Minimize Latency**: Keep stream delay under 3 seconds
3. **Engaging Hosts**: Train hosts for effective product presentation
4. **Clear CTAs**: Make purchase actions obvious and easy

## Analytics and Insights

Track key metrics:
- Viewer engagement rates
- Conversion rates
- Average order value
- Product showcase effectiveness

## Conclusion

Live shopping represents the future of e-commerce, combining entertainment with commerce for enhanced customer experiences.`,
    category: "Live Shopping",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    emoji: "🛍️",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mikej"
    },
    publishedAt: "2024-01-10",
    readTime: "15 min read",
    likes: 567,
    comments: 89,
    upvotes: 423,
    tags: ["E-commerce", "Live Shopping", "React", "Node.js", "Payment Integration"]
  },
  {
    id: "4",
    title: "Building Scalable API Platforms for Real-time Applications",
    slug: "scalable-api-platforms-realtime",
    excerpt: "Design and implement robust API platforms that can handle millions of real-time requests with high availability and low latency.",
    content: `# Building Scalable API Platforms for Real-time Applications

Creating API platforms that can handle real-time applications requires careful consideration of architecture, performance, and scalability.

## Architecture Principles

### 1. Microservices Architecture
Break down your API into smaller, manageable services:

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
  
  user-service:
    build: ./services/user
    environment:
      - DATABASE_URL=postgresql://...
  
  streaming-service:
    build: ./services/streaming
    environment:
      - REDIS_URL=redis://...
\`\`\`

### 2. Event-Driven Architecture
Use message queues for asynchronous processing:

\`\`\`javascript
// Event publisher
const publishEvent = async (eventType, data) => {
  await redis.publish(eventType, JSON.stringify(data));
};

// Event subscriber
redis.subscribe('user.created', (message) => {
  const userData = JSON.parse(message);
  // Process user creation
});
\`\`\`

## Real-time Communication

### WebSocket Implementation

\`\`\`javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});
\`\`\`

### Server-Sent Events (SSE)

\`\`\`javascript
app.get('/api/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\\n\\n`);
  };

  // Send periodic updates
  const interval = setInterval(() => {
    sendEvent({ timestamp: Date.now(), message: 'Hello' });
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
  });
});
\`\`\`

## Performance Optimization

### Caching Strategies

\`\`\`javascript
const Redis = require('redis');
const client = Redis.createClient();

// Cache frequently accessed data
const getCachedData = async (key) => {
  const cached = await client.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await fetchFromDatabase(key);
  await client.setex(key, 3600, JSON.stringify(data));
  return data;
};
\`\`\`

### Database Optimization

\`\`\`sql
-- Optimize queries with proper indexing
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_posts_created_at ON posts(created_at DESC);

-- Use connection pooling
-- Configure read replicas for read-heavy operations
\`\`\`

## Monitoring and Observability

### Health Checks

\`\`\`javascript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    external_api: await checkExternalAPI()
  };
  
  const isHealthy = Object.values(checks).every(check => check.status === 'ok');
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks
  });
});
\`\`\`

### Metrics Collection

\`\`\`javascript
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  
  next();
});
\`\`\`

## Security Best Practices

### Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
\`\`\`

### Authentication & Authorization

\`\`\`javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
\`\`\`

## Deployment and Scaling

### Container Orchestration

\`\`\`yaml
# kubernetes-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: your-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
\`\`\`

## Conclusion

Building scalable API platforms requires careful planning, proper architecture, and continuous monitoring. Focus on performance, security, and maintainability from the start.`,
    category: "API Platform",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    emoji: "⚡",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "davidw"
    },
    publishedAt: "2024-01-08",
    readTime: "18 min read",
    likes: 789,
    comments: 123,
    upvotes: 567,
    tags: ["API", "Scalability", "Microservices", "Node.js", "Kubernetes"]
  },
  {
    id: "5",
    title: "Modern Payment Integration for Digital Platforms",
    slug: "modern-payment-integration",
    excerpt: "Implement secure, fast, and user-friendly payment systems with support for multiple payment methods and global currencies.",
    content: `# Modern Payment Integration for Digital Platforms

Payment integration is crucial for any digital platform. This guide covers modern payment solutions, security practices, and implementation strategies.

## Payment Ecosystem Overview

### Key Players
- **Payment Processors**: Stripe, PayPal, Square
- **Payment Gateways**: Authorize.Net, Braintree
- **Digital Wallets**: Apple Pay, Google Pay, Amazon Pay
- **Cryptocurrencies**: Bitcoin, Ethereum, stablecoins

## Implementation with Stripe

### Basic Setup

\`\`\`javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
\`\`\`

### Frontend Integration

\`\`\`jsx
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Create payment intent
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    }).then(r => r.json());

    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Payment succeeded!');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};
\`\`\`

## Multi-Payment Provider Support

### Payment Abstraction Layer

\`\`\`javascript
class PaymentProcessor {
  constructor(provider) {
    this.provider = provider;
  }

  async processPayment(paymentData) {
    switch (this.provider) {
      case 'stripe':
        return await this.processStripePayment(paymentData);
      case 'paypal':
        return await this.processPayPalPayment(paymentData);
      default:
        throw new Error('Unsupported payment provider');
    }
  }

  async processStripePayment(data) {
    // Stripe-specific implementation
  }

  async processPayPalPayment(data) {
    // PayPal-specific implementation
  }
}
\`\`\`

## Security Best Practices

### PCI Compliance

\`\`\`javascript
// Never store sensitive card data
// Use tokenization for recurring payments
const createCustomer = async (email, paymentMethodId) => {
  const customer = await stripe.customers.create({
    email,
    payment_method: paymentMethodId,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  return customer;
};
\`\`\`

### Webhook Security

\`\`\`javascript
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    default:
      console.log('Unhandled event type ' + event.type);
  }

  res.json({received: true});
});
\`\`\`

## Advanced Features

### Subscription Management

\`\`\`javascript
// Create subscription
const createSubscription = async (customerId, priceId) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
};

// Handle subscription updates
const updateSubscription = async (subscriptionId, newPriceId) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  await stripe.subscriptions.update(subscriptionId, {
    items: [{
      id: subscription.items.data[0].id,
      price: newPriceId,
    }],
    proration_behavior: 'create_prorations',
  });
};
\`\`\`

### Multi-Currency Support

\`\`\`javascript
const currencyRates = {
  'USD': 1.0,
  'EUR': 0.85,
  'GBP': 0.73,
  'JPY': 110.0
};

const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const usdAmount = amount / currencyRates[fromCurrency];
  return usdAmount * currencyRates[toCurrency];
};

const createPaymentWithCurrency = async (amount, currency, userCurrency) => {
  const convertedAmount = convertCurrency(amount, currency, userCurrency);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(convertedAmount * 100),
    currency: userCurrency.toLowerCase(),
  });

  return paymentIntent;
};
\`\`\`

## Testing and Monitoring

### Test Cards

\`\`\`javascript
// Stripe test cards
const testCards = {
  visa: '4242424242424242',
  visaDebit: '4000056655665556',
  mastercard: '5555555555554444',
  amex: '378282246310005',
  declined: '4000000000000002'
};
\`\`\`

### Payment Analytics

\`\`\`javascript
const trackPaymentMetrics = async (paymentData) => {
  const metrics = {
    amount: paymentData.amount,
    currency: paymentData.currency,
    payment_method: paymentData.payment_method_types[0],
    status: paymentData.status,
    created: paymentData.created,
    processing_time: Date.now() - paymentData.created * 1000
  };

  // Send to analytics service
  await analytics.track('payment_processed', metrics);
};
\`\`\`

## Conclusion

Modern payment integration requires balancing security, user experience, and business requirements. Choose the right providers, implement proper security measures, and continuously monitor performance.`,
    category: "Pay Platform",
    gradient: "bg-gradient-to-br from-emerald-500 to-green-600",
    emoji: "💳",
    author: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "emmad"
    },
    publishedAt: "2024-01-05",
    readTime: "20 min read",
    likes: 432,
    comments: 67,
    upvotes: 298,
    tags: ["Payments", "Stripe", "Security", "E-commerce", "Fintech"]
  },
  {
    id: "6",
    title: "Real-time Chat Platform Architecture",
    slug: "realtime-chat-platform-architecture",
    excerpt: "Design and build scalable real-time chat systems with message queues, WebSockets, and distributed architecture patterns.",
    content: `# Real-time Chat Platform Architecture

Building a scalable real-time chat platform requires careful consideration of architecture, performance, and user experience.

## System Architecture Overview

### Core Components
- **WebSocket Servers**: Handle real-time connections
- **Message Queue**: Distribute messages across servers
- **Database**: Store chat history and user data
- **CDN**: Deliver media files efficiently
- **Load Balancer**: Distribute traffic

## WebSocket Implementation

### Server Setup

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Redis adapter for scaling across multiple servers
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

// Connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      userId: socket.userId,
      socketId: socket.id
    });
  });

  // Handle messages
  socket.on('send-message', async (data) => {
    const message = await saveMessage(data);
    io.to(data.roomId).emit('new-message', message);
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user-typing', {
      userId: socket.userId,
      isTyping: data.isTyping
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
\`\`\`

### Client Implementation

\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatComponent = ({ roomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3001');
    
    // Join room
    socketRef.current.emit('join-room', roomId);

    // Listen for new messages
    socketRef.current.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for typing indicators
    socketRef.current.on('user-typing', (data) => {
      setTypingUsers(prev => {
        if (data.isTyping) {
          return [...prev.filter(id => id !== data.userId), data.userId];
        } else {
          return prev.filter(id => id !== data.userId);
        }
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current.emit('send-message', {
        roomId,
        userId,
        content: newMessage,
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
    }
  };

  const handleTyping = (isTyping) => {
    socketRef.current.emit('typing', {
      roomId,
      userId,
      isTyping
    });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.userId}:</strong> {message.content}
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={() => handleTyping(true)}
          onBlur={() => handleTyping(false)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
\`\`\`

## Message Storage and Retrieval

### Database Schema

\`\`\`sql
-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  room_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
);

-- Rooms table
CREATE TABLE rooms (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'group',
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Room members table
CREATE TABLE room_members (
  room_id VARCHAR(255) REFERENCES rooms(id),
  user_id VARCHAR(255) NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(50) DEFAULT 'member',
  PRIMARY KEY (room_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_messages_room_id_created_at ON messages(room_id, created_at DESC);
CREATE INDEX idx_messages_user_id ON messages(user_id);
\`\`\`

### Message Service

\`\`\`javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class MessageService {
  async saveMessage(messageData) {
    const { roomId, userId, content, messageType = 'text' } = messageData;
    
    const query = `
      INSERT INTO messages (room_id, user_id, content, message_type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await pool.query(query, [roomId, userId, content, messageType]);
    return result.rows[0];
  }

  async getMessages(roomId, limit = 50, offset = 0) {
    const query = `
      SELECT m.*, u.username, u.avatar_url
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.room_id = $1 AND m.is_deleted = FALSE
      ORDER BY m.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await pool.query(query, [roomId, limit, offset]);
    return result.rows.reverse(); // Return in chronological order
  }

  async deleteMessage(messageId, userId) {
    const query = `
      UPDATE messages 
      SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [messageId, userId]);
    return result.rows[0];
  }
}
\`\`\`

## Advanced Features

### File Upload and Sharing

\`\`\`javascript
const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const fileName = \`${Date.now()}-${file.originalname}\`;
    
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(uploadParams).promise();
    
    res.json({
      success: true,
      fileUrl: result.Location,
      fileName: fileName,
      fileSize: file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

## Conclusion

Real-time chat systems are essential for modern applications. With the right architecture and implementation, you can create scalable, secure, and user-friendly chat platforms that enhance user engagement and satisfaction.`,
    category: "Chat Platform",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    emoji: "💬",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "davidk"
    },
    publishedAt: "2024-01-11",
    readTime: "9 min read",
    likes: 143,
    comments: 28,
    upvotes: 95,
    tags: ["chat", "websocket", "real-time", "messaging"]
  },
  {
    id: "7",
    title: "AI-Driven Grocery Delivery Optimization",
    slug: "ai-grocery-delivery-optimization",
    excerpt: "How machine learning algorithms optimize delivery routes, inventory management, and customer experience in online grocery platforms.",
    content: `# AI-Driven Grocery Delivery Optimization

Online grocery platforms are leveraging AI to improve delivery efficiency, inventory management, and customer satisfaction.

## Overview

AI-driven optimization in grocery delivery involves using machine learning models to analyze data and make informed decisions to enhance operational efficiency and customer experience.

## Key Technologies

### 1. Route Optimization
- **Algorithms**: Dijkstra's, A*, Genetic Algorithms
- **Data Sources**: Historical delivery data, traffic patterns, customer locations

### 2. Inventory Management
- **Predictive Analytics**: Forecast demand
- **Automation**: Automated restocking and ordering

### 3. Customer Experience
- **Personalization**: Tailored recommendations based on purchase history
- **Feedback Analysis**: Analyze customer feedback to improve service

## Implementation Example

### Route Optimization

\`\`\`python
import networkx as nx
import numpy as np

# Create a graph with delivery locations
G = nx.Graph()
G.add_edge('A', 'B', weight=1.5)
G.add_edge('B', 'C', weight=2.0)
G.add_edge('C', 'D', weight=1.0)

# Define delivery locations
locations = ['A', 'B', 'C', 'D']

# Calculate optimal route
optimal_route = nx.shortest_path(G, source='A', target='D', weight='weight')
print("Optimal Route:", optimal_route)
\`\`\`

### Inventory Management

\`\`\`python
import pandas as pd
from sklearn.linear_model import LinearRegression

# Load historical sales data
sales_data = pd.read_csv('sales_data.csv')

# Train a model to predict demand
model = LinearRegression()
model.fit(sales_data[['day_of_week', 'hour']], sales_data['sales'])

# Predict demand for a specific time
predicted_demand = model.predict([[3, 14]])  # Wednesday at 2 PM
print("Predicted Demand:", predicted_demand)
\`\`\`

## Use Cases

- **Efficient Delivery Routes**: Optimize delivery paths to reduce time and cost
- **Inventory Restocking**: Automatically restock items based on predicted demand
- **Personalized Recommendations**: Offer customers products they are likely to buy
- **Feedback Loop**: Continuously improve service based on customer feedback

## Future Trends

The future of AI in grocery delivery includes:
- Autonomous delivery vehicles
- Enhanced personalization using AI
- Predictive analytics for supply chain optimization
- Real-time inventory tracking and updates

## Conclusion

AI-driven optimization is transforming the grocery delivery industry. By leveraging machine learning, platforms can enhance operational efficiency, improve customer satisfaction, and stay competitive in the market.`,
    category: "Grocery Store",
    gradient: "bg-gradient-to-br from-green-400 to-yellow-500",
    emoji: "🥬",
    author: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "lisaw"
    },
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    likes: 72,
    comments: 15,
    upvotes: 54,
    tags: ["ai", "logistics", "grocery", "optimization"]
  },
]
