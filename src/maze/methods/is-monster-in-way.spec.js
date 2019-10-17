import { isMonsterInTheWay } from "./is-monster-in-way";

let mockedMaze = {};
let moves = [];

beforeEach(() => {
  mockedMaze = { isMonsterInTheWay, ...{
    domokun: [ 10 ]
  }};
});

describe('when the monster is in the way', () => {
  beforeEach(() => {
    moves = [
      { nextCell: 1, direction: 'north' },
      { nextCell: 10, direction: 'south' },
      { nextCell: 24, direction: 'east' }
    ];
  });

  test('returns true', () => {
    expect(mockedMaze.isMonsterInTheWay(moves)).toBe(true);
  });
});

describe('when the monster is not in the way', () => {
  beforeEach(() => {
    moves = [
      { nextCell: 1, direction: 'north' },
      { nextCell: 9, direction: 'south' },
      { nextCell: 24, direction: 'east' }
    ];
  });

  test('returns false', () => {
    expect(mockedMaze.isMonsterInTheWay(moves)).toBe(false);
  });
});
