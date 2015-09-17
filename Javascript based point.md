#javascript
##前言  
总结一些我在javacript学习中的难点和容易忽略的地方。
 
附上javascript[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)  

还有几本好书的网上资源：
  
- [javascript秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)  
- [jQurey的基本原理](http://docs.huihoo.com/jquery/jquery-fundamentals/zh-cn/index.html) 

 - - -

###null和undefined  
- undefined 变量声明之后未被初始化，这时变量的默认值为 undefined 

		var a;  
		alert(undefined == a);//ture  
		var b=[1,2,3]
		typeof(a[3])//undefined  
 
- null 表示尚未存在的对象，例如函数返回的不存在的对象，得到null  
	
	>alert(null == document.getElementById('notExistElement'));  //ture  

###运算符短路逻辑的运用
- 访问对象属性时，事先检测是否为空
	>var name = o && o.getName;
- 设置默认值
	>var name = otherName || "default";
- 三元操作符
	>var allowed = (age>18) ? "yes" : "no";
###如何访问用预留关键字做名称的值

	obj.for = "sun";//语法错误，for 是一个预留关键字
	obj["for"] = "sun";//ok

###for循环的技巧
- 正常for循环,每次循环都要计算一次长度
	>for (var i = 0;i < a.length;i++){}
- 改进版，定义两个变量

	>for (var i = 0,len = a.length; i < len; i++){}

- 如果在已知数组中不含假值(如undefined)时，还有一种更好的方法

	>for (var i = 0,item ;item = a[++];){  //通过item代替a[i]  }  
	
     这种方法还是判断for的中间部分表达式(item = a[i])的真假，i每递增1，数组元素逐个传递给item，直到遇到假元素(如undefined)循环结束
###arguments对象
- 编写一个加法函数

		function add(a,b){  
			return a + b;  
		}  
	
	当传入三个实参时

		add(2,3,4);  
		5//忽略了最后一个参数
	
	如果重写方法接受所有被传入的参数
	
		function add(){  
			var sum = 0;  
			for(var i = 0; j = arguments.length; i++){  
			sum +=arguments[i];
			}  
			return sum;  
		}  
	
	函数实际上是访问的就是函数体中的arguments内部对象，类似数组的对象，包括了所有被传入的参数。
- 那在计算平均数的时候传入是一个数组怎么办？  
	我们可以在函数里面遍历数组

		function avgArray(arr){
			var sum = 0;
			for(var i=0,j = arr.length; i < j ;i++){
				sum +=arr[i];
			}	
			return sum/arr.length;
		}  
	当然可以用更简单的方法，用apply()重用我们已经创建的avg方法

		avg.apply(null,[1,2,4,5]);  
		3
