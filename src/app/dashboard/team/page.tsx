'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  UserPlus,
  Mail,
  Crown,
  Shield,
  User,
  MoreVertical,
  Trash2,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';

type Role = 'owner' | 'admin' | 'member' | 'viewer';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'pending';
  joinedAt: string;
  lastActive: string;
}

export default function TeamPage() {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample team data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
      status: 'active',
      joinedAt: '2025-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: '2025-03-20',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'member',
      status: 'active',
      joinedAt: '2025-06-10',
      lastActive: '3 days ago'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'viewer',
      status: 'pending',
      joinedAt: '2025-10-13',
      lastActive: 'Never'
    }
  ];

  const handleInvite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      role: formData.get('role'),
      message: formData.get('message')
    };
    console.log('Invite team member:', data);
    setShowInviteForm(false);
    e.currentTarget.reset();
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    console.log('Remove team member:', { memberId, memberName });
  };

  const handleResendInvite = (memberId: string, email: string) => {
    console.log('Resend invite to:', { memberId, email });
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4" />;
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'member':
      case 'viewer':
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'member':
        return 'bg-green-100 text-green-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header with Breadcrumb */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Team Management
              </h1>
              <p className="text-gray-600">
                Manage your team members and their permissions
              </p>
            </div>
            <Button variant="primary" onClick={() => setShowInviteForm(!showInviteForm)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invite Form */}
        {showInviteForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Invite Team Member</CardTitle>
              <CardDescription>
                Send an invitation to join your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="colleague@example.com"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="viewer">Viewer - Read-only access</option>
                      <option value="member">Member - Can create and edit</option>
                      <option value="admin">Admin - Full access except billing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a personal note to your invitation..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowInviteForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors ${
                    index < filteredMembers.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        {member.status === 'pending' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last active {member.lastActive}</span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span className="text-sm font-medium capitalize">{member.role}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {member.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResendInvite(member.id, member.email)}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Resend
                        </Button>
                      )}
                      {member.role !== 'owner' && (
                        <>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id, member.name)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles & Permissions Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>
              Understanding team member access levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getRoleColor('owner')}`}>
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Owner</h4>
                  <p className="text-sm text-gray-600">
                    Full access to all features including billing, team management, and can transfer ownership
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getRoleColor('admin')}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Admin</h4>
                  <p className="text-sm text-gray-600">
                    Can manage apps, data sources, invite members, and modify team settings (except billing)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getRoleColor('member')}`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Member</h4>
                  <p className="text-sm text-gray-600">
                    Can create and edit apps, connect data sources, but cannot manage team members
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getRoleColor('viewer')}`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Viewer</h4>
                  <p className="text-sm text-gray-600">
                    Read-only access to apps and analytics, cannot make any changes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
