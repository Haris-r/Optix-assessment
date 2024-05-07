import axios from 'axios';

export const submitReview = async (movieId: number, reviewMessage: string) => {
  try {
    const response = await axios.post('http://localhost:3000/submitReview', {
      movieId,
      reviewMessage
    });
    console.log('Review submitted:', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw new Error('Error submitting review. Please try again later.');
  }
};
