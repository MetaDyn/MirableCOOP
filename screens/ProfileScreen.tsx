
import React from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, CreditCard, MapPin, ShieldCheck, LogOut } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

interface ProfileScreenProps {
  user: User;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  return (
    <div className="pb-10">
      <header className="bg-brand-red text-white p-6 pb-12 rounded-b-[2.5rem] shadow-md relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-red shadow-inner">
             <UserIcon size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
            <p className="text-white/80 text-sm">@{user.username}</p>
          </div>
        </div>
      </header>

      <div className="px-6 -mt-8 relative z-20 space-y-6">
        
        {/* Stats Card */}
        <Card className="flex justify-around py-6 shadow-lg">
           <div className="text-center">
              <span className="block text-2xl font-bold text-brand-red">{user.tokens}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Tokens</span>
           </div>
           <div className="w-px bg-gray-100"></div>
           <div className="text-center">
              <span className="block text-2xl font-bold text-gray-800">1</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Level</span>
           </div>
           <div className="w-px bg-gray-100"></div>
           <div className="text-center">
              <span className="block text-2xl font-bold text-gray-800">0</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Badges</span>
           </div>
        </Card>

        {/* Details */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Account Details</h3>
            
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="flex items-center p-4 border-b border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                        <Mail size={16} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-medium text-gray-800">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-center p-4 border-b border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center mr-3">
                        <CreditCard size={16} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400">Coop Card</p>
                        <p className="text-sm font-medium text-gray-800">{user.loyalty_card || 'Not connected'}</p>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-3">
                        <MapPin size={16} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-800">{user.city ? `${user.city}, ${user.zip_code}` : 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Legal Status */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Privacy & Settings</h3>
             <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                        <ShieldCheck size={16} className="mr-2 text-green-600" />
                        Terms Accepted
                    </div>
                    <span className="text-xs font-bold text-green-600">YES</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                        <ShieldCheck size={16} className="mr-2 text-green-600" />
                        Privacy Policy
                    </div>
                    <span className="text-xs font-bold text-green-600">YES</span>
                </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                        <ShieldCheck size={16} className={`mr-2 ${user.privacy2_accepted ? 'text-green-600' : 'text-gray-300'}`} />
                        Marketing Consents
                    </div>
                    <span className={`text-xs font-bold ${user.privacy2_accepted ? 'text-green-600' : 'text-gray-400'}`}>
                        {user.privacy2_accepted ? 'YES' : 'NO'}
                    </span>
                </div>
            </div>
        </div>

        <div className="pt-4 pb-8">
            <Button variant="outline" fullWidth className="flex items-center justify-center border-gray-300 text-gray-500">
                <LogOut size={16} className="mr-2" />
                Log Out
            </Button>
            <p className="text-center text-[10px] text-gray-300 mt-4">App Version 1.0.0 (Alpha)</p>
        </div>

      </div>
    </div>
  );
};
