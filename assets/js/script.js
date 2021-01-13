// set an array of 17 empty values to so that it's index can correspond with military time (if later hours are needed, simply add to the array)
let timeBlocks = [ "","","","","","","","","","","","","","","","",""];

// displays the current day in the header
let displayDay = function() {
    $("#currentDay").text(moment().format("dddd") + ",  " + moment().format("MMM Do") + ", " + moment().format("YYYY"));
};

// color code the time blocks by their relation to the current time
let updateTimeBlockStatus = function() {

    // capture the current time
    let presentHour = moment().format("H");

    // for loop that will run through all the textarea ids
    for(i=0 ; i<9 ;i++) {

        // capture the curret textarea id
        let block = $(`#${i + 8}`);

        // compare the current time to the textarea id
        if ((i+8) < parseInt(presentHour)){
            // remove old classes and add the new class to format it accordingly
            block.removeClass("present future");
            block.addClass("past");
        } else if ((i+8) === parseInt(presentHour)) {
            block.removeClass("past future");
            block.addClass("present");
        } else {
            block.removeClass("present past");
            block.addClass("future");
        }
    }
}

// function to load saved time block entries from local storage
let loadTimeBlocks = function() {
    timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
  
    // if nothing in localStorage, create an empty timeBlocks array
    if (!timeBlocks) {
        timeBlocks = [ "","","","","","","","","","","","","","","","",""]
    }

    // for loop that will run through all the time blocks in the array
    for(i=8 ; i<17 ;i++) {

    // load the saved data
    $(`#${i}`).text(timeBlocks[i]);
    }

    // format the time blocks
    updateTimeBlockStatus();
  };
  
// function to save entries into local storage  
let saveTimeBlocks = function() {

    // capture the current value and id of the textarea sibling of the clicked button
    let blockText = $(this).prev("textarea").val().trim();
    let blockId = $(this).prev("textarea").attr("id");

    // set array index value to the corisponding textarea id
    timeBlocks[blockId] = blockText

    // save the timeBlocks array to local storage
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));

    loadTimeBlocks();

  };
  
// display the current day at the top of the page
displayDay();

// check local storage for saved timeBlocks
loadTimeBlocks();

// so that each time block's status automatically updates, check every 60 secs to...
setInterval(function(){

    // display the current day
    displayDay();

    // update the status of the time blocks
    updateTimeBlockStatus();

    // interval set to perform theses functions every 60 secs
}, 1000 * 60);

// save button click calls the saveTimeBlocks function
$(".time-block").on("click", ".btn", saveTimeBlocks);

// initialize bootstrap tootips
$(".saveBtn").ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
});

// hide the icon's saved tooltip after 3 seconds
$(".saveBtn").on("click", function(){
    setTimeout(function(){ $('[data-bs-toggle="tooltip"]').tooltip("hide");}, 3000);
});

// code for after this is graded 
// automatically save whenever the user clicks out of the textarea
// $("textarea").on("blur", function () {

//     console.log(this);

//     let blockText = $(this).val().trim();
//     let blockId = $(this).attr("id");
    
//     $(this).css("color", "black");

//     timeBlocks[blockId] = blockText

//     localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));

//     updateTimeBlockStatus();
// });