
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Home,
  Lightbulb,
  Compass,
  Briefcase,
  MessageSquare,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SettingsPage from '@/components/SettingsPage';
import NotificationCenter from '@/components/NotificationCenter';
import AIAssistantToggle from './AIAssistantToggle';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'My Ideas', path: '/ideas', icon: Lightbulb },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  ];

  return (
    <>
      
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InnovateHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {/* Submit Idea Button */}
                  <Button
                    asChild
                    size="sm"
                    className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Link to="/submit">
                      <Plus className="w-4 h-4 mr-2" />
                      Submit Idea
                    </Link>
                  </Button>

                  {/* AI Assistant Toggle */}
                  <AIAssistantToggle />

                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationCenterOpen(!notificationCenterOpen)}
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                  </Button>

                  <NotificationCenter 
                    isOpen={notificationCenterOpen}
                    onClose={() => setNotificationCenterOpen(false)} 
                  />

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center space-x-2"
                    >
                      <User className="w-5 h-5" />
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-500 border-b">
                            {user.email}
                          </div>
                          <button
                            onClick={() => setSettingsOpen(true)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Button asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {user && (
                <Link
                  to="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Idea</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {settingsOpen && (
        <SettingsPage onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
};

export default Header;
