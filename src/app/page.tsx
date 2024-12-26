
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
import {MovieDetail} from "@/components/movieDetail"

export default function Home() {
  const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  
  return (
    <div className="absolute w-full">
      <Header/>
      <MovieDetail id={974453}/>
      <MovieList title={"Uncoming"} url={url}/>
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
