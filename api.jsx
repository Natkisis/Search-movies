const API_KEY = import.meta.env.VITE_OMDB_API_KEY;;
const BASE_URL = "https://www.omdbapi.com/";

// movie seach
export async function searchMovies(query) {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      alert(`The "${query}" movie not found. Try to change the query.`);
      return [];
    }
    
    return data.Search || [];
    
  } catch (error) {
    console.error("Movie search error:", error);
    alert("Movie search error. Please try again later.");
    return [];
  }
}