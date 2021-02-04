import "../css/style.scss";
import { EventDTO } from './event.dto.js';

document.addEventListener("DOMContentLoaded", function () {
	console.log(localStorage);

	const nameInput = document.getElementById("name-input");
	const participantsSelect = document.getElementById("participants-select");
	const dayIndexSelect = document.getElementById("dayIndex-select");
	const timeIndexSelect = document.getElementById("timeIndex-select");

	let eventList = localStorage.getItem("eventList")
		? JSON.parse(localStorage.getItem("eventList"))
		: [];
	
	console.log(eventList);

	document.getElementById("create-event").onclick = function () {
		const name = nameInput.value;
		const participants = participantsSelect.value;
		const dayIndex = dayIndexSelect.value;
		const timeIndex = timeIndexSelect.value;

		eventList.push(new EventDTO(name, participants, dayIndex, timeIndex));

		localStorage.setItem("eventList", JSON.stringify(eventList));

		location.href = "/";
	};
  document.getElementById("cancel-event").onclick = function () {
		location.href = "/";
	};
});