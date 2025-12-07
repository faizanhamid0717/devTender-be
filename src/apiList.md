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

// making API dynamic because just status is getting changes

- POST / request/send/intrested/:userId
- POST /request/send/ignore/:userId
- - - POST /request/send/:status/:userId

- POSt /request/review/accepted/:requestId
- POSt /request/review/rejected/:requestId
- - - POST /request/review/:status/:userId

## userRouter

- GET /user/connections
- GET /user/request
- GET /user/feed - gets you the profile of other users

status : ignore , intrested, accepted , rejected
