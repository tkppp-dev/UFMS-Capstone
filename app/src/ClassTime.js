export default class ClassTime {
  constructor(index) {
    this.hour = 9;
    this.minute = 0;

    this.setTime(index);
  }

  setTime(index) {
    for (let i = 0; i < index; i++) {
      this.hour += 1;
      if (this.minute === 0) {
        this.minute = 30;
      } else {
        this.hour += 1;
        this.minute = 0;
      }
    }
  }

  isBeforeTime(year, month, day) {
    const dt = new Date(year, month, day, this.hour, this.minute);
    const now = new Date();

    if (dt < now) {
      return true;
    } else {
      return false;
    }
  }

  toString() {
    let hourStr, minuteStr;

    if (this.hour < 10) {
      hourStr = `0${this.hour}`;
    } else {
      hourStr = `${this.hour}`;
    }

    if (this.minute < 10) {
      minuteStr = `0${this.minute}`;
    } else {
      minuteStr = `${this.minute}`;
    }

    return `${hourStr}:${minuteStr}`;
  }

  getISOString({ year, month, day }) {
    const dt = new Date(year, month - 1, day, this.hour, this.minute);

    return new Date(
      dt.getTime() - dt.getTimezoneOffset() * 60000
    ).toISOString();
  }
}
