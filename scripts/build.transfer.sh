cd sam;
for d in */ ; do
    echo $d'src';
    cd $d'src';
    pwd
    mkdir handlers
    cp -r ../../../src-js/shared ./
    cp -r ../../../src-js/handlers/$d* handlers/
    cd ../..
done