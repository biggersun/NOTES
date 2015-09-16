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

	>var a;  
	alert(undefined == a);//ture  
	>var b=[1,2,3]
	>typeof(a[3])//undefined  
 
- null 表示尚未存在的对象，例如函数返回的不存在的对象，得到null。  
	
	>alert(null == document.getElementById('notExistElement'));  //ture  

	

