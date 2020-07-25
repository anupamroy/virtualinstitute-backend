cd sam;
for d in */ ; do
    cd $d'src';
    mkdir handlers
    cp -r ../../../dist/shared ./
    cp -r ../../../dist/handlers/$d* handlers/
    cd ../..
done