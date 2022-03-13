import { useState, useEffect } from 'react';
import parseRss from './utils/rssParser';
import Tag from './components/Tag/Tag';
import Content from './components/Content/Content';
import About from './components/About/About';
import NavLink from './components/NavLink/NavLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faPatreon, faSpotify, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPodcast, faRss } from '@fortawesome/free-solid-svg-icons';

import logo from './logo.dark-theme.svg';
import './App.css';

function App() {
  const rssLink = "https://anchor.fm/s/75954438/podcast/rss";
  const [podcastInfo, setPodcastInfo] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [selectedPage, setSelectedPage] = useState();

  const reloadSelectedPage = () => {
    setSelectedPage(window.location.hash.replace("#", ""));
  }
  window.onhashchange = reloadSelectedPage;

  useEffect(() => {
    async function getPodcastInfo() {
        const rssXml = await (await fetch(rssLink)).text();
        setPodcastInfo(parseRss(rssXml));
    }
    getPodcastInfo();
  }, []);

  useEffect(() => {
    reloadSelectedPage();
  }, []);

  const tagClick = function(tag) {
    setSelectedTag(tag);
  }
  
  return (
    <div className="app">
      <header className="header">
        <div className="header-main">
          <img src={logo} className="logo" alt="detourings logo" />
          <div className="links">
            <NavLink isSelected={selectedPage === "" || selectedPage === "episodes"} to="episodes">episodes</NavLink>
            <NavLink isSelected={selectedPage === "about"} to="about">about</NavLink>
            <span className="divider"></span>
            <a href={rssLink} title="rss feed"><FontAwesomeIcon icon={faRss} /></a>
            <a href='https://open.spotify.com/show/2iQ72Khjj4d34F8KXKe3FC' title="Listen on Spotify"><FontAwesomeIcon icon={faSpotify} /></a>
            <a href='https://podcasts.apple.com/us/podcast/detouring/id1606191602' title="Listen on Apple Podcasts"><FontAwesomeIcon icon={faApple} /></a>
            <a href='https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy83NTk1NDQzOC9wb2RjYXN0L3Jzcw' title="Listen on Google Podcasts"><FontAwesomeIcon icon={faGoogle} /></a>
            <span className="divider"></span>
            <a href='mailto:tiago@detouring.show' title="Email"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href='https://twitter.com/DetouringShow' title="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            {/* <a href='https://www.patreon.com/detouring' title="Twitter"><FontAwesomeIcon icon={faPatreon} /></a> */}
          </div>
        </div>
        <div className={`tags ${selectedPage}`}>
          {podcastInfo && (selectedPage === "" || selectedPage === "episodes")  ? podcastInfo.allTags.map((tag, i) => <Tag key={i} tag={tag} isSelected={selectedTag === tag} onClick={tagClick} /> ) : ''}
        </div>
      </header>
      <main className={`under-slanted ${selectedPage}`}>
        { podcastInfo && (selectedPage === "" || selectedPage === "episodes") ? <Content info={podcastInfo} tag={selectedTag} /> : '' }
        { podcastInfo && selectedPage === "about" ? <About info={podcastInfo} /> : '' }
      </main>
      <footer className={`footer ${selectedPage}`}>
        <div className="footer-content">
          &copy; detouring.show
        </div>
      </footer>
    </div>
  );
}

export default App;
