import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import filesize from 'filesize';
import { getUserVideos } from './APICalls';

const SavedVideos = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      const videoData = getUserVideos(user.email)
      if (videoData != false){
        setVideos(user.email);
      } else {
        setError("Er is iets fout gegaan bij het ophalen van de gegevens");
      }
      
    }});
  }, [])

  return (
    <div className="saved-videos">
      <h1 className="saved-videos-title">Opgeslagen beelden</h1>
      {error ? (
        <p className="saved-videos-error">{error}</p>
      ) : videos.length === 0 ? (
        <p className="saved-videos-empty">Er is geen beeldmateriaal</p>
      ) : (
        <table className="saved-videos-table">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Grootte</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.name}>
                <td>
                  <Link to={`/video${video.name}`} state={{ video }}>
                    {video.name}
                  </Link>
                </td>
                <td>{filesize(video.size)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SavedVideos;