import {displayTopRated} from "./main.js";
import {
    format,
    addDays
}
from 'https://cdn.skypack.dev/date-fns';

window.ShowDate = function(){
const Today = Date ();
console.log(Today);
const Future = addDays (Today, 5)
const FutureDate = format (Future, 'dd-MM-yyyy')
console.log(FutureDate)
const FormatDate = format(Today, 'dd-MM-yyyy')
const output = document.getElementById("output")
output.textContent = "Today:" + format(Today, 'dd-MM-yyyy')
}



// function displayTopRated(toprated) {
//     console.log(toprated.results);
//     toprated.results.splice(10);

//     const movieContainer = document.querySelector("#movieContainer");
//     movieContainer.innerHTML = "";
//     for (const movie of toprated.results) {
//         console.log(movie.original_title); //titel
//         console.log(movie.release_date); // releae
//         console.log('https://image.tmdb.org/t/p/w500/' + movie.poster_path); //bilden

//         const title = document.createElement("h2");
//         const releas = document.createElement("p");
//         const bilden = document.createElement("img");

//         title.innerText = movie.original_title;
//         releas.innerText = movie.release_date;
//         bilden.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;

//         movieContainer.append(title, releas, bilden)


//     }
// }


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTRmMDRmNGRhZmQyZjNjYjg1OWJlZWNlMGI2ZWI1NyIsIm5iZiI6MTc2NTM5NjgwMy41NzIsInN1YiI6IjY5MzlkMTQzNTg1ODYzMTY4OGFmMTI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tMw40Yq6N6Ce86bqXRZ6zcjPk7OXndzgJ81nfl-yxsM'
    }
};


function myResponseFunction(event) {
    const title = document.createElement("h2")
    // document.body.appendChild(h2)

    console.log('Clicked')
}

//Top Rated
const shark = document.querySelector('#toprated');
shark.addEventListener('click', function () {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(displayTopRated)
        .catch(err => console.error(err));
});



//Populer
const uma = document.querySelector('#populer');
uma.addEventListener('click', function () {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(res => res.json())
        .then(displayTopRated)
        .catch(err => console.error(err));
});



const emp = document.querySelector('#searchperson');
emp.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = emp.querySelector("input").value;
    console.log(input);


    fetch(`https://api.themoviedb.org/3/search/person?query=${input}&include_adult=false&language=en-US&page=1`, options)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                // console.log (`last`)
                throw 'Fetch failed';
            }
        })
        .then(displayPerson)
        .catch(err => {
             const movieContainer = document.querySelector("#movieContainer");
            movieContainer.innerHTML = "";
            const feltal = document.createElement("h2")
            feltal.innerText = `Försök igen`
            movieContainer.append(feltal)
        });
});

function displayPerson(res) {
    console.log(res.results)
    console.log(res.results.length)
    const movieContainer = document.querySelector("#movieContainer");
    movieContainer.innerHTML = "";
    if (res.results.length === 0){
        console.log('fel')
        const fel = document.createElement("h2")
        fel.innerText = `Fel ansökan, försök igen`
        movieContainer.append(fel)
    }

    // if (res === 2) {
    //     console.log('fel')
    // }

    // else if (res > 10) {
    //     consol.log('fel')
    // }

    else {
        console.log('rätt')

    }

    for (const person of res.results) {
        console.log('https://image.tmdb.org/t/p/w500/' + person.profile_path)
        console.log(person.name)
        console.log(person.known_for_department)


        const bilden = document.createElement("img")
        const namn = document.createElement("h2")
        const known_for_department = document.createElement("p")
        const known_for = document.createElement("p")


        bilden.src = 'https://image.tmdb.org/t/p/w500/' + person.profile_path;
        namn.innerText = person.name;
        known_for_department.innerText = person.known_for_department;
        // known_for.innerText = person.known_for;

        if (person.profile_path) {
            const bilden = document.createElement("img")
            bilden.src = 'https://image.tmdb.org/t/p/w500/' + person.profile_path;
            movieContainer.append(bilden)
        }

        movieContainer.append(namn, known_for_department, known_for)


        if (person.known_for[2]) {
            console.log(person.known_for[2].media_type)
            const original_title3 = document.createElement("p")
            movieContainer.append(original_title3)
            original_title3.innerText = person.known_for[2].original_title + ' ' + person.known_for[2].media_type;
        }

        if (person.known_for[0]) {
            console.log(person.known_for[0].media_type)
            const original_title1 = document.createElement("p")
            movieContainer.append(original_title1)
            original_title1.innerText = person.known_for[0].original_title + ' ' + person.known_for[0].media_type;
        }

        if (person.known_for[1]) {
            console.log(person.known_for[1].media_type)
            const original_title2 = document.createElement("p")
            movieContainer.append(original_title2)
            original_title2.innerText = person.known_for[1].original_title + ' ' + person.known_for[1].media_type;
        }
    }
}


const nova = document.querySelector('#searchmovie');
nova.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = nova.querySelector("input").value;
    console.log(input);


    fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(displayMovie)
        .catch(err => console.error(err));
});

function displayMovie(res) {
    console.log(res.results)

    const movie = document.querySelector("#movieContainer");
    movie.innerHTML = "";
    if (res.results.length === 0){
        console.log('fel')
        const fel = document.createElement("h2")
        fel.innerText = `Fel ansökan, försök igen`
        movieContainer.append(fel)
    }

    for (const movie of res.results) {
        console.log(movie.original_title);
        console.log(movie.release_date);
        console.log('https://image.tmdb.org/t/p/w500/' + movie.poster_path);
        console.log(movie.overview);

        const title = document.createElement("h2");
        const releas = document.createElement("p");
        const bilden = document.createElement("img");
        const desc = document.createElement("p");

        title.innerText = movie.original_title;
        releas.innerText = movie.release_date;
        bilden.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
        desc.innerText = movie.overview;

        movieContainer.append(title, releas, bilden, desc)

    }
}