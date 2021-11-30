export default class DateFormat {
  constructor(year = 0, month = 0, day = 0) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  setDate(dt){
    this.year = dt.getFullYear()
    this.month = dt.getMonth() + 1
    this.day = dt.getDate()

    return this
  }

  toString() {
    let monthStr, dayStr;

    if (this.month < 10) {
      monthStr = `0${this.month}`;
    } else {
      monthStr = `${this.month}`;
    }

    if (this.day < 10) {
      dayStr = `0${this.day}`;
    } else {
      dayStr = `${this.day}`;
    }

    return `${this.year}-${monthStr}-${dayStr}`;
  }
}
