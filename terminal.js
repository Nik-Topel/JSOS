var c_p = 0;
var words = null;
var errored_word = 0;// 0 = none 1 = first word etc
var r = 1;
function start(){
	document.getElementById('write_in').innerHTML = null;
	if(localStorage.t_o != null){
		document.getElementById('write_out').innerHTML = localStorage.t_o;
	}else{
		localStorage.setItem("t_o","JSOS Version 1.0<br>(c) 2020 Nik Topel. All rights reserved.<br>");
	}
	if(localStorage.t_i != null && localStorage.c_p != null){
		document.getElementById('write_in').innerHTML = localStorage.t_i;
		c_p = parseInt(localStorage.c_p);
	}else{
		localStorage.setItem("t_i","");
		localStorage.setItem("c_p","0");
	}
	if(localStorage.r_f != null && localStorage.g_f != null && localStorage.b_f != null){
		document.getElementById('terminal_text').style.color = "rgb(" + parseInt(localStorage.r_f) + "," + parseInt(localStorage.g_f) + "," + parseInt(localStorage.b_f) + ")";
	}else{
		localStorage.setItem("r_f","0");
		localStorage.setItem("g_f","255");
		localStorage.setItem("b_f","0");
	}
	if(localStorage.r_b != null && localStorage.g_b != null && localStorage.b_b != null){
		document.body.style.backgroundColor = "rgb(" + parseInt(localStorage.r_b) + "," + parseInt(localStorage.g_b) + "," + parseInt(localStorage.b_b) + ")";
	}else{
		localStorage.setItem("r_b","0");
		localStorage.setItem("g_b","0");
		localStorage.setItem("b_b","0");
	}
}

document.onkeydown = function (event) {
	
	if (!event) { /* This will happen in IE */
		event = window.event;
	}
		
	var keyCode = event.keyCode;
	
	if (keyCode == 8 &&
		((event.target || event.srcElement).tagName != "TEXTAREA") && 
		((event.target || event.srcElement).tagName != "INPUT")) { 
		back_space();
		if (navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
			event.stopPropagation();
		} else {
			alert("prevented");
			event.returnValue = false;
		}
		
		return false;
	}
	if(keyCode == 13){
		enter();
	}
	if(keyCode == 32){
		space();
	}
};	
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which;
    var charStr = String.fromCharCode(charCode);
	if (charCode != 8 && charCode != 13 && charCode != 32){
		document.getElementById('write_in').textContent = document.getElementById('write_in').textContent.substring(0,c_p) + charStr + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length);
		c_p +=1;
		localStorage.setItem("c_p",c_p);
		localStorage.setItem("t_i",document.getElementById('write_in').innerHTML);
	}
};

function space(){
	document.getElementById('write_in').innerHTML = document.getElementById('write_in').textContent.substring(0,c_p) + "&nbsp;" + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length);
	c_p +=1;
	localStorage.setItem("c_p",c_p);
	localStorage.setItem("t_i",document.getElementById('write_in').innerHTML);
}
function back_space(){
	if(c_p > 0){
		document.getElementById('write_in').textContent = document.getElementById('write_in').textContent.substring(0,c_p - 1) + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length );
		c_p -=1;
		localStorage.setItem("c_p",c_p);
		localStorage.setItem("t_i",document.getElementById('write_in').innerHTML);
	}
}
function replaceNbsps(str) {
    var re = new RegExp(String.fromCharCode(160), "g");
    return str.replace(re, " ");
}
function allnumeric(str){
	
    return !isNaN(parseFloat(str)) && isFinite(str);
} 

