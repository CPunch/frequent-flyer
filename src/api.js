const fetchRouteData = async (routeId) => {
  try {
    // Make the fetch request
    const response = await fetch(`/api/get-route?routeId=${routeId}`);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log or use the data
    console.log("Route Data:", data);

    // Example: Accessing the coordinates
    console.log("Start Coordinates:", data.startLat, data.startLong);
    console.log("End Coordinates:", data.endLat, data.endLong);
    return data
  } catch (error) {
    // Handle errors
    console.error("Error fetching route data:", error);
    throw error;
  }
};

export { fetchRouteData }