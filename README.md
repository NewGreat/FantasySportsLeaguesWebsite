# Fantasy Sports Leagues Website

### About

Fantasy Sports Leagues is my Data Engineering project as part of [Insight Data Science's Engineering](http://insightdataengineering.com) fellowship program 2015A. 


### Introduction

I decided to combine my love for data and sports during my project. 

While still focusing on the Data Engineering aspect, I thought it would be interesting to learn about the implications of trying to develop a pipeline that updates with real-time events and serves a user base of ~ 5 million people. 

My technology stack includes: Kafka, HDFS, Spark, Spark Streaming, and Cassandra.


### Website

The project is currently hosted at [http://4fsports.net](http://4fsports.net)


### Setup

The flask server includes all the routes possible including those that form the API that return json objects.

The website was made using Bootstrap and [D3.js](http://d3js.org) for the graphs.


### Up and running

Install Flask `pip install Flask`

Run app `python FlaskServer.py`

All routes and logic can be modified in `FlaskServer.py.py`

All static html pages/templates are in the templates folder.




