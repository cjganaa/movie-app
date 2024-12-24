"use client";
import { useState,useEffect } from "react";
import { Movie } from "@/components/types";
import { MovieCard } from "@/components/movieCard";
import { Footer } from "./footer";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
 
  const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmM1YmY4NjE0MjVkNDAxMGQ3NWNmZDE0MWMxOWExOCIsIm5iZiI6MTczNDk0OTE4My42NTI5OTk5LCJzdWIiOiI2NzY5MzkzZjYxNzhmY2JiZWFjNGUwMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fONUw9p9dhH-1zkQj9uLhZTao8W4HrUVfqUhSTKDrpE`,
    },
  };
 
  const fetchData = async () => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();

      const formattedMovies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      }));
      setMovies(formattedMovies);
      } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="absolute">
      <div className="grid grid-cols-2 gap-5 p-5">
        {movies.map((movie:Movie) => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
      <Footer/>
    </div>
  );
}
