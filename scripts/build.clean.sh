cd sam;
for d in */ ; do
    cd $d
    if [ -d src ]; then rm -rf src/*; fi
    cd ..
done