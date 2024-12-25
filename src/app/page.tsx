"use client";
import { useState,useEffect } from "react";
import { Footer } from "./footer";
import { MovieList } from "@/components/movieList";
import { Header } from "./heater";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function Home() {
  const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmM1YmY4NjE0MjVkNDAxMGQ3NWNmZDE0MWMxOWExOCIsIm5iZiI6MTczNDk0OTE4My42NTI5OTk5LCJzdWIiOiI2NzY5MzkzZjYxNzhmY2JiZWFjNGUwMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fONUw9p9dhH-1zkQj9uLhZTao8W4HrUVfqUhSTKDrpE`,
    },
  };
  return (
    <div className="absolute w-full">
      <Header/>
      <MovieList title={"Uncoming"} url={url} options={options}/>
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
