import mock from '@/@fake-db/mock'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)

// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const data = {
  events: [
    {
      id: 1,
      name: 'UPA',
      start: date,
      end: nextDay,
      timed: false,
      extendedProps: {
        calendar: 'José',
        url: '',
      },
    },
    {
      id: 2,
      name: 'Emergência 02',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11, date.getHours(), date.getMinutes()),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -11, 23, 59, 59),
      timed: false,
      extendedProps: {
        calendar: 'José',
        url: '',
      },
    },
    {
      id: 3,
      name: 'Emergência 01',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -8),
      timed: false,
      extendedProps: {
        url: '',
        calendar: 'Maria',
      },
    },
    {
      id: 4,
      name: 'UTI 02',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      timed: false,
      extendedProps: {
        calendar: 'Joaquina',
        url: '',
      },
    },
    {
      id: 5,
      name: 'UTI 01',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      timed: false,
      extendedProps: {
        calendar: 'Bia',
        url: '',
      },
    },
    {
      id: 6,
      name: 'PA 03',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      timed: false,
      extendedProps: {
        calendar: 'Pedro',
        url: '',
      },
    },
    {
      id: 7,
      name: 'PA 02',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      timed: false,
      extendedProps: {
        calendar: 'Paulo',
        url: '',
      },
    },
    {
      id: 8,
      name: 'PA 01',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      timed: false,
      extendedProps: {
        calendar: 'José',
        url: '',
      },
    },
    {
      id: 9,
      name: 'Enfermaria 02',
      start: nextMonth,
      end: nextMonth,
      timed: false,
      extendedProps: {
        calendar: 'José',
        url: '',
      },
    },
    {
      id: 10,
      name: 'Enfermaria 01',
      start: prevMonth,
      end: prevMonth,
      timed: false,
      extendedProps: {
        calendar: 'Ronaldo',
        url: '',
      },
    },
  ],
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  const calendars = config.params.calendars.split(',')

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/events').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data)

  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1

  data.events.push(event)

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost(/\/apps\/calendar\/events\/\d+/).reply(config => {
  const { event: eventData } = JSON.parse(config.data)

  // Convert Id to number
  eventData.id = Number(eventData.id)

  const event = data.events.find(e => e.id === Number(eventData.id))
  Object.assign(event, eventData)

  return [200, { event }]
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete(/\/apps\/calendar\/events\/\d+/).reply(config => {
  // Get event id from URL
  let eventId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  eventId = Number(eventId)

  const eventIndex = data.events.findIndex(e => e.id === eventId)
  data.events.splice(eventIndex, 1)

  return [200]
})
