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

		if (name < 1) {
			showError("Enter event name!");
			return;
		}

		const participants = participantsSelect.value;

		const dayIndex = dayIndexSelect.value;
		const timeIndex = timeIndexSelect.value;

		if (dateIsValid(dayIndex, timeIndex)) {
			showError("Event date already reserved!");
			return;
		}

		eventList.push(new EventDTO(name, participants, dayIndex, timeIndex));

		localStorage.setItem("eventList", JSON.stringify(eventList));

		location.href = "/";
	};
  document.getElementById("cancel-event").onclick = function () {
		location.href = "/";
	};

	function dateIsValid(dayIndex, timeIndex) {
		return eventList.some((event) => {
			return (
				event.timeIndex == timeIndex &&
				event.dayIndex == dayIndex
			);
		});
	}

	function showError(str) {
		const form = document.querySelector("form");
		const myAlert = document.createElement("div");

		if (document.querySelector(".alert"))
			return;
		
		myAlert.innerText = str;
		myAlert.classList.add("alert", "alert-danger", "custom-alert");

		myAlert.appendChild(createButton(myAlert));
		form.appendChild(myAlert);
	}

		function createButton(element) {
			const button = document.createElement("button");
			button.classList.add("alert");
			button.innerHTML = "X";

			button.onclick = () => {
				element.classList.clear();
				element.innerHTML = '';
			};

			return button;
		}

});