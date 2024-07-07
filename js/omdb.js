$('#tombol').on('click',function(){
   $('#daftar-film').html('')
   $.ajax({
      url: 'http://www.omdbapi.com',
      type: 'get',
      dataType: 'json',
      data:{
         'apikey': 'b6163f05',
         's': $('#Cari').val()
      },
      success : function (hasil) {
         if (hasil.Response == 'True') {
            let film = hasil.Search
            console.log(film);
            $.each(film, function(index, data) {
               $('#daftar-film').append(`
                 <div class="col-md-4 mb-3">
                                <div class="card" style="width: 18rem;">
                                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${data.Title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.Title}</h5>
                                        <p class="card-text">Year: ${data.Year}</p>
                                        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary detail" data-id="${data.imdbID}" <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Detail
      </button>></a>
                                    </div>
                                </div>
                            </div>
               `)
            })
         }else{
            $('#daftar-film').append(`
                <div class="row" id="daftar-film">
                    <div class="col">
                      <h5 class="text-center text-danger">${hasil.Error}</h5>
                    </div>
                  </div>
               `)
         }
      }
   })
});

// event bundling
$('#daftar-film').on('click', '.detail', function() {
   let id = $(this).data('id')
   console.log(id)
   $.ajax({
      url: 'http://www.omdbapi.com',
      type: 'get',
      dataType: 'json',
      data:{
         'apikey': 'b6163f05',
         'i': $(this).data('id')
      },
      success: function (hasil) {
         if (hasil.Response == 'True') {
            $('.modal-body').html(`
               <div class="container-fluid">
                  <div class="col-md-4">
                     <img src="${hasil.Poster}" class="img-fluid" alt="">
                  </div>
                  <div class="col-md-8">
                     <ul class="list-group">
                     <li class="list-group-item"> Judul : ${hasil.Title}</li>
                     <li class="list-group-item"> Tanggal Released : ${hasil.Released}</li>
                     <li class="list-group-item">  Actors : ${hasil.Actors} :</li>
                     <li class="list-group-item">  Awards : ${hasil.Awards}</li>
                     <li class="list-group-item"> Director : ${hasil.Director}</li>
                     <li class="list-group-item"> Genre : ${hasil.Genre}</li>
                     </ul>
                  </div>
               </div>
            `)
               
            
         }
      }
   })
})