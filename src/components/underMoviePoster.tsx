"use client";
import { Dispatch, SetStateAction } from "react";
import { Movie } from "./types";
type Props = {
  movie: Movie,
  setMovie: Dispatch<SetStateAction<number>>,
};
export function UnderMovieCard({ movie, setMovie }: Props) {
  return (
    <div
      onClick={()=> setMovie(movie.id)}
      className="w-full h-full max-w-[230px] rounded-lg bg-muted text-card-foreground overflow-hidden"
    >
      <img src={movie.poster} />
      <div className="p-2 grid">
        <div className="flex text-xs">
          <img src="/star.svg" />
          &nbsp;{movie.rating}
          <div className="text-muted-foreground">/10</div>
        </div>
        <div>{movie.title}</div>
      </div>
    </div>
  );
}
