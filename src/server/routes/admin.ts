import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get dashboard metrics
router.get('/metrics', authenticateAdmin, async (req, res) => {
  try {
    const metrics = await prisma.adminMetrics.findFirst({
      orderBy: { date: 'desc' },
    });

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const subscriptionMetrics = await prisma.subscription.groupBy({
      by: ['status'],
      _count: true,
    });

    res.json({
      metrics,
      recentUsers,
      subscriptionMetrics,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get user behavior insights
router.get('/insights', authenticateAdmin, async (req, res) => {
  try {
    const userAnalytics = await prisma.userAnalytics.findMany({
      include: {
        features: true,
      },
    });

    const insights = {
      mostUsedFeatures: calculateMostUsedFeatures(userAnalytics),
      userEngagement: calculateUserEngagement(userAnalytics),
      retentionMetrics: await calculateRetentionMetrics(),
    };

    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// Get subscription analytics
router.get('/subscriptions', authenticateAdmin, async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
      },
    });

    const metrics = {
      totalSubscriptions: subscriptions.length,
      activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
      mrr: calculateMRR(subscriptions),
      churnRate: await calculateChurnRate(),
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription analytics' });
  }
});

// Helper functions
function calculateMostUsedFeatures(analytics: any[]) {
  // Implementation
}

function calculateUserEngagement(analytics: any[]) {
  // Implementation
}

async function calculateRetentionMetrics() {
  // Implementation
}

function calculateMRR(subscriptions: any[]) {
  // Implementation
}

async function calculateChurnRate() {
  // Implementation
}

export { router as adminRouter };