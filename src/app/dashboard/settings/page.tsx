'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Bell, Palette, Shield, Save } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile');
  const [theme, setThemeState] = useState<string>('light');
  const [accentColor, setAccentColorState] = useState<string>('blue');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
      });
    }

    const savedTheme = localStorage.getItem('theme');
    const savedAccentColor = localStorage.getItem('accentColor');

    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (savedAccentColor) {
      setAccentColorState(savedAccentColor);
      document.documentElement.setAttribute('data-accent', savedAccentColor);
    }

    setLoading(false);
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setAccentColor = (newColor: string) => {
    setAccentColorState(newColor);
    localStorage.setItem('accentColor', newColor);
    // Apply accent color to document
    document.documentElement.setAttribute('data-accent', newColor);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Update localStorage
      if (user) {
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAppearance = async () => {
    try {
      setSaving(true);
      alert(`✅ Appearance settings saved successfully!\n\n🎨 Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}\n🌈 Accent Color: ${accentColor.charAt(0).toUpperCase() + accentColor.slice(1)}\n\nYour preferences have been applied!`);
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      alert('Failed to save appearance settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">Settings</h1>
          <p className="text-[rgb(var(--text-secondary))]">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="primary">
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates about your apps</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">App Updates</p>
                      <p className="text-sm text-gray-500">Get notified when your apps are updated</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Team Activity</p>
                      <p className="text-sm text-gray-500">Updates from your team members</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Receive tips and product updates</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how DashForge looks for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {/* Light */}
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 border-2 rounded-lg bg-white hover:bg-gray-50 transition-colors ${
                          theme === 'light' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1 text-gray-900">Light</div>
                        <div className="text-xs text-gray-500">Default</div>
                      </button>

                      {/* GitHub Dark */}
                      <button
                        onClick={() => setTheme('github-dark')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white hover:shadow-lg transition-all ${
                          theme === 'github-dark' ? 'border-[#58a6ff] ring-2 ring-[#58a6ff]/50' : 'border-gray-700 hover:border-[#58a6ff]/50'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">GitHub Dark</div>
                        <div className="text-xs text-[#58a6ff]">Popular</div>
                      </button>

                      {/* Dracula */}
                      <button
                        onClick={() => setTheme('dracula')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#282a36] via-[#44475a] to-[#bd93f9] text-white hover:shadow-lg transition-all ${
                          theme === 'dracula' ? 'border-[#bd93f9] ring-2 ring-[#bd93f9]/50' : 'border-gray-700 hover:border-[#bd93f9]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Dracula</div>
                        <div className="text-xs text-[#bd93f9]">Vibrant</div>
                      </button>

                      {/* Nord */}
                      <button
                        onClick={() => setTheme('nord')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#2e3440] via-[#3b4252] to-[#88c0d0] text-white hover:shadow-lg transition-all ${
                          theme === 'nord' ? 'border-[#88c0d0] ring-2 ring-[#88c0d0]/50' : 'border-gray-700 hover:border-[#88c0d0]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Nord</div>
                        <div className="text-xs text-[#88c0d0]">Arctic</div>
                      </button>

                      {/* Monokai */}
                      <button
                        onClick={() => setTheme('monokai')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#272822] via-[#3e3d32] to-[#f92672] text-white hover:shadow-lg transition-all ${
                          theme === 'monokai' ? 'border-[#f92672] ring-2 ring-[#f92672]/50' : 'border-gray-700 hover:border-[#f92672]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Monokai</div>
                        <div className="text-xs text-[#f92672]">Classic</div>
                      </button>

                      {/* Solarized */}
                      <button
                        onClick={() => setTheme('solarized')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#002b36] via-[#073642] to-[#268bd2] text-white hover:shadow-lg transition-all ${
                          theme === 'solarized' ? 'border-[#268bd2] ring-2 ring-[#268bd2]/50' : 'border-gray-700 hover:border-[#268bd2]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Solarized</div>
                        <div className="text-xs text-[#268bd2]">Precision</div>
                      </button>

                      {/* Tokyo Night */}
                      <button
                        onClick={() => setTheme('tokyo-night')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#1a1b26] via-[#24283b] to-[#7aa2f7] text-white hover:shadow-lg transition-all ${
                          theme === 'tokyo-night' ? 'border-[#7aa2f7] ring-2 ring-[#7aa2f7]/50' : 'border-gray-700 hover:border-[#7aa2f7]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Tokyo Night</div>
                        <div className="text-xs text-[#7aa2f7]">Clean</div>
                      </button>

                      {/* Synthwave */}
                      <button
                        onClick={() => setTheme('synthwave')}
                        className={`p-4 border-2 rounded-lg bg-gradient-to-br from-[#2b213a] via-[#241b2f] to-[#ff7edb] text-white hover:shadow-lg transition-all ${
                          theme === 'synthwave' ? 'border-[#ff7edb] ring-2 ring-[#ff7edb]/50' : 'border-purple-700 hover:border-[#ff7edb]'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">Synthwave</div>
                        <div className="text-xs text-[#ff7edb]">Retro</div>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Accent Color
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setAccentColor('blue')}
                        className={`w-10 h-10 rounded-lg bg-blue-600 border-2 transition-colors ${
                          accentColor === 'blue' ? 'border-blue-700 ring-2 ring-blue-300' : 'border-gray-200'
                        }`}
                      ></button>
                      <button
                        onClick={() => setAccentColor('purple')}
                        className={`w-10 h-10 rounded-lg bg-purple-600 border-2 transition-colors ${
                          accentColor === 'purple' ? 'border-purple-700 ring-2 ring-purple-300' : 'border-gray-200'
                        }`}
                      ></button>
                      <button
                        onClick={() => setAccentColor('green')}
                        className={`w-10 h-10 rounded-lg bg-green-600 border-2 transition-colors ${
                          accentColor === 'green' ? 'border-green-700 ring-2 ring-green-300' : 'border-gray-200'
                        }`}
                      ></button>
                      <button
                        onClick={() => setAccentColor('red')}
                        className={`w-10 h-10 rounded-lg bg-red-600 border-2 transition-colors ${
                          accentColor === 'red' ? 'border-red-700 ring-2 ring-red-300' : 'border-gray-200'
                        }`}
                      ></button>
                      <button
                        onClick={() => setAccentColor('orange')}
                        className={`w-10 h-10 rounded-lg bg-orange-600 border-2 transition-colors ${
                          accentColor === 'orange' ? 'border-orange-700 ring-2 ring-orange-300' : 'border-gray-200'
                        }`}
                      ></button>
                      <button
                        onClick={() => setAccentColor('pink')}
                        className={`w-10 h-10 rounded-lg bg-pink-600 border-2 transition-colors ${
                          accentColor === 'pink' ? 'border-pink-700 ring-2 ring-pink-300' : 'border-gray-200'
                        }`}
                      ></button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="primary"
                      onClick={handleSaveAppearance}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Appearance'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
