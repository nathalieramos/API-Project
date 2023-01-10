import "./GetSongDetails.css";
import { getSongDetails } from "../../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

const SongDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector(state => state.songs)
    const sessionUser = useSelector(state => state.session.user);
    let songList
    if (songs) {
        songList = Object.values(songs);
    }
    const filtered = songList.filter(song => song.id === +id)
    const song = filtered[0]

 

    useEffect(() => {
        dispatch(getSongDetails(id))
    }, [dispatch])

    if (!sessionUser) {
        history.push('/')
        return null
    }
    return (
        <div className="song-details-page">
  
            <div>
         
              <h1> {song.title} </h1>
              <h2>{song.description}</h2>
            
            </div>
          </div>
    )
}


export default SongDetails;
