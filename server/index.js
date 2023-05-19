const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "e_book"
});
// db.connect();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.get("/book", (req, res) => {
    const q = "SELECT * FROM booklist";
    db.query(q, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
})

app.post("/book", (req, res) => {
    const q = "INSERT INTO booklist (`name`, `desc`,`price`, `cover`) VALUES (?) ";  //('NodeJs', 'Complete Guide to NodeJs with Mysql','by Adil')";
    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.cover]

    db.query(q, [values], (err, data) => {
        if (err) throw res.json(err);
        return res.json(data);
    })
})

app.delete("/book/:id", (req, res) => {
    const bookid = req.params.id;
    const q = "DELETE FROM booklist WHERE id = ?"

    db.query(q, [bookid], (err, data) => {
        if (err) throw res.json(err);
        return res.json(data);
    })
})


app.put("/book/:id", (req, res) => {
    const bookid = req.params.id;
    const q = "UPDATE booklist SET `name`=? `desc`=?`price`=? `cover`=? WHERE id=?";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [...values, bookid], (err, data) => {
        if (err) throw res.json(err);
        return res.json(data);
    })
})

app.listen(5000, () => {
    console.log("Server Listening at 5000")
})