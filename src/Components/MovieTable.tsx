import React, { useState } from "react";

interface IMovieTable {
    movies: any[];
    movieCompanies: any[];
    selectedMovie: any;
    handleSelectedMovie: (movie: any) => void;
  }


function MovieTable({ movies, movieCompanies, selectedMovie, handleSelectedMovie }: IMovieTable) {

    const [sortByReviewsAsc, setSortByReviewsAsc] = useState(true);

  const toggleSortByReviews = () => {
    setSortByReviewsAsc(!sortByReviewsAsc);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    const averageA = a.reviews.reduce((acc: any, i: any) => (acc + i), 0) / a.reviews.length;
    const averageB = b.reviews.reduce((acc: any, i: any) => (acc + i), 0) / b.reviews.length;

    return sortByReviewsAsc ? averageA - averageB : averageB - averageA;
  });


    return (


        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th><button onClick={toggleSortByReviews}>Sort by Reviews</button></th>
              <th>Film Company</th>
            </tr>
          </thead>
          <tbody>
          {sortedMovies.map((movie: any) => {
              const movieReview = movie.reviews.reduce((acc: any, i: any) => (acc + i), 0) / movie.reviews.length;
              const average = movieReview.toFixed(1);
              return (
                <tr key={movie.id} onClick={() => { handleSelectedMovie(movie) }} className={selectedMovie && selectedMovie?.id === movie.id ? 'selected-row' : ''}>
                  <td>{movie.title}</td>
                  <td>{average}</td>
                  <td>{movieCompanies.find((f: any) => f.id === movie.filmCompanyId)?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}

export default MovieTable;