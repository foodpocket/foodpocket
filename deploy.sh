cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/foodpocket/foodpocket.github.io.git master:gh-pages
cd ../