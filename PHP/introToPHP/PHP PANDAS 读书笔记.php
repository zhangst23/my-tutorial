PHP PANDAS 读书笔记.php


1.  Install

sudo apt-get install php5-cli
php -v


2. basic-arithmetic

<?php

echo 4 + 3 * 2 / 1;
?>


3.
3.1
TYPE:

integer
float
boolean
string
null
array


3.2

<?php

$countThePandas = [1, 2, 3];
$morePandas = array(5,6,7,8);



4. class

<?php

// Define the Book class
class Book
{
	// Declare properties.
	var $title;
	var $author;
	var $publisher;
	var $yearOfPublication;

}

// Create a new book instance
$book = new Book;

// Set properties
$book->title = 'Game of Thrones';
$book->author = 'George';
$book->publisher = 'Voyager Books';
$book->yearOfPublication = 1996;

// Echo properties
echo $book->title . PHP_EOL;
echo $book->author              . PHP_EOL;
echo $book->publisher           . PHP_EOL;
echo $book->yearOfPublication   . PHP_EOL;






?>


5.  Loop

<?php
for ($i=0; $i < ; $i++) { 
	echo "We have {$i} panda butlers!\n";
}

?>


<?php
$pandas = ['Lushui', 'Pali', 'Jasmina'];

foreach($pandas as $panda){
	echo "Hello there {$panda}\n";
}

?>


<?php

$pandas = [
	'first' => 'Lushui',
	'second' => 'Pali',
	'third' => 'Jasmina'
];

foreach ($pandas as $position => $panda){
	if ($position == 'second') {
		continue;
	}

	echo "You are the {$position} panda, {$panda}\n";
}

?>


6. Closures

<?php
$cat = function(){
	echo 'Oh long Johnson!';
}
?>


















