import { Movie } from "./types"
type Props = {
    movie: Movie
}
export function MovieCard({movie}:Props){
    return(
        <div className="w-full rounded-lg bg-card text-card-foreground overflow-hidden">
            <img src={movie.poster}/>
            <div className="p-2">
                <img src="/star.svg"/>
                {movie.title} 
                slkdjflksjdflkjsdlkfjlskj
            </div>
            
        </div>
    );
}