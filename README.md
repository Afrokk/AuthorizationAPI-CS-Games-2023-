# CS Games 2023 - Université du Québec - Web Competition

Time Allocated: 3 Hours
Team: CTRL-ALT-ELITES (University of Windsor Team B)

## Context

With the rich fleeing the planet in haste and our rush to move to underwater cities, we want to collect and save all the code that we can. We cannot afford to lose all that knowledge and progress. We want you to create a website on which anyone can anonymously share code since some of it might be stolen from those who ruined our planet for their own gain.

## State of the project

Work behind this website has al ready begun by a team in Mexico, but with severe weather in their area they don't have the time to complete it.

They had started a micro-service architecture, with a JS0N web Token to transit user identity between services in the ecosystem. This token must be added in each request to the back-end, the Authorization http header. The value of the header is Bearer $JSONWebToken.

The previous team has developed the identity service and the repository service. You need to develop the snippet service and the front-end for all theservices.

## JSON Web Token

A JWT has 3 parts separated by a '.', and each part is Base64-encoded. The first part is the header, containing the a lgorithm used for the signature and the identifier of the issuer's public key. The second part is the user's data. The third part is the d igital signature.

When we use subject, we refer to the claim sub in the JSON Web Token. This represents the unique user ident ifier in the identity server.

## Services provided

Two parts of the back-end were implemented. They a re the Identity Server and the Repository service. The services have an OpenAPI 3.0 specifications to document service consumption. A Swagger UI is a lso provided to try the services from the browser.

To ensure the services aren't public, authentication is required to talk with the Repository service.

## Identity Server

This service handles the user identity and authentication. This service makes its key public so you can validate the digital signature o f the JWT. This way, you can know t hat the JWT was generated by this service.

Important endpoints:
- GET /.well-known/openid-configuration
- Openld Connect configurat ion of the server
- GET /.well-known/openid-configuration/jwks
- Public keys o f the server
- POST /connect/token
- By using grant_type=client_credentials, we obtain a service account JWT.
- With grant_type=password and by adding username and password, we obtain a user JWT.
- POST /user/create
- Create a new user

## Repository Service

This service lets you browse and query the code repositories. This service requires a JWT issued by the Id Server to consume data.

```
Important endpoints:
o GET /repositories
```
- List of repositories
o GET /repositories/{id)
- Information of a repository
o GET /repositories/{id }/commits
- History of a repository
o GET /repositories/{id }/blob/commits
- History of a file in the repository
o GET /repositories/{id}/tree
- Tree of the repository
o GET /repositories/{id)/blob
- Get a file from the repository

# Service to implement
### Snippet Service

The specification for this service follows the swagger OpenAPI 3.0 spec. Refer to that document to implement the service.

- YAML Definition File: Snippet Service Swagger YAML
- UI Rendering the YAML File: Snippet Service Swaqqer

```
If you want only to implement a front-end for the Snippets Service, there is one back-end already running at (https://snippets.lostgit.xyz)
```
## Constraint(s)

#### Technology

You may use any language. Your only constraint is that your application must be cross-platform.

#### Architecture

You must implement the front-end, as well as the back-end service. You may combine the two if you want.

# Tasks (TO-DO in 3 Hours):

#### Front-End

#### Authentication [Identity Server]
- Implement a form to authenticate the user. After, fetch a JWT with POST /connect/to ken. This JWT can be used to consume the ot her services [20 pts]
- Handle authentication errors (Bad Request from the request) [10 pts]
- Implement a form to create a new user, by using POST /user/create. [20 pts]
- Handle user creation errors (Bad Request from the request) [10 pts]
- Log out from the session [20 pts]
- Don't worry about JWT expiration, they have a lifetime of 3 hours

- Repositories list [Repository Service]


- Show the repositories listing. Show the name of the project, licence and description (GET /repositories) [20 pts]
- Implement the paging to browse through repositories. (skip and limit parameters of GET /repositories and totalMatches fie ld from the
response) [20 pts]
- Implement the filtering by repository name (filter parameter from GET /repositories) [20 pts]
- By clicking on a repository from the list, navigate to the page of this project. (GET /repositories/< repository _id>) [20 pts]
- Show topics, languages, description and licence o f the project. [ 20 pts]
- Show the last commit on master, including the author a nd message of the commit. (GET /repositories/<repository_id>/commits?limit=1) [2 0
pts]
- Show the git tree of the project. (GET /repositories/<repository_id>/tree) (30 pts]
- Show a d rop-down with the list of tags and branches of the repository. [20 pts]
- App ly the selection of the branch or tag on the git project tree (branch parameter of GET /repositories/<repository_id>/tree) [20 pts]
- App ly the selection of the branch or tag on the last commit information. (GET /repositories/<repository_id>/commits) [20 pts]
- By clicking on a file in the tree, show a section with the information of this file.

