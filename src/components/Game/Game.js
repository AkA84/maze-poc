import React, { useEffect, useRef, useState, useCallback } from "react";
import cloneDeep from "lodash/cloneDeep"

import { createMaze } from "../../maze";

import Maze from "../Maze";
import Form from "../Form";
import Error from "../Error";

import "./Game.css";

const DEFAULT_SETTINGS = {
  "maze-width": 15,
  "maze-height": 15,
  "difficulty": 5
};

function Game() {
  const [loading, setLoading] = useState(true);
  const [maze, setMaze] = useState({});
  const [willCatch, setWillCatch] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);
  const moves = useRef();

  const memoOnNewSettingsSubmit = useCallback(onNewSettingsSubmit, []);

  // Init
  useEffect(() => {
    (async function init () {
      await restartGame(DEFAULT_SETTINGS);
    }());
  }, []);

  // Main loop of the game:
  // 1 - Check if game over
  // 2 - Check if the monster is going to get the pony
  // 3 - Make the next move
  // 4 - Refresh the maze data
  // 5 - Trigger a re-render
  useEffect(() => {
    let didCancel = false;

    async function mainLoop () {
      setError(null);

      if (['over', 'won'].includes(maze['game-state'].state)) {
        setGameOver(true);
        return;
      }

      const willCatch = maze.isMonsterInTheWay(moves.current);
      setWillCatch(willCatch);

      try {
        await maze.moveTo(moves.current.shift());
        await maze.refresh();
      } catch ({ name, message }) {
        setError(message);
        return;
      }

      if (!didCancel) {
        const updatedMaze = cloneDeep(maze);
        setMaze(updatedMaze);
      }
    }

    // Loop can start only if a maze had been loaded
    maze.maze_id && !loading && mainLoop();

    return () => { didCancel = true; };
  }, [maze, loading])

  return (
    <>
      {error && <Error message={error} />}
      <div className="game">
        <div className="game-col">
          <Form settings={DEFAULT_SETTINGS} onSubmit={memoOnNewSettingsSubmit} />
          <div className="game-message">
            {(!isGameOver && willCatch) && <p>It's going to get you!</p>}
            {isGameOver && <p>{maze['game-state']['state-result']}</p>}
          </div>
        </div>
        <div className="game-col">
          { loading ? 'loading...' : <Maze maze={maze} /> }
        </div>
      </div>
    </>
  );

  /**
   * Handles the submissions of the new maze settings
   *
   * @param {object} e
   */
  async function onNewSettingsSubmit (e) {
    e.preventDefault();

    const newSettings = processSubmittedValues(e.target);
    await restartGame(newSettings);
  }

  /**
   * Resets the game, creates a new maze based on the given settings
   * and kicks off the game again
   *
   * @param {object} settings
   */
  async function restartGame (settings) {
    setError(null);
    setLoading(true);
    setWillCatch(false);
    setGameOver(false);

    try {
      const newMaze = await createMaze(settings);
      moves.current = newMaze.findWinningMoves();

      setMaze(newMaze);
      setLoading(false);
    } catch ({ name, message }) {
      setError(message);
    }
  }
}

/**
 * Simple and direct way to extract the values from the submitted form
 * (minus the submit button) and put them in an object
 *
 * @param {object} form
 * @returns {object}
 */
function processSubmittedValues (form) {
  return Array.from(form.elements)
    .filter(el => el.type !== 'submit')
    .reduce((acc, el) => {
      acc[el.name] = parseInt(el.value, 10)
      return acc;
    }, {});
}

export default Game;
