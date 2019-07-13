var fs = require('fs')
var history = require('./history')
history.load()

var FNAME = '.events.json'

var events;

function load() {
  var file = fs.readFileSync(FNAME)
  events = JSON.parse(file)
}

function getAllEvents() {
  return events;
}

function getNewEventsForUser(id) {
  return events;
  // var events = history.getEventsForUser(id).map(x => x.EventId)
  // return events.filter(x => events.indexOf(x.id) === -1)
}

function getEventById(id){
  var returnEvent;
  events.forEach(function(event){
    if(event.id == id){
      returnEvent = event;
    }
  });
  return returnEvent;

}

module.exports = {
  load: load,
  getNewEventsForUser: getNewEventsForUser,
  getEventById: getEventById
}
