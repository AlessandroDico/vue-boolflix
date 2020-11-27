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
        castMovies: [],
        castSeries: [],
    },
    methods: {
// FUNZIONE PER FARE CHIAMATA AJAX DEI FILM

        getMovies(){
            if (this.searchMovies.trim())  {
                this.isWaiting = true;

                // svuoto l'array prima di "ririempirlo"
                this.allMovies = [];
                this.castMovies = [];
                this.castSeries = [];

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

                    this.movies = film_el.data.results;
                    this.series = series_el.data.results;

                    this.allMovies = [...this.series, ...this.movies]; //new
                    console.log(this.allMovies);

                    this.isLoad = true;

                    this.searchResoluts = this.searchMovies;

                    this.searchMovies = '';

                    this.isWaiting = false;

//CHIAMATA PER ATTORI DEI FILM
                this.movies.forEach((item, index) => {

                    axios.get(url_base + '/movie/' + item.id + '/credits', {
                        params:{
                            api_key: my_key,
                        }
                    })
                    .then((results) => {
                        var id_movie = item.id;
                    //results.data.cast è un array.. lo ciclo per aggiungere ad un suo elemento(che sarà un oggetto) una chiave/valore con l'id del film corrente in modo da poterlo paragonare poi nel Html all'id di allMovies
                        results.data.cast.forEach((elemento, indice) => {
                            elemento.id_film = id_movie;
                        });

                    // console.log(results.data.cast);
                    //aggiungo all'array castMovies gli elementi di results.data.cast aggiornati con la chiave/valore id_film = id_movie
                        this.castMovies = [...this.castMovies, ...results.data.cast];
                    })
                });

// CHIAMATA PER ATTORI DELLE SERIE

                this.series.forEach((item, index) => {

                    axios.get(url_base + '/tv/' + item.id + '/credits', {
                        params:{
                            api_key: my_key,
                        }
                    })
                    .then((results) => {
                        var id_series = item.id;

                    //results.data.cast è un array.. lo ciclo per aggiungere ad un suo elemento(che sarà un oggetto) una chiave/valore con l'id della serie corrente in modo da poterlo paragonare poi nel Html all'id di allMovies
                        results.data.cast.forEach((elemento, indice) => {
                            elemento.id_tv = id_series;
                        });

                    //aggiungo all'array castSeries gli elementi di results.data.cast aggiornati con la chiave/valore id_tv = id_series
                        this.castSeries = [...this.castSeries, ...results.data.cast];

                    })
                });

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
