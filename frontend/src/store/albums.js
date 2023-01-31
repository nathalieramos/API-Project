import { csrfFetch } from "./csrf";

const GET_ALBUMS = 'albums/GETALBUMS';
const GET_ALBUM_BYID = 'albums/GETBYID';
const ADD_ALBUM = 'albums/ADDALBUM';
const EDIT_ALBUM = 'albums/EDITALBUM';
const DELETE_ALBUM = 'albums/DELETEALBUM';

/* Actions */

const get = (albums) => {
    return {
        type: GET_ALBUMS,
        albums
    }
};

const getbyid = (album) => {
    return {
        type: GET_ALBUM_BYID,
        album
    }
}

const post = (album) => {
    return {
        type: ADD_ALBUM,
        album
    }
};

const put = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    }
};

// const delete = (album) => {
//     return {
//         type: DELETE_ALBUM ,
//         album
//     }
// };

/* Thunk */



export const getAlbumByIdThunk = (id) => async dispatch => {
   
    const res = await csrfFetch(`/api/albums/${id}`)

    if (res.ok) {
        const album = await res.json()
        dispatch(getbyid(album))
        return album
    }
}

export const addAlbumThunk = (payload) => async (dispatch) => {

    const res = await csrfFetch('/api/albums', {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const album = await res.json();
        dispatch(post(album));
        return album;
    }
};

export const editAlbumThunk = (album) => async (dispatch) => {
    
    const { id } = album;

    const res = await csrfFetch(`/api/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify(album)

    })
    if (res.ok) {
        const editedAlbum = await res.json();
        dispatch(put(editedAlbum))
        return editedAlbum
    }
};

/* Reducer */

const initialState = [];

const albumReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ALBUM:
            const newState = { ...state }
            newState.allAlbum[action.album.id] = action.album
            return newState;


        case GET_ALBUMS:
            newState = { ...state }
            action.albumId.Albums.forEach(album => {
                newState[album.id] = album
            })
            return newState

        case GET_ALBUM_BYID:
            return {
                ...state,
                current: action.album
            }

        

        default:
            return state;
    }

};

export default albumReducer;
