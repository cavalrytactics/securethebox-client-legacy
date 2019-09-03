# securethebox-client
- Fork of "fuse-react" project
- Automated fork update using python script "fuse-react-updater"

## Note: 
- Do not edit any files in @fuse / "fuse" folders directly
- Create a new folder "securethebox" for any directory into separate components

## Directories and Files that can be created/edited
```
|   .gitignore
|   .env
|   package.json
|   |-- src
|   |   |   .setupProxy.js (proxy requests)
|   |   |-- app
|   |   |   |-- main
|   |   |   |   |-- apps
|   |   |   |   |   |-- academy
|   |   |   |   |   |   |-- securethebox
|   |   |   |   |   |-- securethebox
|   |   |   |   |   |   |-- app-creator
|   |   |   |   |   |   |-- challenge-creator
|   |   |   |   |   |-- store
|   |   |   |   |   |   |-- actions
|   |   |   |   |   |   |   |-- securethebox
|   |   |   |   |   |   |-- reducers
|   |   |   |   |   |   |   |-- securethebox
|   |   |-- @fake-db
|   |   |   |-- db
|   |   |   |   |-- securethebox
|   |   |   |   |   |-- academy-db.js
```

## Deployment to Heroku
```
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku skeleton:master
```