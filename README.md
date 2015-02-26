# insight

Insight Server and Angular UI.

## Running Locally

The following build dependencies are required:

* [Oracle Java 1.7 JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
* [Maven 3.0+](http://maven.apache.org/download.cgi)
* [Ruby](https://www.ruby-lang.org/en/) for the Heroku command line tools
* [Heroku Toolbelt](https://toolbelt.heroku.com/)
* [Node](http://nodejs.org/) to run the UI build tools
* Git

To run the Java service tier, checkout the code, build and run:

```sh
$ git clone http://mmoloney@stash.dsa.rocks/scm/nsi/insight.git
$ cd insight
$ mvn install
$ foreman start web
```

Foreman is installed as part of the Heroku Toolbelt. If for any reason it isn't, it is a ruby gem that can be installed as follows:

```sh
$ gem install foreman
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

For a general tutorial, see [Building a RESTful Web Service](http://spring.io/guides/gs/rest-service/).

To run the UI locally, open a new terminal window and change to the 'public' directory under the project root.

Install UI dependencies. We get the tools we depend upon via npm, the [node package manager](https://www.npmjs.com/), which is installed as part of the Node install.

```sh
$ cd public
$ npm install
```

To run locally:

```sh
$ npm start
```

Behind the scenes this will also call bower install. You should find that you have two new folders in public.

* node_modules - contains the npm packages for the tools we need
* app/bower_components - contains the angular framework files


Now browse to the app at [http://localhost:8000/app/index.html](http://localhost:8000/app/index.html).

## To create your own Heroku instance

Sign up for an [Heroku](https://www.heroku.com) account. You can get a free account for a basic usage tier.

You will need to change the git remote for the project. There is a remote ref to your git repository on Heroku called 'heroku', so that when you push to 'heroku master', the app will be automatically built, packaged and deployed.

With the Heroku Toolbelt installed, this can all be done from the command line once you have your account login.

```sh
$ heroku login
Enter your Heroku credentials.
Email: java@example.com
Password:
```

Note that if you’re behind a firewall that requires use of a proxy to connect with external HTTP/HTTPS services, you can set the HTTP_PROXY or HTTPS_PROXY environment variables before running the heroku command.

To deploy the app:

```sh
$ heroku create
$ git push heroku master
$ heroku open
```

Heroku generates a random name for your app. You can pass a parameter to specify your own, or rename it later with heroku apps:rename.

The 'open' command will open a browser window that points to the Heroku app instance.

The app will fail at this point because there is no schema or data.

Create the database using a PostgreSQL instance that is automatically created when you create the app, using the schema in 'database/schema.ddl' under the project root.

See Heroku Help or tutorial below for instructions on connecting to the database from the command line or third-party tool. (Note, to connect you will need to add 'sslmode=require').

For a general tutorial, see [getting started with Java on Heroku](https://devcenter.heroku.com/articles/getting-started-with-java).

## Documentation

For more information about using Java on Heroku, see these Dev Center articles:

- [Java on Heroku](https://devcenter.heroku.com/categories/java)
