let currentUser = ''; // To store the current user's username
let workouts = []; // To store workouts

// Function to handle user login
function login() {
    currentUser = document.getElementById('username').value.trim();
    if (currentUser === '') {
        alert('Please enter a username!');
        return;
    }

    // Check if user data exists in localStorage
    const storedWorkouts = localStorage.getItem(currentUser);
    if (storedWorkouts) {
        workouts = JSON.parse(storedWorkouts);
    } else {
        workouts = [];
    }

    // Hide login form and show workout form
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('workout-form').style.display = 'block';
    document.getElementById('workout-history').style.display = 'block';

    displayWorkouts();
}

// Function to save the workout
function saveWorkout() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weight = document.getElementById('weight').value;
    const feedback = document.getElementById('feedback').value;
    const repsInReserve = document.getElementById('reps-in-reserve').value;
    const pumpRating = document.getElementById('pump-rating').value;

    if (!exercise || !sets || !reps || !weight) {
        alert('Please fill out all fields!');
        return;
    }

    const newWorkout = {
        exercise,
        sets,
        reps,
        weight,
        feedback,
        repsInReserve,
        pumpRating
    };
    workouts.push(newWorkout);

    // Save to localStorage under current username
    localStorage.setItem(currentUser, JSON.stringify(workouts));

    // Clear form and display updated workouts
    document.getElementById('exercise').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('feedback').value = '';
    document.getElementById('reps-in-reserve').value = '';
    document.getElementById('pump-rating').value = '';

    displayWorkouts();
}

// Function to display all workouts
function displayWorkouts() {
    const workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = ''; // Clear the list

    workouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${workout.exercise}</strong> - Sets: ${workout.sets}, Reps: ${workout.reps}, Weight: ${workout.weight}
            <br>Feedback: ${workout.feedback}
            <br>Reps in Reserve: ${workout.repsInReserve}, Pump Rating: ${workout.pumpRating}
            <button onclick="editWorkout(${index})">Edit</button>
            <button onclick="deleteWorkout(${index})">Delete</button>
        `;
        workoutList.appendChild(li);
    });
}

// Function to delete a workout
function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem(currentUser, JSON.stringify(workouts));
    displayWorkouts();
}

// Function to edit a workout
function editWorkout(index) {
    const workout = workouts[index];

    // Populate the form with the selected workout
    document.getElementById('exercise').value = workout.exercise;
    document.getElementById('sets').value = workout.sets;
    document.getElementById('reps').value = workout.reps;
    document.getElementById('weight').value = workout.weight;
    document.getElementById('feedback').value = workout.feedback;
    document.getElementById('reps-in-reserve').value = workout.repsInReserve;
    document.getElementById('pump-rating').value = workout.pumpRating;

    // Remove the workout and allow re-entry
    deleteWorkout(index);
}
