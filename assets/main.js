var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        allMovies: [],
        isLoading: false,
        starClass: 'fas',
        array: [],
    },
    methods: {
        getMovies(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params:{
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
                console.log(item.vote_average);

                // for (var i = 0; i < item.vote_average; i++) {
                //     // this.starClass = 'fas';
                //     this.array.push('fas');
                // }
                });
            })
        },

    },
    mounted(){
        console.log('hello');
    }
})
