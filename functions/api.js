const fs = require("fs");

exports.handler = async (event, context) => {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync("./functions/db.json", "utf8");

    return {
      statusCode: 200,
      body: jsonData,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
