
import { FruitModel } from "../models/atlas/fruit.schema";
import { MovieModel } from "../models/atlas/movie.schema";
import { UserModel } from "../models/atlas/user.schema";


class AtlasService {


    constructor() { }

    //*Text search

    // private pipeline = [                                 
    //     {
    //         $search: {
    //             index: "movie_index",
    //             text: {
    //                 query: "baseball",
    //                 path: "plot",
    //             }
    //         }
    //     },
    //     {
    //         $limit: 5,
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             title: 1,
    //             plot: 1
    //         }
    //     }
    // ]


    //*Compound search

    // private pipeline = [                                  
    //     {
    //         $search:{
    //             index: "movie_index",
    //             compound: {
    //                 must: [
    //                     {
    //                         text: {
    //                             query: ["Hawaii", "Alaska"],
    //                             path: "plot"
    //                         }
    //                     },
    //                     {
    //                         regex: {
    //                             query: "([0-9]{4})",
    //                             path: "plot",
    //                             allowAnalyzedField: true,
    //                         }
    //                     }
    //                 ],
    //                 mustNot: [
    //                     {
    //                         text: {
    //                             query: ["Comedy", "Romance"],
    //                             path: "genres",
    //                         }
    //                     },
    //                     {
    //                         text:{
    //                             query: ["Beach","Snow"],
    //                             path: "title"
    //                         }
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             title: 1,
    //             plot: 1,
    //             genres: 1,
    //             _id: 0,
    //         }
    //     }
    // ];



    // * Null check search

    // private pipeline = [{                                   
    //     '$search': {
    //       'index': 'null-check-tutorial',
    //       'compound': {
    //         'must': {
    //           'exists': {
    //             'path': 'password'
    //           }
    //         },
    //         'mustNot': {
    //           'wildcard': {
    //             'path': 'password', 
    //             'query': '*',                             //wildcard:  * (asterisk): Matches zero or more characters,  ? (question mark): Matches a single character.
    //             'allowAnalyzedField': true
    //           }
    //         }
    //       }
    //     }
    // }];



    // * Auto complete search

    // private pipeline = [                                
    //     {$search: {index: "autocomplete-tutorial", autocomplete: {query: "great", path: "title"}}},
    //     {$limit: 20},
    //     {$project: {_id: 0,title: 1}}
    // ];


    // * compund (must , should) (fruit table)
    // private pipeline = [
    //     {
    //         "$search": {
    //           "compound": {
    //             "must": [{                             // necessary (sara documents me hona jruri h)
    //               "text": {
    //                 "query": "varieties",
    //                 "path": "description"
    //               }
    //             }],
    //             "should": [{                          // may be (jisme "varieties" and "fuji" hoga wo return krega or jisme bs "varieties" hi hoga wo bhi return krega)
    //               "text": {
    //                 "query": "Fuji",
    //                 "path": "description"
    //               }
    //             }]
    //           }
    //         }
    //       },
    //       {
    //         "$project": {
    //           "score": { "$meta": "searchScore" }
    //         }
    //       }
    // ];


    // * custom analyzer (edgeGram)
    private pipeline = [
      {
        "$search": {
          "text": {
            "query": "Ap",
            "path": "description"
          }
        }
      },
      {
        "$project": {
          "_id": 1,
          "description": 1
        }
      }
    ]

    search = async () => {
        try {
            return await FruitModel.aggregate(this.pipeline);
            // return await MovieModel.aggregate(this.pipeline);
            // return await UserModel.aggregate(this.pipeline);
        } catch (error) {
            throw error;
        }
    }

}


export const atlasService = new AtlasService();