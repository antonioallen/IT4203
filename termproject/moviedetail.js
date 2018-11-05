const API_KEY = "8cca080352c7f1b2bf496b85cf8d64c1";

function getMovie() {
    var url = new URL(window.location.href);
    var movieId = url.searchParams.get("id");
    if (movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId,
            type: "GET",
            data: {
                api_key: API_KEY,
                language: "en-US"
            }
        }).done(function (data) {
            if (data) {
                let movie = data;
                setMovie(movie)
            }
        });

        //Get cast
        getCast(movieId)

        //Get reviews
        getReviews(movieId)
    }
}

//Get Cast Members
function getCast(movieId) {
    if (movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits",
            type: "GET",
            data: {
                api_key: API_KEY
            }
        }).done(function (data) {
            if (data) {
                let casts = data.cast;
                setCasts(casts)
            }
        });
    }
}

//Get Reviews
function getReviews(movieId) {
    if (movieId) {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/reviews",
            type: "GET",
            data: {
                api_key: API_KEY,
                language: "en-US",
                page: 1
            }
        }).done(function (data) {
            if (data) {
                let reviews = data.results;
                setReviews(reviews)
            }
        });
    }
}



function imageForPath(path) {
    return "https://image.tmdb.org/t/p/w500" + path
}

function setMovie(movie) {
    $("#movieImage").attr('src', imageForPath(movie.backdrop_path))
    $("#movieTitle").text(movie.title)
    $("#movieDescription").text(movie.overview)
    $("#movieTagline").text(movie.tagline)
}

function setCasts(cast) {
    var castContent = ""
    cast.forEach(function (item) {
        var image = imageForPath(item.profile_path);
        var title = item.name
        var overview = item.character

        if (image && overview && title && !image.includes("undefined") && !image.includes("null")) {
            var html = `
        <div class="card">
            <img class="card-img-top" src="${image}" alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text ellipsis" max-height: 50px;>${overview}</p>
            </div>
        </div>
`
            castContent += html;
        }

    })

    //Set Values for Book Object
    $("#castLabel").text("Cast(" + cast.length + ")")
    document.getElementById("castContent").innerHTML = castContent;
}

function setReviews(reviews) {
    var reviewContent = ""
    reviews.forEach(function (item) {
        var author = item.author
        var content = item.content
        var url = item.url

        if (content && url && author) {
            var html = `
            <div class="review">
                <blockquote class="blockquote">
                <p class="mb-0">${content}</p>
                <footer class="blockquote-footer"><a href="${url}">${author}</a></footer>
            </blockquote>
            </div>
`
            reviewContent += html;
        }

    })

    //Set Values for Book Object
    $("#reviewLabel").text("Reviews(" + reviews.length + ")")
    document.getElementById("collapseTwo").innerHTML = reviewContent;
}
