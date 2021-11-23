import Episode from '../Episode/Episode';

import './Content.css';


function Content(props) {
  const sortedEpisodes = props.info.episodes.sort((a,b) => a.timestamp - b.timestamp);
  const filteredEpisodes = props.tag ? sortedEpisodes.filter(ep => ep.tags.includes(props.tag)) : sortedEpisodes;
  return (
    <div className="content-holder">
      <h2 className="description">{props.info.description}</h2>
      <div className="episodes">
        {filteredEpisodes.map((episode, i) => <Episode key={i} info={episode}/>)}
      </div>
    </div>
  );
}

export default Content;
