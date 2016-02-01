Forked from @lindell. Added title, removed all the jQuery/automatic image-linking crap, removed all the useless encodings/examples. Have fun.

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>JsBarcode Example</title>
	<script src="../CODE128.js"></script>
	<script src="../JsBarcode.js"></script>
</head>
<body>
	<div>
		<img id="barcode"/>
		<script>
			document.getElementById('barcode').src = JsBarcode('10003591671', {
				title: 'N° RPPS',
				titleAlign: 'left',
			  width:  2,
			  height: 85,
			  displayValue: true,
			  fontSize: 20,
			  textPadding: 2,
			});
		</script>
	</div>
</body>
</html>
```
