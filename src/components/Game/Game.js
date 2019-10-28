import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newMaze, movePlayer, setError } from "../../redux/actions";

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
  const dispatch = useDispatch();

  const [willCatch, setWillCatch] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const moves = useRef();

  const maze = useSelector(state => state.maze);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const memoOnNewSettingsSubmit = useCallback(onNewSettingsSubmit, []);
  const memoRestartGame = useCallback(restartGame, [dispatch]);

  // Init
  useEffect(() => {
    (async function init () {
      await memoRestartGame(DEFAULT_SETTINGS);
    }());
  }, [memoRestartGame]);

  // Main loop of the game:
  // 1 - Check if game over
  // 2 - Check if the monster is going to get the pony
  // 3 - Make the next move
  // 4 - Refresh the maze data
  // 5 - Trigger a re-render
  useEffect(() => {
    async function mainLoop () {
      dispatch(setError(null));

      if (['over', 'won'].includes(maze['game-state'].state)) {
        setGameOver(true);
        return;
      }

      moves.current = moves.current || maze.findWinningMoves();

      const willCatch = maze.isMonsterInTheWay(moves.current);
      setWillCatch(willCatch);

      const nextMove = moves.current.shift();
      dispatch(movePlayer(nextMove));
    }

    // Loop can start only if a maze had been loaded
    maze.maze_id && !loading && mainLoop();
  }, [maze, loading, dispatch])

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
          { loading ? 'loading...' : <Maze /> }
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
    moves.current = null;

    setWillCatch(false);
    setGameOver(false);

    dispatch(newMaze(settings));
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
