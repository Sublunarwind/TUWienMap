var Graph = (function (undefined) {

	var extractKeys = function (obj) {
		var keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	var sorter = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var findPaths = function (map, start, end, infinity) {
		infinity = infinity || Infinity;

		var costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		var addToOpen = function (cost, vertex) {
			var key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		}

		costs[start] = 0;

		while (open) {
			if(!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

			var key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

			if (!bucket.length) delete open[key];

			for (var vertex in adjacentNodes) {
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					var cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];

					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			return predecessors;
		}

	}

	var extractShortest = function (predecessors, end) {
		var nodes = [],
		    u = end;

		while (u) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	var findShortestPath = function (map, nodes) {
		var start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);
				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	var toArray = function (list, offset) {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			var a = [];
			for (var i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}

	var Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.findShortestPath = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(this.map, start);
		} else if (arguments.length === 2) {
			return findShortestPath(this.map, [start, end]);
		} else {
			return findShortestPath(this.map, toArray(arguments));
		}
	}

	Graph.findShortestPath = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(map, start);
		} else if (arguments.length === 3) {
			return findShortestPath(map, [start, end]);
		} else {
			return findShortestPath(map, toArray(arguments, 1));
		}
	}

	return Graph;

})();


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
//The global path array. 
var globpath_array = [];
function newroute(){

//Put the routing graph in here
//var map = {
//    ST13:{
//        ST1: 18.0784069559,
//        ST7: 22.4898032553,
//        
//    },
//    
//    ST1:{
//        ST14:14.6491922687,
//    },
//    
//    ST7:{
//        ST12:21.7644877523,
//        ST13:10,
//    },
//    ST12:{
//        ST2:17.7007389877,
//    }
//};
    
var map = { ST0:{ST14:13.4241953876
,ST8:24.2306370949
,ST1:19.1897311637
,},
ST1:{ST13:18.0784069559
,ST14:14.6491922687
,ST0:19.1897311637
,},
ST2:{ST12:17.7007389877
,ST7:28.5317525961
,ST16:8.18661849724
,ST3:16.6267878539
,},
ST3:{ST16:9.08502372701
,ST9:24.5881054548
,ST2:16.6267878539
,},
ST4:{ST10:12.0280595452
,ST5:34.3669807383
,ST9:22.6763329467
,},
ST5:{ST15:12.4994444422
,ST10:26.6294227188
,ST4:34.3669807383
,ST6:20.6788336432
,},
ST6:{ST15:16.0161905506
,ST11:15.6487335245
,ST5:20.6788336432
,},
ST7:{ST13:22.4898032553
,ST12:21.7644877523
,ST2:28.5317525961
,},
ST8:{ST0:24.2306370949
,},
ST9:{ST4:22.6763329467
,ST3:24.5881054548
,},
ST10:{ST5:26.6294227188
,ST4:12.0280595452
,},
ST11:{ST6:15.6487335245
,},
ST12:{ST7:21.7644877523
,ST2:17.7007389877
,},
ST13:{ST1:18.0784069559
,ST7:22.4898032553
,},
ST14:{ST1:14.6491922687
,ST0:13.4241953876
,ST16:31.4711501922
,},
ST15:{ST16:22.9019404036
,ST5:12.4994444422
,ST6:16.0161905506
,},
ST16:{ST14:31.4711501922
,ST2:8.18661849724
,ST3:9.08502372701
,ST15:22.9019404036
,}
};

    
    

var graph = new Graph(map);

var form_start = searchbox.fname.value;
console.log(form_start);
var form_destination=searchbox.lname.value;
    
//Code from the fill box
var input_room_code = form_start; 
    //Another code from the fill box 
    var output_roomm_code = form_destination;

var path_array = graph.findShortestPath(input_room_code, output_roomm_code);

console.log(path_array);
globpath_array = path_array;

}


var array_of_points = [];

function show_route(){
    
    resetcolours();
    newroute();
    get_array_of_points();
    change_pathcolor();
}


function get_array_of_points () {

    for (var i = 0; i <= (globpath_array.length-1); i += 1) {
        var point = document.getElementById(globpath_array[i]);
        array_of_points.push(point);
        console.log("array of points " );
        console.log(array_of_points);
    }
    
};

var array_of_points_colours=[];


function change_pathcolor() {
    for (var i = 0; i <= (array_of_points.length - 1); i += 1) {
        
        array_of_points_colours.push(array_of_points[i].getAttribute("fill"));
       
        array_of_points[i].style.fill = "#000000";
        
 console.log(array_of_points_colours);        
    }
   
};


function resetcolours(){
    console.log(array_of_points_colours);
    for (var i = 0; i <= (array_of_points.length - 1); i += 1) {
    array_of_points[i].style.fill = array_of_points_colours[i];
}
    
    array_of_points.length=0;
    array_of_points_colours.length= 0; 
console.log(array_of_points_colours); 
};

function resetarray(){
    array_of_points.length=0;
    array_of_points_colours.length= 0; 
console.log(array_of_points_colours);      
};

function reset() {
    resetcolours();
    resetarray();
};