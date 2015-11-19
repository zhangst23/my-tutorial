1.0  demo 


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="script/foundation.min.css">

</head>
<body>
	<div ng-app="app" ng-controller="test">
num:<input ng-model="num" />
<br/>
{{num | number}}
<br/>
{{num | number:2}}
<br/>
first name:<input ng-model="person.first"/>
<br/>
last name:<input ng-model="person.last"/>
<br/>
name: {{person | fullname}}
</div>
<script src="script/angular.min.js"></script>
	<script type="text/javascript">
	function test($scope) {

}
angular.module("app", []).controller("test", test).
filter("fullname", function() {
    var filterfun = function(person, sep) {
        sep = sep || " ";
        person = person || {
            first : "",
            last: ""
        };
        return person.first + sep + person.last;
    };
    return filterfun;
});
	</script>
	<script src="script/angular.min.js"></script>
</body>
</html>