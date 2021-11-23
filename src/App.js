import { useState, useEffect } from 'react';
import parseRss from './utils/rssParser';
import Tag from './components/Tag/Tag';
import Content from './components/Content/Content';

import logo from './logo.dark-theme.png';
import './App.css';

function App() {
  const rssLink = "https://anchor.fm/s/75954438/podcast/rss";
  const [podcastInfo, setPodcastInfo] = useState();
  const [selectedTag, setSelectedTag] = useState();
  useEffect(() => {
    async function getPodcastInfo() {
        const rssXml = await (await fetch(rssLink)).text();
        setPodcastInfo(parseRss(rssXml));
    }
    getPodcastInfo();
  }, []);
  const tagClick = function(tag) {
    setSelectedTag(tag);
  }
  
  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="detourings logo" />
        <div className="links">
          {!podcastInfo ? '' : podcastInfo.allTags.map((tag, i) => <Tag key={i} tag={tag} isSelected={selectedTag === tag} onClick={tagClick} /> )}
          {podcastInfo ? <span className="divider"></span> : ''}
          <a href="https://about.dosaki.net">about</a>
          <a href="mailto:tiago@detouring.show">contact</a>
          <a href={rssLink}>rss</a>
        </div>
      </header>
      <div className="under-slanted">
        { podcastInfo ? <Content info={podcastInfo} tag={selectedTag} /> : 'Loading...' }
      </div>
    </div>
  );
}

export default App;
