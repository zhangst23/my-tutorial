<?php
	function C($name, $method){
		require_once('libs/Controller/'.$name.'Controller.class.php');
		// $testModel = new testModel();
		// $testController -> show();
		eval('$obj = new'.$name.'Controller(); $obj ->'.$method.'();')
	}
	C('test', 'show');

	function M($name){
		require_once('libs/Model/'.$name.'Model.class.php');
		// $testModel = new testModel();
		eval('$obj = new '.$name.'Model();');
		return $obj;
	}

	function V($name){
		require_once('libs/View/'.$name.'Model.class.php');
		// $testView = new testView();
		eval('$obj = new '.$name.'View();');
		return $obj;
	}

	function daddslashes($str){
		return (!get_magic_quotes_gpc())?addslashes($str):$str;
	}
















?>