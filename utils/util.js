const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() +1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('/')}`
}
const formatTimevip = date => {
  const year = date.getFullYear()
  const month = date.getMonth() +2
  const day = date.getDate() +1

  return `${[year, month, day].map(formatNumber).join('/')}`
}
const yesterdaytime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() +1
  const day = date.getDate()-1

  return `${[year, month, day].map(formatNumber).join('/')}`
}
const formatTime2 = date => {

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[hour, minute].map(formatNumber).join(':')}`
}
const nowYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() +1
  return `${[year, month].map(formatNumber).join('/')}`
}
const ztYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() 
  return `${[year, month].map(formatNumber).join('/')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  formatTime1,
  formatTime2,
  nowYearMonth,
  ztYearMonth,
  yesterdaytime,
  formatTimevip
}
