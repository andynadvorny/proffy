const database = require('./db.js')
const createProffy = require('./createProffy.js')

database.then(async (db) => {
  proffyValue = {
    name: 'Kim Namjoon',
    avatar: 'https://lh3.googleusercontent.com/x8yCpWUaWPUqPZMutKASgHTjmhoZSmaQw4GzV1mDqmFgvVklbkrN3-PZf4MkJilhqYYK3T9GKX00nNjOycNA2cdM',
    whatsapp: '1199999999',
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, recusandae est. Facilis eligendi doloribus possimus voluptates labore, iure autem debitis eos minima error tempora quos iste quasi molestiae, quo adipisci."
  }
  
  classValue = {
    subject: 1,
    price: '999'
  }

  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 4,
      time_from: 720,
      time_to: 1220
    }
  ]

  await createProffy(db, {proffyValue, classValue, classScheduleValues})

  const selectedProffys = await db.all("SELECT * FROM proffys")
  const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `)
  const selectedClassesSchedule = await db.all(`
    SELECT class_schedules.*
    FROM class_schedules
    WHERE class_schedules.class_id = "1"
    AND class_schedules.weekday = "1"
    AND class_schedules.time_from <= "800"
    AND class_schedules.time_to > "900"
  `);
})