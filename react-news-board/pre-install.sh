sudo zypper install python2
sudo zypper install gcc-c++
sudo npm install node-gyp

node /usr/local/lib/node_modules/node-gyp/bin/node-gyp.js configure
node /usr/local/lib/node_modules/node-gyp/bin/node-gyp.js rebuild

npm rebuild