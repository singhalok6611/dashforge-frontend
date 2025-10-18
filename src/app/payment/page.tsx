'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import api from '@/lib/api';
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Lock,
  Smartphone,
  Wallet,
  Building
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ToastProvider, useToast } from '@/components/ui/toast';

// Declare Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const plan = searchParams?.get('plan') || 'starter';
  const [processing, setProcessing] = useState(false);

  const plans = {
    free: { price: 0, priceINR: 0, name: 'Free' },
    starter: { price: 29, priceINR: 2400, name: 'Starter' },
    professional: { price: 99, priceINR: 8200, name: 'Professional' },
    enterprise: { price: 299, priceINR: 24900, name: 'Enterprise' },
  };

  const currentPlan = plans[plan as keyof typeof plans] || plans.starter;

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // Create payment intent/order
      const intentResponse = await api.post('/payments/intent', {
        plan,
        paymentMethod: 'razorpay',
        currency: 'INR',
      });

      const intentData = intentResponse.data;
      if (!intentData.success) {
        throw new Error(intentData.error);
      }

      const orderData = intentData.data;

      // Check if Razorpay is configured
      if (orderData.mode === 'live' && orderData.razorpayKeyId && window.Razorpay) {
        // Real Razorpay integration
        const options = {
          key: orderData.razorpayKeyId,
          amount: orderData.amountInPaise,
          currency: orderData.currency,
          name: 'DashForge',
          description: `${orderData.plan} Plan Subscription`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await api.post('/payments/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              const verifyData = verifyResponse.data;
              if (verifyData.success) {
                showToast('Payment successful! Redirecting...', 'success');
                setTimeout(() => {
                  router.push('/dashboard?upgraded=true&payment=success');
                }, 1500);
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error: any) {
              showToast(error.message || 'Payment verification failed', 'error');
              setProcessing(false);
            }
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          notes: {
            plan: orderData.plan,
          },
          theme: {
            color: '#2563eb',
          },
          modal: {
            ondismiss: function() {
              setProcessing(false);
              showToast('Payment cancelled', 'error');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Demo mode - Razorpay not configured
        showToast('Razorpay not configured. Please add your Razorpay keys to .env file.', 'error');
        setTimeout(() => {
          router.push('/dashboard/settings/payment-gateway');
        }, 2000);
        setProcessing(false);
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      showToast(error.message || 'Payment failed. Please try again.', 'error');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/billing" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Billing
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600 text-lg">Secure payment powered by Razorpay</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Details Card */}
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentPlan.name} Plan</h2>
                    <p className="text-gray-600 mt-1">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">₹{currentPlan.priceINR}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span>Instant activation after payment</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span>Cancel anytime, no commitment</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-xs text-gray-600 text-center">Cards</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Smartphone className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-xs text-gray-600 text-center">UPI</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Wallet className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-xs text-gray-600 text-center">Wallets</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Building className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-xs text-gray-600 text-center">NetBanking</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Choose your preferred method at checkout: Google Pay, PhonePe, Paytm, Cards, and more
                </p>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Secure & Safe Payment</h3>
                  <p className="text-sm text-blue-800">
                    Your payment information is encrypted and secure. We never store your card details.
                    All transactions are processed through Razorpay's PCI DSS compliant payment gateway.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-2 border-gray-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Plan</span>
                    <span className="font-semibold">{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Billing</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{currentPlan.priceINR}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST (18%)</span>
                    <span className="font-medium">₹{Math.round(currentPlan.priceINR * 0.18)}</span>
                  </div>

                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-blue-600">
                        ₹{currentPlan.priceINR + Math.round(currentPlan.priceINR * 0.18)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Includes all taxes</p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  {processing ? 'Processing...' : 'Pay Now'}
                </button>

                <div className="mt-6 space-y-2 text-xs text-gray-500 text-center">
                  <p>By proceeding, you agree to our Terms of Service</p>
                  <p>Secured by Razorpay Payment Gateway</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span className="text-sm">PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">100% Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <ToastProvider>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
        <PaymentPageContent />
      </Suspense>
    </ToastProvider>
  );
}
