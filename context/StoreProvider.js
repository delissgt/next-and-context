import React from 'react'

//creates context object which children components will subscribe to.
export const Store = React.createContext();

const initialState = {
  episodes: [],
  favourites: [],
}

// The reducer function takes 2 arguments
// state — the data in the store at the time it’s run. [initial-state-updated]
// action — the action object that is returned.
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}

//react component that will encapsulate the other components in the application.
//It has an argument of props because that’s how we’ll get access to the other child components.
export function StoreProvider(props) {
  // It returns an array with
  // state — the data in the store,
  // dispatch — how we dispatch an action to our reducer (and in turn change our state).
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // turn our new state and dispatch variables into an object value
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

// return <Store.Provider value='data from store'>{props.children}</Store.Provider>