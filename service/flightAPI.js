const fetchFlights = async (params = {}) => {
  const API_URL = 'https://api.aviationstack.com/v1/flights';
  const ACCESS_KEY = import.meta.env.VITE_AV_STACK_API_KEY;

  // Construct query parameters
  const queryString = new URLSearchParams({
    access_key: ACCESS_KEY,
    ...params,
  }).toString();

  try {
    const response = await fetch(`${API_URL}?${queryString}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('error fetching flights:', error);
    throw error; // Re-throw the error for handling by the caller
  }
}

export { fetchFlights };