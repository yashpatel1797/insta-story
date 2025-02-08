# Insta-story

A React-based Instagram Story that implements core stories functionality with touch gestures, progress tracking, and smooth transitions.

## Tech Stack

- React 18
- TypeScript
- Vite
- Cypress for E2E testing

## Installation

Clone the repository:

```
cd instagram-stories-clone
```
Install dependencies:
``` 
npm install 
```

Start the development server:
```
npm run dev
```

The application will be available at (http://localhost:5173)


## Running Tests

Install test dependencies:
```
npm install --save-dev cypress @testing-library/cypress
```
Run tests in interactive mode:
```
npm run test:e2e
```

<img src="src/assets/insta-1.PNG" alt="insta-1" />
<img src="src/assets/insta-2.PNG" alt="insta-2" />


## Design choice and optimization
- Component Architecture: Modular components (StoryList, StoryViewer, StoryProgress) with a custom hook (useStoryProgress) for progress state management.
- Efficient State Management: React hooks for minimal re-renders and optimized state handling.
- Smooth Animations: CSS transitions for seamless progress and optimized calculations for pause/resume.
- Debounced Callbacks: Efficient touch event handling to reduce redundant calculations.
- Component Reusability: Reusable generic components with props-based configuration and TypeScript interfaces for flexibility and maintainability.
- Testing Strategy: Comprehensive E2E tests with isolated feature tests and reliable async operation handling.

## Future Improvements
- Performance: Implement image preloading, virtual scrolling, and progressive image loading for smoother transitions.

- Features: Add story creation, media uploads, interactions (likes, replies), and story analytics.

