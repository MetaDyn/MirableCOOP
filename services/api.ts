import { User } from '../types';

// Initial Mock Data from Prompt
const MOCK_USER: User = {
  username: "rlarocca",
  email: "accoral@gmail.com",
  first_name: "Roberto",
  last_name: "Larocca",
  id: "12713333",
  terms_accepted: false,
  privacy1_accepted: false,
  privacy2_accepted: false,
  privacy3_accepted: false,
  tokens: 10, // Default mock value
  // ... other fields from JSON are omitted for brevity if not used in UI yet
};

export const userService = {
  // Simulate API fetch
  getUser: async (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retrieve from localStorage to persist state during dev
        const stored = localStorage.getItem('app_user');
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          resolve({ ...MOCK_USER });
        }
      }, 800);
    });
  },

  updateUser: async (updates: Partial<User>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('app_user');
        const currentUser = stored ? JSON.parse(stored) : MOCK_USER;
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('app_user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 500);
    });
  }
};