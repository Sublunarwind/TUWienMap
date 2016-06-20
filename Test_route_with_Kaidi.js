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
    
//var map = { ST0:{ST14:13.4241953876
//,ST8:24.2306370949
//,ST1:19.1897311637
//,},
//ST1:{ST13:18.0784069559
//,ST14:14.6491922687
//,ST0:19.1897311637
//,},
//ST2:{ST12:17.7007389877
//,ST7:28.5317525961
//,ST16:8.18661849724
//,ST3:16.6267878539
//,},
//ST3:{ST16:9.08502372701
//,ST9:24.5881054548
//,ST2:16.6267878539
//,},
//ST4:{ST10:12.0280595452
//,ST5:34.3669807383
//,ST9:22.6763329467
//,},
//ST5:{ST15:12.4994444422
//,ST10:26.6294227188
//,ST4:34.3669807383
//,ST6:20.6788336432
//,},
//ST6:{ST15:16.0161905506
//,ST11:15.6487335245
//,ST5:20.6788336432
//,},
//ST7:{ST13:22.4898032553
//,ST12:21.7644877523
//,ST2:28.5317525961
//,},
//ST8:{ST0:24.2306370949
//,},
//ST9:{ST4:22.6763329467
//,ST3:24.5881054548
//,},
//ST10:{ST5:26.6294227188
//,ST4:12.0280595452
//,},
//ST11:{ST6:15.6487335245
//,},
//ST12:{ST7:21.7644877523
//,ST2:17.7007389877
//,},
//ST13:{ST1:18.0784069559
//,ST7:22.4898032553
//,},
//ST14:{ST1:14.6491922687
//,ST0:13.4241953876
//,ST16:31.4711501922
//,},
//ST15:{ST16:22.9019404036
//,ST5:12.4994444422
//,ST6:16.0161905506
//,},
//ST16:{ST14:31.4711501922
//,ST2:8.18661849724
//,ST3:9.08502372701
//,ST15:22.9019404036
//,}
//};

