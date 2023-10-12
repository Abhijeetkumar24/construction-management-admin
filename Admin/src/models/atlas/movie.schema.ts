import mongoose, { Document, Schema } from "mongoose";
import { mongoConnection } from "../../provider/mongo/mongo.connection";
import { COLLECTION } from "../../interface/enum";

interface IMovie extends Document {
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    rated: string;
    awards: {
        wins: number;
        nominations: number;
        text: string;
    };
    lastupdated: string;
    year: number;
    imdb: {
        rating: number;
        votes: number;
        id: number;
    };
    countries: string[];
    type: string;
    tomatoes: {
        viewer: {
            rating: number;
            numReviews: number;
            meter: number;
            fresh: number;
        };
        critic: {
            rating: number;
            numReviews: number;
            meter: number;
            rotten: number;
        };
        lastUpdated: Date;
    };
    num_mflix_comments: number;
}

const movieSchema = new Schema<IMovie>({
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: {
        wins: Number,
        nominations: Number,
        text: String,
    },
    lastupdated: String,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number,
    },
    countries: [String],
    type: String,
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number,
            fresh: Number,
        },
        critic: {
            rating: Number,
            numReviews: Number,
            meter: Number,
            rotten: Number,
        },
        lastUpdated: Date,
    },
    num_mflix_comments: Number,
});

export const MovieModel = mongoConnection.getConnection().model<IMovie>(
    COLLECTION.MOVIE,
    movieSchema
);
