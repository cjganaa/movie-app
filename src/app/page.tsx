"use client";
import { Footer } from "./footer";
import { MovieList } from "@/components/movieList";
import { Header } from "./heater";
import {MovieDetail} from "@/components/movieDetail";
import { useState } from "react";


export default function Home() {
  const uncomingUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const topRateUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const [underHeaderMovie, setUnderHeaderMovie] = useState(0);
  return (
    <div className="absolute w-full">
      <Header/>
      {underHeaderMovie!=0?<MovieDetail id={underHeaderMovie}/>:null}
      <MovieList title={"Uncoming"} url={uncomingUrl} setMovie={setUnderHeaderMovie}/>
      <MovieList title={"Top Rate"} url={topRateUrl} setMovie={setUnderHeaderMovie}/>
      <MovieList title={"Popular"} url={popularUrl} setMovie={setUnderHeaderMovie}/>
      <Footer/>
    </div>
  );
}
