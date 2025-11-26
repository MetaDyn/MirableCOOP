
import React, { useState } from 'react';
import { Button, Card, ToggleSwitch } from '../components/UIComponents';
import { GameSettings } from '../types';
import { ArrowLeft, Music, Volume2, Smartphone, FileText, CheckCircle2 } from 'lucide-react';

interface SettingsScreenProps {
  initialSettings?: GameSettings;
  onClose: () => void;
  onSave: (settings: GameSettings) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
    initialSettings = { music: true, sounds: true, vibration: true }, 
    onClose,
    onSave 
}) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center shadow-sm z-10 shrink-0">
            <button 
                onClick={onClose} 
                className="mr-4 p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Content Container - Optimized for Landscape */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Column 1: Audio & Haptics */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Audio & Haptics</h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                            
                            {/* Music */}
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center text-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                                        <Music size={20} />
                                    </div>
                                    <span className="font-medium">Music</span>
                                </div>
                                <ToggleSwitch 
                                    checked={settings.music} 
                                    onChange={(v) => setSettings(prev => ({...prev, music: v}))} 
                                />
                            </div>

                            {/* Sounds */}
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center text-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mr-3">
                                        <Volume2 size={20} />
                                    </div>
                                    <span className="font-medium">Sounds</span>
                                </div>
                                <ToggleSwitch 
                                    checked={settings.sounds} 
                                    onChange={(v) => setSettings(prev => ({...prev, sounds: v}))} 
                                />
                            </div>

                            {/* Vibration */}
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center text-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-3">
                                        <Smartphone size={20} />
                                    </div>
                                    <span className="font-medium">Vibration</span>
                                </div>
                                <ToggleSwitch 
                                    checked={settings.vibration} 
                                    onChange={(v) => setSettings(prev => ({...prev, vibration: v}))} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: General & Legal */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">General</h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center text-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mr-3">
                                        <FileText size={20} />
                                    </div>
                                    <span className="font-medium">Game Regulations</span>
                                </div>
                                <ArrowLeft size={16} className="rotate-180 text-gray-300" />
                            </div>
                        </div>
                    </div>

                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm">
                        <div className="flex items-center font-bold mb-1">
                            <CheckCircle2 size={16} className="mr-2" />
                            Sync Status
                        </div>
                        <p className="opacity-80 text-xs">Your game progress is automatically saved to the cloud.</p>
                     </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 p-6 shrink-0">
            <div className="max-w-md mx-auto">
                <Button fullWidth onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
  );
};
