cd sam;
for d in */ ; do
    cd $d'src';
    mkdir handlers
    cp -r ../../../dist/shared ./
    cp ../../../dist/handlers/$(echo $d | sed 's:/*$::')'.handlers.js' handlers/$(echo $d | sed 's:/*$::')'.handlers.js'
    cp ../../../dist/handlers/$(echo $d | sed 's:/*$::')'_handlers_service.js' handlers/$(echo $d | sed 's:/*$::')'_handlers_service.js'
    cd ../..
done