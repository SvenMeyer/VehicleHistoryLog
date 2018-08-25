# make local folder accessible to Remix

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# echo "service local directory : ", $SCRIPTPATH

remixd -s $SCRIPTPATH

