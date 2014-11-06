# DOCKER-VERSION 1.3.1
FROM    centos:centos6
# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm
# Bundle app source
COPY . /bin
# Bundle app source
COPY . /public
# Bundle app source
COPY . /routes
# Bundle app source
COPY . /views
# Bundle app source
COPY . /app.js
# Bundle app source
COPY . /package.jsson

# Install app dependencies
RUN npm install
EXPOSE  3000
CMD ["node", "/bin/www.js"]