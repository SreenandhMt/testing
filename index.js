const url = "https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGUxZGRiNjgyZWJhOTNhMTgxMTBjNDUyMmE3NDEzNSIsIm5iZiI6MTcwMjUyNzQzNi41MjEsInN1YiI6IjY1N2E4MWNjZWM4YTQzMDBjMzNiMWY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3cc7PkDsOgHF1hMEUXgF4SxBqTkIoHT_ZypIUhx70zM";
const apikey = "04e1ddb682eba93a18110c4522a74135";
const axios = require('axios');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let movieList = [];


axios.get(`${url}${apikey}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    
}).then(response => {
    console.log(response.status);
    
    if(response.status !=200)
    {
        return Error("");
        
    }
    return response.data;
    
}).then(value => movieList = value.results);


app.get("/api/movie/all", (req,res) => {
    console.log(movieList);
    
    if(movieList.length < 1) return res.status(400).send("Movie List is Empty");
    res.status(200).send(movieList);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Successfully connect port ${port}`));