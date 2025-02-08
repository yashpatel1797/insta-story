import './App.css'
import  InstagramStories  from './components/InstagramStories';
import { sampleStories } from './stories';

function App() {
 
  return (
    <>
    <h1>Insta Story</h1>
    <InstagramStories stories={sampleStories} />
    </>
  )
}

export default App
