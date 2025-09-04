import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration - IMPORTANT for frontend → backend communication
app.use(cors({
  origin: [
    'http://localhost:3000',    // React dev server
    'http://localhost:5173',    // Vite dev server
    'http://localhost:4173',    // Vite preview
    'https://yourdomain.com'    // Production domain (replace with your actual domain)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User schema for contact messages
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('ContactMessage', userSchema);

// Nodemailer configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoint
app.post('/send-message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        msg: 'All fields are required' 
      });
    }

    // Create new contact message
    const newUser = new User({ name, email, subject, message });
    await newUser.save();

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to yourself
          subject: `New Contact Form Message: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Sent from your portfolio contact form</em></p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.json({ 
      success: true, 
      msg: "Message saved and email sent!",
      messageId: newUser._id
    });

  } catch (err) {
    console.error('❌ Error processing contact form:', err);
    
    // Handle specific MongoDB errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        msg: errors.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      msg: 'Internal server error. Please try again later.' 
    });
  }
});

// Get all messages (for admin purposes)
app.get('/messages', async (req, res) => {
  try {
    const messages = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ 
      success: false, 
      msg: 'Failed to fetch messages' 
    });
  }
});

// Mark message as read
app.put('/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await User.findByIdAndUpdate(
      id, 
      { isRead: true }, 
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        msg: 'Message not found' 
      });
    }
    
    res.json({ success: true, message });
  } catch (err) {
    console.error('❌ Error updating message:', err);
    res.status(500).json({ 
      success: false, 
      msg: 'Failed to update message' 
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    msg: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    msg: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled'}`);
  console.log(`🗄️  MongoDB: ${MONGODB_URI}`);
});

export default app;
