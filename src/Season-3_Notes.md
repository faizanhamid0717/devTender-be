🔥🔥🔥🔥🔥🔥 Episode 3.4 🔥🔥🔥🔥

How to send email to users using Amazon simple email services means our console account
inside console search IAM - create user
and configure with domain name in cloudfare and verify we can also verify email adress through which we can send email if we dont have domain name

- and generate SECRET and ACCESS KEY on Aws

- then this is docs in which it showl all logic how we send emal using ses https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html

--email code setup github repo --
https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js

🔥🔥🔥🔥🔥🔥 Episode 3.5 🔥🔥🔥🔥
Security
Not push any url or secrect key to github
so for this we use Package call .env
npm install dotenv
nd put this in root of app require('dotenv').config()

1. pushing mongoUrl on github - wrong
2. jwt secret key

🔥🔥🔥🔥🔥🔥 Episode 3.7 🔥🔥🔥🔥🔥

RAZORPAY PAYMENT GATEWAY INTEGRATION
install razorpay
https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps
