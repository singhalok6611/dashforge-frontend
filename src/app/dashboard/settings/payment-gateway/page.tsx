'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import api from '@/lib/api';
import {
  CreditCard,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Settings
} from 'lucide-react';

interface PaymentGatewayConfig {
  razorpay_key_id: string;
  razorpay_key_secret: string;
  razorpay_webhook_secret: string;
}

export default function PaymentGatewaySettings() {
  const { showToast } = useToast();
  const [config, setConfig] = useState<PaymentGatewayConfig>({
    razorpay_key_id: '',
    razorpay_key_secret: '',
    razorpay_webhook_secret: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState({
    key_secret: false,
    webhook_secret: false,
  });
  const [testMode, setTestMode] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await api.get('/payments/config');
      const data = response.data;
      if (data.success && data.data) {
        setConfig(data.data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.post('/payments/config', config);

      const data = response.data;
      if (data.success) {
        showToast('Payment gateway configuration saved successfully', 'success');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to save configuration', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Gateway Settings</h1>
        <p className="text-gray-600">Configure your Razorpay credentials to accept payments</p>
      </div>

      {/* Setup Instructions */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <AlertCircle className="w-5 h-5 mr-2" />
            How to Get Your Razorpay Credentials
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-3">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Sign up for Razorpay at{' '}
              <a
                href="https://dashboard.razorpay.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline inline-flex items-center"
              >
                dashboard.razorpay.com
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </li>
            <li>Complete your KYC verification (required for live mode)</li>
            <li>
              Go to Settings → API Keys in your Razorpay dashboard
            </li>
            <li>Generate API keys (use Test Mode keys for testing)</li>
            <li>Copy your Key ID and Key Secret and paste them below</li>
            <li>
              Go to Settings → Webhooks to set up webhook URL:{' '}
              <code className="bg-blue-100 px-2 py-1 rounded">
                https://yourdomain.com/api/payments/webhook
              </code>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Test Mode Toggle */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Test Mode</h3>
              <p className="text-sm text-gray-600">
                Use test keys for testing. Switch to live keys when ready for production.
              </p>
            </div>
            <button
              onClick={() => setTestMode(!testMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                testMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  testMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {testMode && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              <p className="text-sm text-amber-800">
                Currently in Test Mode. Real payments will not be processed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Razorpay Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Razorpay Configuration
          </CardTitle>
          <CardDescription>
            Enter your Razorpay API credentials. Supports UPI, Cards, Wallets, NetBanking, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key ID */}
          <div className="space-y-2">
            <Label htmlFor="key_id">
              Razorpay Key ID
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="key_id"
              type="text"
              placeholder={testMode ? "rzp_test_xxxxxxxxxxxxx" : "rzp_live_xxxxxxxxxxxxx"}
              value={config.razorpay_key_id}
              onChange={(e) => setConfig({ ...config, razorpay_key_id: e.target.value })}
              className="font-mono"
            />
            <p className="text-xs text-gray-500">
              Your public key ID (starts with {testMode ? 'rzp_test_' : 'rzp_live_'})
            </p>
          </div>

          {/* Key Secret */}
          <div className="space-y-2">
            <Label htmlFor="key_secret">
              Razorpay Key Secret
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="key_secret"
                type={showSecrets.key_secret ? 'text' : 'password'}
                placeholder="Enter your Razorpay Key Secret"
                value={config.razorpay_key_secret}
                onChange={(e) => setConfig({ ...config, razorpay_key_secret: e.target.value })}
                className="font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSecrets({ ...showSecrets, key_secret: !showSecrets.key_secret })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showSecrets.key_secret ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Your secret key (keep this confidential)
            </p>
          </div>

          {/* Webhook Secret */}
          <div className="space-y-2">
            <Label htmlFor="webhook_secret">
              Webhook Secret
              <span className="text-gray-400 ml-1">(Optional)</span>
            </Label>
            <div className="relative">
              <Input
                id="webhook_secret"
                type={showSecrets.webhook_secret ? 'text' : 'password'}
                placeholder="Enter your webhook secret"
                value={config.razorpay_webhook_secret}
                onChange={(e) => setConfig({ ...config, razorpay_webhook_secret: e.target.value })}
                className="font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSecrets({ ...showSecrets, webhook_secret: !showSecrets.webhook_secret })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showSecrets.webhook_secret ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Used to verify webhook authenticity
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {config.razorpay_key_id && config.razorpay_key_secret ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Configuration ready</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-600">Please enter your credentials</span>
                </>
              )}
            </div>
            <Button
              onClick={handleSave}
              disabled={saving || !config.razorpay_key_id || !config.razorpay_key_secret}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Supported Payment Methods */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Supported Payment Methods</CardTitle>
          <CardDescription>
            Razorpay automatically enables all these payment methods for your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-medium text-gray-900">Credit/Debit Cards</div>
              <div className="text-xs text-gray-500 mt-1">Visa, Mastercard, Amex</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm font-medium text-gray-900">UPI</div>
              <div className="text-xs text-gray-500 mt-1">Google Pay, PhonePe, Paytm</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">👛</div>
              <div className="text-sm font-medium text-gray-900">Wallets</div>
              <div className="text-xs text-gray-500 mt-1">Paytm, PhonePe, Amazon Pay</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">🏦</div>
              <div className="text-sm font-medium text-gray-900">NetBanking</div>
              <div className="text-xs text-gray-500 mt-1">All major banks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Cards Info */}
      {testMode && (
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-900 text-lg">Test Mode - Use Test Cards</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-800 space-y-2">
            <p className="font-medium">For testing, use these test card numbers:</p>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-xs space-y-1">
              <div><strong>Success:</strong> 4111 1111 1111 1111</div>
              <div><strong>CVV:</strong> Any 3 digits</div>
              <div><strong>Expiry:</strong> Any future date</div>
            </div>
            <p className="text-xs mt-2">
              For UPI testing, use any valid UPI ID in test mode.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
