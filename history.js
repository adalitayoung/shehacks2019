var fs = require('fs')

var FNAME = '.history.json'

var history;

function load() {
  if(history) {
    return;
  }

  var file = fs.readFileSync(FNAME)
  history = JSON.parse(file)
}

function save() {
  fs.writeFileSync(FNAME, JSON.stringify(history, null, 2))
}

function get() {
  return history;
}

function findUser(id) {
  return history.filter(x => x.Id == id)[0]
}

function saveEvent(id, eventId, eventName, date, hoursWorked) {
  var user = findUser(id)
  user.Events.push({
    "Name": eventName,
    "EventId": eventId, 
    "Date": date.toLocaleDateString(), 
    "Hours": hoursWorked
  })
}

function getEventsForUser(id) {
  return findUser(id).Events
}

function getUsers(ids) {
  return history.filter(x => ids.indexOf(x.Id) !== -1)
}

module.exports = {
  load: load,
  save: save,
  saveEvent: saveEvent,
  getEventsForUser: getEventsForUser,
  get: get,
  getUsers: getUsers
}