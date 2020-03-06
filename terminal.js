var c_p = 0;
var words = null;
var errored_word = 0;// 0 = none 1 = first word etc
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which;
    var charStr = String.fromCharCode(charCode);
	if (charCode != 8 && charCode != 13 && charCode != 32){
		if(document.getElementById('write_in').innerHTML == "&nbsp;"){
			document.getElementById('write_in').innerHTML = null;
		}
		document.getElementById('write_in').textContent = document.getElementById('write_in').textContent.substring(0,c_p) + charStr + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length);
		c_p +=1;
	}
};

function back_space(){
	if(c_p > 0){
		document.getElementById('write_in').textContent = document.getElementById('write_in').textContent.substring(0,c_p - 1) + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length );
		c_p -=1;
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
			document.getElementById('write_out').innerHTML += "<br>";
			for(i=2;i<words.length;i++) {
				document.getElementById('write_out').innerHTML += words[i] + "&nbsp;";
			}
		}else{
			errored_word = 2;
		}
	} else if(allnumeric(words[0])){ // number
		if(words[1] == "+"){ // plus
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) + parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += a;
			}else{
				errored_word = 3;
			}
		}else if(words[1] == "*"){ // multiply
			if(allnumeric(words[2])){ // number
				var a = parseFloat(words[0]) * parseFloat(words[2]);
				document.getElementById('write_out').innerHTML += "<br>";
				document.getElementById('write_out').innerHTML += a;
			}else{
				errored_word = 3;
			}
		}else{
			errored_word = 2;
		}
	} else{
		errored_word = 1;
	}
	
	if(errored_word > 0){
		document.getElementById('write_out').innerHTML += "<br>" + "'" + words[errored_word -1]+ "'" + "is not recognized as an command" + "<br>";
	}
	
	document.getElementById('write_in').textContent = null;
	c_p = 0;
}
function space(){
	document.getElementById('write_in').innerHTML = document.getElementById('write_in').textContent.substring(0,c_p) + "&nbsp;" + document.getElementById('write_in').textContent.substring(c_p,document.getElementById('write_in').textContent.length);
	c_p +=1;
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