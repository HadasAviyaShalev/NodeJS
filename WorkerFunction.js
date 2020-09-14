const express = require('express');//רפרנס למחלקה
const router = express.Router()// מופע של המחלקה
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var worker = require('./classes/Worker');
const url = 'mongodb://localhost:27017';
const dbName = 'workerDB';
var dateTime = require('node-datetime');
const { Console } = require('console');
var w = new worker();

router.post('/getWorkerByID', function (req, res) {

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    col.findOne({ WorkerID: req.body.WorkerID }, function (err, result) {
      if (err) {
        res.send('<b>error</b>');
      }
      else {
        w = result;
        res.send(w);
      }
    });
  });
});


///////
router.post('/addWorker', function (req, res) {
  var obj = {
    table: []
  };

  const url = 'mongodb://localhost:27017';
  const dbName = 'workerDB';
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    req.body.isActive = true;
    col.insertOne(req.body, function (err, result) {
      if (err) {
        res.status(500);
        res.send(' 👎נסה שנית');
      } else {
        res.send('👍 פרטיך נקלטו בהצלחה ');
        emp = req.body;
        fs.readFile('employees.json', 'utf-8', (err, buffer) => {
          if (err) return console.error('File read error: ', err)
          var newValue = buffer.slice(0, buffer.length - 1);
          newValue += ',';
          newValue += JSON.stringify(emp);
          newValue += ']';
          fs.writeFile("employees.json", newValue, err => {
            if (err) return console.error('File write error:', err);
            else { console.log("succesully"); }
          });
        });
      }
    });
  });
});
router.post('/removeWorker', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    var newValues = { $set: { isActive: false } };
    col.updateOne(req.body, newValues, function (err, result) {
      if (err) {
        res.status(500);
        res.send('<b>error</b>');
      } else {
        res.send('<b>sucess</b>');
      }
    });
  });
});


router.post('/GetWorker', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    col.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});
router.post('/UpdateW', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('Workers');
    //var newValues = req.body;
    var newValues = { $set: { WorkerID: req.body.WorkerID, WorkerFName: req.body.WorkerFName, WorkerLName: req.body.WorkerLName, WorkerAddres: req.body.WorkerAddres, WorkerFhone: req.body.WorkerFhone, WorkerMail: req.body.WorkerMail } };
    col.updateOne(w, newValues, function (err, result) {
      if (err) {
        res.status(500);
        res.send('<b>error</b>');
      } else {
        res.send(' עובד בעל ת"ז מספר ' + req.body.WorkerID + " עודכן ");
      }
    });
  });
});
//add a presence hours
router.post('/addingHour', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      const col = client.db(dbName).collection('Presence');
      req.body.date = new Date(req.body.date);
      col.insertOne(req.body, function (err, result) {
          if (err) {
              res.send(' 👎נסה שנית');
          } else {
              res.send('נוסף בהצלחה');
              fs.exists(req.body.WorkerIdP, function (exists) {
                  var dt = dateTime.create(req.body.date);
                  var formatted = dt.format('m/d/Y H:M:S');
                  req.body.date = formatted;
                  var str = JSON.stringify(req.body);
                  fs.appendFile(req.body.WorkerIdP, str, function (err) {
                      if (err) throw err;
                      console.log('Saved!');
                  });
              });

          }
      });
  });
});


//show all the presence of emplyee by pressing ID
router.post('/showPresence', function (req, res) {
      
  if (fs.existsSync(req.body.WorkerIdP)) {

      var sumHour = fs.readFileSync(req.body.WorkerIdP).toString();
      console.log(sumHour);
      if (sumHour != "") {
          res.send(sumHour);
      }
      else {
          res.send("אין נוכחות , יש למלא שעות ")
      }
  }
  else {
      res.send("אין נוכחות , יש למלא שעות ")
  }
});
module.exports = router;