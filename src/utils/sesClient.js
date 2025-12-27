const { SESClient } = require("@aws-sdk/client-ses");

// set the aws region

const REGION = "ap-south-1"; // mumbai set on aws

// create ses service object

const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = { sesClient };
