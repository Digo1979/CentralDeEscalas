import axios from '@axios'

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: 'error',
        label: 'Joaquina',
      },
      {
        color: 'primary',
        label: 'José',
      },
      {
        color: 'warning',
        label: 'Paulo',
      },
      {
        color: 'success',
        label: 'Maria',
      },
      {
        color: 'info',
        label: 'Bia',
      },
    ],
    selectedCalendars: ['Joaquina', 'José', 'Paulo', 'Maria', 'Bia'],
  },
  getters: {},
  mutations: {
    SET_SELECTED_CALENDARS(state, val) {
      state.selectedCalendars = val
    },
  },
  actions: {
    fetchEvents({ state }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/calendar/events', {
            params: {
              calendars: state.selectedCalendars.join(','),
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/calendar/events', { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/apps/calendar/events/${event.id}`, { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEvent(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/apps/calendar/events/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
