import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {
    <>
    <TwitterFollowCard userName='yulscv' name='Yuls' isFollowing={true}/>
    <TwitterFollowCard userName='yulscv' name='Yuls' isFollowing={false}/>
    </>
    
}