function enter(){
	errored_word = 0;
	words = replaceNbsps(document.getElementById('write_in').textContent).split(' ');
	if(words[0] == "write"){ // write
		if(words[1] == "-t"){ // to terminal
			if(words[2] != null) {
				document.getElementById('write_out').innerHTML += "<br>";
				for(i=2;i<words.length;i++) {
					document.getElementById('write_out').innerHTML += words[i] + "&nbsp;";
				}
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				document.getElementById('write_out').innerHTML += "<br>" + "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}
		}else{
			if(words[1] != null) {
				document.getElementById('write_out').innerHTML += "<br>";
				for(i=1;i<words.length;i++) {
					document.getElementById('write_out').innerHTML += words[i] + "&nbsp;";
				}
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				document.getElementById('write_out').innerHTML += "<br>" + "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}
		}
	} else if(allnumeric(words[0])){ // number
		if(words[1] == "+"){ // plus
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) + parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += words[0]+ " + " + words[2] + " = " + a;
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				errored_word = 3;
			}
		}else if(words[1] == "*"){ // multiply
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) * parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += words[0]+ " + " + words[2] + " = " + a;
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				errored_word = 3;
			}
		}else if(words[1] == "-"){ // minus
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) - parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += words[0]+ " + " + words[2] + " = " + a;
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				errored_word = 3;
			}
		}else if(words[1] == "/"){ // divition
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) / parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += words[0]+ " + " + words[2] + " = " + a;
				document.getElementById('write_out').innerHTML += "<br>";
				localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
			}else{
				errored_word = 3;
			}
		}else{
			errored_word = 2;
		}
	} else if(words[0] == "clear"){ // clear
		if(words[1] == "-t"){ // terminal
			document.getElementById('write_out').innerHTML = "JSOS Version 1.0<br>(c) 2020 Nik Topel. All rights reserved.<br>";
			localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
		}else if(words[1] == null){
			document.getElementById('write_out').innerHTML = "JSOS Version 1.0<br>(c) 2020 Nik Topel. All rights reserved.<br>";
			localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
		}else{
			errored_word = 2;
		}
	} else if(words[0] == "help"){ // help
		document.getElementById('write_out').innerHTML += "<br>clear -t<br>color -f -b<br><br>reset<br>write -t<br>";
		localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
	} else if(words[0] == "color"){ // color
		if(words[1] == "-f"){ // font
			if(words[2] == "red"){
				document.getElementById('terminal_text').style.color = "red";
				localStorage.setItem("r_f",255);
				localStorage.setItem("g_f",0);
				localStorage.setItem("b_f",0);
			}else if(words[2] == "green"){
				document.getElementById('terminal_text').style.color = "green";
				localStorage.setItem("r_f",0);
				localStorage.setItem("g_f",255);
				localStorage.setItem("b_f",0);
			}else if(words[2] == "blue"){
				document.getElementById('terminal_text').style.color = "blue";
				localStorage.setItem("r_f",0);
				localStorage.setItem("g_f",0);
				localStorage.setItem("b_f",255);
			}else if(allnumeric(words[2])){
				var r = words[2];
				var g = 0;
				var b = 0;
				if(allnumeric(words[3])){
					g = words[3];
					if(allnumeric(words[4])){
						b = words[4]
					}else{
					errored_word = 5;
					}
				}else{
					errored_word = 4;
				}
				if(errored_word < 1){
					localStorage.setItem("r_f",r);
					localStorage.setItem("g_f",g);
					localStorage.setItem("b_f",b);
					document.getElementById('terminal_text').style.color = "rgb("+r+","+g+","+b+")";
				}
			}else{
				errored_word = 3;
			}
		}else if(words[1] == "-b"){ // background
			if(words[2] == "red"){
				document.body.style.backgroundColor = "red";
				localStorage.setItem("r_b",255);
				localStorage.setItem("g_b",0);
				localStorage.setItem("b_b",0);
			}else if(words[2] == "green"){
				document.body.style.backgroundColor = "green";
				localStorage.setItem("r_b",0);
				localStorage.setItem("g_b",255);
				localStorage.setItem("b_b",0);
			}else if(words[2] == "blue"){
				document.body.style.backgroundColor = "blue";
				localStorage.setItem("r_b",0);
				localStorage.setItem("g_b",0);
				localStorage.setItem("b_b",255);
			}else if(allnumeric(words[2])){
				var r = words[2];
				var g = 0;
				var b = 0;
				if(allnumeric(words[3])){
					g = words[3];
					if(allnumeric(words[4])){
						b = words[4]
					}else{
					errored_word = 5;
					}
				}else{
					errored_word = 4;
				}
				if(errored_word < 1){
					localStorage.setItem("r_b",r);
					localStorage.setItem("g_b",g);
					localStorage.setItem("b_b",b);
					document.body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
				}
			}else{
				errored_word = 3;
			}
		}else{
				errored_word = 2;
			}
	} else if(words[0] == "reset"){
		localStorage.setItem("t_o","JSOS Version 1.0<br>(c) 2020 Nik Topel. All rights reserved.<br>");
		localStorage.setItem("t_i","");
		localStorage.setItem("c_p",0);
		document.getElementById('write_out').innerHTML = "JSOS Version 1.0<br>(c) 2020 Nik Topel. All rights reserved.<br>";
		localStorage.setItem("r_f","0");
		localStorage.setItem("g_f","255");
		localStorage.setItem("b_f","0");
		document.getElementById('terminal_text').style.color = "rgb(" + parseInt(localStorage.r_f) + "," + parseInt(localStorage.g_f) + "," + parseInt(localStorage.b_f) + ")";
		localStorage.setItem("r_b","0");
		localStorage.setItem("g_b","0");
		localStorage.setItem("b_b","0");
		document.body.style.backgroundColor = "rgb(" + parseInt(localStorage.r_b) + "," + parseInt(localStorage.g_b) + "," + parseInt(localStorage.b_b) + ")";
    }else if(words[0] == "reload") {
		document.getElementById('write_in').textContent = null;
		localStorage.setItem("t_i",document.getElementById('write_in').innerHTML);
		c_p = 0;
		localStorage.setItem("c_p",c_p);
		window.location.reload(true);
	}else{
		errored_word = 1;
	}
	
	if(errored_word > 0){
		document.getElementById('write_out').innerHTML += "<br>" + "'" + words[errored_word -1]+ "' " + "is not recognized as an command" + "<br>";
		localStorage.setItem("t_o",document.getElementById('write_out').innerHTML);
	}
	
	document.getElementById('write_in').textContent = null;
	localStorage.setItem("t_i",document.getElementById('write_in').innerHTML);
	c_p = 0;
	localStorage.setItem("c_p",c_p);
}
