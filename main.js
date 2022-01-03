
(function(){
    const search = document.getElementById('search');
    const profile = document.getElementById('profile');
    const url = 'https://api.github.com/users';
    const count = 7;
    const sort = 'created: asc'

    async function getUser(user){
        const profileResponse = await fetch(`${url}/${user}`)

        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}`)

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {profile, repos};
    }

    function showProfile(user){
        profile.innerHTML = `<div class="row mt-3">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img src="${user.avatar_url}" class="card-img-top">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Repositórios: <span class='badge bg-success'>${user.public_repos}</span></li>
                    <li class="list-group-item">Seguidores: <span class='badge bg-primary'>${user.followers}</span></li>
                    <li class="list-group-item">Seguindo: <span class='badge bg-info'>${user.following}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank" class="btn btn-warning d-grid">Ver Perfil</a>
                </div>
            </div>
        </div>
        <div class="col-md-8"><div id="repos"></div></div>
    </div>`;
    }

    function showRepos(repos) {
       let output = ""; 

       repos.forEach(repo =>{
           output += `
           <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_black" class="link">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <div class="badge bg-primary">Stars:${repo.stargazers_count}</div>
                        <div class="badge bg-success">Watch:${repo.watchers_count}</div>
                        <div class="badge bg-warning">Forks:${repo.forks_count}</div>
                    </div>
                </div>
            </div>`
       });

       document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener('keyup', e => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            
            });
        }

    }); // Evento de escuta, colocado para capturar as teclas digitadas pelo usuário.

})(); 

//(function(){
// Isto é uma Clager - Serve para encapsular as constantes para envitar acesso externo.
//})();




