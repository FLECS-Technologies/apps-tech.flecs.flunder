#!/bin/bash
echo " * Starting: nginx"
nginx

echo " * Starting: zenohd"
exec /zenohd $*
