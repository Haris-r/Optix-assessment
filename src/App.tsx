import { useState, useEffect, SetStateAction } from "react";
import "./App.css";
import { fetchMovieCompanies, fetchMovies } from "./Api/fetchData";
import { submitReview } from "./Api/postData";
import MovieTable from "./Components/MovieTable";
import ReviewForm from './Components/ReviewForm';

export const App = () => {
  const [movieCompanies, setMovieCompanies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  const handleSubmitReview = async (review: string) => { 
    setSubmittingReview(true);
    try {
      const response = await submitReview(selectedMovie?.id, review);
      alert(response.message);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert((error as Error).message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleSelectedMovie = (movie: SetStateAction<null>) => {
    setSelectedMovie(movie);
  };


  const refreshButton = (buttonText: any) => {
    const handleRefresh = async () => {
      setIsLoading(true); 
      setHasError(false); 
      try {
        const [newMovieCompanies, newMovies] = await Promise.all([
          fetchMovieCompanies(),
          fetchMovies(),
        ]);

        setMovieCompanies(newMovieCompanies);
        setMovies(newMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(true); 
      } finally {
        setIsLoading(false); 
      }
    };

    return (
      <button onClick={handleRefresh}>{buttonText}</button>
    );
  };



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const [movieCompanies, movies] = await Promise.all([
          fetchMovieCompanies(),
          fetchMovies(),
        ]);

        setMovieCompanies(movieCompanies);
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);


  return (
    <div className="mainBody">
    <h2>Welcome to Movie database!</h2>
    {refreshButton("Refresh")}
    {isLoading ? ( 
      <p>Loading...</p>
    ) : hasError ? ( 
      <p>Error fetching data. Please try again.</p>
    ) : (
      <>
        <p>Total movies displayed {movies.length}</p>
        <MovieTable
          movies={movies}
          movieCompanies={movieCompanies}
          selectedMovie={selectedMovie}
          handleSelectedMovie={handleSelectedMovie}
        />
        <br />
        <br />
        <div>
          {selectedMovie ? (
            `You have selected ${selectedMovie.title}`
          ) : (
            "No Movie Selected"
          )}
          {selectedMovie && <p>Please leave a review below</p>}
          {selectedMovie && (
            <ReviewForm
              onSubmit={handleSubmitReview}
              submitting={submittingReview}
            />
          )}
        </div>
      </>
    )}
  </div>
  );
};
