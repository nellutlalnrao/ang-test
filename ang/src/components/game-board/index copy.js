import React, { useState } from "react";
import Digit from "./../digit/index.js"; // Your existing Digit component
import "./index.css";

const parseDigits = (str) => str.split("").map((ch) => ch.padStart(1, "0"));

const isValidEquation = (lhs1, lhs2, op, result) => {
  const a = parseInt(lhs1.join(""));
  const b = parseInt(lhs2.join(""));
  const res = parseInt(result.join(""));
  switch (op) {
    case "+": return a + b === res;
    case "-": return a - b === res;
    case "*": return a * b === res;
    case "/": return b !== 0 && a / b === res;
    default: return false;
  }
};

const GameBoard = ({ initialLeft, initialRight, operator, initialResult, allowedMoves }) => {
  const [movesLeft, setMovesLeft] = useState(allowedMoves);
  const [lhs1, setLhs1] = useState(parseDigits(initialLeft));   // ["0", "2"]
  const [lhs2, setLhs2] = useState(parseDigits(initialRight));  // ["0", "1"]
  const [res, setRes] = useState(parseDigits(initialResult));   // ["1", "0"]

  const handleMove = () => {
    setMovesLeft((prev) => Math.max(0, prev - 1));
  };

  const onMatchChange = (setState, index) => (digit) => {
    setState((prev) => {
      const newState = [...prev];
      newState[index] = digit;
      return newState;
    });
  };

  const isCorrect = isValidEquation(lhs1, lhs2, operator, res);

  return (
    <div style={{ textAlign: "center", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {lhs1.map((d, i) => (
          <div style={{ width:'60px' }}>
          <Digit
            key={`lhs1-${i}`}
            num={d}
            remainingMoves={movesLeft}
            consumeMove={handleMove}
            onMatchChange={onMatchChange(setLhs1, i)}
          />
          </div>
        ))}
        <div style={{ fontSize: "2rem", paddingTop: "30px" }}>{operator}</div>
        {lhs2.map((d, i) => (
          <div style={{ width:'60px' }}>
          <Digit
            key={`lhs2-${i}`}
            num={d}
            remainingMoves={movesLeft}
            consumeMove={handleMove}
            onMatchChange={onMatchChange(setLhs2, i)}
          />
          </div>
        ))}
        <div style={{ fontSize: "2rem", paddingTop: "30px" }}>=</div>
        {res.map((d, i) => (
          <div style={{ width:'60px' }}>
          <Digit
            key={`res-${i}`}
            num={d}
            remainingMoves={movesLeft}
            consumeMove={handleMove}
            onMatchChange={onMatchChange(setRes, i)}
          />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <strong>Moves Left:</strong> {movesLeft}
      </div>

      <div style={{ marginTop: "10px", color: isCorrect ? "limegreen" : "red" }}>
        {isCorrect ? "Equation is correct!" : "Not matching"}
      </div>
    </div>
  );
};

export default GameBoard;
