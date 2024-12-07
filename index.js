const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = 8080;

let comments = [
	{
		id: uuid(),
		username: "Todd",
		comment: "lol that is so funny",
	},
	{
		id: uuid(),
		username: "Skyler",
		comment: "I like to go birdwatching with my dog",
	},
	{
		id: uuid(),
		username: "Sk8erBoi",
		comment: "Plz delete you account Todd",
	},
	{
		id: uuid(),
		username: "onlysasyswoof",
		comment: "woof woof woof",
	},
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.render("comments/index.ejs");
});

app.get("/comments", (req, res) => {
	res.render("comments/main.ejs", { comments });
});

app.get("/comments/new", (req, res) => {
	res.render("comments/new.ejs");
});

app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/show.ejs", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/edit.ejs", { comment });
});

app.post("/comments/new", (req, res) => {
	const { username, comment } = req.body;
	if (comment && username) {
		comments.push({ id: uuid(), username: username, comment: comment });
	}
	res.redirect("/comments");
});

app.patch("/comments/:id", (req, res) => {
	const { id } = req.params;
	const selectedComment = comments.find((c) => c.id === id);
	const newCommentText = req.body.comment;
	selectedComment.comment = newCommentText;
	console.log(selectedComment);
	res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
	const { id } = req.params;
	const filteredComments = comments.filter((c) => c.id !== id);
	comments = filteredComments;
	res.redirect("/comments");
});

app.listen(port, () => {
	console.log(`ON PORT ${port}`);
});
