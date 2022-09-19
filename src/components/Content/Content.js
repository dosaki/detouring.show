import { useContext } from 'react';
import { Context } from '../../store/store';
import Episode from '../Episode/Episode';

import './Content.css';


function Content(props) {
  const [store, dispatch] = useContext(Context);
  console.log(store);
  if(!store.podcastInfo){
    return "..."
  }
  const sortedEpisodes = store.podcastInfo.episodes.sort((a,b) => Number(`${b.seasonNumber}${b.episodeNumber}`) - Number(`${a.seasonNumber}${a.episodeNumber}`));
  const filteredEpisodes = store.selectedTag ? sortedEpisodes.filter(ep => ep.tags.includes(store.selectedTag)) : sortedEpisodes;
  return (
    <div className="content-holder">
      <h2 className="description">{store.podcastInfo.description}</h2>
      <div className="episodes">
        {filteredEpisodes.map((episode, i) => <Episode key={i} info={episode}/>)}
      </div>
    </div>
  );
}

export default Content;
