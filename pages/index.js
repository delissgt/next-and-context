import React, { useEffect } from "react";

import styles from '../styles/Home.module.css'
import { Store } from "../context/StoreProvider";

export default function Home() {
  // const store = React.useContext( Store );
  const { state, dispatch } = React.useContext(Store);

  // Creating action
  // ALWAYS RETURN DISPATCH ({object}) WITH OBJECT INSIDE type: Action, and payload: Data
  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  // creating action: Add favorite episode, this is added in StorePactionrovider.js too
  const toggleFavAction = (episode) => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode
    };

    if (episodeInFavourites) {
      const favoritesWithOutEpisode = state.favourites.filter( fav => fav.id !== episode.id )
      console.log("faWithOut", favoritesWithOutEpisode);
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favoritesWithOutEpisode
      };
    }
    return dispatch(dispatchObj);
  }

  useEffect(()=>{
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <React.Fragment>
      {console.log("store", state)}

      <header className={styles.header}>
        <div>
          <h1>Cartoon!</h1>
          <p>pick your favourite episodes</p>
        </div>
        <div>
          Favourite(s) {state.favourites.length}
        </div>

      </header>

        <section className={styles.episodeLayout}>
          {state.episodes.map(episode => {
            return (
                <section key={episode.id} className={styles.episodeBox}>
                  <img
                      src={episode.image ? episode.image.medium : ""}
                      alt={`Rick and Morty ${episode.name}`}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }} >{episode.name}</div>
                  <section>
                    <div>
                      Season: {episode.season} Number: {episode.number}
                    </div>
                    <button type='button' onClick={() => toggleFavAction(episode)}>
                      {state.favourites.find(fav => fav.id === episode.id) ? "Unfav": "Fav"}
                    </button>
                  </section>
                </section>
            );
          })}
        </section>

    </React.Fragment>
  );
}
