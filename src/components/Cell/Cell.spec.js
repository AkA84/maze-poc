import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup, render} from '@testing-library/react';
import Cell from './Cell';

let walls;

beforeEach(() => {
  walls = ['north', 'west'];
});
afterEach(cleanup);

test('snapshot test', () => {
  const tree = renderer.create(<Cell walls={walls} content="pony" />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('css classes', () => {
  let expectedClasses;

  beforeEach(() => {
    expectedClasses = walls.map(wall => `maze-cell--wall-${wall}`);
  });

  it('gets the correct classes for representing walls', () => {
    const { container } = render(<Cell walls={walls} />);
    const cell = container.querySelector(expectedClasses.join(''));

    expect(cell).toBe(null);
  });
});

describe('initials', () => {
  let mapping;

  beforeEach(() => {
    mapping = { exit: 'E', monster: 'D', pony: 'P' };
  });

  it('gets the correct initial', () => {
    Object.keys(mapping).forEach(content => {
      const { getByText } = render(<Cell walls={walls} content={content} />);
      const expectedInitial = mapping[content];

      expect(getByText(expectedInitial)).toBeDefined()
    });
  });
});
