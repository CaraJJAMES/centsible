import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { analyticsRouter } from './routes/analytics';
import { subscriptionRouter } from './routes/subscriptions';
import { adminRouter } from './routes/admin';
import { setupAnalytics } from './services/analytics';
import { setupStripe } from './services/stripe';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Setup analytics services
setupAnalytics();

// Setup Stripe
setupStripe();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});