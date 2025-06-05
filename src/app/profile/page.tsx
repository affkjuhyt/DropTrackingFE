"use client";

import { Button } from "@/components/ui/shadcn/button"
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Input } from "@/components/ui/shadcn/input"
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get('/users/me');
  return data;
};

const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile> => {
  const { data } = await apiClient.patch('/users/profile', profile);
  return data;
};

export default function Component() {
  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      console.log('Profile updated successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    }
  });

  if (isLoading) {
    console.log('Profile component is loading...');
    return <div>Loading...</div>;
  }
  console.log('Profile component rendered with data:', profile);
  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg"
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{profile?.first_name} {profile?.last_name}</h1>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card className="py-4">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input 
                  id="first_name" 
                  placeholder="E.g. Jane" 
                  defaultValue={profile?.first_name}
                  onChange={(e) => updateProfile({ first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input 
                  id="last_name" 
                  placeholder="E.g. Doe" 
                  defaultValue={profile?.last_name}
                  onChange={(e) => updateProfile({ last_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="E.g. jane@example.com" 
                  defaultValue={profile?.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_joined">Member Since</Label>
                <Input 
                  id="date_joined" 
                  // defaultValue={new Date(profile?.date_joined).toLocaleDateString()}
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>For your security, please do not share your password with others.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button 
            onClick={() => {
              const formData = {
                first_name: profile?.first_name,
                last_name: profile?.last_name
              };
              console.log('Saving profile changes:', formData);
              updateProfile(formData);
            }}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}
