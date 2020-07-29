cd sam;
for d in */ ; do
    cd $d;
    echo $d;
    npm i;
    cd ..
done