
/* -------------------------------------------------------------------------- */
"use strict"

/* -------------------------------------------------------------------------- */
// 🧡 Variables & Refactoring 


// 🔸 general variables: 
let lives_remaining = 9;
let high_score = 0;

// 🔸 Refactoring repeated codes using function:
const display_message = function(para_message) {
    return document.querySelector(".message").textContent = para_message;
}
const display_number = function(para_number) {
    return document.querySelector(".number").textContent = para_number;
}
const display_lives_remaining = function(para_lives) {
    return document.querySelector(".lives").textContent = para_lives;
}

/* -------------------------------------------------------------------------- */
// 🧡 Game functionality 
//1. Return a value when the button(clicked) is clicked 
//2. Check if the guess number is correct, too high or too low:
//3. Reduces remaining lives everytime user get the wrong answer:
//4. When the remaining lives reach zero, game over:
//5. When the player win, the background change to green color:

// 📣 Reminder: usually whenever we get something from the user interface, 
// for example, from an input field, it usually always is a string.

const check_button_functionality = function () {
    const input_guess = Number(document.querySelector(".guess").value);
    // test
    console.log(input_guess);
    // When there is no input
    if (!input_guess) {
        display_message("No Number...🤨")
    }
    // When player win
    else if (input_guess === random_number) {
        display_message("Correct Number!!🎉")
        document.querySelector("body").style.backgroundColor = "#60b347";
        display_number(random_number)
        // keep the highscore
        if (lives_remaining > high_score) {
            high_score = lives_remaining;
            document.querySelector(".highscore").textContent = high_score;
        }
    }

    // 🔸 When player get the wrong answer (After Refactoring) 
    else if (input_guess !== random_number) {
        if (lives_remaining > 1) {
            // message when get the wrong answer
            display_message (input_guess > random_number ? "Too High!!😝📈" : "Too Low!!😝📉") // Ternary operator
            // lives_remaining
            lives_remaining = lives_remaining - 1; // same as = lives_remaining --
            display_lives_remaining(lives_remaining)
        }
        else {
            display_message("GAME OVER💥")
            display_lives_remaining(lives_remaining - 1)
            display_number(random_number)
            document.querySelector("body").style.backgroundColor = "hsl(0, 100%, 30%)";
        }
    }
}

/* -------------------------------------------------------------------------- */
// 🧡 Define the secret number 

let random_number = Math.trunc(Math.random() * 20) + 1;
// 🔸 Show the number:
// document.querySelector(".number").textContent = random_number;

/* -------------------------------------------------------------------------- */
// 🧡 button functionality 


document.querySelector(".check")
.addEventListener("click", function() {
    check_button_functionality()
});

/* -------------------------------------------------------------------------- */
// 🧡 Press Enter keypress to perform the function 

document.addEventListener("keydown", function(para_key) {
    if (para_key.key === "Enter") {
        check_button_functionality();
    }
});

/* -------------------------------------------------------------------------- */
// 🧡 Reset the game if player want to play again 

document.querySelector(".again").addEventListener("click", function() {
    random_number = Math.trunc(Math.random() * 20) + 1; // reset random number
    lives_remaining = 9;
    display_message("Start guessing...")
    display_lives_remaining(lives_remaining)
    display_number("?")
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
})