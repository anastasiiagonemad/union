interface Ratings {
    source: string;
    value: string;
}

interface Movie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export interface Film extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Ratings[]
    Metascore: string;
    imdbRating: string;
    imbdVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}