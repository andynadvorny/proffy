const subjects = [
  "Art",
  "Biology",
  "Chemistry",
  "English",
  "Geography",
  "History",
  "Math",
  "Physics",
  "Science"
]

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

function getSubject(subjectIndex) {
  const arrayPosition = +subjectIndex - 1
  return subjects[arrayPosition]
}

function convertTimeToMinutes(time) {
  const [ hour, minutes ] = time.split(':')
  return Number((hour * 60) + minutes)
}

module.exports = {
  subjects, 
  weekdays,
  convertTimeToMinutes,
  getSubject
}