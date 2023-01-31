import './AddAlbum.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAlbumThunk } from '../../../store/albums';
import { getAlbumByIdThunk } from '../../../store/albums';

const AddAlbumForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const updateName = (e) => setUserId(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getAlbumByIdThunk());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId,
            title,
            description,
            previewImage
        };

    
        try {
            let addAlbum;
            addAlbum = await dispatch(addAlbumThunk(payload));
            console.log('hey')
            history.push(`/albums/${addAlbum.id}`);
        } catch (res) {
            const data = await res.json();
            setErrors([...Object.values(data.errors)]);
           
        }
    };
    const handleCancelClick = async (e) => {
        e.preventDefault();
    };

    return sessionUser.id ? (
        <section className="new-album">
            <form className="add-album-form" onSubmit={handleSubmit}>
                <div className="errors">
                    {errors.map((error, index) => (
                        <li key={index}>Error: {error}</li>
                    ))}
                </div>
                <p className='add-song'>Add an album:</p>
                <input
                    type="text"
                    placeholder="Artist name"
                    value={userId}
                    onChange={updateName} />
                <input
                    type="text"
                    placeholder="Title name"
                    value={title}
                    onChange={updateTitle} />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={previewImage}
                    onChange={updatePreviewImage} />


                <button type="submit">Create new album</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    ) : null
};


export default AddAlbumForm;
