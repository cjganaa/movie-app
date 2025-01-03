export type Movie = {
  id: number,
  title: string,
  poster: string,
  date: string,
  rating: number,
}

export type MovieInfo = {
  id: number,
  adult: boolean,
  background_img: string,
  poster: string,
  language: string,
  title:string,
  overview:string,
  rate:number,
  release_date: string,
  runtime:number,
  vote_count:number,
  genres: Genre[],
}

export type Genre = {
  id: number,
  name: string
}
export type Credit = {
  id: number,
  cast: [],
  crew: [],
}