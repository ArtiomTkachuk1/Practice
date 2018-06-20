"use strict";
var m=4;
var n=4;
var numbers=["2","4","8","16","32","64","128","256","512","1024","2048","4096","8192","16384"];
var intnumbers=[2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384];
var bm=new Array()
	for(var i=0;i<m;i++){
		bm[i]=new Array();
		for(var j=0;j<n;j++)
			bm[i].push(-1);
}
var score=0;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function createboard(id){
	var md=document.getElementById(id);
	var board=document.createElement("div");
	board.id="Board";
	board.align="center";
	board.style.width=md.style.height;
	board.style.height=md.style.height;
	md.appendChild(board);
	for(var i=0;i<m;i++){
		var str=document.createElement("div");
		str.id=i;
		str.style.height=100/m+"%";
		board.appendChild(str);
		for(var j=0;j<n;j++){
			var cell=document.createElement("button");
			cell.className="cell";
			cell.id=i+"_"+j;
			cell.style.width=100/n+"%";
			cell.paddingBottom="20%";
			cell.paddingTop="20%";
			str.appendChild(cell);
		}
	}
	refresh();
}
function refresh(){
	for(var i=0;i<m;i++)
		for(var j=0;j<n;j++){
		var cell=document.getElementById(i+"_"+j);
			cell.innerHTML="";
		}
	for(var i=0;i<m;i++)
		for(var j=0;j<n;j++)
			bm[i][j]=-1;
	var x0=getRandomInt(m);
	var y0=getRandomInt(n);
	bm[x0][y0]=getRandomInt(2);
	var c0=document.getElementById(x0+"_"+y0);
	c0.innerHTML=numbers[bm[x0][y0]];
	var x1=getRandomInt(m);
	var y1=getRandomInt(n);
	while((x1==x0)&&(y1==y0)){
		x1=getRandomInt(m);
		y1=getRandomInt(n);
	}
	bm[x1][y1]=getRandomInt(2);
	var c1=document.getElementById(x1+"_"+y1);
	c1.innerHTML=numbers[bm[x1][y1]];
}
function createothergui(id){
	var board=document.getElementById("Board");
	var md=document.getElementById(id);
	var scorediv=document.createElement("div");
	scorediv.id="scorediv";
	var width=window.innerWidth-window.innerHeight;
	scorediv.style.width=width+"px";
	md.appendChild(scorediv);
	var textdiv=document.createElement("div");
	textdiv.id="textdiv";
	textdiv.innerHTML="Score:"+"<br>"+score;
	scorediv.appendChild(textdiv);
	var buttondiv=document.createElement("div");
	buttondiv.id="buttondiv";
	buttondiv.style.width=width+"px";
	md.appendChild(buttondiv);
	var buttontop=document.createElement("button");
	buttontop.id="buttontop";
	buttontop.className="buttons";
	buttontop.innerHTML="&uarr;";
	buttontop.addEventListener('click',etop);
	buttondiv.appendChild(buttontop);
	var buttonbottom=document.createElement("button");
	buttonbottom.id=" buttonbottom";
	buttonbottom.className="buttons";
	buttonbottom.innerHTML="&darr;";
	buttonbottom.addEventListener('click',ebottom);
	buttondiv.appendChild(buttonbottom);
	var buttonleft=document.createElement("button");
	buttonleft.id="buttonleft";
	buttonleft.className="buttons";
	buttonleft.innerHTML="&larr;";
	buttonleft.addEventListener('click',eleft);
	buttondiv.appendChild(buttonleft);
	var buttonright=document.createElement("button");
	buttonright.id="buttonright";
	buttonright.className="buttons";
	buttonright.innerHTML="&rarr;";
	buttonright.addEventListener('click',eright);
	buttondiv.appendChild(buttonright);
}
document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	if(keyName=="ArrowUp")etop();
	if(keyName=="ArrowDown")ebottom();
	if(keyName=="ArrowLeft")eleft();
	if(keyName=="ArrowRight")eright();
});
function etop(){
	if(checklose()==true) return;
	if(canmovetop()==true){
		for(var i=0;i<n;i++){
			var buf=new Array();
			for(var j=0;j<m;j++)
				if(bm[j][i]!=-1)buf.push(bm[j][i]);
			var j1=0;
			var buf1=new Array();
			for(var j=0;j<buf.length;j++){
				if(buf[j]==buf[j+1]){
					score=score+intnumbers[buf[j]+1];
					var textdiv=document.getElementById("textdiv");
					textdiv.innerHTML="Score:"+"<br>"+score;
					buf1.push(buf[j]+1);
					j++;
				}
				else buf1.push(buf[j]);
			}
			for(var j=0;j<m;j++)bm[j][i]=-1;
			for(var j=0;j<buf1.length;j++)bm[j][i]=buf1[j];
		}
		comon();
	}
}
function canmovetop(){
	for(var i=0;i<m-1;i++)
		for(var j=0;j<n;j++){
			if(((bm[i][j]==bm[i+1][j])&&(bm[i+1][j]!=-1))||((bm[i][j]==-1)&&(bm[i+1][j]!=-1))){return true;}
		}
	return false;
}
function ebottom(){
	if(checklose()==true) return;
	if(canmovebottom()==true){
		for(var i=0;i<n;i++){
			var buf=new Array();
			for(var j=m-1;j>=0;j--)
				if(bm[j][i]!=-1)buf.push(bm[j][i]);
			var j1=0;
			var buf1=new Array();
			for(var j=0;j<buf.length;j++){
				if(buf[j]==buf[j+1]){
					score=score+intnumbers[buf[j]+1];
					var textdiv=document.getElementById("textdiv");
					textdiv.innerHTML="Score:"+"<br>"+score;
					buf1.push(buf[j]+1);
					j++;
				}
				else buf1.push(buf[j]);
			}
			for(var j=0;j<m;j++)bm[j][i]=-1;
			for(var j=0;j<buf1.length;j++)bm[m-1-j][i]=buf1[j];
		}
		comon();
	}
}
function canmovebottom(){
	for(var i=m-1;i>0;i--)
		for(var j=0;j<n;j++){
			if(((bm[i][j]==bm[i-1][j])&&(bm[i-1][j]!=-1))||((bm[i][j]==-1)&&(bm[i-1][j]!=-1))){return true;}
		}
	return false;
}
function eleft(){
	if(checklose()==true) return;
	if(canmoveleft()==true){
		for(var i=0;i<m;i++){
			var buf=new Array();
			for(var j=0;j<n;j++)
				if(bm[i][j]!=-1)buf.push(bm[i][j]);
			var j1=0;
			var buf1=new Array();
			for(var j=0;j<buf.length;j++){
				if(buf[j]==buf[j+1]){
					score=score+intnumbers[buf[j]+1];
					var textdiv=document.getElementById("textdiv");
					textdiv.innerHTML="Score:"+"<br>"+score;
					buf1.push(buf[j]+1);
					j++;
				}
				else buf1.push(buf[j]);
			}
			for(var j=0;j<n;j++)bm[i][j]=-1;
			for(var j=0;j<buf1.length;j++)bm[i][j]=buf1[j];
		}
		comon();
	}
}
function canmoveleft(){
	for(var i=0;i<m;i++)
		for(var j=0;j<n-1;j++){
			if(((bm[i][j]==bm[i][j+1])&&(bm[i][j+1]!=-1))||((bm[i][j]==-1)&&(bm[i][j+1]!=-1))){return true;}
		}
	return false;
}
function eright(){
	if(checklose()==true) return;
	if(canmoveright()==true){
		for(var i=0;i<m;i++){
			var buf=new Array();
			for(var j=n-1;j>=0;j--)
				if(bm[i][j]!=-1)buf.push(bm[i][j]);
			var j1=0;
			var buf1=new Array();
			for(var j=0;j<buf.length;j++){
				if(buf[j]==buf[j+1]){
					score=score+intnumbers[buf[j]+1];
					var textdiv=document.getElementById("textdiv");
					textdiv.innerHTML="Score:"+"<br>"+score;
					buf1.push(buf[j]+1);
					j++;
				}
				else buf1.push(buf[j]);
			}
			for(var j=0;j<n;j++)bm[i][j]=-1;
			for(var j=0;j<buf1.length;j++)bm[i][n-1-j]=buf1[j];
		}
		comon();
	}
}
function canmoveright(){
	for(var i=0;i<m;i++)
		for(var j=n-1;j>0;j--){
			if(((bm[i][j]==bm[i][j-1])&&(bm[i][j-1]!=-1))||((bm[i][j]==-1)&&(bm[i][j-1]!=-1))){return true;}
		}
	return false;
}
function comon(){
	var x1=getRandomInt(m);
	var y1=getRandomInt(n);
	while(bm[x1][y1]!=-1){
		x1=getRandomInt(m);
		y1=getRandomInt(n);
	}
	bm[x1][y1]=getRandomInt(2);
	var cell=document.getElementById(x1+"_"+y1);
	cell.innerHTML=numbers[bm[x1][y1]];
	for(var i=0;i<m;i++)
		for(var j=0;j<n;j++){
			var cell=document.getElementById(i+"_"+j);
			if (bm[i][j]==-1)cell.innerHTML="";
			else cell.innerHTML=numbers[bm[i][j]];
		}
}
function checklose(){
	for(var i=0;i<m;i++)
		for(var j=0;j<n;j++)
			if(bm[i][j]==-1)return false;
	for(var i=0;i<m;i++)
		for(var j=0;j<n-1;j++)
			if(bm[i][j]==bm[i][j+1])return false;
	for(var i=0;i<n;i++)
		for(var j=0;j<m-1;j++)
			if(bm[j][i]==bm[j+1][i])return false;
	score=0;
	var textdiv=document.getElementById("textdiv");
	textdiv.innerHTML="Score:"+"<br>"+score;
	alert("Game over");
	refresh();
	return true;
}
function create(id){
	var md=document.getElementById(id);
	md.style.width=window.innerWidth+"px";
	md.style.height=window.innerHeight+"px";
	createboard(id);
	createothergui(id);
}
create(0);