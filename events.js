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
  var events = history.getEventsForUser(id).map(x => x.EventId)
  return events.filter(x => events.indexOf(x.Id) == -1)
}

module.exports = {
  load: load,
  getNewEventsForUser: getNewEventsForUser
}