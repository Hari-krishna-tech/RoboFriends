import React, { useState, useEffect } from "react";
import CardList from "./CardList";
//import { robots } from "./robots";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";
import "./App.css";

const App = () => {
  //https://jsonplaceholder.typicode.com/users
  const [state, setState] = useState({
    robots: [],
    searchfield: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => setState({ ...state, robots: users }));
  }, []);
  const filteredRobots = state.robots.filter((robot) => {
    return robot.name.toLowerCase().includes(state.searchfield);
  });
  const onSearchChange = (e) => {
    setState({ ...state, searchfield: e.target.value });
  };
  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
};

export default App;
