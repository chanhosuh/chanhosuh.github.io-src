#!/usr/bin/env bash
BRANCH=master
TARGET_REPO=chanhosuh/chanhosuh.github.io.git
GATSBY_OUTPUT_FOLDER=public

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo -e "Starting to deploy to Github Pages\n"
    if [ "$TRAVIS" == "true" ]; then
        git config --global user.email "travis@travis-ci.com"
        git config --global user.name "Travis"
    fi
    #using token clone gh-pages branch
    git clone --quiet --branch=$BRANCH https://${GH_TOKEN}@github.com/$TARGET_REPO built_website > /dev/null
    #go into directory and copy data we're interested in to that directory
    cd built_website
    git rm -r '*'
    rsync -rv --exclude=.git  ../$GATSBY_OUTPUT_FOLDER/* .
    #add, commit and push files
    git add -f .
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to Github Pages"
    git push -fq origin $BRANCH > /dev/null
    echo -e "Deploy completed\n"
fi

# copied from Daniel Rodriguez (danielfrg.github.io-source); Apache license 2.0
