cd sam;
for d in */ ; do
    cd $d'src';
    mkdir handlers
    cp -r ../../../src-js/shared ./
    cp -r ../../../src-js/handlers/$d* handlers/
    cd ../..
done