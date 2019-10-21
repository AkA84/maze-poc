import api from '../api';
import { refresh } from './refresh';

jest.mock('../api');

let mockedMaze = {};

beforeEach(() => {
  mockedMaze = { refresh, maze_id: 123 };
});

describe('maze id', () => {
  describe('when it is not passed as param', () => {
    beforeEach(async () => {
      await mockedMaze.refresh();
    });

    test('it use the internal maze id in the internal api call', () => {
      expect(api.fetch).toHaveBeenCalledWith(mockedMaze.maze_id);
    });
  });

  describe('when it is passed as param', () => {
    const externalMazeId = 456;

    beforeEach(async () => {
      await mockedMaze.refresh(externalMazeId);
    });
  
    test('it uses the param in the internal api call', () => {
      expect(api.fetch).toHaveBeenCalledWith(externalMazeId);
    });
  });
});

describe('foobar', () => {
  let mockedData;

  beforeEach(async () => {
    mockedData = { foo: 'foo', bar: 'bar' };
    api.fetch.mockReturnValue(mockedData);

    await mockedMaze.refresh();
  });

  test('it stores the received data', () => {
    expect(mockedMaze).toEqual(expect.objectContaining(mockedData));
  });
});
