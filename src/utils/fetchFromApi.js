import axios from "axios";

const BASE_URL = "https://instagram-scraper-api2.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
  },
  params: {
    url_embed_safe: true, // Add this parameter
  },
};

// console.log('API key:', import.meta.env.VITE_RAPID_API_KEY);

export const fetchFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    if (error.response) {
      console.error("API responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error; // Ensure error is propagated
  }
};


