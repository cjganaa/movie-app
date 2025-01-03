"use client";
import { useState,useEffect } from "react";
import { Header } from "@/app/heater";
import { Footer } from "@/app/footer";
import { MovieInfo,Genre } from "@/components/types";
import { Badge } from "@/components/ui/badge";
import { Credit } from "@/components/types";
import { MovieList } from "@/components/movieList";
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


export default function Home(){
    let { id } = useParams();
    const [movie, setMovie] = useState<MovieInfo>();
    const [credit, setCredit] = useState<Credit>();
    const [underHeaderMovie, setUnderHeaderMovie] = useState(0);
    const popularUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
    
  
    const fetchMovie = async () => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
            const res = await fetch(url, OPTIONS);
            const data = await res.json();
            const formattedMovies = {
                id: data.id,
                adult: data.adult,
                background_img: `https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${data.backdrop_path}`,
                poster:  `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                language: data.origin_country[0],
                title: data.original_title,
                overview: data.overview,
                rate: data.vote_average,
                release_date: data.release_date,
                runtime:data.runtime,
                vote_count:data.vote_count,
                genres:data.genres,
            };

            setMovie(formattedMovies);
            } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };    
    const fetchCredit = async () =>{
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
            const res = await fetch(url, OPTIONS);
            const data = await res.json();
            setCredit(data);
            } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    useEffect(() => {
        fetchMovie();
        fetchCredit();
    }, []);
    return (
        <div>
            <Header/>
            <div className="pl-5 pr-5 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-2xl">{movie?.title}</h3>
                    {movie?.release_date.replaceAll("-",".")} 
                    &middot;
                    PG
                    &middot;
                    {movie?Math.floor(movie.runtime/60):0}h
                    {movie?Math.floor(movie.runtime%60):0}m
                </div>
                <div className="flex items-center">
                    <img src="/star.svg" className="w-[20px] h-[20px]"/>
                    <div>
                        <div>
                            <div className="flex">
                                {movie?.rate}
                                <div className="text-muted-foreground">
                                /10
                                </div>
                            </div>
                        </div>
                        <div>{movie?.vote_count}</div>
                    </div>
                </div>
            </div>
            <img className="relative left-0 right-0" src={movie?.background_img}/>
            <div className="p-5 grid grid-cols-2 gap-5">
                <img className="row-span-2" src={movie?.poster} alt="" />
                <div>
                    {movie?.genres.map((genre:Genre,index:number) => <Badge className="rounded-2xl mr-3 mb-2" key={index} variant="outline">{genre.name}</Badge>)}
                </div>
                <div>{movie?.overview}</div>
            </div>
            <div className="p-5 grid grid-cols-2">
                <div className="border-b p-5 text-base font-bold">Director</div>
                <div className="border-b p-5">{credit?.crew.filter((person:any)=> person.known_for_department=="Directing").map((person:any,index:number)=><p className="inline" key={index}>{index==0?null:<p className="inline">&nbsp;&middot;&nbsp;</p>}{person.name}</p>)}</div>
                <div className="border-b p-5 text-base font-bold">Writers</div>
                <div className="border-b p-5">{credit?.crew.filter((person:any)=> person.known_for_department=="Writing").map((person:any,index:number)=><p className="inline" key={index}>{index==0?null:<p className="inline">&nbsp;&middot;&nbsp;</p>}{person.name}</p>)}</div>
                <div className="border-b p-5 text-base font-bold">Stars</div>
                <div className="border-b p-5">{credit?.cast.slice(0,5).map((person:any,index:number)=><p className="inline" key={index}>{index==0?null:<p className="inline">&nbsp;&middot;&nbsp;</p>}{person.name}</p>)}</div>
            </div>
            <MovieList title={"Recommendations"} url={popularUrl} setMovie={setUnderHeaderMovie}/>
            <Footer/>
        </div>
    );
}