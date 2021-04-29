function calculateGap() {
	var time = document.getElementById("time").value;
	var bpm = document.getElementById("bpm").value;
	var snap = document.getElementById("snap").value;
	var gap = 60000 / snap / bpm;
	document.getElementById("gap").value = gap;
	return gap;
}

function calculateNoteCount() {
	var bars = document.getElementById("bars").value;
	var snap = document.getElementById("snap").value;
	var notecount = bars*4*snap+1;
	return notecount;
}

function calculateSvMultiplier() {
	var sv1 = document.getElementById("sv1").value;
	var sv2 = document.getElementById("sv2").value;
	var notecount = calculateNoteCount();
	var multi = Math.exp((Math.log(sv2)-Math.log(sv1))/(notecount+1));
	document.getElementById("multi").value = multi;
	return multi;
}

function generateSv() {
	var gap = calculateGap();
	var notecount = calculateNoteCount();
	var multi = calculateSvMultiplier();
	var offset = parseInt(document.getElementById("offset").value);
	var time = parseInt(document.getElementById("time").value);
	var sv1 = document.getElementById("sv1").value;
	var v1 = parseInt(document.getElementById("v1").value);
	var v2 = parseInt(document.getElementById("v2").value);
	var kiai = document.getElementById("kiai").checked;
	var volumeinc = (v2-v1)/(notecount-1);
	var output = "";
	
	for (var i=0; i < notecount; i++) {
		output+=(offset+time+i*gap).toFixed(0)+",";
		var sv = -100 / (sv1*Math.pow(multi, i));
		output+=sv.toFixed(15)+",";
		output+="4,1,0,"; //timeSignature + sampleSet + sampleIndex
		var v = v1+volumeinc*i;
		output+= v.toFixed(0)+",0,"; // uninherited
		output+= (kiai?"1":"0")+"\n";
	}
	document.getElementById("result").value = output;
}

function copySv() {
	var copyText = document.getElementById("result");
	copyText.select();
	copyText.setSelectionRange(0, 99999999);
	document.execCommand("copy");
}