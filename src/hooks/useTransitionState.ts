/**
 * Transition State Management Hook
 * Manages the cinematic transition between Prologue and Main Application
 */

import { useState, useCallback } from 'react';

export interface TransitionState {
  phase: 'prologue' | 'transitioning' | 'main';
  progress: number; // 0-1 transition completion
  direction: 'forward' | 'backward';
  timestamp: number;
}

export const useTransitionState = () => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    phase: 'prologue',
    progress: 0,
    direction: 'forward',
    timestamp: Date.now()
  });

  const startTransition = useCallback((direction: 'forward' | 'backward' = 'forward') => {
    setTransitionState({
      phase: 'transitioning',
      progress: 0,
      direction,
      timestamp: Date.now()
    });
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setTransitionState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(1, progress))
    }));
  }, []);

  const completeTransition = useCallback(() => {
    setTransitionState(prev => ({
      phase: prev.direction === 'forward' ? 'main' : 'prologue',
      progress: 1,
      direction: prev.direction,
      timestamp: Date.now()
    }));
  }, []);

  const resetToPrologue = useCallback(() => {
    setTransitionState({
      phase: 'prologue',
      progress: 0,
      direction: 'backward',
      timestamp: Date.now()
    });
  }, []);

  return {
    transitionState,
    startTransition,
    updateProgress,
    completeTransition,
    resetToPrologue,
    isTransitioning: transitionState.phase === 'transitioning',
    isPrologue: transitionState.phase === 'prologue',
    isMain: transitionState.phase === 'main'
  };
};