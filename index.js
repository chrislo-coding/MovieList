const Base_url = "https://movie-list.alphacamp.io"
const Index_url = Base_url + "/api/v1/movies/"
const Poster_url = Base_url + "/posters/"

const Movies=[]
const datapanel=document.querySelector("#data-panel")
const searchForm = document.querySelector('#search-form')

function renderMovieList(data){
    let rawHTML="";
    data.forEach((item) => {
        rawHTML+=`<div class="col-sm-3">
            <div class="mb-2">
                <div class="card">
                    <img src="${Poster_url+item.image}"
                    class="card-img-top" alt="movie poster">
                    <div class="card-body">
                      <h5 class="card-title">${item.title}</h5>
                      <div class="card-footer">
                        <button class="btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}"> more</button>
                        <button class="btn-info btn-add-favorite">+</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    datapanel.innerHTML=rawHTML;
        
    
}

function showMovieModal(id){
    const modalTitle=document.querySelector("#movie-modal-title")
    const modalImage=document.querySelector("#movie-modal-image")
    const modalDate=document.querySelector("#movie-modal-date")
    const modalDescription=document.querySelector("#movie-modal-description")

    axios.get(Index_url+id).then((response)=> {
        const data=response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release date: ' + data.release_date
        modalDescription.innerText = data.description
        modalImage.innerHTML = `<img src="${Poster_url + data.image}" alt="movie-poster" class="img-fluid">`
  })
}


datapanel.addEventListener("click",function onPanelClcked(event){
    if (event.target.matches('.btn-show-movie')){
        showMovieModal(Number(event.target.dataset.id))
    }
})

axios.get(Index_url).then((response) => {
    Movies.push(...response.data.results)
    renderMovieList(Movies)
})
