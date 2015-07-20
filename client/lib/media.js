

Template.home.events({
  	'click .playBtn': function(event) {
  		var v = document.getElementById('v');
  		if (v.paused) 
        	v.play(); 
    	else 
        	v.pause(); 
		/*navigator.getUserMedia = (navigator.getUserMedia || 
                             navigator.webkitGetUserMedia || 
                             navigator.mozGetUserMedia || 
                             navigator.msGetUserMedia);
		if (navigator.getUserMedia) {
			navigator.getUserMedia({
            	video:true,
            	audio:false
         	},
         	function(stream) {         		
            	var url = window.URL || window.webkitURL;
            	v.src = url ? url.createObjectURL(stream) : stream;
            	v.play();
         	},
         	function(error) {
            	alert('Something went wrong. (error code ' + error.code + ')');
            	return;
         	});
		}
		else {
			alert('play');
		}*/
  	},
  	'click .drawBtn': function(event) {
  		var c = document.getElementById('c'),
  			context = c.getContext('2d');
  		console.log('draw');
  		context.beginPath();
      	context.moveTo(50, 50);
      	context.lineTo(250, 150);
      	context.lineTo(150, 200);
      	context.lineTo(280, 30);
      	context.stroke();
  			
  	}
});