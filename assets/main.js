var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        allMovies: [],
        isLoading: false,
        numberStars: 5,
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
        getMovies(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '5a579e747faf09425e97ffffa6a21111',
                    query: this.searchMovies,
                    language: 'it',
                }
            })
            .then((element) =>{
                console.log(element);
                this.allMovies = element.data.results;
                console.log(this.allMovies);
                this.isLoading = true;

                this.searchMovies = '';

                this.allMovies.forEach((item) => {
                item.vote_average = Math.ceil(item.vote_average / 2);
                });

            })
        },
        // getSeries(){
        //     axios.get('https://api.themoviedb.org/3/search/tv', {
        //         params: {
        //             api_key: '5a579e747faf09425e97ffffa6a21111',
        //             query: this.searchMovies,
        //             language: 'it',
        //         }
        //     })
        //
        //     .then((element) =>{
        //         console.log(element);
        //         this.allMovies = element.data.results;
        //         console.log(this.allMovies);
        //         this.isLoading = true;
        //
        //         this.searchMovies = '';
        //
        //
        //         this.allMovies.forEach((item) => {
        //         item.vote_average = Math.ceil(item.vote_average / 2);
        //         // console.log(item.vote_average);
        //
        //         });
        //     })
        // },

    },
    mounted(){
        console.log('hello');
    }
})
