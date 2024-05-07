import axios from 'axios';

export const fetchMovieCompanies = async () => {
  try {
    const response = await axios.get('http://localhost:3000/movieCompanies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movie company data:', error);
    return [];
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get('http://localhost:3000/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    return [];
  }
};
