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
            <!doctype html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Contact Form Message</title>
              <style>
                /* Mobile-first responsive email styles */
                body { font-family: Arial, Helvetica, sans-serif; margin:0; padding:0; background:#f3f6fb; }
                .wrapper { width:100%; padding:20px 12px; box-sizing:border-box; }
                .card { max-width:650px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 8px 30px rgba(2,6,23,0.08); }
                .hero { background: linear-gradient(135deg,#6a7ff0 0%,#9b5cf6 50%,#ff7ab6 100%); color:#fff; padding:28px 24px; text-align:center; }
                .brand { display:flex; align-items:center; justify-content:center; gap:14px; }
                .badge { width:48px; height:48px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; font-weight:700; background:linear-gradient(135deg,#2dd4bf,#7c3aed); box-shadow:0 6px 18px rgba(124,58,237,0.18); }
                .hero h1 { margin:6px 0 0; font-size:20px; letter-spacing:0.2px; }
                .hero p { margin:6px 0 0; opacity:0.95; font-size:13px; }

                .content { padding:22px; }
                .meta { display:grid; grid-template-columns:1fr; gap:12px; }
                @media (min-width:520px){ .meta { grid-template-columns: 1fr 1fr; } }
                .meta .box { background:linear-gradient(180deg,#ffffff,#fbfdff); border:1px solid #eef3ff; padding:12px 14px; border-radius:10px; }
                .label { display:block; font-size:12px; color:#6b7280; font-weight:700; margin-bottom:6px; }
                .value { font-size:14px; color:#0f172a; word-break:break-word; }

                .subject { margin:10px 0 18px; padding:14px; border-radius:10px; background:linear-gradient(90deg,#eef2ff,#fff7fb); border:1px solid #e6eefc; font-weight:700; color:#0f172a; }

                .message { background:#fbfdff; border:1px dashed #e6eefc; padding:16px; border-radius:8px; color:#0f172a; line-height:1.5; white-space:pre-wrap; }

                .actions { display:flex; gap:10px; margin-top:18px; flex-wrap:wrap; }
                .btn { display:inline-block; padding:10px 16px; border-radius:10px; text-decoration:none; font-weight:700; font-size:13px; }
                .btn-primary { background:linear-gradient(90deg,#6a7ff0,#9b5cf6); color:#fff; box-shadow:0 8px 24px rgba(107,70,193,0.12); }
                .btn-ghost { background:transparent; border:1px solid #e6eefc; color:#0f172a; }

                .footer { padding:16px 22px; font-size:13px; color:#64748b; text-align:center; border-top:1px solid #f1f5f9; }
                .muted { color:#94a3b8; font-size:12px; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="card">
                  <div class="hero">
                    <div class="brand">
                      <div class="badge">JG</div>
                      <div>
                        <h1>New Portfolio Message</h1>
                        <p>You received a message via your portfolio contact form</p>
                      </div>
                    </div>
                  </div>

                  <div class="content">
                    <div class="subject">Subject: ${subject}</div>

                    <div class="meta">
                      <div class="box">
                        <span class="label">👤 From</span>
                        <div class="value">${name}</div>
                      </div>
                      <div class="box">
                        <span class="label">✉️ Email</span>
                        <div class="value"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></div>
                      </div>
                    </div>

                    <div style="margin-top:16px">
                      <span class="label">� Message</span>
                      <div class="message">${message.replace(/\n/g,'\n')}</div>
                    </div>

                    <div class="actions">
                      <a class="btn btn-primary" href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}">Reply to Sender</a>
                      <a class="btn btn-ghost" href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/login">Open Admin Panel</a>
                    </div>
                  </div>

                  <div class="footer">
                    <div class="muted">Received: ${new Date().toLocaleString()}</div>
                    <div style="margin-top:6px">This email was sent from your portfolio contact form</div>
                  </div>
                </div>
              </div>
            </body>
            </html>
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


