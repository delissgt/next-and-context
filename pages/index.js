import React, { useEffect } from "react";

import styles from '../styles/Home.module.css'
import { Store } from "../context/StoreProvider";

export default function Home() {
  // const store = React.useContext( Store );
  const { state, dispatch } = React.useContext(Store);

  // Creating action
  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  useEffect(()=>{
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <div>
      {console.log("store", state)}
        <h1>Cartoon!></h1>
        <p>pick your favourite episodes</p>

        <section>
          {state.episodes.map(episode => {
            return (
                <section key={episode.id}>
                  <img
                      src={episode.image ? episode.image.medium : ""}
                      alt={`Rick and Morty ${episode.name}`}
                  />
                  <div>{episode.name}</div>
                  <section>
                    <div>
                      Season: {episode.season} Number: {episode.number}
                    </div>
                  </section>
                </section>
            );
          })}
        </section>

    </div>
  )
}
