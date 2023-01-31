// import { csrfFetch  } from "./csrf";

// const POST_SONG = 'songs/POSTSONG'
// const GET_SONG = 'songs/GETSONG'


// /* Actions */

// const post = (song) => {
//     return {
//         type: POST_SONG,
//         song
//     }
// };

// const get = (songs) => {
//     return {
//         type: GET_SONG,
//         songs
//     }
// };


// /* Thunk */

// export const createSongThunk = (payload) => async (dispatch) => {

//     const res = await csrfFetch('/api/songs', {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });

//     if (res.ok) {
//         const song = await res.json();
//         dispatch(post(song));
//         return song;
//     }
// };

// export const getSongDetails = (id) => async (dispatch) => {
//     const res = await fetch(`/api/songs/${id}`)

//     if (res.ok) {
//         const songDetails = await res.json();
//         return dispatch(post(songDetails))
//     }
// };





// /* Reducer */

// const initialState = {
//     allSongs: [],
//     current: [],
// };

// const sortList = (allSongs) => {
// 	return allSongs
// 		.sort((songs) => {
// 			return songs.id 
// 		})
// 		.map((songs) => songs.id);
// };

// const songReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case POST_SONG:
//             const newState = { ...state }
//             newState.allSongs[action.song.id] = action.song
//             return newState;


//         case GET_SONG:
//             const songsAll = {};
//             action.allSongs.forEach((song) => {
//                 songsAll[song.id] = song;
//             });
//             return {
//                 ...songsAll,
//                 ...state,
//                 songList: sortList(action.allSongs)
//             }


//         default:
//             return state;
//     }

// };

// export default songReducer;
