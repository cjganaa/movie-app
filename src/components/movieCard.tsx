import { Movie } from "./types"
type Props = {
    movie: Movie
}
export function MovieCard({movie}:Props){
    return(
        <div className="w-full max-w-[230px] rounded-lg bg-muted text-card-foreground overflow-hidden">
            <img src={movie.poster}/>
            <div className="p-2 grid">
                <div className="flex text-xs">
                    <img src="/star.svg"/>
                    &nbsp;{movie.rating}
                    <div className="text-muted-foreground">
                        /10
                    </div>
                </div>
                <div>{movie.title}</div>
            </div>
        </div>
    );
}