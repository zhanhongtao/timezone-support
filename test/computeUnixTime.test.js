/* global it, expect */

const { getTimeZone, computeUnixTime } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof computeUnixTime === 'function').toBeTruthy()
})

it('converts the time object to the correct UTC timestamp', () => {
  const berlinDate = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const berlinTimestamp = computeUnixTime(berlinDate)
  expect(typeof berlinTimestamp === 'number').toBeTruthy()
  const utcDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  expect(berlinTimestamp).toEqual(utcDate.valueOf())
})

it('accepts an explicit time zone as a parameter', () => {
  const berlin = getTimeZone('Europe/Berlin')
  const berlinDate = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234
  }
  const berlinTimestamp = computeUnixTime(berlinDate, berlin)
  expect(typeof berlinTimestamp === 'number').toBeTruthy()
  const utcDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  expect(berlinTimestamp).toEqual(utcDate.valueOf())
})

it('seconds and milliseconds are optional in the time object', () => {
  const berlinDate = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const berlinTimestamp = computeUnixTime(berlinDate)
  expect(typeof berlinTimestamp === 'number').toBeTruthy()
  const utcDate = new Date(Date.UTC(2018, 0, 2, 9, 30))
  expect(berlinTimestamp).toEqual(utcDate.valueOf())
})

it('recognizes daylight-saving time', () => {
  const berlinDate = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30,
    zone: {
      abbreviation: 'CEST',
      offset: -120
    }
  }
  const berlinTimestamp = computeUnixTime(berlinDate)
  expect(typeof berlinTimestamp === 'number').toBeTruthy()
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30))
  expect(berlinTimestamp).toEqual(utcDate.valueOf())
})
