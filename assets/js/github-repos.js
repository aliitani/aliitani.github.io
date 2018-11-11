
/* Function that fetches the repos from github's REST API
    =============
    Currently github REST API V3
    =============
 */

function loadRepos(ali) {

    let url ='https://api.github.com/users/' + ali + '/repos';

    // fetch api to get github repos.
    fetch(url).then(response => response.json())
        .then(data => {
        // data from json
        displayRepos(data);

    }).catch(e => console.log(e));
}

// function that displays repos to site
function displayRepos(data) {

    let repo_main = document.getElementById('repo_main');
    let total = document.getElementById('total_repos');
    total.innerHTML = "Total " + data.length;

    for (let i = 0; i < data.length; i++) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let repo_link = '' + data[i]['html_url'];
        let repo_title = data[i]['name'];
        let repo_description = data[i]['description'];
        let clone_url = data[i]['clone_url'];
        let ssh_url = data[i]['ssh_url'];
        let repo_forked = data[i]['forks_count'];
        let repo_watched = data[i]['watchers'];
        let repo_stars = (data[i]['stargazers_count'] != null) ? data[i]['stargazers_count']: 0;
        let repo_issues = data[i]['open_issues_count'];
        let last_active = new Date(data[i]['updated_at']);
        let license = (data[i]['license'] != null) ? data[i]['license']['spdx_id']: 'None';
        let code_type = data[i]['language'];

        repo_main.innerHTML += "<div class='col-lg-6'>" +
            "<div class='border border-info repo-div rounded'>" +
                "<h3><a href='https://github.com/aliitani'>aliitani</a>/<a href=''>" + repo_title+ "</a></h3>" +
                "<div>" +
                    "<p>" + repo_description + "</p>" +
                "</div>" +
                "<div class='row'>" +
                    "<div class='col-sm-3'>" +
                        "<p class='text-center'><i class='fas fa-code-branch'></i> Forked</p>" +
                        "<p class='text-center'>" + repo_forked + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3'>" +
                        "<p class='text-center'><i class='fas fa-eye'></i> Watched</p>" +
                        "<p class='text-center'>" + repo_watched + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3'>" +
                        "<p class='text-center'><i class='fas fa-star'></i> Stared</p>" +
                        "<p class='text-center'>" + repo_stars + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3'>" +
                        "<p class='text-center'><i class='fas fa-exclamation-circle'></i> Issues</p>" +
                        "<p class='text-center'>" + repo_issues + "</p>" +
                    "</div>" +
                "</div>" +
                "<div>" +
                    "<ul class='nav nav-tabs' id='" + data[i]['name'] + "' role='tablist'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link active bg-dark text-light' id='" + data[i]['name'] + "-tab' data-toggle='tab' href='#" + data[i]['name'] + "1' role='tab' aria-controls='home' aria-selected='true'>HTTPS</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link bg-info text-light' id='" + data[i]['name'] + "-tab' data-toggle='tab' href='#" + data[i]['name']+ "2' role='tab' aria-controls='profile' aria-selected='false'>SSH</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>"+
                "<div class='tab-content' id='myTabContent'>" +
                    "<div class='tab-pane fade show active' id='" + data[i]['name'] + "1' role='tabpanel' aria-labelledby='" + data[i]['name']+ "-tab'>"+
                        "<p class='row clone-url bg-dark text-light'>" + clone_url + "</p>" +
                    "</div>" +
                    "<div class='tab-pane fade' id='" + data[i]['name'] + "2' role='tabpanel' aria-labelledby='" + data[i]['name'] + "-tab'>" +
                        "<p class='row clone-url bg-info text-light'>" + ssh_url +"</p>"+
                    "</div>" +
                "</div>" +

                "<div class='row'>" +
                    "<div class='col-sm-4 offset-1'>" +
                        "<p><i class='fas fa-code'></i> " + code_type + "</p>" +
                    "</div>" +
                    "<div class='col-sm-4'>" +
                        "<p><i class='fas fa-calendar'></i> " +  months[last_active.getMonth()] + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3'>" +
                        "<p><i class='fas fa-balance-scale'></i> " + license+ "</p>" +
                    "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
}

loadRepos("aliitani");