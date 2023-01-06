import { csrfFetch } from "./csrf";

const POST_SONG = 'songs/POSTSONG'
const GET_SONG = 'songs/GETSONG'

/* Actions */

const post = song => {
    return {
        type: POST_SONG,
        song
    }
};

const get = song => {
    return {
        type: GET_SONG,
        song
    }
};

/* Thunk */

export const createSongThunk = (payload) => async (dispatch) => {
    
    const res = await csrfFetch('/api/songs', {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const song = await res.json();
        dispatch(post(song));
        return song;
    }
};

export const getSongsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/songs')

    if (res.ok) {
        const songs = await res.json()
        dispatch(get(songs))
        return songs
    }
}

/* Reducer */

const initialState = {
    allSongs: {},
    types: {},
};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_SONG:
            const newState = { ...state }
            newState.allSongs[action.song.id] = action.song
            return newState;

        case GET_SONG:
            const getSong = { ...state }
            action.songs.Songs.forEach(song => {
                getSong.allSongs[song.id] = song
            })
            return getSong;

        default:
            return state
    }
};

export default songReducer;
