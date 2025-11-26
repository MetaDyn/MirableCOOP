import React from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { User } from '../types';
import { Ticket, MapPin, Clock, ArrowRight, Zap, Trophy } from 'lucide-react';

interface HomeScreenProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigate }) => {
  return (
    <div className="pb-10">
      {/* Header */}
      <header className="bg-white p-6 pb-4 border-b border-gray-100 sticky top-0 z-30">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Welcome back,</p>
                <h1 className="text-2xl font-bold text-gray-900">{user.first_name}!</h1>
            </div>
            <div className="bg-gray-100 rounded-full p-1 pr-3 flex items-center space-x-2 border border-gray-200">
                <div className="bg-brand-red text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <Zap size={16} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-none">{user.tokens}</span>
                    <span className="text-[10px] text-gray-500 leading-none">Tokens</span>
                </div>
            </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        
        {/* Instant Win Banner */}
        <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="relative p-6 flex flex-col items-center text-center text-white">
                <Ticket className="mb-3 opacity-90" size={32} />
                <h2 className="text-xl font-bold mb-1">Instant Win</h2>
                <p className="text-xs text-indigo-100 mb-4 px-4">
                    Spin the wheel using your tokens for a chance to win immediate prizes!
                </p>
                <button className="bg-white text-indigo-600 text-xs font-bold py-2 px-6 rounded-full shadow-md">
                    Play Now
                </button>
            </div>
        </div>

        {/* Main Mission Card */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">Current Mission</h3>
                <span className="text-xs text-brand-red font-medium">Expires in 2 days</span>
            </div>
            
            <Card className="p-0 overflow-hidden border-0 shadow-md flex flex-col">
                <div className="h-32 bg-gray-200 relative">
                    <img src="https://picsum.photos/id/1040/600/300" alt="City Map" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                        <Badge>City 1</Badge>
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-900">Traveling through Italy</h4>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        Find the hidden ingredients in the bustling market of Rome to unlock the secret recipe.
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mb-5">
                        <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            <span>12 Locations</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>15 Mins</span>
                        </div>
                    </div>

                    <Button fullWidth onClick={() => onNavigate('GAME')}>
                        Continue Journey
                    </Button>
                </div>
            </Card>
        </div>

        {/* Secondary Info */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                    <Trophy size={20} />
                </div>
                <span className="text-sm font-bold text-gray-800">All Prizes</span>
            </Card>
            <Card className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <MapPin size={20} />
                </div>
                <span className="text-sm font-bold text-gray-800">Map Overview</span>
            </Card>
        </div>
      </div>
    </div>
  );
};