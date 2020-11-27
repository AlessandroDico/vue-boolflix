const url_base = 'https://api.themoviedb.org/3';
const my_key = '5a579e747faf09425e97ffffa6a21111';
var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        searchResoluts: '',
        movies: [],
        series: [],
        allMovies: [],
        isLoad: false,
        isWaiting: false,
        numberStars: 5, //numero stelline voto
        languages: [
            'en',
            'de',
            'it',
            'es',
            'fr',
            'ja',
            'pt'
        ],
    },
    methods: {
// FUNZIONE PER FARE CHIAMATA AJAX DEI FILM

        getMovies(){
            if (this.searchMovies.trim())  {
                this.isWaiting = true;

                axios.all([
                    axios.get(url_base + '/search/movie', {
                        params: {
                            api_key: my_key,
                            query: this.searchMovies,
                            language: 'it',
                        },
                    }),
                    axios.get(url_base + '/search/tv', {
                        params: {
                            api_key: my_key,
                            query: this.searchMovies,
                            language: 'it',
                        },
                    })
                ])
                .then(axios.spread((film_el, series_el) => {
                    // console.log(film_el.data);
                    // console.log(series_el.data);

                    this.movies = film_el.data.results;
                    this.series = series_el.data.results;

                    // console.log(this.movies);
                    // console.log(this.series);

                    this.allMovies = [...this.series, ...this.movies]; //new
                    console.log(this.allMovies);

                    this.isLoad = true;

                    this.searchResoluts = this.searchMovies;

                    this.searchMovies = '';

                    // this.allMovies.forEach((item) => {
                    //     // console.log(item.vote_average);
                    //     item.vote_average = Math.ceil(item.vote_average / 2);
                    // });

                    this.isWaiting = false;
                })) // fine then
            }

        },
        getHalfVote(vote){
            return Math.ceil(vote / 2 );
        }
    },
    mounted(){
        console.log('hello');

    }

})


















/**/
