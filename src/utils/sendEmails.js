const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

// code from github repo https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js
const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          // Data: "<h1> this is my email body </h1>",  making dunamic
          Date: body,
        },
        Text: {
          Charset: "UTF-8",
          // Data: "this is my email body",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        // Data: "devTinder email",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

// both emails should be verified in aws ses
// we trigger this run on when we send request or intrested to user
const run = async (subject, body, email) => {
  const sendEmailCommand = createSendEmailCommand(
    "receiver@example.com", // replace email make it dynamic
    "sender@example.com",
    subject,
    body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
