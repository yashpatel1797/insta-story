import React from 'react';
import { Story } from '../types';

type StoryListProps = {
  stories: Story[];
  onStoryClick: (index: number) => void;
};

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => (
  <div className="stories-list">
    {stories.map((story, index) => (
      <button
        key={story.userId}
        onClick={() => onStoryClick(index)}
        className="story-item"
      >
        <div className="story-avatar-container">
          <img
            src={story.images[0].imageUrl}
            alt={`${story.username}'s story`}
            className="story-avatar"
          />
        </div>
        <p className="story-username">{story.username}</p>
      </button>
    ))}
  </div>
);

export default StoryList;