#!/bin/bash

yarn start:ui &

yarn start:scanner &

yarn start:analyzer &

yarn start:monitor:sr &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
