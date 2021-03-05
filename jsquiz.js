// JSON : javascript object notation
// Correct answer refers to the index of element in choices array be careful
var questions = [{
    question: "Question1",
    choices: ["option1", "option2", "option3", "option4"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {

    // Display the first question and intializing the buttons
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(document).find(".seeResultsButton").hide();
    $(document).find(".submitButton").text("Submit");

    // auto-hide the quiz Message is a value is selected
    $("input[type='radio']").change(function() {
        $(document).find(".quizMessage").hide();
    });



    // On clicking submit, display the next question
    $(this).find(".submitButton").on("click", function() {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....


                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                }
                // When all questions where submitted
                else if (currentQuestion == questions.length) {
                    $(document).find(".submitButton").hide();
                    $(document).find(".seeResultsButton").text("See Results");
                    $(document).find(".seeResultsButton").show();
                    $(document).find(".seeResultsButton").click(function() {
                        displayScore();


                        $(document).find(".submitButton").text("Play Again?");
                        $(document).find(".submitButton").show();
                        $(document).find(".seeResultsButton").hide();
                        quizOver = true;
                    });

                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".submitButton").text("Submit");

            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}