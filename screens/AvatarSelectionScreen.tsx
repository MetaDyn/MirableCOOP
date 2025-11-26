import React, { useState } from 'react';
import { Button, Card } from '../components/UIComponents';
import { Avatar, User } from '../types';

interface AvatarSelectionScreenProps {
  onComplete: () => void;
  onUpdateUser: (data: Partial<User>) => void;
}

const AVATARS: Avatar[] = [
  {
    id: 'char_1',
    name: 'Marco & Giulia',
    description: 'Food explorers seeking the best recipes.',
    image: 'https://picsum.photos/id/1011/300/400'
  },
  {
    id: 'char_2',
    name: 'Leo the Hiker',
    description: 'Adventure seeker discovering hidden paths.',
    image: 'https://picsum.photos/id/1025/300/400'
  }
];

export const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onComplete, onUpdateUser }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedId) return;
    onUpdateUser({ avatar_id: selectedId });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full p-6 pt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your Guide</h2>
        <p className="text-gray-500 text-sm">
            Select the character that will accompany you on your journey through Italy.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {AVATARS.map((avatar) => {
            const isSelected = selectedId === avatar.id;
            return (
                <div 
                    key={avatar.id}
                    onClick={() => setSelectedId(avatar.id)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'ring-4 ring-brand-red scale-105 shadow-xl' : 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100'}`}
                >
                    <img 
                        src={avatar.image} 
                        alt={avatar.name} 
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                        <p className="text-white font-bold text-lg leading-none">{avatar.name}</p>
                    </div>
                    {isSelected && (
                        <div className="absolute top-2 right-2 bg-brand-red text-white rounded-full p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>
            )
        })}
      </div>

      <div className="mt-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">
            {selectedId ? AVATARS.find(a => a.id === selectedId)?.name : 'Select a character'}
        </h3>
        <p className="text-xs text-gray-500">
            {selectedId ? AVATARS.find(a => a.id === selectedId)?.description : 'Tap on an image above to see details.'}
        </p>
      </div>

      <Button 
        fullWidth 
        onClick={handleConfirm} 
        disabled={!selectedId}
      >
        Confirm Selection
      </Button>
    </div>
  );
};