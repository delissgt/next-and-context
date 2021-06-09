import React, {useContext} from "react";
import { Store } from "../../context/StoreProvider";

import EpisodeList from "../../components/EpisodesList/EpisodesList";

import styles from "../../styles/Home.module.css";

export default function FavouritesPage(){
  const { state, dispatch } = useContext(Store);

  // creating action
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

  const props = {
    episodes: state.favourites,
    toggleFavAction: toggleFavAction,
    favourites: state.favourites
  };


  return(
      <React.Fragment>
        <div className={styles.episodeLayout}>
          <EpisodeList {...props}/>
        </div>
      </React.Fragment>
  )
}