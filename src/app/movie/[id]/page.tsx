"use client";
import { useState,useEffect } from "react";
import { Header } from "@/app/heater";
import { Footer } from "@/app/footer";
import { MovieList } from "@/components/movieList";
import { MovieInfo } from "@/components/types";
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

export default function Home(){
    let { id } = useParams();
    const [movie, setMovie] = useState<MovieInfo>();
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const uncomingUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  
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
    console.log(movie);
    return (
        <div>
            <Header/>
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
            <MovieList title={"Uncoming"} url={uncomingUrl}/>
            <Pagination>
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Footer/>
        </div>
    );
}