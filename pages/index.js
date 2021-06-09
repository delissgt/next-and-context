import React, { useEffect } from "react";
import Link from "next/link";
import { Store } from "../context/StoreProvider";

import styles from '../styles/Home.module.css'

export default function App(props) {
  const { state } = React.useContext(Store);

  return (
    <React.Fragment>

      <header className={styles.header}>
        <div>
          <h1>Carton!</h1>
          <p>pick your favourite episodes</p>
        </div>
        <div>
          <Link href={"/home"}>Cartoon!</Link>
          <Link href={"/favourites"} >My Favourites</Link>
          Favourite(s) {state.favourites.length}
        </div>
      </header>

      {props.children}

    </React.Fragment>
  );
}
