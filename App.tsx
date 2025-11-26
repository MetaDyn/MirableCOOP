
import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { AvatarSelectionScreen } from './screens/AvatarSelectionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { GameLoadingScreen } from './screens/GameLoadingScreen';
import { GameMapScreen } from './screens/GameMapScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AppScreen, NavigationItem, User, GameSettings } from './types';
import { userService } from './services/api';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.LOADING);
  const [user, setUser] = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState<NavigationItem>('HOME');
  const [gameSettings, setGameSettings] = useState<GameSettings>({ music: true, sounds: true, vibration: true });
  
  // Track previous screen for modals (like settings)
  const [previousScreen, setPreviousScreen] = useState<AppScreen>(AppScreen.HOME);

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await userService.getUser();
        setUser(userData);
        
        // Determine initial screen based on user state
        if (!userData.terms_accepted) {
          setScreen(AppScreen.WELCOME);
        } else if (!userData.avatar_id) {
          setScreen(AppScreen.AVATAR_SELECTION);
        } else {
          setScreen(AppScreen.HOME);
        }
      } catch (error) {
        console.error("Failed to load user", error);
        // Fallback or error screen could go here
      }
    };
    init();
  }, []);

  const handleUpdateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = await userService.updateUser(updates);
    setUser(updatedUser);
  };

  const handleNavClick = (item: NavigationItem) => {
    setActiveNav(item);
    switch (item) {
      case 'HOME':
        setScreen(AppScreen.HOME);
        break;
      case 'MENU':
        setScreen(AppScreen.PROFILE);
        break;
      case 'PRIZES':
        setScreen(AppScreen.PRIZES);
        break;
      case 'GAME':
        setScreen(AppScreen.GAME_LOADING); // Start game flow
        break;
      default:
        console.log("Nav item not implemented yet:", item);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.LOADING:
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red mb-4"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading Adventure...</p>
          </div>
        );
      
      case AppScreen.WELCOME:
        return (
          <WelcomeScreen 
            onComplete={() => setScreen(AppScreen.AVATAR_SELECTION)}
            onUpdateUser={handleUpdateUser}
          />
        );

      case AppScreen.AVATAR_SELECTION:
        return (
          <AvatarSelectionScreen
            onComplete={() => {
              setScreen(AppScreen.HOME);
              setActiveNav('HOME');
            }}
            onUpdateUser={handleUpdateUser}
          />
        );

      case AppScreen.HOME:
        return (
          <HomeScreen 
            user={user!} 
            onNavigate={(target) => {
                if (target === 'GAME') setScreen(AppScreen.GAME_LOADING);
                else console.log("Nav target:", target);
            }}
          />
        );

      case AppScreen.PROFILE:
        return (
          <ProfileScreen user={user!} />
        );

      // --- GAME FLOW ---
      case AppScreen.GAME_LOADING:
        return (
            <GameLoadingScreen 
                onComplete={() => setScreen(AppScreen.GAME_MAP)} 
            />
        );

      case AppScreen.GAME_MAP:
        return (
            <GameMapScreen 
                onOpenSettings={() => {
                    setPreviousScreen(AppScreen.GAME_MAP);
                    setScreen(AppScreen.SETTINGS);
                }}
                onBack={() => {
                    setScreen(AppScreen.HOME);
                    setActiveNav('HOME');
                }}
            />
        );

      case AppScreen.SETTINGS:
        return (
            <SettingsScreen 
                initialSettings={gameSettings}
                onSave={(s) => setGameSettings(s)}
                onClose={() => setScreen(previousScreen)}
            />
        );
      
      default:
        return <div className="p-10 text-center text-gray-500 mt-20">Work in Progress: {screen}</div>;
    }
  };

  // Show bottom nav on main app screens, but HIDE it during the immersive Game Map
  const showNav = [AppScreen.HOME, AppScreen.PRIZES, AppScreen.PROFILE].includes(screen);
  const isFullScreen = screen === AppScreen.GAME_MAP;

  return (
    <Layout 
      activeNav={activeNav} 
      onNavClick={handleNavClick}
      showNav={showNav}
      fullScreen={isFullScreen}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;
