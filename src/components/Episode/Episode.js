import './Episode.css';
import './EpisodeCutVariations.css';
import random from '../../utils/randomUtils';
import { Link } from 'react-router-dom';

function Episode({info, variation}) {
  const style = {
    backgroundImage: `url(${info.image})`
  };
  const pickedVariation = variation || random.pick(..."abcde".split(""));
  return (
    <div className={`episode ${pickedVariation}`}>
      <div style={style} className="image-area">
        <div className="info-area">
          <div className="info-title">
            {info.date.toLocaleDateString()}
            <h3><Link className='white-link' to={`/episode/${info.id}`}>{info.title}</Link></h3>
          </div>
          <audio controls className="player">
            <source src={info.audioFile} />
          </audio>
          <div className="summary" dangerouslySetInnerHTML={{ __html: info.description }} />
          {!info.moreInformation ? '' : <div className="more">
            <Link to={`/episode/${info.id}`}>see more</Link>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Episode;
