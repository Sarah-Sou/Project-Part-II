// Load habits on index.html
if (document.URL.includes("index.html")) {
    loadHabits();
}

// Save habit from create.html
function saveHabit(event) {
    event.preventDefault();

    let name = document.getElementById("habitName").value;
    let frequency = document.getElementById("frequency").value;
    let status = document.getElementById("status").value;

    if (name.trim() === "") {
        alert("Please enter a habit name");
        return;
    }

    // Load saved habits or empty list
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    habits.push({
        name: name,
        frequency: frequency,
        status: status
    });

    localStorage.setItem("habits", JSON.stringify(habits));

    window.location = "index.html"; // go back to list
}

// Show habits in table
function loadHabits() {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    let table = document.getElementById("habitTable");

    habits.forEach((habit, index) => {
        let row = table.insertRow();

        row.insertCell(0).textContent = habit.name;
        row.insertCell(1).textContent = habit.frequency;
        row.insertCell(2).textContent = habit.status;

        let actions = row.insertCell(3);
        actions.innerHTML = `
            <button onclick="deleteHabit(${index})">Delete</button>
        `;
    });
}


