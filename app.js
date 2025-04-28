// Load workouts from local storage
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

displayWorkouts(); // Initial display when the page loads

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Log a new workout
function logWorkout(event) {
    event.preventDefault();

    // Get values from form inputs
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weight = document.getElementById('weight').value;
    const repsInReserve = document.getElementById('reps-in-reserve').value; // 🆕 Capture Reps in Reserve
    const pumpRating = document.getElementById('pump-rating').value; // 🆕 Capture Pump Rating
    const feedback = document.getElementById('feedback').value; // Get the feedback value

    // Create new workout object including feedback
    const newWorkout = { exercise, sets, reps, weight, feedback,  repsInReserve, pumpRating  };

    // Push new workout to workouts array
    workouts.push(newWorkout);

    // Save workouts to local storage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Display updated workout history
    displayWorkouts();

    // Show success notification
    showNotification('Workout Logged Successfully!');

    // Reset the form
    document.getElementById('workout-form').reset();
}

// Display all workouts
function displayWorkouts() {
    const history = document.getElementById('workout-history');
    history.innerHTML = '';

    workouts.forEach((workout, index) => {
        const workoutDiv = document.createElement('div');
        workoutDiv.classList.add('workout-entry'); // Add the animation class here

        workoutDiv.innerHTML = `
            <strong>${workout.exercise}</strong>
            <p>Sets: ${workout.sets} | Reps: ${workout.reps} | Weight: ${workout.weight} lbs</p>
            <p>Reps in Reserve: ${workout.repsInReserve}</p> <!-- 🆕 Display Reps in Reserve -->
            <p>Pump Rating: ${workout.pumpRating} / 10</p> <!-- 🆕 Display Pump Rating -->
            ${workout.feedback ? `<p><em>Feedback:</em> ${workout.feedback}</p>` : ''}
            <button class="edit-btn" onclick="editWorkout(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteWorkout(${index})">Delete</button>
        `;

        history.appendChild(workoutDiv);
    });
}

// Delete a workout
function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    displayWorkouts();
    showNotification('Workout Deleted');
}

// Edit a workout
function editWorkout(index) {
    const workout = workouts[index];

    // Prefill the form with existing workout data
    document.getElementById('exercise').value = workout.exercise;
    document.getElementById('sets').value = workout.sets;
    document.getElementById('reps').value = workout.reps;
    document.getElementById('weight').value = workout.weight;
    document.getElementById('feedback').value = workout.feedback; // Prefill feedback too

    // Remove the old workout
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    displayWorkouts();
}
