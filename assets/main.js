var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        searchResoluts: '',
        allMovies: [],
        isLoad: false,
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
        isWaiting: false,
    },
    methods: {
// FUNZIONE PER FARE CHIAMATA AJAX
        getMovies(){


            if (this.searchMovies.trim()) {
                this.isWaiting = true;
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '5a579e747faf09425e97ffffa6a21111',
                        query: this.searchMovies,
                        language: 'it',
                    },
                })
                .then((element) =>{
                    console.log(element);
                    this.allMovies = element.data.results;
                    console.log(this.allMovies);
                    this.isLoad = true;

                    this.searchResoluts = this.searchMovies;

                    this.searchMovies = '';

                    this.allMovies.forEach((item) => {
                        item.vote_average = Math.ceil(item.vote_average / 2);
                    });

                    this.isWaiting = false;
                })


            }
        },
        // getSeries(){
        //     if (this.searchMovies.trim()) {
        //         axios.get('https://api.themoviedb.org/3/search/tv', {
        //             params: {
        //                 api_key: '5a579e747faf09425e97ffffa6a21111',
        //                 query: this.searchMovies,
        //                 language: 'it',
        //             }
        //         })
        //
        //         .then((element) =>{
        //             console.log(element);
        //             this.allMovies = element.data.results;
        //             console.log(this.allMovies);
        //             this.isLoad = true;
        //
        //             this.searchMovies = '';
        //
        //
        //             this.allMovies.forEach((item) => {
        //                 item.vote_average = Math.ceil(item.vote_average / 2);
        //                 // console.log(item.vote_average);
        //
        //             });
        //         })
        //     }
        // },

    },
    mounted(){
        console.log('hello');
    }
})
