# DevTinder

- Created a Vite + React Application
- Remove Unnecessary code and create a Hello World app
- Install Tailwind css
- Install Daisy UI
- Add Navbar component to APP.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer
- Creare a Login Page
- Install axios 
- CORS - install cors in backend => add middleware to with configurations: {orgin:"http://localhost:5173/",credentials:true}
- Whenever you're  making API call so pass axios : {withCredentials:true} if you don't pass then not not set the cookies on token
- Install Redux Toolkit React-Redux
- install react-redux + @reduxjs/tooklit 
- create a configureStore => Provider => createSlice => add reducer to store
- Add Redux devtools in chrome
- Login and see if you data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder 
- You should not be access other route without login
- If token is not present, redirect user to login page
- Logout Feature
- Profile Page
- Get the feed and add the feed in the store
- build the user card on feed
- Edit Profile Feature
- Show Toast Massege on save of profile
- New Page - See all my connections
- New Page - See all my connections Request
- Feature - Accepted/Reject Connection Request
- -  Send / ignores the User card from Feed

- Remaining

- Signup New User
- E2E Testing 

Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/signup => Signup
    Route=/connections => Connections
    Route=/profile => Profile

# Real Time Chat using Websocket (Socket.io)
    - Build the UI for a chat window on /chat/:targetUserId
    - Setup socket.io in backend
    - npm i socket.io
    - Setup frontend socket.io-client
    - initialise the chat
    - createSocketconnection 
    - Listen to events
    - Homework: improve the UI
    - Homework: Fix Security Bug - auth in web sockets
    -  Can I send messages to a person who is not my friends ? 
    - Homework: Fix bug - If I'm not friend, then I should not be able to send message
    - Homework: feat: Show green when online?? - [last seen 2 hour ago]
    - Homework: limit messages when featching from DB - load 15 messages when i scroll then hit again 15 messages
    - 