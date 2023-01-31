import './EditAlbum.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAlbumThunk } from '../../../store/albums';

const EditAlbumForm = () => {
    const { albumId } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const albumList = useSelector((state) => state.albums);
    const currentAlbum = albumList[albumId];

    const [title, setTitle] = useState(currentAlbum?.title);
    const [description, setDescription] = useState(currentAlbum?.description);
    const [previewImage, setPreviewImage] = useState(currentAlbum?.previewImage);
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: albumId,
            title,
            description,
            previewImage
        };

        let updatedAlbum;
        try {
            updatedAlbum = await dispatch(editAlbumThunk(payload));
            history.push(`/albums/${updatedAlbum.id}`);
        } catch (res) {
            const data = await res.json();
            setErrors([...Object.values(data.errors)]);
        }
    };

    return (
        <section className="new-album">
            <form className="edit-album-form" onSubmit={handleSubmit}>
                <div>
                    <div className="errors">
                        {errors.map((error, index) => (
                            <li key={index}>Error: {error}</li>
                        ))}
                    </div>
                    <h1>
                        Song update
                    </h1>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => updateDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={previewImage}
                        onChange={updatePreviewImage} />

                    <button type="submit">Update Album</button>
                </div>
            </form>
        </section>
    )
};

export default EditAlbumForm;
