class TheMovieDB {
  static API_URL = "https://api.themoviedb.org/3";
  static API_KEY = "04c35731a5ee918f014970082a0088b1";

  static async getNowPlaying(params) {
    let path = `${TheMovieDB.API_URL}/movie/now_playing?api_key=${TheMovieDB.API_KEY}`;
    
    if(params) path += `&${params.join("&")}`;

    return await axios.get(path);
  }

  static async getPopular(params) {
    let path = `${TheMovieDB.API_URL}/movie/popular?api_key=${TheMovieDB.API_KEY}`;
    
    if(params) path += `&${params.join("&")}`;

    return await axios.get(path);
  }

  static async getTopRated(params) {
    let path = `${TheMovieDB.API_URL}/movie/top_rated?api_key=${TheMovieDB.API_KEY}`;
    
    if(params) path += `&${params.join("&")}`;

    return await axios.get(path);
  }

  static async getUpcoming(params) {
    let path = `${TheMovieDB.API_URL}/movie/upcoming?api_key=${TheMovieDB.API_KEY}`;
    
    if(params) path += `&${params.join("&")}`;

    return await axios.get(path);
  }

  static async search(value, params) {
    let path = `${TheMovieDB.API_URL}/search/movie?query=${value}&api_key=${TheMovieDB.API_KEY}`;
    
    if(params) path += `&${params.join("&")}`;

    return await axios.get(path);
  }

  static async getDetails(movieId) {
    const path = `${TheMovieDB.API_URL}/movie/${movieId}?api_key=${TheMovieDB.API_KEY}`;

    return await axios.get(path);
  }

  static async getVideos(movieId) {
    const path = `${TheMovieDB.API_URL}/movie/${movieId}/videos?api_key=${TheMovieDB.API_KEY}`;

    return await axios.get(path);
  }

  static getFullImagePath(target) {
    return `https://image.tmdb.org/t/p/w500/${target}`;
  }
}

class App {
  static menuList = ["Now Playing", "Popular", "Top Rated", "Upcoming"];
  static menuActive = "";
  static searchText = "";
  static movies = null;
  static totalMovies = 0;
  static currentPage = 0;
  static totalPages = 0;
  static movieSelected = null;

  static setAppData({ 
    menu_active,
    search_text,
    results, 
    total_results, 
    total_pages, 
    page,
    movie_selected
  }) {
    if(menu_active !== undefined) App.menuActive = menu_active;
    if(search_text !== undefined) App.searchText = search_text; 
    if(results !== undefined) App.movies = results;
    if(total_results !== undefined) App.totalMovies = total_results;
    if(total_pages !== undefined) App.totalPages = total_pages;
    if(page !== undefined) App.currentPage = page;
    if(movie_selected !== undefined) App.movieSelected = movie_selected;
  } 

  static async setSearchData({ searchText, params, callback }) {
    const search = await TheMovieDB.search(searchText, params);
    const { results, total_results, total_pages, page } = search.data;
    
    App.setAppData({ 
      menu_active: "", 
      search_text: searchText,
      page,
      total_pages,
      results, 
      total_results,
      movie_selected: null
    });

    callback();
  }

  static async setNowPlayingData({ params, callback }) {
    const nowPlaying = await TheMovieDB.getNowPlaying(params);
    const { results, total_results, total_pages, page } = nowPlaying.data;

    App.setAppData({ 
      menu_active: App.menuList[0],
      search_text: "",
      page,
      total_pages,
      results, 
      total_results,
      movie_selected: null
    });

    callback();
  }

  static async setPopularData({ params, callback }) {
    const popular = await TheMovieDB.getPopular(params);
    const { results, total_results, total_pages, page } = popular.data;

    App.setAppData({ 
      menu_active: App.menuList[1], 
      search_text: "",
      page,
      total_pages,
      results, 
      total_results,
      movie_selected: null
    });

    callback();
  }

