###快速读懂Ruby代码回答：

#####Q：最有特点的语法形式  
A:方法后接代码块的大量使用  
   file.each_line(""){ |line| print line }  
   open('test.txt') { |f| line_array = f.readlines }
   
#####Q: 迭代器
   
 A: 字符串迭代器：str.each_byte{ |c| printf">%c",c };  
 str.each_line{|l| print l}  
 数字迭代器  5.times {print "I love you."}  
 (1..5).each{|i| sum += i}  
 print "Sum="+sum.to_s  
 数组迭代器  
 Map迭代器  
 文件迭代器  
 目录迭代器  
 
#####Q:一切皆对象  
 A:模块、类也是对象，String、Array等类是Class类的实例对象，Class作为对象也是Class这个类的实例 
   
   、
   
#####   Q：$foo、@bar和@@baz里的$、@、@@是什么意思？   
   A:  
   § 以小写字母或_开头的变量是局部变量 


§ 以$开头的是全局变量 


§ 以@开头的是每个对象自身的实例变量 


§ 以@@开头的是同类对象都可访问的类变量


#####Q:

大写字母开头的是常量，包括模块名、类名都以大写字母开头，如Array、Enumerable都是常量。常量的意思是这个名称和某个对象的联系是固定了的，但不表示那个对象不可更改，如： 


  Foobar = [ 1, 2, 3 ] 
  Foobar[2] = 99 
  print Foobar # [1, 2, 99]   
  
    
    
  
#####Q：有些方法名称里有?和!，是什么意思？比如nil?和strip! 


方法名的最后可以有一个?或!，这只是一种命名习惯，让方法的涵义看起来更好懂 


加?的方法，通常都是返回true/false的 
像nil?的功能是检测它的对象是否是nil，obj.nil?感觉就是在问obj是nil吗？ 
又如File.exist?("test.txt")感觉就是在问"test.txt"存在吗？ 


加!的方法，总有一个对应的不加!的方法，通常不加!的生成新对象，而加!的是对本对象进行修改，如String类的strip和strip!： 


str = "  abc  " 
new_str = str.strip # 不改动原str对象，而是新生成一个字符串，删去了前后空白符 
str.strip! # 直接在原str对象上改动，删去str的前后空白符 


?和!的使用并没有强制性的规定，你要定义一个返回true/false的方法，不加?也可以，或者某个以?结尾的方法，不返回true/false也可，!也是。总之?和!就是一般字符，不具有限定功能，只是增强可读性的 
  
  
#####Q：:encoding :xyz是什么意思？ 


这是Symbol类实例的字面量表示法，用个冒号放在字符之前，初学Ruby者可能容易把这个误认为是变量名。也可以写作:"encoding"这样，看起来就像个特殊的字符串，而不是变量名了，但通常是省略引号的。 
  

#####Q：哈希字面量的写法是怎样的？ 


用花括号，键和值用=>分隔开，如： 


hash = { :key1 => "val1", :key2 => "val2", :key3 => "val3" } 

#####Q：yield是干什么用的？ 


方法定义中把控制权交给代码块，是用来实现each这一类迭代方法的直接途径： 


def from_to_by(from, to, by) 
  x = from 
  while x <= to 
    yield x 
    x += by 
  end 
end 


from_to_by(3,26,4) {|x| print x, " " } # 3 7 11 15 19 23 


自己的迭代方法就这样定义好了















