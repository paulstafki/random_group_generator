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

//function splitTeams (array) {
//    for (var j = 0; j < array.length; j++) {
//        $().append()
//    }
//}

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
        console.log("randomize!");
        console.log(peopleArray);
        for (var i = 0; i < numGroups; i++) {
            $('.groups').append('<div class="teams">Team: ' +(i+1)+ '</div>');
        }
        for (var j = 0; j < peopleArray.length; j++) {
            $('.teams').append('<p>' + j.value + '</p>');
        }
    });
});
