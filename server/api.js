require("dotenv").config();

const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const corsOptions = {};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

// compress all responses
const compressionOptions = {
  level: 6,
  threshold: 0,
};
app.use(compression(compressionOptions));

/* mongoose */
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// ! routes
// log in
const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter);

// sign up
const signUpRouter = require("./routes/signUp");
app.use("/api/signup", signUpRouter);

// nav
const navRouter = require("./routes/nav");
app.use("/api/nav", navRouter);

// verses
const verseRouter = require("./routes/verses");
app.use("/api/verse", verseRouter);

// explore
const exploreRouter = require("./routes/explore");
app.use("/api/requests/explore", exploreRouter);

// abusive post
const abusivePostRouter = require("./routes/abusivePost");
app.use("/api/abuse/post", abusivePostRouter);

// abusive prayer
const abusivePrayerRouter = require("./routes/abusivePrayer");
app.use("/api/abuse/prayer", abusivePrayerRouter);

// account settings
const settingsRouter = require("./routes/settings");
app.use("/api/settings", settingsRouter);

// bible
const bibleRouter = require("./routes/bible");
app.use("/api/bible", bibleRouter);

// privacy
const privacyRouter = require("./routes/privacy");
app.use("/api/post/privacy", privacyRouter);

// tags
const tagsRouter = require("./routes/tags");
app.use("/api/tags", tagsRouter);

// members
const membersRouter = require("./routes/members");
app.use("/api/members", membersRouter);

// statistics
const memberStatsRouter = require("./routes/memberStatistics");
app.use("/api/statistics", memberStatsRouter);

// bookmark
const bookmarkRouter = require("./routes/bookmarks");
app.use("/api/bookmarks", bookmarkRouter);

// themes
const themesRouter = require("./routes/themes");
app.use("/api/themes", themesRouter);

// update user info
const userInfoRouter = require("./routes/userInfo");
app.use("/api/post/user", userInfoRouter);

// report abuse
const abuseRouter = require("./routes/abuse");
app.use("/api/abuse", abuseRouter);

// user avatar
const avatarRouter = require("./routes/picture");
app.use("/api/avatar", avatarRouter);

// friendship requests
const friendshipRouter = require("./routes/friendship");
app.use("/api/friendship", friendshipRouter);

// membership
const membershipRouter = require("./routes/membership");
app.use("/api/membership", membershipRouter);

// friends
const friendsRouter = require("./routes/friends");
app.use("/api/friends", friendsRouter);

// reports
const reportsRouter = require("./routes/reports");
app.use("/api/reports", reportsRouter);

/* users */
const userRouter = require("./routes/users");
app.use("/api/users", userRouter);

// requests
const reqRoute = require("./routes/requests");
app.use("/api/requests", reqRoute);

// prayers
const prayerRouter = require("./routes/prayers");
app.use("/api/prayers", prayerRouter);

// notifications
const notifyRouter = require("./routes/notifications");
app.use("/api/notifications", notifyRouter);

// last publications
const lastPublicationsRouter = require("./routes/lastPublications");
app.use("/api/publications/last", lastPublicationsRouter);

/* post */
const postRouter = require("./routes/post");
app.use("/api/post", postRouter);

/* ranking */
const rankingRouter = require("./routes/ranking");
app.use("/api/ranking", rankingRouter);

// profile activities
const activitiesRouter = require("./routes/profileActivities");
app.use("/api/activities", activitiesRouter);

// set tester
const recruterRouter = require("./routes/recruter");
app.use("/api/recruter", recruterRouter);

// delete user
const deleteUserRouter = require("./routes/deleteUser");
app.use("/api/deleteuser", deleteUserRouter);

// donate
const donateRouter = require("./routes/donate");
app.use("/api/donate", donateRouter);

const credentials = {
  environment: process.env.ENVIRONMENT === "dev" ? "dev" : "prod",
  apiUrl:
    process.env.ENVIRONMENT === "dev"
      ? process.env.LOCAL_API_URL
      : process.env.LIVE_API_URL,
};

mongoose
  .connect(credentials.apiUrl)
  .then(() => {
    // start express
    if (credentials.environment === "dev") {
      const PORT = process.env.PORT || 8000;
      // development
      app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
      });
    } else {
      // production
      app.listen(() => {
        console.log(`Listening...`);
      });
    }
  })
  .catch((err) => {
    // not connected
    console.log("Could not connect to MongoDB...", err);
  });
