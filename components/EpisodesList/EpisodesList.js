import React from "react";
import styles from "../../styles/Home.module.css";

export default function EpisodesList(props) {
  console.log("props in EpisodeList", props)
  const {episodes, toggleFavAction, favourites} = props;
  return episodes.map(episode => {
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
              {favourites.find(fav => fav.id === episode.id) ? "Unfav": "Fav"}
            </button>
          </section>
        </section>
    );
  })
}