//. https://expressjs.com/en/5x/api.html#express.router

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH / profile/edit
- PATCH / profile/password

## connectionRequestRouter

- POST / request/send/intrested/:userId
- POST /request/send/ignore/:userId
- POSt /request/review/accepted/:requestId
- POSt /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/request
- GET /user/feed - gets you the profile of other users

status : ignore , intrested, accepted , rejected
