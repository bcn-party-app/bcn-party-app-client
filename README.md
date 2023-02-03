# .find()

.find() is a web app that lets you create clubs, create parties, attend parties and check who else is going.

## User Stories

- 404 - As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup - As an anon I can sign up in the platform so that I can start saving favorite restaurants
- Login - As a user I can login to the platform so that I can see my favorite restaurants
- Logout - As a user I can logout from the platform so no one else can use it
- Add Club - As a user I can add a club so that I can share it with the community
- Add Party - As a user I can add a club so that I can share it with the community
- See Clubs - As a user I can browse all the parties in the website
- See Parties - As a user I can browse all the clubs in the website
- Edit Party - As a user/creator I can change details about the party
- Delete Party - as a user/creator I can cancel the party

## Backlog

- Search bar for parties and clubs

# Client

## Routes

- / - homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /club - club list + create a club
- /party - party list + create a club
- /user- user profile and details
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Club List Page (public only)
- Party List Page (user only)
- Party Edit Page (public only)
- My Profile Page (user only)
- 404 Page (public)

## Components

- AddClub
- AddParty
- ClubCard
- PartyCard
- SelectClub

# Server

## Models

User model

- email
- password
- name
- image
- parties

Club model

- name
- streetName
- streetNumber
- image
- parties

Party model

- name
- club
- date
- musicGenre
- image
- attendees
- owner

## API Endpoints/Backend Routes

- PUT /users
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
  //POST /api/club/
  //GET /api/club
- POST /api/party
- GET /api/party
- /GET /api/party/:partyId
- PUT /api/party/:partyId
- PUT api/party/:partyId/attend-party
- PUT api/party/:partyId/leave-party
- DELETE /api/party/:partyId

## Links

[Google Slides](https://docs.google.com/presentation/d/1wk15mxdH3OWPRXJnb_8EpVDkeBTC5orx-8Yc3-EIfHA/edit?usp=sharing/)

[Github](https://github.com/bcn-party-app)

[Deployed app](https://bcn-party-app.netlify.app/)
