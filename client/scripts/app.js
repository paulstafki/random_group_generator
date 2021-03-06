var numGroups = 0;
var peopleArray = [];

function shuffleKids(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

function appendallthebuttons() {
    for (var i = 2; i < 12; i++){
        $('.moButtons').append('<button class=groupButton data-number="'+i+'">'+i+'</button>'); //assigns a data attribute to the html based on 'i' - which is the current iteration of the for loop
    }
    $('.moButtons').append('<button class="randomize">randomize</button>');
}

function splitTeams (array) {
    $('.groups').children().remove();
    for (var i = 1; i <= numGroups; i++) {
        $('.groups').append('<div class="teams' + i + ' teamsies"><h2>Team: ' + i + '</h2></div>');
    }
    var groupIndex = 1;
    for (var j = 0; j < array.length; j++) {
        $('.teams' + groupIndex).append('<p>' + array[j] + '</p>');
        $('.teams' + groupIndex + ' p').last().hide().delay(200 * j).fadeIn();     //NOTE THE SPACE BETWEEN THE CLASS AND P!!!!!!!!1
        if (groupIndex < numGroups) {
            groupIndex++;
        } else {
            groupIndex = 1;
        }
    }
}

$(document).ready(function (){
    appendallthebuttons();//appends buttons on page load
    $.ajax({
        url: "/data",
        success: function(data){
            console.log(data);
            $.each(data, function() { //each loop to push names to the peepsArray
                peopleArray.push(this.name);
            });
        }
    });
    $('body').on('click','.groupButton', function() {//add data attributes
        numGroups = $(this).data("number");//this assigns the number of the button to the numGroups variable using a data attribute in the html
        $('.groupButton').css({"background-color" : "#C6C6C6"});
        $(this).css({"background-color" : "#005c7e"});
        console.log(numGroups);
    });
    $('body').on('click','.randomize', function() {
        shuffleKids(peopleArray);
        console.log(peopleArray);
        splitTeams(peopleArray);
    });
});