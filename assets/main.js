var app = new Vue ({
    el:'#root',
    data: {
        searchMovies: '',
        allMovies: [],
        isLoading: false,
    },
    methods: {
        getMovies(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params:{
                    api_key: '5a579e747faf09425e97ffffa6a21111',
                    query: this.searchMovies,
                }
            })
            .then((element) =>{
                console.log(element);
                this.allMovies = element.data.results;
                console.log(this.allMovies);
                this.isLoading = true;
            })
        },
    },
    mounted(){
        console.log('hello');
    }
})
