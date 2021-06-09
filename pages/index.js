import React, { useEffect } from "react";
import Link from "next/link";

import styles from '../styles/Home.module.css'
import { Store } from "../context/StoreProvider";

// const EpisodesList = React.lazyS(()=> import("../components/EpisodesList/EpisodesList")); IS NOT SUPPORTED
import EpisodesList from "../components/EpisodesList/EpisodesList"; // WORKS OK

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


  const props = {
    episodes: state.episodes,
    toggleFavAction: toggleFavAction,
    favourites: state.favourites
  };

  return (
    <React.Fragment>
      {/*<React.Suspense fallback={<div>Loading...</div>}/> IS NOT SUPPORTED */}
      {console.log("store", state)}

      <header className={styles.header}>
        <div>
          {/*<Link to={"/"}>HOME</Link> SINTAXIS LINK FROM REACT ROUTER*/}
          <Link href={"/home"}>Cartoon!</Link>
          <Link href={"/favourites"} >My Favourites</Link>
        </div>
        <div>
          Favourite(s) {state.favourites.length}
        </div>
      </header>

        <section className={styles.episodeLayout}>

          <EpisodesList {...props} />

        </section>

    </React.Fragment>
  );
}
