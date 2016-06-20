/*
['ST13','ST1',18.0784069559]
['ST13','ST7',22.4898032553]
['ST7','ST12',21.7644877523]
['ST12','ST2',17.7007389877]
['ST7','ST2',28.5317525961]
['ST1','ST14',14.6491922687]
['ST0','ST14',13.4241953876]
['ST14','ST16',31.4711501922]
['ST2','ST16',8.18661849724]
['ST3','ST16',9.08502372701]
['ST16','ST15',22.9019404036]
['ST5','ST15',12.4994444422]
['ST6','ST15',16.0161905506]
['ST6','ST11',15.6487335245]
['ST10','ST5',26.6294227188]
['ST10','ST4',12.0280595452]
['ST4','ST5',34.3669807383]
['ST4','ST9',22.6763329467]
['ST9','ST3',24.5881054548]
['ST8','ST0',24.2306370949]
['ST0','ST1',19.1897311637]
['ST2','ST3',16.6267878539]
['ST6','ST5',20.6788336432]
*/

var map = {
    ST13:{
        ST1: 18.0784069559,
        ST7: 22.4898032553
        
    },
    
    ST1:{
        ST14:14.6491922687,
    },
    
    ST7:{
        ST12:21.7644877523,
        c:1
    },
    ST12:{
        ST2:17.7007389877,
    }
};

//var graph = new Graph(map);



//Code from the fill box
//var input_room_code = "ST13"; 
//    //Another code from the fill box 
//    var output_roomm_code = "ST14"; 
//
//var path_array = graph.findShortestPath(input_room_code, output_roomm_code);
//
//console.log(path_array);

        //Should gt this path from Python 
        var path_array = ['ST8','ST0','ST2'];
//Get this from the fuction get_array_of_points 
var array_of_points = [];

function show_route(){
    get_array_of_points();
    change_pathcolor();
}


function get_array_of_points () {

    for (var i = 0; i <= (path_array.length-1); i += 1) {
        var point = document.getElementById(path_array[i]);
        array_of_points.push(point);
        console.log(array_of_points);
    }
    
};



function change_pathcolor() {
    for (var i = 0; i <= array_of_points.length; i += 1) {
        //If it is a door. 
        array_of_points[i].style.fill = "#000000";
        
        
//        if (array_of_points[i].class = "Door") {
//            array_of_points[i].fill = "#000000"
//        }
//        //If it is normal 
//        else(
//            array_of_points[i].style.display = "WHAT STYLE FILL TO HAVE?"
//        )

    }
};

