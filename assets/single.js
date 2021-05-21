var issueContainerEl = document.querySelector("#issues-container");
var getRepoIssues = function (repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiURL).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                displayIssues(data);
                console.log(data);
            });
        }
        else {
            alert("There was a problem with your request!!");
        }
    });
}

var displayIssues = function (issues) {
    for (let index = 0; index < issues.length; index++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[index].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[index].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[index].pull_request) {
            typeEl.textContent = ("Pull Request");
        } else {
            typeEl.textContent = ("Issue");
        }

        // append to container

        issueEl.appendChild(typeEl);

    }
    issueContainerEl.appendChild(issueEl);
}
getRepoIssues("facebook/react");