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
                    axios.get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: '5a579e747faf09425e97ffffa6a21111',
                            query: this.searchMovies,
                            language: 'it',
                        },
                    }),
                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: '5a579e747faf09425e97ffffa6a21111',
                            query: this.searchMovies,
                            language: 'it',
                        },
                    })
                ])
                .then(axios.spread((prima, seconda) => {
                    console.log(prima.data);
                    console.log(seconda.data);

                    this.movies = prima.data.results;
                    this.series = seconda.data.results;

                    console.log(this.movies);
                    console.log(this.series);

                    this.allMovies = [...this.series, ...this.movies]; //new
                    console.log(this.allMovies);

                    this.isLoad = true;

                    this.searchResoluts = this.searchMovies;

                    this.searchMovies = '';

                    this.movies.forEach((item) => {
                        item.vote_average = Math.ceil(item.vote_average / 2);
                    });

                    this.isWaiting = false;
                })) // fine then
            }

            }
    },
    mounted(){
        console.log('hello');

    }

})


















/**/
