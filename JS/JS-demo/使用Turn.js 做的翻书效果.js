<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="flipbook">
	<div class="hard"> Turn.js </div>
	<div class="hard"></div>
	<div> Page 1 </div>
	<div> Page 2 </div>
	<div> Page 3 </div>
	<div> Page 4 </div>
	<div class="hard"></div>
	<div class="hard"></div>
</div>

</body>
<script type="text/javascript">
	$("#flipbook").turn({
		width: 400,
		height: 300,
		autoCenter: true
	});
</script>
</html>