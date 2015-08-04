var numGroups = 0;
var peopleArray = [];

function shuffleKids(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};
function appendallthebuttons() {
    for (var i = 2; i < 12; i++){
        $('.moButtons').append('<button class=groupButton data-number="'+i+'">'+i+'</button>');
    }
    $('.moButtons').append('<button class="randomize">randomize</button>');
}
function splitTeams (array) {
    //remove kids of groups
    for (var i = 1; i <= numGroups; i++) {
        $('.groups').append('<div class="teams' + i + '">Team: ' +(i)+ '</div>');
    }
    var groupIndex = 1;
    for (var j = 0; j < array.length; j++) {
        $('.teams' + groupIndex).append('<p>' + peopleArray[j] + '</p>');
        if (groupIndex < numGroups) {
            groupIndex++;
        } else {
            groupIndex = 1;
        }
    }
}
$(document).ready(function (){
    $.ajax({
        url: "/data",
        success: function(data){
            console.log(data);
            appendallthebuttons();//appends buttons on page load
            $.each(data, function() { //each loop to push names to the peepsArray
                peopleArray.push(this.name);
            });
        }
    });
    $('body').on('click','.groupButton', function() {//add data attributes
        numGroups = $(this).data("number");
        console.log(numGroups);
    });
    $('body').on('click','.randomize', function() {
        shuffleKids(peopleArray);
        console.log(peopleArray);
        splitTeams(peopleArray);
    });
});