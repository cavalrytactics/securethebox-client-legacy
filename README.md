# securethebox-client
- Fork of "fuse-react" project
- Automated fork update using python script "fuse-react-updater"

## Note: 
- Do not edit any files in @fuse / "fuse" folders directly
- Create a new folder "securethebox" for any directory into separate components

## Directories and Files that can be created/edited
```
│   .gitignore
│   .env
│   package.json
│   └──src
│       │   .setupProxy.js (proxy requests)
│       ├── app
│       │   └── main
│       │       └── apps
│       │           ├── academy
│       │           │   └── securethebox
│       │           ├── securethebox
│       │           │   ├── app-creator
│       │           │   └── challenge-creator
│       │           └── store
│       │               ├── actions
│       │               │   └── securethebox
│       │               └── reducers
│       │                   └── securethebox
│       └── @fake-db
│           └── db
│               └── securethebox
│                   └── academy-db.js
```

## Deployment to Heroku
```
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku skeleton:master
```

## Updating Client to new version of fuse-react (CURRENT)
0. https://github.com/ncmd/securethebox-client
1. COMPARE
2. COMPARE ACROSS FORKS
3. Base Repository: ncmd/securethebox-client - master
4. Head Repository: withinpixels/fuse-react - master
5. Request PR
6. 
```
git checkout -b withinpixels-master master
git pull https://github.com/withinpixels/fuse-react.git master
git checkout master
```
7. Resolve conflicts in 'package.json' file manually
8. 
```
git add .
git commit -m "merged conflicts"
git checkout -b securethebox-client master
git add . ; git commit -m "merged conflicts"
git push --set-upstream origin securethebox-client
```
9. Go back to Repo and Merge
10. Delete node modules and reinstall packages
```
rm -rf node_modules ; yarn install
```

## Updating Client to new version of fuse-react (LEGACY)
```
"bless": "run-s -c update commit",
"update": "run-s -c update1 update2 update3 update4 update5",
"update-all": "run-s -c update1 update2 update3 update4 update5 update6 update7 update8",
"update1": "git remote add upstream https://github.com:withinpixels/fuse-react.git",
"update2": "git fetch upstream",
"update3": "git checkout master",
"update4": "git rebase upstream/master",
"update5": "cd fuse-react-updater ; python3.7 updater.py",
"update6": "rm -rf node_modules/",
"update7": "yarn install",
"update8": "yarn start",
```