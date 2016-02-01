(function(){
	JsBarcode = function(content, options, validFunction) {
		var merge = function(m1, m2) {
			var newMerge = {};
			for (var k in m1) {
				newMerge[k] = m1[k];
			}
			for (var k in m2) {
				newMerge[k] = m2[k];
			}
			return newMerge;
		};

		//Merge the user options with the default
		options = merge({
			title: null,
			titleAlign: 'left',
			width:	2,
			height:	100,
			quite: 10,
			format:	'CODE128',
			displayValue: false,
			fontOptions: '',
			font:'monospace',
			textAlign:'center',
			textPadding:0,
			fontSize: 12,
			backgroundColor:'',
			lineColor:'#000'
		}, options);

		const canvas = document.createElement('canvas');

		var encoder = new window[options.format](content);

		//Encode the content
		var binary = encoder.encoded();

		var _drawBarcodeText = function (text, y) {
			var x;

			ctx.font = options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;
			ctx.textBaseline = 'top';

			if(options.textAlign == 'left'){
				x = options.quite;
				ctx.textAlign = 'left';
			}
			else if(options.textAlign == 'right'){
				x = canvas.width - options.quite;
				ctx.textAlign = 'right';
			}
			else{ //All other center
				x = canvas.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(text, x, y);
		}

		var _drawTitle = function (text, y) {
			var x;

			if(options.titleAlign == 'left'){
				x = options.quite;
				ctx.textAlign = 'left';
			}
			else if(options.titleAlign == 'right'){
				x = canvas.width - options.quite;
				ctx.textAlign = 'right';
			}
			else{ //All other center
				x = canvas.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.font = options.fontOptions + " " + options.fontSize + "px "+options.font;
			ctx.textBaseline = 'top';

			ctx.fillText(text, x, y);
		}

		//Get the canvas context
		var ctx	= canvas.getContext("2d");

		//Set the width and height of the barcode
		canvas.width = binary.length*options.width+2*options.quite;
    //Set extra height if the value is displayed under the barcode. Multiplication with 1.3 t0 ensure that some
    //characters are not cut in half
		canvas.height =
			options.height +
			(options.displayValue ? options.fontSize + options.textPadding : 0) +
			(options.title ? options.fontSize + options.textPadding : 0);

		//Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.backgroundColor){
			ctx.fillStyle = options.backgroundColor;
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}

		var currentY = 0;

		if(options.title){
			_drawTitle(options.title, currentY);
			currentY += options.fontSize + options.textPadding;
		}

		//Creates the barcode out of the encoded binary
		ctx.fillStyle = options.lineColor;
		for(var i=0;i<binary.length;i++){
			var x = i*options.width+options.quite;
			if(binary[i] == "1"){
				ctx.fillRect(x,currentY,options.width,options.height);
			}
		}
		currentY += options.height;

		if(options.displayValue){
			currentY += options.textPadding;
			_drawBarcodeText(encoder.getText(), currentY);
		}

		//Grab the dataUri from the canvas
		return canvas.toDataURL('image/png');
	};
})();
