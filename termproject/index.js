const API_KEY = "8cca080352c7f1b2bf496b85cf8d64c1";
var currentPage = 1;
//Get popular movies
function getPopularMovies(page) {
    console.log("Getting movies for: " + page)
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/popular",
        type: "GET",
        data: {
            api_key: API_KEY,
            language: "en-US",
            page: page
        }
    }).done(function (data) {
        if (data) {
            let items = data.results;
            $("#labelContent").text("Popular Movies")
            addBooks(items)
        }
    });
}

function searchForMovie(page) {
    var searchInput = document.getElementById("searchInput");
    var text = searchInput.value;
    console.log("Finding Moview: " + text)
    if (text) {
        console.log("Getting movies for: " + page)
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie",
            type: "GET",
            data: {
                api_key: API_KEY,
                language: "en-US",
                query: text,
                include_adult: true,
                page: page
            }
        }).done(function (data) {
            if (data) {
                let items = data.results;
                $("#labelContent").text("Search Results(" + items.length + ")")
                addBooks(items)
            }
        });
    } else {
        getPopularMovies(page)
    }
}

function imageForPath(path) {
    return "https://image.tmdb.org/t/p/w300" + path
}

function addBooks(items) {
    var movieContent = ""
    items.forEach(function (item) {
        var image = imageForPath(item.backdrop_path);
        var title = item.title
        var overview = item.overview

        if (image && overview && title && !image.includes("null")) {
            var html = `
        <div class="card">
            <img class="card-img-top" src="${image}" alt="${image}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text ellipsis" max-height: 50px;>${overview}</p>
                <a href="moviedetail.html?id=${item.id}" class="btn btn-primary">View Movie</a>
            </div>
        </div>
`
            movieContent += html;
        }

    })

    //Set Values for Book Object
    document.getElementById("movieContent").innerHTML = movieContent;
}
