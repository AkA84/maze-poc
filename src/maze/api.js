const ENDPOINT = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

const api = {
  /**
   * Creates a new maze and returns its id
   *
   * @param {object} settings
   * @returns {number}
   */
  create: async function (settings) {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.assign({
        "maze-player-name": "Applejack",
      }, settings))
    });

    const { maze_id } = await response.json();

    return maze_id;
  },

  /**
   * @param {number} mazeId
   * @returns {Promise}
   */
  fetch: async function (mazeId) {
    return await (await fetch(`${ENDPOINT}/${mazeId}`)).json();
  },

  /**
   * @param {object} move Contains the `direction` property
   * @param {number} mazeId
   */
  move: async function (move, mazeId) {
    await fetch(`${ENDPOINT}/${mazeId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'direction': move.direction
      })
    });
  },

  /**
   * @param {number} mazeId
   * @returns {Promise}
   */
  print: async function (mazeId) {
    return await (await fetch(`${ENDPOINT}/${mazeId}/print`)).text();
  }
};

export default api;