  static async setTopRatedData({ params, callback }) {
    const topRated = await TheMovieDB.getTopRated(params);
    const { results, total_results, total_pages, page } = topRated.data;

    App.setAppData({ 
      menu_active: App.menuList[2],
      search_text: "",
      page,
      total_pages,
      results, 
      total_results,
      movie_selected: null
    });

    callback();
  }

  static async setUpcomingData({ params, callback }) {
    const upcoming = await TheMovieDB.getUpcoming(params);
    const { results, total_results, total_pages, page } = upcoming.data;

    App.setAppData({ 
      menu_active: App.menuList[3],
      search_text: "",
      page,
      total_pages,
      results, 
      total_results,
      movie_selected: null
    });

    callback();
  }

  static pageNumberClicked(pageNumber, event) {
    event.preventDefault();

    if(App.menuActive) {
      switch(App.menuActive) {
        case App.menuList[0]: 
          App.setNowPlayingData({
            params: [`page=${pageNumber}`], 
            callback: () => {
              HTMLBuilder.update([
                HTMLBuilder.updateSearchResult,
                HTMLBuilder.updateMenu,
                HTMLBuilder.updateMainContent
              ]);
              $('body,html').animate({ scrollTop: 170 }, 1200);
            }
          });
        break;
        case App.menuList[1]:
          App.setPopularData({
            params: [`page=${pageNumber}`], 
            callback: () => {
              HTMLBuilder.update([
                HTMLBuilder.updateSearchResult,
                HTMLBuilder.updateMenu,
                HTMLBuilder.updateMainContent
              ]);
              $('body,html').animate({ scrollTop: 170 }, 1200);
            }
          });
        break;
        case App.menuList[2]:
          App.setTopRatedData({
            params: [`page=${pageNumber}`], 
            callback: () => {
              HTMLBuilder.update([
                HTMLBuilder.updateSearchResult,
                HTMLBuilder.updateMenu,
                HTMLBuilder.updateMainContent
              ]);
              $('body,html').animate({ scrollTop: 170 }, 1200);
            }
          });
        break;
        case App.menuList[3]:
          App.setUpcomingData({
            params: [`page=${pageNumber}`], 
            callback: () => {
              HTMLBuilder.update([
                HTMLBuilder.updateSearchResult,
                HTMLBuilder.updateMenu,
                HTMLBuilder.updateMainContent
              ]);
              $('body,html').animate({ scrollTop: 170 }, 1200);
            }
          });
        break;
      }
    } else {
      App.setSearchData({
        searchText: App.searchText,
        params: [`page=${pageNumber}`],
        callback: () => {
          HTMLBuilder.update([
            HTMLBuilder.updateSearchResult,
            HTMLBuilder.updateMenu,
            HTMLBuilder.updateMainContent
          ]);
          $('body,html').animate({ scrollTop: 170 }, 1200);
        }
      });
    }
  }

  static searchButtonClicked(event) {
    event.preventDefault();

    const text = $("#search__text").val();

    if(!text) return swal("Oops!", "Search Text is required", "warning");

    App.setSearchData({
      searchText: text,
      callback: HTMLBuilder.update
    });
  }

  static singleMenuClicked(event) {
    const targetMenu = $(event.target).data("menu");

    if(targetMenu !== App.menuActive) {
      switch(targetMenu) {
        case App.menuList[0]: 
          App.setNowPlayingData({ callback: HTMLBuilder.update });
        break;
        case App.menuList[1]:
          App.setPopularData({ callback: HTMLBuilder.update });
        break;
        case App.menuList[2]:
          App.setTopRatedData({ callback: HTMLBuilder.update });
        break;
        case App.menuList[3]:
          App.setUpcomingData({ callback: HTMLBuilder.update });
        break;
      }
    }
  }

  static detailContentCloseButtonClicked() {
    $(".detail-content-wrapper").removeClass("active");
    $("html").css("overflow-y", "auto");
  }

