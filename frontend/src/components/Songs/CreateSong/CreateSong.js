import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSongThunk } from '../../../store/songs';
import './CreateSong.css';

function CreateSongForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);

        if (!albumId) {
            validationErrors.push('Input specified album');
        }
        if (!title) {
            validationErrors.push('Title is required');
        }
        if (!url) {
            validationErrors.push('Audio Url is required')
        }


        const payload = {
            userId,
            title,
            description,
            url,
            imageUrl,
            albumId
        }

        let createdSong = await dispatch(createSongThunk(payload));
        if (createdSong && Object.keys(validationErrors).length === 0) {
            history.push(`/${createdSong.id}`);
        }

    };

    useEffect(() => {
        dispatch(createSongThunk);
    }, [dispatch])


    return (
        <form
            onSubmit={handleSubmit}
            className="create-song-form">
            <ul>
                {validationErrors.map((validationErrors, idx) => (
                    <li key={idx}>{validationErrors}</li>
                ))}
            </ul>
            <label>
                Artist
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </label>
            <label>
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Audio Url
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </label>
            <label>
                Image Url
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </label>
            <label>
                Album Name
                <input
                    type="text"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}
                    required
                />
            </label>
            <button
                type="submit"
                className="create-song-button">
                Add your Mellowdi
            </button>
        </form>
    );
}

export default CreateSongForm;
