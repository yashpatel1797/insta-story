export type StoryImage = {
    id: string;
    imageUrl: string;
  };
  
  export type Story = {
    userId: string;
    images: StoryImage[];
    username: string;
  };
  
  export type StoriesProps = {
    stories: Story[];
  };
  
  export type ActiveStory = {
    userIndex: number;
    imageIndex: number;
  };