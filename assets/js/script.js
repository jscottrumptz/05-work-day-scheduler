let timesBlocks = {
    8:"",
    9:"",
    10:"",
    11:"",
    12:"",
    13:"",
    14:"",
    15:"",
    16:""
};

// displays the current day in the header
let displayDay = function() {
    $("#currentDay").text(moment().format("dddd") + ", " + moment().format("MMMM do") + ", " + moment().format("YYYY"));
};

// color code the tasks by their relation to the current time
let updateTimeBlockStatus = function() {

    // capture the current time
    let presentHour = moment().format("H");

    // for loop that will run through all the block ids
    for(i=0 ; i<9 ;i++) {

        // capture the curret textfield id
        let block = $(`#${i + 8}`);

        // compare the current time to the textfield id and add the class to color it accordingly
        if ((i+8) < parseInt(presentHour)){
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

// function to load saved entries from local storage
let loadTimeBlocks = function() {
    timeBlocks = JSON.parse(localStorage.getItem("timesBlocks"));
  
    // if nothing in localStorage, create an empty timeBlocks object
    if (!timeBlocks) {
        timeBlocks = {
        8:"",
        9:"",
        10:"",
        11:"",
        12:"",
        13:"",
        14:"",
        15:"",
        16:""
      };
    }

    updateTimeBlockStatus();

  };
  
// function to save entries into local storage  
let saveTimeBlocks = function() {
    localStorage.setItem("timesBlocks", JSON.stringify(timesBlocks));
  };
  
// display the current day at the top of the page
displayDay();

// check local storage for saved timeBlocks
loadTimeBlocks();

// So that the user doesn't need to refresh, check every 60 secs to...
setInterval(function(){

    // display the current day
    displayDay();

    // update the status of the timeBlocks
    updateTimeBlockStatus();

    // interval set to perform theses functions every 60 secs
}, 1000 * 60);




