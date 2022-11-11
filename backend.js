import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import cookies from 'cookie-parser';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
let db = new sqlite3.Database('lehrerkalender.db');

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

app.post('/login', (req, res) => {
  db.get(
    'SELECT * FROM lehrer WHERE vorname = $username',
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
          user.passwort,
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
                userName: user.vorname,
                token: jwtValue,
                lehrerId: user.id,
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

app.get('/lehrer', (req, res) => {
  const response = db.all(
    'SELECT id, kuerzel, vorname, nachname, passwort FROM lehrer',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

// Wann wird in lehrer was geposted und wer darf das ? dementsprechend muss hier angepasst werden
app.post('/lehrer', checkToken, (req, res) => {
  db.get(
    'INSERT INTO lehrer (kuerzel, vorname, nachname, passwort) VALUES ( $kuerzel, $vorname, $nachname, $passwort)',
    {
      $kuerzel: req.body.kuerzel,
      $voranme: req.body.vorname,
      $nachname: req.body.nachname,
      $passwort: req.body.passwort,
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

app.get('/faecher', checkToken, (req, res) => {
  const response = db.all(
    'SELECT id, bezeichnung, kuerzel FROM faecher',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

// Wann wird in faecher was geposted und wer darf das ? dementsprechend muss hier angepasst werden
app.post('/faecher', checkToken, (req, res) => {
  db.get(
    'INSERT INTO faecher (bezeichnung, kuerzel) VALUES ($bezeichnung, $kuerzel)',
    {
      $bezeichnung: req.body.bezeichnung,
      $kuerzel: req.body.kuerzel,
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

app.get('/klassen', checkToken, (req, res) => {
  const response = db.all(
    'SELECT id, klassenlehrerId, bezeichnung FROM klassen',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

// Wann wird in klassen was geposted und wer darf das ? dementsprechend muss hier angepasst werden
app.post('/klassen', checkToken, (req, res) => {
  db.all(
    'SELECT faecher.bezeichnung FROM unterricht LEFT JOIN faecher ON faecherId = faecher.id WHERE lehrerId= $lehrerId AND klassenId = (SELECT id FROM klassen WHERE bezeichnung = $bezeichnung);',
    {
      $bezeichnung: req.body.bezeichnung,
      $lehrerId: req.body.lehrerId,
    },
    (err, rows) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({ message: 'inserted', rows });
      }
    }
  );
});

app.get('/noten', checkToken, (req, res) => {
  const response = db.all(
    'SELECT * bemerkung FROM noten',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

// Wann wird in noten was geposted und wer darf das ? dementsprechend muss hier angepasst werden
app.post('/noten', checkToken, (req, res) => {
  db.get(
    'INSERT INTO noten (schuelerId, unterrichtId, datum, typ, note, bemerkung) VALUES ($schuelerId, $unterrichtId, $datum, $typ, $note, $bemerkung) ',
    {
      $schuelierId: req.body.schuelerId,
      $unterrichtId: req.body.unterrichtId,
      $dateum: req.body.datum,
      $typ: req.body.typ,
      $note: req.body.note,
      $bemerkungen: req.body.bemerkungen,
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

app.get('/schueler', checkToken, (req, res) => {
  const response = db.all('SELECT * FROM schueler', function (err, rows) {
    res.send(rows);
  });
  return response;
});

// Wann wird in klassen was geposted und wer darf das ? dementsprechend muss hier angepasst werden
app.post('/schueler', checkToken, (req, res) => {
  db.get(
    'INSERT INTO schueler (vorname, nachname, email) VALUES ($vorname, $nachname, $email)',
    {
      $vorname: req.body.vorname,
      $nachname: req.body.nachname,
      $email: req.body.email,
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

app.get('/schuelerKlasseRef', checkToken, (req, res) => {
  const response = db.all(
    'SELECT * FROM schuelerKlasseref',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

// Wann wird in klassen was geposted und wer darf das ? dementsprechend muss hier angepasst werden // kein gültig bis?
app.post('/schuelerKlasseRef', checkToken, (req, res) => {
  db.get(
    'INSERT INTO schuelerKlasseref (schuelerId, klassenId) VALUES ( $schuelerId, $klassenId)',
    {
      $schuelerId: req.body.schuelerId,
      $klassenId: req.body.klassenId,
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

app.get('/unterricht', checkToken, (req, res) => {
  const response = db.all(
    'SELECT lehrerId, klassenId, faecherId FROM unterricht',
    function (err, rows) {
      res.send(rows);
    }
  );
  return response;
});

app.post('/studentInfo', checkToken, (req, res) => {
  db.get(
    'INSERT INTO noten (schuelerId, unterrichtId, datum, typ, note, bemerkung) VALUES ($schuelerId, $unterrichtId, $datum, $typ, $note, $bemerkung) ',
    {
      $schuelerId: req.body.schuelerId,
      $unterrichtId: req.body.unterrichtId,
      $datum: req.body.datum,
      $typ: req.body.typ,
      $note: req.body.note,
      $bemerkung: req.body.bemerkung,
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
