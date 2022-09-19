import { useContext } from 'react';
import { Context } from '../../store/store';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import random from '../../utils/randomUtils';
import './EpisodeDetails.css';

function EpisodeDetails() {
  const [store] = useContext(Context);
  const location = useLocation();
  const episodeId = location.pathname.slice(2).split("/")[1];
  const canDisplay = episodeId && store.podcastInfo && store.podcastInfo.episodes && store.podcastInfo.episodes.length > 0;
  const episode = canDisplay ? store.podcastInfo.episodes.find(ep => ep.id === episodeId) : null;
  const hasMoreInfo = canDisplay && !!episode.moreInformation;
  const variation = random.pick(..."abcde".split(""));

  if(!episode){
    return <p>...</p>
  }

  return <div className="episode-details-holder">
    <h1><Link to="/"><FontAwesomeIcon icon={faBackward}/></Link> {episode.title}</h1>
    <div className="episode-details-content">
      <img className={`episode-details-image cut ${variation}`} src={episode.image} alt="episode"/>
      <div className="episode-details-info">
        <audio controls className="episode-details-player">
          <source src={episode.audioFile} />
        </audio>
        <div className="episode-details-summary" dangerouslySetInnerHTML={{ __html: episode.description }} />
        {hasMoreInfo ? <hr/> : ''}
        <div className="episode-details-more-info" dangerouslySetInnerHTML={{ __html: episode.moreInformation }} />
      </div>
    </div>
  </div>
}

export default EpisodeDetails;
