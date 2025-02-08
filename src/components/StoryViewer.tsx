import React from 'react';
import { Story } from '../types';
import StoryProgress from './StoryProgress';

type StoryViewerProps = {
  story: Story;
  currentImageIndex: number;
  progressRefs: React.RefObject<(HTMLDivElement | null)[]>;
  onClose: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
};

const StoryViewer: React.FC<StoryViewerProps> = ({
  story,
  currentImageIndex,
  progressRefs,
  onClose,
  onTouchStart,
  onTouchEnd,
}) => (
  <div className="story-viewer">
    <StoryProgress
      totalStories={story.images.length}
      currentIndex={currentImageIndex}
      progressRefs={progressRefs}
    />

    <div
      className="story-content"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={story.images[currentImageIndex].imageUrl}
        alt={`${story.username}'s story`}
        className="story-image"
      />
      
      <div className="story-user-info">
        <div className="story-user-avatar">
          <img
            src={story.images[0].imageUrl}
            alt={story.username}
            className="user-avatar"
          />
        </div>
        <span className="story-user-name">{story.username}</span>
      </div>

      <button onClick={onClose} className="close-button">
        <svg
          className="close-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default StoryViewer;