const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

app.get("/", function (req, res) {
	res.send({ message: "nothing to see here 🍕!" })
});

app.listen(PORT, function () {
	console.log(PORT);
})
