"use client";
 
import * as React from "react";
import { Moon, Sun,Film,Search,ChevronDown,X} from "lucide-react";
import { useTheme } from "next-themes";
import { OPTIONS } from "./constValue";
import { Genre } from "@/components/types";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { ChevronRight,ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useState,useEffect } from "react";
import Link from "next/link";
import { Movie } from "@/components/types";


export function Header(){
    const [searchState, setSearchState] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState('');
    const [popResult, setPopResult] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const { setTheme } = useTheme();
    
    onkeydown = (keyDown) => {
        if(keyDown.code == "Enter"){
            fetchSearch();
            setPopResult(true);
        }
    };
    
    
    const fetchGenres = async () => {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
        try {
            const res = await fetch(url, OPTIONS);
            const data = await res.json();
            setGenres(data.genres);
            } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };  
    const fetchSearch = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
        try {
            const res = await fetch(url, OPTIONS);
            const data = await res.json();
            console.log(data);
            const formattedMovies = data.results.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                date: movie.release_date,
                rating: movie.vote_average,
            }));
            setMovies(formattedMovies);
            } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };  
    useEffect(()=>{
        fetchGenres();
    },[]);
    return(
        <header>
            {
                searchState?
                <div className="p-5 bg-background flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon">
                                <ChevronDown className="text-foreground"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <h3 className="font-bold text-2xl">Genres</h3>
                            <p className="font-normal text-base border-b pb-5">See lists of movies by genre</p>
                            {genres.map((genre:Genre,index:number) => <Link key={index} href={`/${genre.name}`}><Badge className="rounded-2xl mr-3 mb-2" variant="outline">{genre.name} &nbsp;<ChevronRight size={16}/></Badge></Link>)}
                        </PopoverContent>
                        </Popover>
                        <Search size={16} className="text-muted-foreground" />
                        <input type="text" className="bg-transparent outline-none" placeholder="Search" onChange={e => setSearch(e.target.value)}/>
                        {
                            popResult?
                            <div className="absolute top-16 left-5 right-5 z-40 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">
                                {movies.map((movie:Movie) =><div className="flex pb-3">
                                    <img src={movie.poster} className="w-[67px] h-[100px] rounded-sm"/>
                                    <div className="p-5 w-full items-end flex justify-between">
                                        <div>
                                            <div>{movie.title}</div>
                                            <div className="flex"><img src="/star.svg"/>{movie.rating}/10</div>
                                            <div>{movie.date.slice(0,4)}</div>
                                        </div>
                                        <div>
                                            <Link href={`/movie/${movie.id}`} className="flex items-center" >See more&nbsp;<ArrowRight size={16}/></Link>
                                        </div>
                                    </div>
                                </div> )}
                            </div>
                            :
                            null
                        }
                        
                    </div>
                    <button onClick={() => setSearchState(false)} ><X size={16}/></button>
                </div>
                :
                <div className="p-5 bg-background flex justify-between items-center">
                    <div className="flex font-bold italic text-indigo-700 col-span-7"><Film strokeWidth={1}/>Movie Z </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={() => setSearchState(true)} variant="outline" size="icon">
                            <Search className="text-foreground"/>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            }
            
        </header>
    );
}
