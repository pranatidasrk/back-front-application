const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'mysql-service', // Kubernetes service name
    user: 'root',
    password: 'rootpassword',
    database: 'userdata'
});

db.connect(err => {
    if(err) console.error('DB connection error:', err);
    else console.log('Connected to DB');
});

// API endpoint
app.post('/submit', (req, res) => {
    const { name, phone, address } = req.body;
    const sql = 'INSERT INTO users (name, phone, address) VALUES (?, ?, ?)';
    db.query(sql, [name, phone, address], (err) => {
        if(err) return res.status(500).send('DB error');
        res.send('Data saved successfully!');
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
