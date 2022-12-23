import SearchBar from './SearchBar';
import SideBar from './SideBar';
import ChatPreview from './ChatPreview';
import ChatBox from './ChatBox';

import "./MainPage.css"

export default function MainPage() {
  return(
    <div className='main-page'>
      {/* <RecentChat/> */}
      <SideBar/>
      <div className='chat-area'>
      <div className='chat-area-left'>
        <div className='header'>
          <h1>Chat</h1>
          <SearchBar/>
        </div>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>

      </div>
        <ChatBox/>
      </div>
    </div>
  )
}