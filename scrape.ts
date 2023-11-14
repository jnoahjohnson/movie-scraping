async function writeJson(filePath:string, o:any) {
    await Deno.writeTextFile(filePath, JSON.stringify(o));
}

const fetchMovies = async () => {
    let movieData: { prompt: string; completion: string; }[] = []

    for (let i = 1; i <= 13; i++) {
        await fetch(`https://api.themoviedb.org/3/company/4056/movies?page=${i}&api_key=<API_KEY>`)
            .then(data => data.json()
                .then(data => {
                data.results.forEach(movie => {
                    movieData.push({"prompt":`Title: ${movie.original_title}\nPlot:`, "completion":`  ${movie.overview}`})
                })
            }))
    }
    
    await writeJson("data.json", movieData);
}

fetchMovies()