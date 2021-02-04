export class EventDTO {
  constructor(name, participants, dayIndex, timeIndex) {
    this.name = name;
    this.participants = participants;
    this.dayIndex = dayIndex;
    this.timeIndex = timeIndex;
  }
}