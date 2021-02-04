import "../css/style.scss";

document.addEventListener("DOMContentLoaded", function () {
	const eventFilter = document.getElementById("event-filter");
	const newEventButton = document.getElementById("new-event");

	const cells = getCells();

	let eventList = localStorage.getItem("eventList")
		? JSON.parse(localStorage.getItem("eventList"))
		: [];

	getEvents(eventList);

	newEventButton.onclick = function() {
		location.href = "create-event.html";
	};

	eventFilter.onchange = function () {
		if (!(eventFilter.value === "All Members")) {
			const events = eventList.filter((event) => eventFilter.value === event.participants);
			clearEvents();
			getEvents(events);
		} else {
			clearEvents();
			getEvents(eventList);
		}
	};

	function getEvents(events) {
		events.forEach(event => {
			let cell = cells[event.timeIndex][event.dayIndex];
			if (!cell.classList.contains("reserved")) {
				cell.classList.add("reserved");
				cell.innerText = event.name;
				cell.appendChild(createButton(event,cell))
			}
		});
	}

	function createButton(event, cell) {
		const button = document.createElement("button");
		button.classList.add("cell-button");
		button.innerHTML = "X";

		button.onclick = () => {
			if (!confirm(`Are you sure you want to delete "${event.name}" event?`))
				return;
			
			clearCell(cell);

			eventList = eventList.filter((e) => {
				return (
					e.timeIndex !== event.timeIndex &&
					e.dayIndex !== event.dayIndex
				);
			});

			localStorage.setItem("eventList", JSON.stringify(eventList));
		};
		return button;
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

		function clearEvents() {
			eventList.forEach((event) => {
				let cell = cells[event.timeIndex][event.dayIndex];
				clearCell(cell);
			});
		}

		function clearCell(cell) {
			if (cell.classList.contains("reserved")) {
				cell.classList.remove("reserved");
				cell.innerHTML = "";
			}
		}
});