var map = { 
ST1:{ST2:3.41784585
,},
ST2:{ST1:3.41784585
,ST3:2.50492000
,ST10:3.11971694
,},
ST3:{ST2:2.50492000
,ST4:2.50492000
,ST6:1.28029279
,},
ST4:{ST3:2.50492000
,ST5:2.85087623
,},
ST5:{ST4:2.85087623
,},
ST6:{ST3:1.28029279
,ST7:1.67365915
,},
ST7:{ST6:1.67365915
,ST8:1.93794941
,},
ST8:{ST7:1.93794941
,ST9:1.73811715
,},
ST9:{ST8:1.73811715
,},
ST10:{ST2:3.11971694
,ST11:1.58705708
,},
ST11:{ST10:1.58705708
,ST12:3.95494448
,ST15:1.87039523
,ST26:3.11795953
,},
ST12:{ST11:3.95494448
,ST13:1.77543586
,},
ST13:{ST12:1.77543586
,ST14:1.62344791
,},
ST14:{ST13:1.62344791
,},
ST15:{ST11:1.87039523
,ST16:5.95631969
,ST17:7.09105725
,},
ST16:{ST15:5.95631969
,ST17:2.78736208
,ST28:2.52406787
,},
ST17:{ST16:2.78736208
,ST15:7.09105725
,ST18:1.55376231
,ST25:0.00012822
,},
ST18:{ST17:1.55376231
,ST25:0.00014363
,ST19:2.66213362
,},
ST19:{ST20:1.75932578
,ST18:2.66213362
,},
ST20:{ST22:6.55316002
,ST21:2.97316654
,ST19:1.75932578
,},
ST21:{ST20:2.97316654
,},
ST22:{ST23:1.13065417
,ST20:6.55316002
,},
ST23:{ST24:2.11074049
,ST22:1.13065417
,},
ST24:{ST25:0.00011770
,ST23:2.11074049
,},
ST25:{ST18:0.00014363
,ST17:0.00012822
,ST24:0.00011770
,},
ST26:{ST11:3.11795953
,ST31:2.66465009
,ST27:1.90143783
,},
ST27:{ST26:1.90143783
,ST28:6.37987342
,},
ST28:{ST27:6.37987342
,ST16:2.52406787
,ST29:2.95840800
,},
ST29:{ST28:2.95840800
,ST34:3.68475724
,ST30:6.25153340
,},
ST30:{ST31:2.21279336
,ST29:6.25153340
,},
ST31:{ST26:2.66465009
,ST30:2.21279336
,ST32:0.00012087
,ST33:1.53041410
,},
ST32:{ST31:0.00012087
,},
ST33:{ST31:1.53041410
,ST38:1.47481372
,},
ST34:{ST29:3.68475724
,ST37:7.50559259
,ST35:3.58699997
,},
ST35:{ST34:3.58699997
,ST37:6.43185661
,ST36:3.51612377
,},
ST36:{ST35:3.51612377
,ST53:1.09417598
,},
ST37:{ST34:7.50559259
,ST35:6.43185661
,ST47:3.46210186
,},
ST38:{ST33:1.47481372
,ST39:1.31112915
,ST40:2.20525409
,},
ST39:{ST38:1.31112915
,ST42:2.13551004
,ST47:4.13873547
,},
ST40:{ST38:2.20525409
,ST41:4.40387996
,},
ST41:{ST40:4.40387996
,},
ST42:{ST39:2.13551004
,ST43:2.77621495
,},
ST43:{ST42:2.77621495
,ST44:3.20681011
,ST45:1.08882053
,},
ST44:{ST43:3.20681011
,},
ST45:{ST43:1.08882053
,ST46:1.35135206
,},
ST46:{ST45:1.35135206
,},
ST47:{ST39:4.13873547
,ST37:3.46210186
,ST48:6.32258549
,},
ST48:{ST47:6.32258549
,ST49:1.81402943
,ST54:5.36993646
,},
ST49:{ST50:4.13867951
,ST48:1.81402943
,},
ST50:{ST51:6.73306348
,ST49:4.13867951
,ST56:5.48476337
,},
ST51:{ST60:1.44301936
,ST50:6.73306348
,},
ST52:{ST53:1.48720527
,},
ST53:{ST36:1.09417598
,ST52:1.48720527
,ST60:3.09298773
,},
ST54:{ST48:5.36993646
,ST59:4.04606302
,ST55:1.73044724
,},
ST55:{ST56:4.03442251
,ST54:1.73044724
,},
ST56:{ST50:5.48476337
,ST57:3.92657517
,ST55:4.03442251
,},
ST57:{ST56:3.92657517
,ST58:4.09255944
,},
ST58:{ST57:4.09255944
,ST59:1.83934024
,},
ST59:{ST54:4.04606302
,ST58:1.83934024
,ST61:7.87800977
,},
ST60:{ST53:3.09298773
,ST51:1.44301936
,},
ST61:{ST59:7.87800977
,ST62:0.00011719
,ST65:1.81408009
,},
ST62:{ST61:0.00011719
,ST66:2.15229978
,ST63:8.04475696
,ST67:7.70850902
,},
ST63:{ST62:8.04475696
,ST64:7.79142194
,},
ST64:{ST68:2.13028891
,ST63:7.79142194
,ST74:9.82041698
,},
ST65:{ST61:1.81408009
,ST69:4.13867683
,},
ST66:{ST70:3.97143084
,ST62:2.15229978
,},
ST67:{ST62:7.70850902
,ST71:4.11695968
,},
ST68:{ST72:4.26088925
,ST64:2.13028891
,},
ST69:{ST65:4.13867683
,ST70:0.00011770
,},
ST70:{ST69:0.00011770
,ST66:3.97143084
,ST71:7.96260272
,},
ST71:{ST67:4.11695968
,ST70:7.96260272
,ST72:7.57114068
,},
ST72:{ST71:7.57114068
,ST68:4.26088925
,ST73:1.79481248
,},
ST73:{ST72:1.79481248
,ST76:4.88059935
,},
ST74:{ST64:9.82041698
,ST75:0.00012778
,},
ST75:{ST74:0.00012778
,ST104:5.78031771
,ST114:2.13489916
,},
ST76:{ST73:4.88059935
,ST77:3.96824866
,},
ST77:{ST76:3.96824866
,ST79:3.24913209
,},
ST78:{ST79:3.42138099
,ST82:2.67392384
,},
ST79:{ST77:3.24913209
,ST78:3.42138099
,ST80:3.36845465
,ST83:2.71827639
,},
ST80:{ST79:3.36845465
,ST81:4.47389674
,ST84:2.58865996
,},
ST81:{ST80:4.47389674
,},
ST82:{ST78:2.67392384
,ST87:2.62161270
,},
ST83:{ST79:2.71827639
,ST88:7.62132187
,},
ST84:{ST80:2.58865996
,ST86:2.57110200
,},
ST85:{ST86:4.75416623
,},
ST86:{ST84:2.57110200
,ST88:6.68786872
,ST90:9.84916049
,ST91:5.96358833
,ST85:4.75416623
,},
ST87:{ST101:6.16587101
,ST88:5.42135038
,ST100:1.79323731
,ST89:0.00010156
,ST82:2.62161270
,},
ST88:{ST86:6.68786872
,ST94:7.58815977
,ST91:7.83876630
,ST83:7.62132187
,ST101:5.63178064
,ST87:5.42135038
,ST89:6.90516656
,ST90:5.12565147
,},
ST89:{ST101:4.70643394
,ST87:0.00010156
,ST88:6.90516656
,ST95:2.41166893
,ST102:1.74594122
,},
ST90:{ST86:9.84916049
,ST91:7.29942387
,ST92:4.34821864
,ST93:2.71827614
,ST88:5.12565147
,},
ST91:{ST86:5.96358833
,ST90:7.29942387
,ST88:7.83876630
,},
ST92:{ST90:4.34821864
,},
ST93:{ST90:2.71827614
,ST98:2.83502825
,},
ST94:{ST97:3.06009437
,ST88:7.58815977
,},
ST95:{ST89:2.41166893
,ST96:2.88612744
,},
ST96:{ST95:2.88612744
,ST97:2.89913653
,ST103:2.16089893
,},
ST97:{ST98:4.03051948
,ST111:2.83051912
,ST94:3.06009437
,ST96:2.89913653
,},
ST98:{ST93:2.83502825
,ST99:4.41256611
,ST97:4.03051948
,},
ST99:{ST98:4.41256611
,},
ST100:{ST87:1.79323731
,ST104:1.91031338
,},
ST101:{ST88:5.63178064
,ST89:4.70643394
,ST87:6.16587101
,ST105:1.81469365
,},
ST102:{ST89:1.74594122
,ST106:1.83532830
,},
ST103:{ST96:2.16089893
,ST113:1.70895929
,},
ST104:{ST75:5.78031771
,ST100:1.91031338
,ST105:5.17732037
,ST115:2.15229759
,},
ST105:{ST104:5.17732037
,ST101:1.81469365
,ST110:3.96105247
,ST106:4.85432007
,},
ST106:{ST105:4.85432007
,ST102:1.83532830
,ST113:5.94033313
,ST109:1.79549792
,},
ST107:{ST113:4.65515033
,ST108:2.83289168
,ST112:4.88817816
,},
ST108:{ST107:2.83289168
,},
ST109:{ST106:1.79549792
,ST128:5.50639103
,},
ST110:{ST105:3.96105247
,ST123:4.28219315
,ST124:2.68797055
,ST125:4.22334801
,},
ST111:{ST97:2.83051912
,ST129:2.03101992
,},
ST112:{ST107:4.88817816
,ST116:3.84500063
,},
ST113:{ST106:5.94033313
,ST103:1.70895929
,ST107:4.65515033
,},
ST114:{ST75:2.13489916
,ST119:3.41792327
,},
ST115:{ST104:2.15229759
,ST121:1.98264626
,},
ST116:{ST112:3.84500063
,ST117:3.86790926
,},
ST117:{ST116:3.86790926
,ST118:4.70072436
,},
ST118:{ST117:4.70072436
,},
ST119:{ST114:3.41792327
,ST120:3.04417389
,ST122:6.86148738
,ST121:5.65109715
,},
ST120:{ST119:3.04417389
,},
ST121:{ST119:5.65109715
,ST115:1.98264626
,ST122:4.05315476
,ST124:1.82851885
,},
ST122:{ST119:6.86148738
,ST121:4.05315476
,ST123:1.92464104
,},
ST123:{ST122:1.92464104
,ST125:3.26534559
,ST110:4.28219315
,},
ST124:{ST121:1.82851885
,ST110:2.68797055
,ST125:5.85433427
,},
ST125:{ST123:3.26534559
,ST110:4.22334801
,ST124:5.85433427
,ST126:2.79208242
,ST127:3.29578989
,},
ST126:{ST125:2.79208242
,},
ST127:{ST125:3.29578989
,ST128:2.18140497
,},
ST128:{ST127:2.18140497
,ST109:5.50639103
,},
ST129:{ST111:2.03101992
,ST130:2.70301462
,},
ST130:{ST129:2.70301462
,ST131:2.20141268
,},
ST131:{ST130:2.20141268
,ST132:2.34828556
,ST136:1.77777255
,},
ST132:{ST131:2.34828556
,ST133:1.85849735
,},
ST133:{ST132:1.85849735
,ST134:1.47919042
,ST145:7.38793824
,},
ST134:{ST133:1.47919042
,ST135:3.47627015
,},
ST135:{ST134:3.47627015
,},
ST136:{ST131:1.77777255
,ST137:1.00545090
,ST138:1.13753552
,},
ST137:{ST136:1.00545090
,ST138:8.77816739
,ST140:1.45307383
,},
ST138:{ST136:1.13753552
,ST139:1.17579329
,ST137:8.77816739
,},
ST139:{ST138:1.17579329
,},
ST140:{ST137:1.45307383
,ST141:1.13065290
,},
ST141:{ST140:1.13065290
,ST142:1.00037618
,},
ST142:{ST141:1.00037618
,ST143:1.75373042
,},
ST143:{ST142:1.75373042
,ST144:2.15156208
,},
ST144:{ST143:2.15156208
,},
ST145:{ST133:7.38793824
,ST146:3.35877900
,},
ST146:{ST145:3.35877900
,ST147:1.20780337
,ST149:4.11973648
,},
ST147:{ST146:1.20780337
,ST148:3.84304407
,},
ST148:{ST147:3.84304407
,},
ST149:{ST146:4.11973648
,ST150:1.24502908
,ST152:3.93571940
,},
ST150:{ST149:1.24502908
,ST151:3.97141847
,},
ST151:{ST150:3.97141847
,},
ST152:{ST149:3.93571940
,ST153:1.37174227
,ST155:3.24910524
,},
ST153:{ST152:1.37174227
,ST154:3.73794551
,},
ST154:{ST153:3.73794551
,},
ST155:{ST152:3.24910524
,ST156:1.44508710
,ST162:9.00204630
,},
ST156:{ST155:1.44508710
,ST157:2.55752631
,},
ST157:{ST156:2.55752631
,},
ST158:{ST160:3.43798441
,},
ST159:{ST161:4.95621320
,},
ST160:{ST162:1.26575659
,ST158:3.43798441
,},
ST161:{ST162:1.70517427
,ST159:4.95621320
,},
ST162:{ST155:9.00204630
,ST161:1.70517427
,ST160:1.26575659
,ST163:3.66004895
,},
ST163:{ST162:3.66004895
,ST165:1.39333638
,ST166:1.07281372
,ST169:3.32499294
,},
ST164:{ST165:3.51470662
,},
ST165:{ST163:1.39333638
,ST164:3.51470662
,},
ST166:{ST163:1.07281372
,ST167:2.26411933
,},
ST167:{ST166:2.26411933
,},
ST168:{ST170:2.87374066
,ST173:3.89275887
,},
ST169:{ST163:3.32499294
,ST170:1.20316565
,ST171:2.24382068
,},
ST170:{ST168:2.87374066
,ST169:1.20316565
,},
ST171:{ST169:2.24382068
,ST178:1.67902503
,ST177:2.85270616
,ST180:3.03880103
,ST176:3.10464212
,},
ST172:{ST174:1.83170515
,},
ST173:{ST168:3.89275887
,ST175:1.80987366
,},
ST174:{ST175:2.19624295
,ST176:1.66083965
,ST172:1.83170515
,},
ST175:{ST173:1.80987366
,ST174:2.19624295
,ST176:2.34877408
,ST185:4.63529030
,},
ST176:{ST175:2.34877408
,ST174:1.66083965
,ST177:1.16917995
,ST171:3.10464212
,},
ST177:{ST171:2.85270616
,ST180:1.75492966
,ST176:1.16917995
,ST181:3.77393482
,},
ST178:{ST171:1.67902503
,ST179:9.86408604
,},
ST179:{ST178:9.86408604
,},
ST180:{ST171:3.03880103
,ST177:1.75492966
,ST182:3.62572873
,ST181:4.48611011
,},
ST181:{ST187:1.94149467
,ST184:1.80875144
,ST177:3.77393482
,ST180:4.48611011
,},
ST182:{ST180:3.62572873
,ST183:3.38502422
,},
ST183:{ST182:3.38502422
,ST188:1.93964525
,},
ST184:{ST181:1.80875144
,ST187:8.63063369
,ST185:2.09691579
,},
ST185:{ST184:2.09691579
,ST186:3.61158576
,ST175:4.63529030
,},
ST186:{ST185:3.61158576
,ST190:7.01460029
,},
ST187:{ST188:6.57699682
,ST189:7.38142321
,ST181:1.94149467
,ST184:8.63063369
,},
ST188:{ST183:1.93964525
,ST187:6.57699682
,ST189:8.78432879
,},
ST189:{ST188:8.78432879
,ST187:7.38142321
,},
ST190:{ST186:7.01460029
,},
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

var  firstturn = true; 

function show_route(){
    
    

    
    if(firstturn === true)
    {
    resetcolours();
    newroute();
    get_array_of_points();
    change_pathcolor();
    createline();}
    
    else {
        
    removelines2();
    resetcolours();
    
    newroute();
    get_array_of_points();
    change_pathcolor();
        
    createline();} 
        
        
    };
    



function get_array_of_points () {
    array_of_points = []; 

    for (var i = 0; i <= (globpath_array.length-1); i += 1) {
        var point = document.getElementById(globpath_array[i]);
        array_of_points.push(point);
        console.log("array of points " );
        console.log(array_of_points);
    }
    
};

var array_of_points_colours=[];


function change_pathcolor() {
    for (var i = 0; i <= (array_of_points.length - 1); i += 1) 
    
        if(array_of_points[i]!== null){
            
        console.log(array_of_points[i]);
        array_of_points_colours.push(array_of_points[i].getAttribute("fill"));
       
        array_of_points[i].setAttribute("fill", "#ff0000") ; 
        array_of_points[i].setAttribute("r", "2 ");
 console.log(array_of_points_colours);        
    }
   
};


function resetcolours(){
    firstturn = false;
    console.log(array_of_points_colours);
    for (var i = 0; i <= (array_of_points.length - 1); i += 1) {
        if(array_of_points[i]!== null){
            
    array_of_points[i].setAttribute("fill", array_of_points_colours[i]);
    array_of_points[i].setAttribute("r", "0")  
        };
        
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
    removelines;
};

function createline() {
    
    for (var i = 0; i <= (array_of_points.length - 2); i += 1) {
        
    function nextpointfunc () { if (array_of_points[i+1]== null) {
           console.log("OK!") 
           return array_of_points[i+2]
            
        } 
        else {
            return array_of_points[i]
        }
                                     };
        
        var next_point = nextpointfunc();
        
        if(array_of_points[i]!== null && array_of_points[i+1]!== null&& array_of_points[i].tagName=="circle" && array_of_points[i+1].tagName=="circle"){
            
            
    
    console.log(array_of_points);
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element
var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
newElement.setAttribute("x1", (array_of_points[i].getAttribute("cx")));
                        
newElement.setAttribute("y1", (array_of_points[i].getAttribute("cy")));     
newElement.setAttribute("x2", ("x1", (array_of_points[i+1].getAttribute("cx"))));
                               
newElement.setAttribute("y2", (array_of_points[i+1].getAttribute("cy")));
                        
newElement.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:2");
newElement.setAttribute("class", "routinglines");            
            
svg.appendChild(newElement);   
}}
};



function removelines() {
    
    var alllines = svg.getElementsByClassName("routinglines");

    for (var i = 0; i <= (alllines.length); i += 1) {
            SVG.removeChild(alllines[i])
        }
};


function removelines2(){
    if(array_of_points[i]!== null){
    var svg = document.getElementsByTagName('svg')[0];
        var alllines = document.getElementsByClassName("routinglines");
    for (var i = 0; i <= (0, alllines.length -1); i += 1) {
        if(alllines[i]!== null){
            console.log( alllines[i]);
        alllines[i].setAttribute("display", "none") ;
        
    }};
        
        
//        var alllines = document.getElementsByClassName("routinglines");
        }};