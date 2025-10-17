'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Check,
  Star,
  Users,
  Database,
  Shield,
  Zap,
  Calendar,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    users: number | 'unlimited';
    apps: number | 'unlimited';
    dataSources: number | 'unlimited';
  };
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Up to 1 user',
      'Up to 2 apps',
      '1 data source',
      'Community support',
      'Basic components',
      'Email notifications'
    ],
    limits: {
      users: 1,
      apps: 2,
      dataSources: 1
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'month',
    features: [
      'Up to 5 users',
      'Unlimited apps',
      '3 data sources',
      'Email support',
      'All components',
      'Custom branding',
      'Export data'
    ],
    limits: {
      users: 5,
      apps: 'unlimited',
      dataSources: 3
    },
    popular: true
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    interval: 'month',
    features: [
      'Up to 20 users',
      'Unlimited apps',
      'Unlimited data sources',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Custom domains',
      'SSO (SAML)'
    ],
    limits: {
      users: 20,
      apps: 'unlimited',
      dataSources: 'unlimited'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    features: [
      'Unlimited users',
      'Unlimited everything',
      'Dedicated support',
      'SLA guarantee',
      'Audit logs',
      'Custom integrations',
      'On-premise option',
      'Training & onboarding'
    ],
    limits: {
      users: 'unlimited',
      apps: 'unlimited',
      dataSources: 'unlimited'
    }
  }
];

export default function BillingPage() {
  const router = useRouter();
  const [currentPlan] = useState<string>('free');
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [loading, setLoading] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);

    try {
      // Redirect to payment page with selected plan
      const planName = plans.find(p => p.id === planId)?.name;
      showToast(`Redirecting to payment for ${planName} plan...`, 'info');

      setTimeout(() => {
        router.push(`/payment?plan=${planId}`);
      }, 500);

    } catch (error) {
      showToast('Failed to process upgrade. Please try again.', 'error');
    } finally {
      setLoading(null);
    }
  };

  const handleManageBilling = () => {
    // In production, this would redirect to Stripe Customer Portal:
    // const response = await fetch('/api/billing/create-portal-session', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    // For demo, scroll to payment methods section or show message
    showToast('Billing management features will be available after upgrading to a paid plan', 'info');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan Card */}
      <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl mb-2">Current Plan: Free</CardTitle>
              <CardDescription className="text-gray-600">
                You're currently on the Free plan
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleManageBilling} className="bg-white">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="font-semibold text-gray-900">1 / 1</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Apps</p>
                <p className="font-semibold text-gray-900">0 / 2</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Sources</p>
                <p className="font-semibold text-gray-900">0 / 1</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">Upgrade to unlock more features</p>
              <p className="text-sm text-amber-700 mt-1">
                Get unlimited apps, more users, and priority support with a paid plan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Interval Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingInterval('month')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingInterval === 'month'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingInterval === 'year'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs text-green-600 font-semibold">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const yearlyPrice = plan.price * 12 * 0.8; // 20% discount
          const displayPrice = billingInterval === 'year' ? yearlyPrice / 12 : plan.price;

          return (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-md ${
                plan.popular
                  ? 'border-2 border-blue-600 shadow-lg bg-white'
                  : 'border-2 border-gray-200 bg-white hover:border-gray-300'
              } ${isCurrentPlan ? 'opacity-75' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${displayPrice.toFixed(0)}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                {billingInterval === 'year' && plan.price > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ${(yearlyPrice).toFixed(0)} billed annually
                  </p>
                )}
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full px-4 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 border-2 border-gray-300 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : plan.popular ? (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading === plan.id}
                    className="w-full px-4 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading === plan.id ? (
                      'Processing...'
                    ) : (
                      <>
                        Upgrade
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading === plan.id}
                    className="w-full px-4 py-3 rounded-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading === plan.id ? (
                      'Processing...'
                    ) : (
                      <>
                        {plan.price === 0 ? 'Current Plan' : 'Upgrade'}
                        {plan.price > 0 && <ArrowRight className="w-4 h-4 ml-2" />}
                      </>
                    )}
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Need help choosing?</CardTitle>
          <CardDescription>
            Compare features across all plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enterprise Security</h3>
                <p className="text-sm text-gray-600">
                  All plans include SSL, encrypted credentials, and secure data handling.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Flexible Billing</h3>
                <p className="text-sm text-gray-600">
                  Cancel anytime. No long-term contracts. Save 20% with annual billing.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Team Collaboration</h3>
                <p className="text-sm text-gray-600">
                  Invite team members and collaborate on apps with role-based permissions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods (if user has active subscription) */}
      {currentPlan !== 'free' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                <div>
                  <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {currentPlan !== 'free' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Starter Plan - Monthly</p>
                  <p className="text-sm text-gray-600">January 14, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$29.00</p>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
