import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import filesize from 'filesize';

const SavedVideos = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const apiUrl = `http://localhost:5157/FirebaseStorageService?email=${encodeURIComponent(user.email)}`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => setVideos(data));
      }
    });
  }, [])

  return (
    <div className="saved-videos">
      <h1 className="saved-videos-title">Opgeslagen beelden</h1>
      {videos.length === 0 ? (
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