- Show the last 25 commits on that file (filepath parameter of GET /repositories/<repository_id>/blob/commits). [20 pts]
- Allow the user to download the file (filepath parameter of GET /repositories/<repository_id>/blob). [20 pts]
- Support branch or tag selection (branch parameter on two previous end points) (20 pts]
- Commits history of a project [Repository Se1Vice)
- Create page or a section to show the 25 latest commits of the project, on master (GET / repositories/<repository_id>/commits) [10 pts]
- Support paging to go beyond 25 latest commits [20 pts]
- Allow the user to browse the latest commits o n other branch or tag [20 pts]

#### Authors list (Repository Service]

- Show authors list (GET / authors) [10 pts]
- Support paging [20 pts]
- When we click on a n author, show a list of all his repositories (GET /authors/<author_id>/repositories) [20 pts]
o When we click on a repository, go to the repository page [10 pt]
Post a snippet [Snippets Se1Vice]


- Show a form to the user to post a snippet (POST /snippets) (20 pts)
- Show a error message if it d idn't work (10 pt)

#### Browse through snippets [Snippets Service]
- Show latest snippets. (GET /snippets) (20 pts)
- Show the content of the snippet when we click on it [20 pts]
- Apply syntax coloring on the snippet [70 pts]
- Support paging through (GET /snippets?limit=x&skip=y) [20 pts]
- Filter by keywords (GET /snippets?keywords=x;y; .. n) [20 pts]
- Suggest keywords when typing [50 pts]
- Show only my snippets (GET /snippets?mine= true) [20 pts]
- Allow the user to delete one of his snippet (DELETE /snippets/<snippet_id >) [20 pts]

#### Back-End

##### Snippets Service
##### Json Web Token authorization
- All endpoints must require a JWT.
- Response HTTP Status Cod e must be 401 if the JWT is not present.
- Post a new snippet, POST /snippets/create


- Return 401 if no JWT is provided in the Request. [10 pt]
- A user JWT must be used (role=User), else return a 403 error. [10 pt]
- Return a 201 (Created) with the identifier o f the newly created snippet. [20 pts]
- Return a 400 if the title and/or the content is missing. [20 pts]
- Support the persistence of t he keywords provided d uring the creat ion. [20 pts]

##### Browse through snippets, GET /snippets

- Keturn 4U1 It no JWT is provided in the request. [20 pts]
- Respect the expected return model. [20 pts]
- Handle the t itle parameter to filter the snippet if the title matches the provided parameter. [20 pts]
- Handle keywords parameter, to filter out by associated keywords. [20 pts]
- Handle more than one keyword separated by·;·. [30 pts]
- Implement skip a nd limit parameter to support paging. [20 pts]
- Implement the mine parameter, when this parameter is true, only returns the snippets from the current user, by using the subject of the JWT. [20 pts]
- Order snippets by descending order on created field. [20 pts]
- Get a snippet by identifier, GET /snippets/<snippet_id >
- Returns a 401 error if no JWT is provided. [10 pts]
- Respect the expected response model. [20 pts]
- Returns a 404 error if the snippet doesn't ex ists. (20 pts)
- Delete a snippet, DELETE /snippets/<snippet_id >
- Returns a 401 error if no JWT is provid ed. [10 pts]
- Returns a 204 status code if the request was successful. [10 pts]
- Snippet than can be deleted must have been posted by the same user. By using the subject field in the JWT. [20 pts]
- If the request doesn't work, returns a 400 error. [20 pts]
- Available keywords, GET / keywords
- Returns a 401 error if no JWT is provided. [10 pt]
- Returns a list of keywords available. (10 pts)

### Artefact

- Provide a run.sh or a Dockerfile [20 pts]
- Provide a readme with the required information and dependencies to run the solution. [20 pts]

### Useful links
OpenAPI 3.0 Specs
JWT Decoding
JSON Web Token RFC