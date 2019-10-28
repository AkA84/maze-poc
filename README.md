# Save the Pony (Proof of Concept)

POC for a React-based, auto-solving game using the [Pony Challenge API](https://ponychallenge.trustpilot.com/api-docs/index.html).

## Instructions

_(first run `npm i` to install the dependencies)_

```bash
npm start # to run the game
npm test # to run the tests
```

The game will run automatically until either the pony found the exit or encountered the monster.

Use the form on the right hand side to change the maze settings and start over.

## Technical details

### Business logic

In `src/maze` you can find the framework-agnostic business logic.

The `index.js` entry point exposes a `crateMaze()` function that, given some maze settings, will return a `maze` object.

```js
const maze = await createMaze({
  'maze-width': 15,
  'maze-height': 15,
  // ...
});
```

The `maze` object exposes the following methods:

#### `findWinningMoves()`

```js
const moves = maze.findWinningMoves();
```

Automatically find the moves that will take the pony to the exit.

The algorithm used internally is based on this [recursive algorithm](https://en.wikipedia.org/wiki/Maze_solving_algorithm#Recursive_algorithm).

#### `isMonsterInTheWay(moves)`

```js
const someMovesThePonyWillDo = [...];
const willThePonyBeCaught = maze.isMonsterInTheWay(someMovesThePonyWillDo);
```

Determines whether the monster, given its current position, will catch the pony in its tracks.

#### `moveTo(move)`

```js
const newMove = { nextCell: 1, direction: 'north' }
await maze.moveTo(newMove);
```

Calls the remote API to move the pony in the given direction.

#### `print()`

```js
const visualRepresentation = await maze.print()
```

Calls the remote API to get a visual representation of the maze.

#### `refresh([mazeId])`

```js
const mazeId = '8df7sakhjh98ysad681';
await maze.refresh(mazeId)

// or the following if the maze already fetched the data at least once
await maze.refresh()
```

Calls the remote API to get the data of the maze with either the given id, or with the id already stored internally.

### React components

The React app was intentionally left pretty straightforward.

This is the list of the components:

#### `<Game />`

```jsx
<Game />
```

The parent component, is in charge of initializing,  running, and restarting the game.

#### `<Maze />`

```jsx
<Maze maze={maze} />
```

Accepting a `maze` object (see above), it takes care of creating the rows and columns that make up the maze, and of filling them with the `<Cell />`s components.

#### `<Cell />`

```jsx
const walls = ['north', 'west'];
const content = ('monster' | 'pony' | 'exit' | null);

<Cell walls={walls} content={content} />
```

Prints the individual cell with its walls and its content (pony, monster, exit, or nothing).

#### `<Form />`

```jsx
const settings = { 'maze-width': 15 ... };
const submitHandler = (e) => { ... };

<Form settings={settings} onSubmit={submitHandler} />
```

Displays the form to create a new maze based on the settings submitted by the user.

#### `<Error message={errorMessage} />`

```jsx
const errorMessage = 'Some error message';

<Error message={errorMessage} />
```

Displays an error message in a styled panel

### Tests

There are tests provided for the `maze`'s methods and for the `<Cell />` component, although by no means they are supposed to be comprehensive.
