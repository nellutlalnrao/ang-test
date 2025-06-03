import React, { useState, useEffect } from "react";
import "./index.css";

const digitSegments = {
  "0": ["a", "b", "c", "d", "e", "f"], //  length: 6
  "1": ["b", "c"], //  length: 2
  "2": ["a", "b", "g", "e", "d"], //  length: 5
  "3": ["a", "b", "c", "d", "g"], //  length: 5
  "4": ["f", "g", "b", "c"], //  length: 4
  "5": ["a", "f", "g", "c", "d"], //  length: 5
  "6": ["a", "f", "e", "d", "c", "g"], //  length: 6
  "7": ["a", "b", "c"], //  length: 3
  "8": ["a", "b", "c", "d", "e", "f", "g"], //  length: 7
  "9": ["a", "b", "c", "d", "f", "g"], //  length: 6
};

const Digit = ({ num, remainingMoves, consumeMove, onMatchChange }) => {
  const [activeSegments, setActiveSegments] = useState({});
  const [matchedDigit, setMatchedDigit] = useState(null);
  const [pendingToggle, setPendingToggle] = useState(null); // for pair selection

  useEffect(() => {
    if (matchedDigit !== null && onMatchChange) {
      onMatchChange(matchedDigit);
    }
  }, [matchedDigit]);
  
  useEffect(() => {
    const defaultSegments = digitSegments[num] || [];
    const initialState = {};
    ["a", "b", "c", "d", "e", "f", "g"].forEach((seg) => {
      initialState[seg] = defaultSegments.includes(seg);
    });
    setActiveSegments(initialState);
    // Also set the initial matchedDigit
    setMatchedDigit(num);
  }, [num]);

  const toggleSegment = (segment) => {
    if (remainingMoves === 0) return;

    const isActive = activeSegments[segment];

    if (!pendingToggle) {
      // First click
      if (!isActive) return; // must deactivate something first
      setPendingToggle(segment);
    } else {
      // Second click
      if (segment === pendingToggle) {
        setPendingToggle(null); // cancel if same clicked again
        return;
      }
      if (isActive) {
        setPendingToggle(null); // must activate inactive segment
        return;
      }

      // Perform swap: turn off pendingToggle, turn on current segment
      setActiveSegments((prev) => {
        const updated = {
          ...prev,
          [pendingToggle]: false,
          [segment]: true,
        };

        // Match check
        const activeKeys = Object.keys(updated).filter((key) => updated[key]);
        const match = Object.entries(digitSegments).find(([digit, segments]) => {
          if (segments.length !== activeKeys.length) return false;
          return segments.every((seg) => activeKeys.includes(seg));
        });

        setMatchedDigit(match ? match[0] : null);
        return updated;
      });

      consumeMove(); // consume 1 move
      setPendingToggle(null); // reset toggle pair
    }
  };

  return (
    <div className="digit-wrapper">
      <div className="digit">
        {["a", "b", "c", "d", "e", "f", "g"].map((seg) => (
          <div
            key={seg}
            className={`segment ${seg} ${
              pendingToggle === seg ? "pending-toggle" : ""
            }`}
            style={{
              background: activeSegments[seg] ? "#ff0000" : "#444",
              cursor: remainingMoves > 0 ? "pointer" : "not-allowed",
            }}
            onClick={() => toggleSegment(seg)}
          ></div>
        ))}
      </div>
      <p style={{ color: "#fff", marginTop: "10px" }}>
        {matchedDigit !== null ? `${matchedDigit}` : "-"}
      </p>
    </div>
  );
};

export default Digit;
