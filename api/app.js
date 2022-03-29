const express = require("express");
const app = express();
const helpers = require("../helpers/helpers");
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const URL = process.env.URL

app.get("/", function (request, response) {
	response.send({ message: "nothing to see here 🍕!" })
});

app.get("/callback", function (request, response) {
	const code = helpers.toString(request.query.code);
	response.send({ code:  code, request: request.headers });
});

app.listen(PORT, function () {
	console.log(PORT);
});
