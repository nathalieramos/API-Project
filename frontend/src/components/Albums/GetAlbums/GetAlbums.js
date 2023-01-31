import './GetAlbums.css';
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAlbumByIdThunk } from '../../../store/albums';


export default function GetAlbum() {
    const { albumId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbumByIdThunk(albumId))
    }, []);

    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state?.albums?.current)
    return album && <div className='get-album-dets'>
        <div className='details'>
            <div className='album-container'>
                <div className='artist'>{album.userId}</div>
                <div className='title'>{album.title}</div>
                <div className='description'>{album.description}</div>
            </div>
            <div className='albumImage'>
                <img src={album?.previewImage} alt="" />
            </div>
        </div>
    </div>

}
