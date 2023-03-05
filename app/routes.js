const express = require('express')
const router = express.Router();
const DB = require("../database/connection.js");
const Prevention = require("sqlstring");

router.get('/', (req, res) => {
    DB.query(`SELECT * FROM blogs`, (err, blogPost) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("home.ejs", { blogPost });
        }
    })
});

router.get("/create", (req, res) => {
    res.render("create.ejs")
})

router.post("/create", (req, res) => {
    const post = req.body;

    DB.query(`INSERT INTO blogs(title,img_url,description)
    VALUES (
        ${Prevention.escape(post.title)},
        ${Prevention.escape(post.img_url)},
        ${Prevention.escape(post.description)}
    )`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    })
})

router.get("/show/:id", (req, res) => {
    const id = req.params.id
    DB.query(`SELECT * FROM blogs WHERE id="${id}" LIMIT 1`, (err, blog) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render("show.ejs", { blog })
        }
    })
});

router.get("/edit/:id", (req, res) => {
    const id = req.params.id
    const post = req.body

    DB.query(`SELECT * FROM blogs WHERE id="${id}" LIMIT 1`, (err, blog) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render("edit.ejs", { blog });
        }
    })
});

router.put('/edit/:id', (req, res) => {
    const post = req.body
    const id = req.params.id

    DB.query(`UPDATE blogs
    SET title=${Prevention.escape(post.title)},
    img_url=${Prevention.escape(post.img_url)},
    description=${Prevention.escape(post.description)}
    WHERE id="${id}"`, (err, result) => {
        if (err) {
            console.log(id);
            console.log("post error: " + err);
        }
        else {
            console.log("blog updated")
            res.redirect("/");

        }
    })
});

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    DB.query(`DELETE FROM blogs WHERE id= "${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("blog deleted")
            res.redirect("/")
        }
    })
})

module.exports = router