cd dist
mv index.html home.html
echo "<?php include_once('home.html'); ?>" > index.php
echo "{}" > composer.json
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/foodpocket/foodpocket.github.io.git master:deploy-heroku
cd ../