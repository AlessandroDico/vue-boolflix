var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        allMovies: [],
        isLoading: false,
        numberStars: 5,
        images: [
            {
                lang:'en',
                flag: 'images/uk.jpg',
            },
            {
                lang:'de',
                flag: 'images/germany.jpg',
            },
            {
                lang:'it',
                flag: 'images/italy.jpg',
            },
            {
                lang:'es',
                flag: 'images/spain.jpg',
            },
            {
                lang:'fr',
                flag: 'images/france.jpg',
            },
            {
                lang:'ja',
                flag: 'images/japan.jpg',
            },
            {
                lang:'pt',
                flag: 'images/portugal.jpg',
            },
        ]
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

                this.allMovies.forEach((item) => {
                item.vote_average = Math.round(item.vote_average / 2);
                // console.log(item.vote_average);

                });
            })
        },
        getSeries(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
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

                this.allMovies.forEach((item) => {
                item.vote_average = Math.round(item.vote_average / 2);
                // console.log(item.vote_average);

                });
            })
        },

    },
    mounted(){
        console.log('hello');
    }
})
