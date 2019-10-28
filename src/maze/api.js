const BASE_ENDPOINT = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

const api = {
  /**
   * Creates a new maze based on the given settings and returns its id
   *
   * @param {object} settings
   * @returns {number}
   */
  create: async function (settings) {
    const response = await sendRequest({
      method: 'POST',
      body: Object.assign({
        "maze-player-name": "Applejack",
      }, settings)
    });

    const { maze_id } = await response.json();

    return maze_id;
  },

  /**
   * @param {number} mazeId
   * @returns {Promise}
   */
  fetch: async function (mazeId) {
    const response = await sendRequest({
      path: `/${mazeId}`
    });

    return await response.json();
  },

  /**
   * @param {object} move Contains the `direction` property
   * @param {number} mazeId
   */
  move: async function (move, mazeId) {
    await sendRequest({
      method: 'POST',
      path: `/${mazeId}`,
      body: {
        direction: move.direction
      }
    });
  },

  /**
   * @param {number} mazeId
   * @returns {Promise}
   */
  print: async function (mazeId) {
    const response = await sendRequest({
      path: `/${mazeId}/print`
    });

    return await response.text();
  }
};

/**
 * Makes the actual api request
 *
 * @param {*} options
 * @return {object} The response
 * @throws {Error}
 */
async function sendRequest (options) {
  const { path, ...fetchOptions } = options;

  try {
    const response = await fetch(
      path ? `${BASE_ENDPOINT}${path}` : BASE_ENDPOINT,
      prepareFetchOptions(fetchOptions)
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  } catch (e) {
    throw e;
  }
}

/**
 * Prepares the fetch() options based on default and custom values
 *
 * @param {object} customOptions
 * @return {object}
 */
function prepareFetchOptions (customOptions) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

  if (customOptions.body) {
    options.body = JSON.stringify(customOptions.body);
  }

  if (customOptions.method) {
    options.method = customOptions.method;

    if (customOptions.method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
    }
  }

  return options;
}

export default api;
