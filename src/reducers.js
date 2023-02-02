import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  DELETE_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("favourite", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("favourite"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD: {
      if (!state.favs.find((item) => item.id === state.current.id)) {
        toast.success(
          `${state.current.setup} adlı şaka favorilere eklenmiştir.`
        );
        writeFavsToLocalStorage([...state.favs, state.current]);
        return { ...state, favs: [...state.favs, state.current] };
      } else return state;
    }

    case FAV_REMOVE: {
      toast.info(
        `${action.payload.setup} adlı şaka favori listesinden kaldırılmıştır.`
      );
      writeFavsToLocalStorage(
        state.favs.filter((item) => item.id !== action.payload.id)
      );
      return {
        ...state,
        favs: state.favs.filter((item) => item.id !== action.payload.id),
      };
    }

    case FETCH_SUCCESS: {
      toast.success(
        `${action.payload.setup} adlı şaka anasayfaya eklenmiştir.`
      );
      return { ...state, current: action.payload };
    }

    case FETCH_LOADING:
      return { ...state, loading: action.payload };

    case FETCH_ERROR:
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage(),
      };

    case DELETE_FAVS_FROM_LS: {
      writeFavsToLocalStorage([]);
      return { ...state, favs: readFavsFromLocalStorage() };
    }

    default:
      return state;
  }
}
