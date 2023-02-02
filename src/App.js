import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAnother,
  addFav,
  FETCH_LOADING,
  getFavsFromLocalStorage,
  deleteFavsFromLocalStorage,
} from "./actions";

export default function App() {
  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);

  console.log(favs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
  }, []);

  function addToFavs() {
    dispatch(addFav());
  }

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && !loading && <Item />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={() => {
                dispatch({ type: FETCH_LOADING, payload: true });
                dispatch(fetchAnother());
              }}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              <div>
                {" "}
                {favs.map((item) => (
                  <FavItem key={item.id} data={item} />
                ))}{" "}
                <button
                  onClick={() => dispatch(deleteFavsFromLocalStorage())}
                  className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 hover:opacity-100 mx-auto my-12"
                >
                  Tüm favori geçmişini silin.
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
