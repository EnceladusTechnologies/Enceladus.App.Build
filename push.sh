    #!/bin/sh
    set -ve
    git remote -v

    git config --global user.email "travic@travis-ci.com"
    git config --global user.name "Travis Ci"

    git remote set-url origin https://${GH_TOKEN}@github.com/EnceladusTechnologies/Enceladus.App.Build.git
    git remote -v

   # git fetch
   # git pull


    git checkout master
    git add --force dist
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"

    git push --force origin master
    
