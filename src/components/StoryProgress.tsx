import React from 'react';

type StoryProgressProps = {
  totalStories: number;
  currentIndex: number;
  progressRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

const StoryProgress: React.FC<StoryProgressProps> = ({ 
  totalStories, 
  currentIndex, 
  progressRefs 
}) => (
  <div className="progress-container">
    {Array.from({ length: totalStories }).map((_, index) => (
      <div key={index} className="progress-bar-container">
        <div 
          ref={(el) => {
            if (progressRefs.current) {
              progressRefs.current[index] = el;
            }
          }}
          className={`progress-bar ${
            index < currentIndex ? 'completed' : 
            index === currentIndex ? 'active' : ''
          }`}
        />
      </div>
    ))}
  </div>
);

export default StoryProgress;