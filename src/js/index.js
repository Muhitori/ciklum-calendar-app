import "../css/style.scss";

document.addEventListener("DOMContentLoaded", function () {
	const eventFilter = document.getElementById("event-filter");
	const newEventButton = document.getElementById("new-event");

	const cells = getCells();

	const eventList = localStorage.getItem("eventList")
		? JSON.parse(localStorage.getItem("eventList"))
		: [];

	getEvents(eventList);

	newEventButton.onclick = function() {
		location.href = "create-event.html";
	};

	eventFilter.onchange = function () {
		if (!(eventFilter.value === "All Members")) {
			const events = eventList.filter(
				(event) => eventFilter.value === event.participants
			);
			clearEvents(events);
			getEvents(events);
		} else {
				clearEvents(eventList);
				getEvents(eventList);
		}
	};

	function getEvents(events) {
		events.forEach(event => {
			let cell = cells[event.timeIndex][event.dayIndex];
			if (!cell.classList.contains("reserved")) {
				cell.classList.add("reserved");
				cell.innerText = event.name;

				const button = document.createElement("button");
				button.classList.add("cell-button");
				button.innerHTML = "X";
				button.onclick = () => { alert(event.participants) };

				cell.appendChild(button)
			}
		});
	}

	function clearEvents() {
		eventList.forEach((event) => {
			let cell = cells[event.timeIndex][event.dayIndex];
			if (cell.classList.contains("reserved")) {
				cell.classList.remove("reserved");
				cell.innerHTML = '';
			}
		});
	}

	function getCells() {
		let cells = [];

		for (let i = 0; i < 9; i++){
			cells[i] = [];
			for (let j = 0; j < 5; j++) {
				cells[i].push(document.getElementById(i + "" + j));
			}
		}

		return cells;
	}
});
