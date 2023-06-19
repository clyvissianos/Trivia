# Trivia

A Trivia App for testing your knowledge!

A single page application created with Django, Django REDT Framework and Vue JS

You need to register so you can publish, edit and delete your own trivia questions.

Registered users can answer questions from different authors and can like or unlike answers.

To run locally:

from myTrivia for Django's development server:

    python manage.py runserver

from mytrivia_frontend for Vue JS Development server:

    npm run serve

Go to http://127.0.0.1:8000 and the app is running.

The application uses session and token authentication with djoser and provides a
custom login and registration template.

REST implementation of Django authentication system. djoser library provides a set of
Django Rest Framework views to handle basic actions such as registration, login, logout,
password reset and account activation. It works with custom user model.

https://djoser.readthedocs.io/en/latest/introduction.html

All HTTp Requests are handled by axios HTTP Client.

Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic
(= it can run in the browser and nodejs with the same codebase). On the server-side
it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.

https://axios-http.com/docs/intro

For testing purposes the VS-Code extension REST Client was used.

REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

You can reproduce simple endpoint tests provided in the rest.http file.
