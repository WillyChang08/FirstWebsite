const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 設定 MySQL 資料庫連線
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 替換為您的 MySQL 使用者名稱
    password: 's4477001', // 替換為您的 MySQL 密碼
    database: 'shop', // 替換為資料庫名稱
});

// 測試資料庫連線
db.connect((err) => {
    if (err) {
        console.error('資料庫連線失敗: ', err);
        return;
    }
    console.log('資料庫連線成功！');
});

// 提供 API 端點以獲取 Users 資料
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// 啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`伺服器運行於 http://localhost:${PORT}`);
});
