import React from 'react';
import { useParams } from 'react-router-dom';
import { Player } from 'video-react';
import { useLocation } from 'react-router-dom';
import 'video-react/dist/video-react.css';
import filesize from 'filesize';
import './VideoPlayer.css';

const VideoStream = () => {
  const location = useLocation();
  const { id } = useParams();
  const { video } = location.state;

  /*return (
    <div>
      <h3>{video.name}</h3>
      <p>Size: {filesize(video.size)}</p>
      <Player>
        <source src={video.downloadUrl} />
      </Player>
    </div>
  );
}*/


  return (
    <div className="video-player">
      <h1>{video.name}</h1>
      <p>Size: {filesize(video.size)}</p>
      <div className="player-wrapper">
        <Player>
          <source src={video.downloadUrl} />
        </Player>
      </div>
    </div>
  );
  }

export default VideoStream;