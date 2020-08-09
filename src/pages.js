// Database 
const database = require('./database/db')

// Utils
const { subjects, weekdays, convertTimeToMinutes, getSubject } = require('./utils/format')

// Functions
function pageLanding(req, res) {
  return res.render("index.html")
}

function pageSuccess(req, res) {
  const subject = req.query.subject
  const weekday = req.query.weekday
  const time = req.query.time

  return res.render("success.html", {
    subject: subject,
    weekday: weekday,
    time: time
  })
}

async function pageStudy(req, res) {
  const filters = req.query

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", { filters, subjects, weekdays })
  }

  const desiredTime = convertTimeToMinutes(filters.time)

  const query = `
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(
      SELECT class_schedules.*
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${desiredTime}
      AND class_schedules.time_to > ${desiredTime}
    )
    AND classes.subject = ${filters.subject}
  `
  try {
    const db = await database
    const proffys = await db.all(query)

    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject)
    })

    return res.render("study.html", { proffys, filters, subjects, weekdays })
  } catch (error) {
    console.log(error)
  }
}

function pageTeach(req, res) {
  return res.render("teach.html", { subjects, weekdays })
}

async function saveProffy(req, res) {
  const createProffy = require('./database/createProffy')
  
  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio
  }
  
  const classValue = {
    subject: req.body.subject,
    price: req.body.price
  }

  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertTimeToMinutes(req.body.time_from[index]),
      time_to: convertTimeToMinutes(req.body.time_to[index])
    }
  })

  try {
    const db = await database
    await createProffy(db, { proffyValue, classValue, classScheduleValues})

    var queryString = "?subject=" + req.body.subject 
    queryString += "&weekday=" + req.body.weekday[0]
    queryString += "&time=" + req.body.time_from[0]

    return res.redirect("/success" + queryString)
  } catch (error) {
    console.log(error)
  }  
}

module.exports = {
  pageLanding,
  pageSuccess,
  pageStudy,
  pageTeach,
  saveProffy
}