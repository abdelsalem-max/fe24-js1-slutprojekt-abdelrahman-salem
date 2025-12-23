export function displayTopRated(toprated) {
    console.log(toprated.results);
    toprated.results.splice(10);

    const movieContainer = document.querySelector("#movieContainer");
    movieContainer.innerHTML = "";
    for (const movie of toprated.results) {
        console.log(movie.original_title); //titel
        console.log(movie.release_date); // releae
        console.log('https://image.tmdb.org/t/p/w500/' + movie.poster_path); //bilden

        const title = document.createElement("h2");
        const releas = document.createElement("p");
        const bilden = document.createElement("img");

        title.innerText = movie.original_title;
        releas.innerText = movie.release_date;
        bilden.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;

        movieContainer.append(title, releas, bilden)


    }
}