import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import cookies from 'cookie-parser';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
let db = new sqlite3.Database('test.sqlite');

app.use(cors());
app.use(cookies());
app.use(bodyParser.json());

function checkToken(req, res, next) {
  // MUSS GEÄNDERT WERDEN TOKEN NICHT ÜBER HEADER!!!
  const token = req.header('X-TOKEN');
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      res.sendStatus(401);
      return;
    }
    next();
  });
}
// Falls an DB was geändert werden soll - wenn Projekt fertig raus.
// db.run('CREATE TABLE IF NOT EXISTS login (username TEXT, password TEXT)');
// db.run('DROP TABLE article');
db.run(
  'CREATE TABLE IF NOT EXISTS article (articleId INTEGER, description TEXT UNIQUE,category INTEGER, unit INTEGER, price	REAL, PRIMARY KEY(articleId AUTOINCREMENT), FOREIGN KEY(category) REFERENCES category(categoryId), FOREIGN KEY(unit) REFERENCES units(unitId))'
);

app.get('/login', (req, res) => {
  const response = db.all(
    'SELECT rowid AS id, username, password FROM login',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

app.post('/login', (req, res) => {
  db.get(
    'SELECT * FROM login WHERE username = $username',
    { $username: req.body.userName },
    (err, user) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (!user) {
          return res.sendStatus(400);
        }
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, isCorrect) {
            if (isCorrect) {
              const jwtValue = jwt.sign(
                {
                  data: 'foobar',
                },
                'secret',
                { expiresIn: '1h' }
              );
              res.send({
                userName: user.username,
                token: jwtValue,
              });
            } else {
              res.sendStatus(401);
            }
          }
        );
      }
    }
  );
});

app.get('/category', checkToken, (req, res) => {
  const response = db.all('SELECT * FROM category', function (err, rows) {
    res.send(rows);
  });

  return response;
});

app.post('/category', checkToken, (req, res) => {
  db.run(
    'INSERT INTO category (description) VALUES ($category)',
    { $category: req.body.category },
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ message: 'An Item cant be added twice' });
        } else {
          res.status(500).json({ message: err.message });
        }
      } else {
        res.status(200).json({ message: 'inserted' });
      }
    }
  );
});

app.get('/units', checkToken, (req, res) => {
  const response = db.all('SELECT * FROM units', function (err, rows) {
    res.send(rows);
  });

  return response;
});

app.post('/units', checkToken, (req, res) => {
  db.run(
    'INSERT INTO units (description) VALUES ($unit)',
    { $unit: req.body.unit },
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ message: 'An Item cant be added twice' });
        } else {
          res.status(500).json({ message: err.message });
        }
      } else {
        res.status(200).json({ message: 'inserted' });
      }
    }
  );
});

app.get('/article', checkToken, (req, res) => {
  const response = db.all(
    'SELECT a.articleId, a.description, a.price, c.description AS "category", u.description AS "unit" FROM article a INNER JOIN units u ON u.unitId = a.unit INNER JOIN category c ON c.categoryId = a.category',
    function (err, rows) {
      res.send(rows);
    }
  );

  return response;
});

app.post('/article', checkToken, (req, res) => {
  db.run(
    'INSERT INTO article ( description, category, price, unit) VALUES ($description,$category, $price, $unit )',
    {
      $description: req.body.newItem.description,
      $category: req.body.newItem.category,
      $price: req.body.newItem.price,
      $unit: req.body.newItem.unit,
    },
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ message: 'An Item cant be added twice' });
        } else {
          res.status(500).json({ message: err.message });
        }
      } else {
        res.status(200).json({ message: 'inserted' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
