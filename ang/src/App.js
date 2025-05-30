import React, { useState, useEffect } from "react";
import "./style.css";
import GameBoard from "./components/game-board/index.js";

export default function App() {
 return (<div>
    <GameBoard
  initialLeft="02"
  initialRight="01"
  initialResult="10"
  operator="+"
  allowedMoves={1} />
 </div>);
}