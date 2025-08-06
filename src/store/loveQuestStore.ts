/**
 * Love Quest State Management
 * Inspired by katbday's emotional intelligence - tracks user journey and preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  status: 'locked' | 'available' | 'completed';
  reward: string;
  icon: string;
  completedDate?: string;
  completedMessage?: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  category: 'date' | 'adventure' | 'everyday' | 'special';
  isFavorited: boolean;
  hasMusic?: boolean;
  tags: string[];
}

export interface Keepsake {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  questSource?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  isSpecial?: boolean;
  emotion: string;
}

export interface UserPreferences {
  enableAnimations: boolean;
  enableSounds: boolean;
  reducedMotion: boolean;
  theme: 'light' | 'dark' | 'auto';
  favoriteColors: string[];
}

export interface UserSession {
  visitCount: number;
  lastVisit: string;
  totalTimeSpent: number;
  completedQuests: string[];
  favoritedMemories: string[];
  unlockedKeepsakes: string[];
  delightMoments: number;
}

interface LoveQuestState {
  // Data
  quests: Quest[];
  memories: Memory[];
  keepsakes: Keepsake[];
  timelineEvents: TimelineEvent[];
  
  // User state
  preferences: UserPreferences;
  session: UserSession;
  currentView: string;
  
  // UI state
  isLoading: boolean;
  showFloatingHearts: boolean;
  celebrationMode: boolean;
  
  // Actions
  setQuests: (quests: Quest[]) => void;
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  completeQuest: (questId: string, completedMessage?: string) => void;
  
  setMemories: (memories: Memory[]) => void;
  toggleMemoryFavorite: (memoryId: string) => void;
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  
  setKeepsakes: (keepsakes: Keepsake[]) => void;
  unlockKeepsake: (keepsakeId: string) => void;
  
  setTimelineEvents: (events: TimelineEvent[]) => void;
  
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  updateSession: (session: Partial<UserSession>) => void;
  
  setCurrentView: (view: string) => void;
  setLoading: (loading: boolean) => void;
  triggerCelebration: () => void;
  recordDelightMoment: () => void;
  
  // Computed
  getCompletedQuestsCount: () => number;
  getUnlockedKeepsakesCount: () => number;
  getFavoritedMemoriesCount: () => number;
  getEmotionalScore: () => number;
}

export const useLoveQuestStore = create<LoveQuestState>()(
  persist(
    immer((set, get) => ({
      // Initial data
      quests: [],
      memories: [],
      keepsakes: [],
      timelineEvents: [],
      
      // Initial user state
      preferences: {
        enableAnimations: true,
        enableSounds: true,
        reducedMotion: false,
        theme: 'light',
        favoriteColors: ['blush', 'peach', 'mint', 'lavender']
      },
      
      session: {
        visitCount: 0,
        lastVisit: new Date().toISOString(),
        totalTimeSpent: 0,
        completedQuests: [],
        favoritedMemories: [],
        unlockedKeepsakes: [],
        delightMoments: 0
      },
      
      currentView: 'landing',
      
      // Initial UI state
      isLoading: false,
      showFloatingHearts: true,
      celebrationMode: false,
      
      // Quest actions
      setQuests: (quests) => set((state) => {
        state.quests = quests;
      }),
      
      updateQuest: (questId, updates) => set((state) => {
        const questIndex = state.quests.findIndex(q => q.id === questId);
        if (questIndex !== -1) {
          Object.assign(state.quests[questIndex], updates);
        }
      }),
      
      completeQuest: (questId, completedMessage) => set((state) => {
        const questIndex = state.quests.findIndex(q => q.id === questId);
        if (questIndex !== -1) {
          state.quests[questIndex].status = 'completed';
          state.quests[questIndex].completedDate = new Date().toISOString();
          if (completedMessage) {
            state.quests[questIndex].completedMessage = completedMessage;
          }
          
          // Update session
          if (!state.session.completedQuests.includes(questId)) {
            state.session.completedQuests.push(questId);
          }
          
          // Trigger celebration
          state.celebrationMode = true;
          state.session.delightMoments += 1;
        }
      }),
      
      // Memory actions
      setMemories: (memories) => set((state) => {
        state.memories = memories;
      }),
      
      toggleMemoryFavorite: (memoryId) => set((state) => {
        const memoryIndex = state.memories.findIndex(m => m.id === memoryId);
        if (memoryIndex !== -1) {
          const memory = state.memories[memoryIndex];
          memory.isFavorited = !memory.isFavorited;
          
          // Update session
          if (memory.isFavorited) {
            if (!state.session.favoritedMemories.includes(memoryId)) {
              state.session.favoritedMemories.push(memoryId);
            }
          } else {
            state.session.favoritedMemories = state.session.favoritedMemories.filter(id => id !== memoryId);
          }
        }
      }),
      
      addMemory: (memory) => set((state) => {
        const newMemory: Memory = {
          ...memory,
          id: `memory-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        state.memories.push(newMemory);
      }),
      
      // Keepsake actions
      setKeepsakes: (keepsakes) => set((state) => {
        state.keepsakes = keepsakes;
      }),
      
      unlockKeepsake: (keepsakeId) => set((state) => {
        const keepsakeIndex = state.keepsakes.findIndex(k => k.id === keepsakeId);
        if (keepsakeIndex !== -1) {
          state.keepsakes[keepsakeIndex].isUnlocked = true;
          state.keepsakes[keepsakeIndex].unlockedDate = new Date().toISOString();
          
          // Update session
          if (!state.session.unlockedKeepsakes.includes(keepsakeId)) {
            state.session.unlockedKeepsakes.push(keepsakeId);
          }
          
          // Trigger celebration
          state.celebrationMode = true;
          state.session.delightMoments += 1;
        }
      }),
      
      // Timeline actions
      setTimelineEvents: (events) => set((state) => {
        state.timelineEvents = events;
      }),
      
      // Preference actions
      updatePreferences: (preferences) => set((state) => {
        Object.assign(state.preferences, preferences);
      }),
      
      updateSession: (session) => set((state) => {
        Object.assign(state.session, session);
      }),
      
      // UI actions
      setCurrentView: (view) => set((state) => {
        state.currentView = view;
      }),
      
      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),
      
      triggerCelebration: () => set((state) => {
        state.celebrationMode = true;
        state.session.delightMoments += 1;
        
        // Auto-disable celebration after 3 seconds
        setTimeout(() => {
          set((state) => {
            state.celebrationMode = false;
          });
        }, 3000);
      }),
      
      recordDelightMoment: () => set((state) => {
        state.session.delightMoments += 1;
      }),
      
      // Computed getters
      getCompletedQuestsCount: () => {
        return get().quests.filter(q => q.status === 'completed').length;
      },
      
      getUnlockedKeepsakesCount: () => {
        return get().keepsakes.filter(k => k.isUnlocked).length;
      },
      
      getFavoritedMemoriesCount: () => {
        return get().memories.filter(m => m.isFavorited).length;
      },
      
      getEmotionalScore: () => {
        const state = get();
        const completedQuests = state.getCompletedQuestsCount();
        const unlockedKeepsakes = state.getUnlockedKeepsakesCount();
        const favoritedMemories = state.getFavoritedMemoriesCount();
        const delightMoments = state.session.delightMoments;
        
        // Calculate emotional score based on engagement
        const baseScore = (completedQuests * 10) + (unlockedKeepsakes * 15) + (favoritedMemories * 5);
        const delightBonus = delightMoments * 2;
        
        return Math.min(100, baseScore + delightBonus);
      }
    })),
    {
      name: 'love-quest-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        session: {
          ...state.session,
          visitCount: state.session.visitCount + 1,
          lastVisit: new Date().toISOString()
        },
        completedQuests: state.quests.filter(q => q.status === 'completed').map(q => q.id),
        favoritedMemories: state.memories.filter(m => m.isFavorited).map(m => m.id),
        unlockedKeepsakes: state.keepsakes.filter(k => k.isUnlocked).map(k => k.id)
      })
    }
  )
);

// Selectors for common use cases
export const useQuests = () => useLoveQuestStore(state => state.quests);
export const useMemories = () => useLoveQuestStore(state => state.memories);
export const useKeepsakes = () => useLoveQuestStore(state => state.keepsakes);
export const useTimelineEvents = () => useLoveQuestStore(state => state.timelineEvents);
export const useUserPreferences = () => useLoveQuestStore(state => state.preferences);
export const useUserSession = () => useLoveQuestStore(state => state.session);
export const useCelebrationMode = () => useLoveQuestStore(state => state.celebrationMode);
export const useEmotionalScore = () => useLoveQuestStore(state => state.getEmotionalScore());

// Actions
export const useQuestActions = () => useLoveQuestStore(state => ({
  completeQuest: state.completeQuest,
  updateQuest: state.updateQuest
}));

export const useMemoryActions = () => useLoveQuestStore(state => ({
  toggleMemoryFavorite: state.toggleMemoryFavorite,
  addMemory: state.addMemory
}));

export const useKeepsakeActions = () => useLoveQuestStore(state => ({
  unlockKeepsake: state.unlockKeepsake
}));

export const useUIActions = () => useLoveQuestStore(state => ({
  setCurrentView: state.setCurrentView,
  setLoading: state.setLoading,
  triggerCelebration: state.triggerCelebration,
  recordDelightMoment: state.recordDelightMoment
}));