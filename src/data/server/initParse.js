import Parse from "parse/node";

Parse.serverURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:1447/parse"
    : "https://parseapi.back4app.com/";

Parse.initialize(
  process.env.NEXT_PUBLIC_APP_ID,
  process.env.NEXT_PUBLIC_APP_JAVASCRIPT_KEY
);

export default Parse;
