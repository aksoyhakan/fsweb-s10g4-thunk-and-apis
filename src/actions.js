import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";
export const DELETE_FAVS_FROM_LS = "DELETE_FAVS_FROM_LS";

export const deleteFavsFromLocalStorage = () => {
  return { type: DELETE_FAVS_FROM_LS };
};

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = () => {
  return { type: FAV_ADD };
};

export const removeFav = (joke) => {
  return { type: FAV_REMOVE, payload: joke };
};

export const fetchAnother = () => (dispatch) => {
  return axios
    .get("https://official-joke-api.appspot.com/random_joke")
    .then((response) => {
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
      dispatch({ type: FETCH_LOADING, payload: false });
    })
    .catch((err) => dispatch({ type: FETCH_ERROR, payload: err }));
};
