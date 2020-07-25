cd sam;
for d in */ ; do
    cd $d'src';
    mkdir handlers
    cp -r ../../../dist/shared ./
    cp ../../../dist/handlers/$(echo $d | sed 's:/*$::')'.handlers.js' handlers/$(echo $d | sed 's:/*$::')'.handlers.js'
    cp ../../../dist/handlers/$(echo $d | sed 's:/*$::')'.handlers.service.js' handlers/$(echo $d | sed 's:/*$::')'.handlers.service.js'
    cd ../..
done