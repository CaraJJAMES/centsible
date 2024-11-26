import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const prisma = new PrismaClient();

export function setupStripe() {
  // Setup Stripe webhook handling
}

export async function createSubscription(userId: string, priceId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) throw new Error('User not found');

    // Create or update Stripe customer
    let stripeCustomerId = user.subscription?.stripeId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    // Update database
    await prisma.subscription.create({
      data: {
        userId,
        planId: priceId,
        status: subscription.status,
        stripeId: subscription.id,
        startDate: new Date(subscription.current_period_start * 1000),
        endDate: new Date(subscription.current_period_end * 1000),
      },
    });

    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);

    await prisma.subscription.update({
      where: { stripeId: subscriptionId },
      data: {
        status: subscription.status,
        cancelledAt: new Date(),
      },
    });

    return subscription;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}

export async function updateSubscription(subscriptionId: string, priceId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
    });

    await prisma.subscription.update({
      where: { stripeId: subscriptionId },
      data: {
        planId: priceId,
        status: updatedSubscription.status,
      },
    });

    return updatedSubscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}