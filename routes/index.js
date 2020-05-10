var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('connected');
});


router.post('/addEvent', function (req, res, next) {
  var ref = firebase.app().database().ref();
    
  var eventsRef = ref.child("events");
  // Create a new ref and log it’s push key

  let dateTime = new Date()
 
  try  {
    eventsRef.push(
      {
        title: req.body.title,
        dateTime: Number(req.body.dateTime),
        duration: Number(req.body.duration),
        numberRecall: Number(req.body.numberRecall),
        recallDuration: Number(req.body.recallDuration),
        status: req.body.status,
        isLate: false,
        isParentRegistered: false
      }
    );
  } catch(e) {
    res.status(404).send(e);
  }
})

router.get('/getEvents', function (req, res, next) {
  var ref = firebase.app().database().ref();
    
  var eventsRef = ref.child("events");
  // Create a new ref and log it’s push key

  let events =  [];

  let status = false;

  eventsRef.once("value").then(function(snapshot) {

    if(snapshot) {
        snapshot.forEach(function(child) {   
          let newObject = Object.assign({}, child.val());
          newObject.id = child.key;      
          events.push(newObject);
        });
    }
  }).then(function() {
    res.status(200).send(events);
  });
})


router.post('/updateEvent', function(req, res, next) {


  console.log(req.params, req.query, req.body);

  var ref = firebase.app().database().ref('/events/'+ req.query.id);

  console.log('eventID currently updating....', req.query);

  let dateTime = new Date();
  ref.set({
    title: "updatedEvent from server",
    dateTime: dateTime.getTime(),
    duration: 10,
    numberRecall: 2,
    recallDuration: 5,
    status: "onWork"
  }, function(error) {
    if (error) {
      res.status(401).send('update Event Failed');
    } else {
      res.status(200).send('successful update');
    }
  });
    
});


router.get('/getAlarms', function (req, res, next) {
  var ref = firebase.app().database().ref();
    
  var eventsRef = ref.child("alarms");
  // Create a new ref and log it’s push key

  let events =  [];

  let status = false;

  eventsRef.once("value").then(function(snapshot) {

    if(snapshot) {
        snapshot.forEach(function(child) {   
          let newObject = Object.assign({}, child.val());
          newObject.id = child.key;      
          events.push(newObject);
        });
    }
  }).then(function() {
    res.status(200).send(events);
  });
});

router.post('/addAlarm', function (req, res, next) {
  var ref = firebase.app().database().ref();
    
  var alarmsRef = ref.child("alarms");
  // Create a new ref and log it’s push key

  let dateTime = new Date() 

  console.log(req.body);
  try  {

    req.body.recurrancy = req.body.recurrancy.split(",");
    alarmsRef.push(
      {
        title: req.body.title,
        recurrancy: req.body.recurrancy,
        repetitingTime: Number(req.body.repetitingTime),
        isActived: Boolean(req.body.isActived),
        dateTime: Number(req.body.dateTime)
      }
    );
  } catch(e) {
    console.log(e);
    res.status(404).send(e);
  }
})

module.exports = router;
