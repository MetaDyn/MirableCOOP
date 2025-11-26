import React, { useState } from 'react';
import { Button, Card, ToggleSwitch } from '../components/UIComponents';
import { GameSettings } from '../types';
import { ArrowLeft, Music, Volume2, Smartphone, FileText } from 'lucide-react';

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
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            
            {/* Audio Settings */}
            <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Audio & Haptics</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
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

                    <div className="flex items-center justify-between">
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

                    <div className="flex items-center justify-between">
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
            </section>

            {/* General Settings */}
            <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">General</h2>
                 <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center text-gray-800">
                        <FileText size={20} className="mr-3 text-gray-500" />
                        <span className="font-medium">Regulations</span>
                    </div>
                    <ArrowLeft size={16} className="rotate-180 text-gray-300" />
                 </Card>
            </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
            <Button fullWidth onClick={handleSave}>
                Save Changes
            </Button>
        </div>
    </div>
  );
};