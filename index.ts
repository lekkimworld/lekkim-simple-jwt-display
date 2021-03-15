import express from "express";
const app = express();

app.get("/*", async (req, res) => {
  const auth = req.headers.authorization;
  console.log("---------------------------------------");
  if (auth && auth.indexOf("Bearer ") === 0) {
    const token = auth.substring(7);
    const elem = token.split(".");
    const headerObj = JSON.parse(Buffer.from(elem[0], "base64").toString());
    const payloadObj = JSON.parse(Buffer.from(elem[1], "base64").toString());
    const signature = elem[2];

    console.log("Header:");
    console.log(JSON.stringify(headerObj, undefined, 2));
    console.log("Payload:");
    console.log(JSON.stringify(payloadObj, undefined, 2));
    console.log("Signature:");
    console.log(signature);
  } else {
    console.log("No authorization header...");
  }
  console.log("---------------------------------------");
  res.type("json");
  res.send({ Status: "OK" }).end();
});

app.listen(process.env.PORT || 8080);
console.log(`Starting listening on port ${process.env.PORT || 8080}`);
