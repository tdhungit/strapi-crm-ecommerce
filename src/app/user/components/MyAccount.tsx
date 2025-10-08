'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, Hash, User } from 'lucide-react';
import { useSelector } from 'react-redux';

interface UserData {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bod: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  salutation: string | null;
  mobile: string | null;
  jobTitle: string | null;
  department: string | null;
  leadSource: string;
  description: string | null;
}

export default function MyAccount() {
  const user = useSelector((state: any) => state.user.user) as UserData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {getInitials(user?.firstName || '', user?.lastName || '')}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge variant="outline" className="text-xs">
                Member since {formatDate(user?.createdAt || '')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your basic account information
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={user?.firstName || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={user?.lastName || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  value={user?.email || ''} 
                  disabled 
                  className="bg-muted pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="phone" 
                  value={user?.phone || ''} 
                  disabled 
                  className="bg-muted pl-10"
                />
              </div>
            </div>
          </div>

          {user?.description && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={user.description} 
                disabled 
                className="bg-muted"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            Additional account information
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentId">Document ID</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="documentId" 
                  value={user?.documentId || ''} 
                  disabled 
                  className="bg-muted pl-10 font-mono text-xs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadSource">Lead Source</Label>
              <Input 
                id="leadSource" 
                value={user?.leadSource || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="createdAt">Account Created</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="createdAt" 
                  value={formatDate(user?.createdAt || '')} 
                  disabled 
                  className="bg-muted pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="updatedAt">Last Updated</Label>
              <Input 
                id="updatedAt" 
                value={formatDate(user?.updatedAt || '')} 
                disabled 
                  className="bg-muted"
              />
            </div>
          </div>

          {user?.jobTitle && (
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                value={user.jobTitle} 
                disabled 
                className="bg-muted"
              />
            </div>
          )}

          {user?.department && (
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department" 
                value={user.department} 
                disabled 
                className="bg-muted"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
