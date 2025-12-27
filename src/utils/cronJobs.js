const { subDays, startOfDay, endOfDay } = require("date-fns");
const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequestSchema");
const sendEamil = require("./sendEmails");
// these start means
// first * means every second // optional
// second * means every minute
// third * means every hour
// 4th * means every day
// 5th * means every month
// 6th * means evey year
// if i want to schedule email should trigger at every 8Am
// 0 8 * * * // morning 8 , 0 min, 8 hur, * day, * month, * year

// send email to all peoples who got intrested request yesterday

cron.schedule(" 35 14 * * *", async () => {
  console.log("running a task every minute");
  try {
    const yesterdayDate = subDays(new Date(), 0);
    const yesterdayTimeStart = startOfDay(yesterdayDate);
    const yesterdayTimeEnd = endOfDay(yesterdayDate);
    const pendingRequests = await ConnectionRequestModel.find({
      status: "intrested",
      createdAt: {
        $gte: yesterdayTimeStart,
        $lt: yesterdayTimeEnd,
      },
    }).populate("fromUserId toUserId");
    console.log({ pendingRequests });
    const userEmails = pendingRequests?.map((ele) => ele.toUserId.emailId);
    const listOfEmails = [...new Set(userEmails)]; // remove dublicates

    console.log({ listOfEmails });
    for (const email of listOfEmails) {
      try {
        const res = await sendEamil.run("subject", "body", email);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
