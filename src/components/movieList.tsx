"use client";
import { useState,useEffect } from "react";
import { Movie } from "@/components/types";
import { MovieCard } from "@/components/movieCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
    title:string,
    url:string,
    options:any
}

export function MovieList({title,url,options}:Props){
    const [movies, setMovies] = useState<Movie[]>([]);
    
     
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
        <div className="pl-5 pr-5">
            <div className="flex justify-between items-center ">
                <h3 className="font-semibold text-2xl">{title}</h3>
                <Button variant={"seeMore"}>
                    See more 
                    <ArrowRight/>
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5 mb-5">
                {movies.map((movie:Movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
}