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


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="video-player my-5">
            <h1 className="text-center">{video.name}</h1>
            <p className="text-center">Size: {filesize(video.size)}</p>
            <div className="embed-responsive embed-responsive-16by9">
              <Player className="embed-responsive-item">
                <source src={video.downloadUrl} />
              </Player>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <a href={video.downloadUrl} download={video.name}>
                <button className="btn btn-primary">Download</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoStream;