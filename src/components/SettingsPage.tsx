
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Zap, 
  Crown,
  Save,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';

const SettingsPage = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    github_url: '',
    linkedin_url: '',
    job_title: '',
    company_name: '',
    industry: ''
  });

  const [notifications, setNotifications] = useState({
    email_updates: true,
    push_notifications: true,
    marketing_emails: false,
    weekly_digest: true,
    funding_alerts: true
  });

  const [preferences, setPreferences] = useState({
    dark_mode: false,
    ai_suggestions: true,
    public_profile: true,
    analytics_tracking: true
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          username: profile.username,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      const { error: enhancedError } = await supabase
        .from('enhanced_profiles')
        .upsert({
          user_id: user.id,
          bio: profile.bio,
          location: profile.location,
          github_url: profile.github_url,
          linkedin_url: profile.linkedin_url,
          job_title: profile.job_title,
          company_name: profile.company_name,
          industry: profile.industry,
          notification_preferences: notifications,
          updated_at: new Date().toISOString()
        });

      if (enhancedError) throw enhancedError;

      toast({
        title: "Settings saved!",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <p className="text-blue-100">Manage your account and preferences</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Premium
              </TabsTrigger>
            </TabsList>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              <TabsContent value="profile" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profile.full_name}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        placeholder="Choose a username"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="job_title">Job Title</Label>
                      <Input
                        id="job_title"
                        value={profile.job_title}
                        onChange={(e) => setProfile({...profile, job_title: e.target.value})}
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company_name">Company</Label>
                      <Input
                        id="company_name"
                        value={profile.company_name}
                        onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={profile.industry}
                        onChange={(e) => setProfile({...profile, industry: e.target.value})}
                        placeholder="e.g. Technology"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin_url"
                        value={profile.linkedin_url}
                        onChange={(e) => setProfile({...profile, linkedin_url: e.target.value})}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github_url" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                      </Label>
                      <Input
                        id="github_url"
                        value={profile.github_url}
                        onChange={(e) => setProfile({...profile, github_url: e.target.value})}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace('_', ' ')}</Label>
                          <p className="text-sm text-gray-500">
                            {key === 'email_updates' && 'Receive updates about your ideas and feedback'}
                            {key === 'push_notifications' && 'Browser notifications for important events'}
                            {key === 'marketing_emails' && 'Product updates and feature announcements'}
                            {key === 'weekly_digest' && 'Weekly summary of platform activity'}
                            {key === 'funding_alerts' && 'Alerts about new funding opportunities'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, [key]: checked})
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace('_', ' ')}</Label>
                          <p className="text-sm text-gray-500">
                            {key === 'dark_mode' && 'Use dark theme across the application'}
                            {key === 'ai_suggestions' && 'Get AI-powered suggestions for your ideas'}
                            {key === 'public_profile' && 'Make your profile visible to other users'}
                            {key === 'analytics_tracking' && 'Help improve the app with usage analytics'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, [key]: checked})
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="premium" className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                  <p className="text-gray-600 mb-6">Unlock advanced features and get priority support</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600 mb-2" />
                      <h4 className="font-semibold">Advanced AI Insights</h4>
                      <p className="text-sm text-gray-500">Get detailed market analysis and competitor research</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Database className="w-6 h-6 text-green-600 mb-2" />
                      <h4 className="font-semibold">Priority Support</h4>
                      <p className="text-sm text-gray-500">24/7 dedicated support from our expert team</p>
                    </div>
                  </div>

                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
                    Upgrade Now - $29/month
                  </Button>
                </div>
              </TabsContent>
            </div>

            <div className="border-t p-6">
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
