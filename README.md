# Google Vision API with Node

This project requires Node (version >= 10.10.0) to be executed.

Once you have installed it, then you just need to run this command:

```
$> npm install
```

That will download all the dependencies.

Then you need to export the environment variable called `GOOGLE_APPLICATION_CREDENTIALS` like so:

```
$> export GOOGLE_APPLICATION_CREDENTIALS="<Your json file from google cloud>"
```

Then you'll be able to run it executing the following command:

```
$> npm start
```

# Config

There are several environment variables you can change in order to change the server behavior.
The list of variables is the following:

* PORT - This variable tells in which port is going to start listenning for requests. E.g 3001
* FILE_PATH - This variable indicates where to save images sent by the frontend. E.g ./upload
* FILE_EXTENSION - This variable indicates the extension of the path given above. E.g .jpg

# To get the JSON from Google Cloud

Follow the instructions given on [Google Vision Docs](https://cloud.google.com/vision/docs/libraries?hl=es-419#client-libraries-install-nodejs)

# Related Repositories