  static async setDetailContentData({ movieId, callback }) {
    const [details, videos] = await Promise.all([
      TheMovieDB.getDetails(movieId),
      TheMovieDB.getVideos(movieId)
    ]);
    
    App.setAppData({
      movie_selected: { ...details.data, videos: videos.data }
    });

    callback();
  }

  static singleBoxContentClicked(event) {
    let boxContentTarget;
    
    if($(event.target).hasClass("single-box-content")) {
      boxContentTarget = $(event.target);
    } else {
      boxContentTarget = $(event.target).closest(".single-box-content");
    }

    const movieId = boxContentTarget.data("id");

    App.setDetailContentData({
      movieId,
      callback: () => {
        HTMLBuilder.update([
          HTMLBuilder.updateDetailContent
        ]);
      }
    });
  }

  static init() {
    App.setNowPlayingData({ callback: HTMLBuilder.update });
      
    $("#search-form .search-button").on("click", App.searchButtonClicked);
    $(".menu-section .single-menu").on("click", App.singleMenuClicked);
  }
}

class HTMLBuilder {
  static update(target) {
    if(target === undefined) {
      HTMLBuilder.updateSearchResult();
      HTMLBuilder.updateMenu();
      HTMLBuilder.updateMainContent();
      HTMLBuilder.resetPagination();
    } else {
      target.forEach(item => item());
    }
  }

  static updateSearchResult() {
    $("#search__text").val("");
    $(".search-result-title-label").text(`(${App.totalMovies}) ${App.searchText ? "Search" : ""} Results for `);
    $(".search-result-title-value").text(App.searchText || App.menuActive);
  }

  static updateMenu() {
    $(".menu-section .single-menu").removeClass("active");

    if(App.menuActive) {
      $(`.menu-section .single-menu[data-menu="${App.menuActive}"]`).addClass("active");
    }
  }

  static updateMainContent() {
    $(".main-content-inner-wrapper").html("");

    App.movies.forEach(item => {
      $(".main-content-inner-wrapper").append(`
        <div class="single-box-content-wrapper col-lg-3">
          <div class="single-box-content" data-id="${item.id}">
            <img class="poster-image" src=${item.poster_path ? TheMovieDB.getFullImagePath(item.poster_path) : "img/no-image-available.png"} />
            <p class="original-title">${item.original_title}</p>
            <div class="bottom-box">
              <div class="vote-average">
                <span class="vote-average-value">${item.vote_average}</span>
              </div>
              <p class="release-date">${item.release_date}</p>
            </div>
          </div>
        </div>
      `);
    });

    $(".main-content-inner-wrapper .single-box-content").on("click", App.singleBoxContentClicked);
  }

  static updateDetailContent() {
    const { original_title, overview } = App.movieSelected;
    let video;

    if(App.movieSelected.videos) {
      video = App.movieSelected.videos.results.filter(
        item => item.site === "YouTube" && item.type === "Trailer"
      )[0];
    }

    const trailerIframe = 
      video 
        ? `<iframe class='trailer-content' width='100%' height='370' src='https://www.youtube.com/embed/${video.key}' frameborder='no' border='0'></iframe>`
        : "";

    $(".detail-content-wrapper")
      .html(`
        <div class="detail-content-box">
          <span class="close-button">&times;</span>
          ${trailerIframe}
          <p class="original-title">${original_title}</p>
          <div class="overview-area">
            <p class="overview-title">Overview</p>
            <p class="overview-content">${overview || "-"}</p>
          </div>
        </div>
      `)
      .addClass("active");

    $("html").css("overflow-y", "hidden");

    $(".detail-content-wrapper .close-button").on("click", App.detailContentCloseButtonClicked);
  }

  static resetPagination() {
    $(".pagination-content").pagination({
      items: App.totalMovies,
      itemsOnPage: 20,
      cssStyle: 'dark-theme',
      onPageClick: App.pageNumberClicked
    });
  }
}

$(document).ready(App.init);