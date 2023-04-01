# JournalPage-SocialMediaApp
JournalPage is a MERN-stack social media app project that allows users to post and share reviews about products, services, and organizations. 

![IMAGE ALT TEXT](https://github.com/kannikakabilar/JournalPage-SocialMediaApp/blob/main/screenshots/Screen%20Shot%202023-03-31%20at%203.25.43%20PM.png)

# How to run
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

# Features and Concepts Learned
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

- Users can view profiles of other users and their posts but they can only edit their own profile
<p align="center">
  <img alt="Light" src="screenshots/Screen Shot 2023-03-31 at 7.53.07 PM.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="screenshots/Screen Shot 2023-03-31 at 7.53.28 PM.png" width="45%">
</p>
