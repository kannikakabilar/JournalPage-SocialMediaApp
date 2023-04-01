# JournalPage-SocialMediaApp
JournalPage is a MERN-stack social media app project that allows users to post and share reviews about products, services, and organizations. 

![IMAGE ALT TEXT](https://github.com/kannikakabilar/JournalPage-SocialMediaApp/blob/main/screenshots/Screen%20Shot%202023-03-31%20at%203.25.43%20PM.png)

# How To Run
- Make sure yarn and nodemon/node is installed
- Open a terminal and navigate to where the project is cloned/downloaded
```md
> cd JournalPage-SocialMediaApp
> yarn install
> cd client
> yarn install
> cd ../api
> yarn install
> nodemon index.js
```
- Open another terminal to run the frontend
```md
> cd JournalPage-SocialMediaApp/client
> yarn start
```
- If port 4000 or 3000 is already in use, you can just kill which ever process is using the port with below command, and run again
```md
> lsof -ti:4000 | xargs kill -9
> lsof -ti:3000 | xargs kill -9
```
Go to the browser to this url: http://localhost:3000, signup, login, and start creating posts.

# Features Implemented
- ReactJS was used in the frontend to validate if user has entered correct information while logging in and signing up
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.16.28 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.18.01 PM.png" width="45%">
</p>

- When each user signs up, their information is stored in a document in the User collection DB in mongoDB
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 3.25.51 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.36.32 PM.png" width="45%">
</p>

- Each user can create a post with picture of their reviewed product, title, summary(short description), review feedback with more pictures.
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.41.17 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.39.13 PM.png" width="45%">
</p>

- All posts can be viewed on the feed page. Listed from most recently posted to older posts.
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.42.11 PM.png" width="75%">
&nbsp; &nbsp; &nbsp; &nbsp;
</p>

- A user can click on a post to view more details and read more information on the post
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.42.43 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.42.50 PM.png" width="45%">
</p>

- The owner of a post can edit their own post and make updates to it.
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.43.44 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.43.57 PM.png" width="45%">
</p>

- Users can view profiles of other users and their posts but they can only edit their own profile and their own posts.
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.53.07 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.53.28 PM.png" width="45%">
</p>
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.57.46 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.50.36 PM.png" width="45%">
</p>

- When users make updates to their own profile, they would be guided with form validation to ensure correct information about the user is stored
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.53.53 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.55.24 PM.png" width="45%">
</p>

- Updated user profiles will also be updated in the User collection in MongoDB
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.57.25 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.57.33 PM.png" width="45%">
</p>

- The Feed page contains posts of all users posted from most recently to older posts
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 8.04.14 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.58.38 PM.png" width="45%">
</p>

- Users can search for posts in the search bar by post titles or by usernames
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-04-01 at 4.50.38 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-04-01 at 4.51.32 PM.png" width="45%">
</p>
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-04-01 at 4.51.42 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-04-01 at 4.51.57 PM.png" width="45%">
</p>

# Concepts Learned
- Collections in MongoDB were created to store posts and users information
- MongoDB was connected to backend through ExpressJS
- Frontend connects to backend via fetch statements
- Backend handles GET, POST, and PUT requests and sends the response back to the frontend to be displayed on the webpages
- Each request is handled by a corresponding query made to MongoDB where the collections are stored
- Frontend is designed using ReactJS that handles user events and how information gets displayed and collected form users
- Passwords from users are collected, encrypted, and stored in documents of Users collection using bcryptjs
