import React, { useState } from 'react';
import { Story, ActiveStory } from '../types';
import StoryList from '../components/StoryList';
import StoryViewer from '../components/StoryViewer';
import { useStoryProgress } from '../hooks/useStoryProgress';
import './InstagramStories.css';

type InstagramStoriesProps = {
  stories: Story[];
};

const InstagramStories: React.FC<InstagramStoriesProps> = ({ stories }) => {
  const [activeStory, setActiveStory] = useState<ActiveStory | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleStoryComplete = () => {
    if (!activeStory) return;
    const { userIndex, imageIndex } = activeStory;
    
    if (imageIndex < stories[userIndex].images.length - 1) {
      setActiveStory({ userIndex, imageIndex: imageIndex + 1 });
    } else if (userIndex < stories.length - 1) {
      setActiveStory({ userIndex: userIndex + 1, imageIndex: 0 });
    } else {
      closeStories();
    }
  };

  const { progressBarsRef, pauseProgress, resumeProgress } = useStoryProgress(
    activeStory,
    isPlaying,
    stories,
    handleStoryComplete
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    
    if (touchX < screenWidth / 3) {
      goToPreviousStory();
    } else if (touchX > (screenWidth * 2) / 3) {
      handleStoryComplete();
    } else {
      setIsPlaying(false);
      pauseProgress();
    }
  };

  const handleTouchEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      resumeProgress();
    }
  };

  const goToPreviousStory = () => {
    if (!activeStory) return;
    const { userIndex, imageIndex } = activeStory;

    if (imageIndex > 0) {
      setActiveStory({ userIndex, imageIndex: imageIndex - 1 });
    } else if (userIndex > 0) {
      setActiveStory({
        userIndex: userIndex - 1,
        imageIndex: stories[userIndex - 1].images.length - 1,
      });
    }
  };

  const openStory = (userIndex: number) => {
    setActiveStory({ userIndex, imageIndex: 0 });
    setIsPlaying(true);
  };

  const closeStories = () => {
    setActiveStory(null);
    setIsPlaying(false);
  };

  return (
    <div className="stories-container">
      <StoryList stories={stories} onStoryClick={openStory} />
      
      {activeStory && (
        <StoryViewer
          story={stories[activeStory.userIndex]}
          currentImageIndex={activeStory.imageIndex}
          progressRefs={progressBarsRef}
          onClose={closeStories}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
};

export default InstagramStories;