import React, { useState } from 'react';
import { Button, Checkbox } from '../components/UIComponents';
import { User } from '../types';

interface WelcomeScreenProps {
  onComplete: () => void;
  onUpdateUser: (data: Partial<User>) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, onUpdateUser }) => {
  const [consents, setConsents] = useState({
    regulations: false,
    privacy: false,
    marketing: false,
  });

  const canProceed = consents.regulations && consents.privacy;

  const handleStart = () => {
    if (!canProceed) return;
    onUpdateUser({
      terms_accepted: consents.regulations,
      privacy1_accepted: consents.privacy,
      privacy2_accepted: consents.marketing,
    });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full">
        {/* Hero Section */}
        <div className="relative h-2/5 bg-gray-200">
            <img 
                src="https://picsum.photos/800/600" 
                alt="Travel Italy" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full w-fit mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red">Mirable x Coop</span>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">
                    Discover Italy <br/> like never before.
                </h1>
            </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white -mt-6 rounded-t-3xl p-6 flex flex-col z-10">
            <div className="mb-6">
                <h2 className="text-gray-900 font-semibold mb-2">Welcome!</h2>
                <p className="text-sm text-gray-600">
                    Join our travel bloggers on a unique adventure through Italian cities. Find hidden treasures, unlock coupons, and win daily prizes!
                </p>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto mb-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Required Consents</h3>
                    
                    <Checkbox 
                        id="regulations"
                        checked={consents.regulations}
                        onChange={(c) => setConsents(prev => ({ ...prev, regulations: c }))}
                        label={
                            <span>
                                I accept the <a href="#" className="text-brand-red underline">Regulations</a> and confirm I am over 18.
                            </span>
                        }
                    />

                    <Checkbox 
                        id="privacy"
                        checked={consents.privacy}
                        onChange={(c) => setConsents(prev => ({ ...prev, privacy: c }))}
                        label={
                            <span>
                                I have read and accept the <a href="#" className="text-brand-red underline">Privacy Policy</a>.
                            </span>
                        }
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Optional</h3>
                    <Checkbox 
                        id="marketing"
                        checked={consents.marketing}
                        onChange={(c) => setConsents(prev => ({ ...prev, marketing: c }))}
                        label="I agree to receive personalized offers and marketing communications."
                    />
                </div>
            </div>

            <div className="pt-2">
                <Button 
                    fullWidth 
                    onClick={handleStart} 
                    disabled={!canProceed}
                >
                    Start the Adventure
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                    Already have an account? Login
                </p>
            </div>
        </div>
    </div>
  );
};