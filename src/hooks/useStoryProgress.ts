import { useEffect, useRef } from 'react';
import { ActiveStory } from '../types';

const STORY_DURATION = 5000;

export const useStoryProgress = (
  activeStory: ActiveStory | null,
  isPlaying: boolean,
  onStoryComplete: () => void
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  const startProgress = () => {
    if (!activeStory) return;
    
    const { imageIndex } = activeStory;

    progressBarsRef.current.forEach((bar, index) => {
      if (bar) {
        if (index < imageIndex) {
          bar.style.width = '100%';
          bar.style.transition = 'none';
        } else if (index === imageIndex) {
          bar.style.width = '0%';
          bar.style.transition = 'none';
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          bar.offsetHeight;
          bar.style.transition = 'width 5s linear';
          bar.style.width = '100%';
        } else {
          bar.style.width = '0%';
          bar.style.transition = 'none';
        }
      }
    });

    timerRef.current = setTimeout(onStoryComplete, STORY_DURATION);
  };

  const pauseProgress = () => {
    if (!activeStory) return;
    
    const currentBar = progressBarsRef.current[activeStory.imageIndex];
    if (currentBar) {
      const width = window.getComputedStyle(currentBar).getPropertyValue('width');
      currentBar.style.width = width;
      currentBar.style.transition = 'none';
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const resumeProgress = () => {
    if (!activeStory) return;
    
    const currentBar = progressBarsRef.current[activeStory.imageIndex];
    const currentWidth = currentBar?.style.width || '0%';
    const remainingPercentage = 100 - parseFloat(currentWidth);
    const remainingTime = (STORY_DURATION * remainingPercentage) / 100;

    if (currentBar) {
      currentBar.style.transition = `width ${remainingTime}ms linear`;
      currentBar.style.width = '100%';
    }

    timerRef.current = setTimeout(onStoryComplete, remainingTime);
  };

  useEffect(() => {
    if (activeStory && isPlaying) {
      startProgress();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeStory, isPlaying]);

  return {
    progressBarsRef,
    pauseProgress,
    resumeProgress
  };
};