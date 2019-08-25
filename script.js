"use strict";
let yid;
function searchPage(g) {
  fetch("https://api.rawg.io/api/games?page_size=10&search=" + g)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Something went wrong. Try again later."));
}
function gameDetails(gameName) {
  fetch("https://api.rawg.io/api/games/" + gameName)
    .then(response => response.json())
    .then(responseJson1 => getYouTubeVideos(responseJson1))
    .catch(error =>
      alert("Something went wrong with your game search. Try again later.")
    );
}

function displayResults(responseJson) {
  $(".gameInfo").empty();
  $("#search-results").empty();
  $(".main-games").addClass("hidden");
  // iterate through the items array
  for (let i = 0; i < responseJson.results.length; i++) {
    console.log(responseJson.results[i].name);
    $("#search-results").append(
      `<li>
        <img class="results-image" src='${
          responseJson.results[i].background_image
        }'>
      <h3 id="${i}" class="result-heading">${responseJson.results[i].name}</h3>
      </li>`
    );
  }
  $("#searchResults").removeClass("hidden");
  gameId(responseJson);
}

function displayGame(data, responseJson1) {
  $("#searchResults").addClass("hidden");
  let youtubeId = data.items[0].id.videoId;

  $(".gameInfo").html(
    `
    <h2>${responseJson1.name}</h2>
    <iframe  class="ytvideo"
     src="https://www.youtube.com/embed/${youtubeId}">
     </iframe>
    <p class="details">RELEASED : <span >${responseJson1.released}</span></p>
    <p class="details">METACRITIC RATING : <span>${
      responseJson1.metacritic
    }</span></p>
    <p class="rating">RATING ${responseJson1.rating}/5</p>
    <div class="desc">
    <p>THE GAME</p>
    </div>
    <div class="description">
      ${responseJson1.description}
    </div>
    <h5 class="details">PLATFORMS/STORE</h5>
    `
  );
  for (let j = 0; j < responseJson1.stores.length; j++) {
    if (responseJson1.stores[j].store.id == 1) {
      $(".gameInfo").append(
        `<a href="${
          responseJson1.stores[j].url
        }" class="platform" target="_blank"><i class="fab fa-windows"></i></<a>`
      );
    } else if (responseJson1.stores[j].store.id == 2) {
      $(".gameInfo").append(
        `<a href="${
          responseJson1.stores[j].url
        }" class="platform" target="_blank"><i class="fab fa-xbox"></i></<a>`
      );
    } else if (responseJson1.stores[j].store.id == 3) {
      $(".gameInfo").append(
        `<a href="${
          responseJson1.stores[j].url
        }" class="platform" target="_blank"><i class="fab fa-playstation"></i></<a>`
      );
    }
  }
}

function gameId(responseJson) {
  $("#search-results").on("click", "h3", function(e) {
    event.preventDefault();
    let a = $(this).attr("id");
    gameDetails(responseJson.results[a].slug);
  });
}

function getYouTubeVideos(responseJson1) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAGXMpHkC4iTZs4uRtYEyLla2Xs6fRmqV8&part=snippet&maxResults=1&type=video&q=${
    responseJson1.name
  } Trailer`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayGame(data, responseJson1))
    .catch(error => alert("Something went wrong. Try again later."));
}

function searchSubmit() {
  $(".searchButton").click(function() {
    event.preventDefault();

    const game = $("#searchValue").val();
    searchPage(game);
  });
}

function hamburgerMenu() {
  $(".container-2 ").click(function() {
    this.classList.toggle("change");
    $(".topnav").toggleClass("show-nav", 500);
  });
}

function mainPage() {
  $(".main-image img").on("click", function() {
    $(".main-games").addClass("hidden");
  });

  $(".1 img").on("click", function() {
    gameDetails("red-dead-redemption-2");
  });

  $(".2 img").on("click", function() {
    gameDetails("shadow-of-the-tomb-raider");
  });

  $(".3 img").on("click", function() {
    gameDetails("shadows-die-twice");
  });

  $(".4 img").on("click", function() {
    gameDetails("forza-horizon-4");
  });
  $(".5 img").on("click", function() {
    gameDetails("fortnite");
  });
  $(".6 img").on("click", function() {
    gameDetails("assassins-creed-odyssey");
  });
}

function docNavigation() {
  $("#myBtn").on("click", function(e) {
    e.preventDefault();

    $("body, html").animate(
      {
        scrollTop: $("header").offset().top
      },
      1000
    );
  });
  $(".doc-nav").on("click", function(e) {
    e.preventDefault();

    $("body, html").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top
      },
      1000
    );
  });

  $(".gohome").on("click", function(e) {
    e.preventDefault();
    $(".gameInfo").empty();
    $("#search-results").empty();
    $(".main-games").removeClass("hidden");
  });

  $("h1").on("click", function(e) {
    e.preventDefault();
    $(".gameInfo").empty();
    $("#search-results").empty();
    $(".main-games").removeClass("hidden");
  });
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  mainPage();
  searchSubmit();
  hamburgerMenu();
  docNavigation();
});
