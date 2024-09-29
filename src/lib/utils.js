/**
 * @param {string} url - The URL to make the request to.
 * @param {object} [options={}] - The options for the fetch request.
 * @param {string} [options.method='GET'] - The HTTP method (GET, POST, PUT, DELETE).
 * @param {object|null} [options.body=null] - The body data to send with the request.
 * @param {AbortSignal} [options.signal=null] - The AbortSignal to cancel the request.
 * @returns {Promise<any>} - Returns the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function apiCall(url, options = {}) {
  try {
    let body = null;

    if (options.body) {
      body = JSON.stringify(options.body);
    }

    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}