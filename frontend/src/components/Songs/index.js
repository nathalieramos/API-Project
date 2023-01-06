import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSongThunk } from '../../store/songs';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId,
            title,
            description,
            url,
            imageUrl,
            albumId
        }

        let createdSong = await dispatch(createSongThunk(payload))
        if (createdSong) {
            history.push(`/songs/${createdSong.id}`)
            console.log(createdSong.id)
        }

        setUserId('');
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId('');
    }
    return (

        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Create your Mellowdi</h1>

                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Artist Name"
                />

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />

                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Audio URL"
                />

                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}
                    placeholder="Album Name"
                />
                <button type="submit">Submit Mellowdi</button>
            </form>
        </div>
    );

}

export default CreateSongForm;
