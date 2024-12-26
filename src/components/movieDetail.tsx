"use client";
import { useState,useEffect } from "react";
import { Header } from "@/app/heater";
import { Footer } from "@/app/footer";
import { MovieList } from "@/components/movieList";
import { MovieInfo } from "./types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useParams } from "next/navigation";
import { OPTIONS } from "@/app/constValue";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

type Params = {
    id:number
}

export function MovieDetail({id}:Params){
    const [movie, setMovie] = useState<MovieInfo>();
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  
    const fetchData = async () => {
        try {
            const res = await fetch(url, OPTIONS);
            const data = await res.json();
            const formattedMovies = {
                id: data.id,
                adult: data.adult,
                background_img: `https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${data.backdrop_path}`,
                language: data.origin_country[0],
                title: data.original_title,
                overview: data.overview,
                rate: data.vote_average,
            };
            setMovie(formattedMovies);
            } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };    
    useEffect(() => {
        
        fetchData();
    }, []);
    return (
        <div>
            <img src={movie?.background_img} className="w-full"/>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm font-normal">Now Playing:</div>
                        <h3 className="text-2xl font-semibold">{movie?.title}</h3>
                    </div>
                    <div className="flex text-base items-center">
                        <img src="/star.svg" className="w-6 h-6"/>
                        &nbsp;{movie?.rate}
                        <div className="text-muted-foreground">
                            /10
                        </div>
                    </div>
                </div>
                <div>{movie?.overview}</div>
                <Button className="p-3"><Play/>Watch Trailer</Button>
            </div>
        </div>
    );
}