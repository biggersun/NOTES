##在循环体内绑定函数的问题
>我们应该都遇到过要给很多 dom 节点绑定同一事件的问题,但是当我们遍历的时候其中参数 i 的处理如果不小心的话就会处理的有点问题.

####应用不同的场景,有下面三种解决方法 :

第一种,如果我们需要在遍历的时候从dom节点中获取需要的数据,我们就可以直接在循环体内添加时间绑定就可以了.	

```js
function bindClick1() {
    var memberList = $api.byId('memberList');
    var item = $api.domAll(memberList,'.item');
    for (var i = 0,itemLen = item.length; i < itemLen; i++) {
      	$api.addEvt(item[i],'click',function () {
        itemId = $api.attr(this,'id');
          alert(i);
      	});         
    }
}
```

第二种,当我们不是在dom中获取数据(一般都是..)的时候.我们就要用到闭包来处理

	function bindClick3() {
    	var arr = [1,2,3];
    	var item = $api.domAll($api.byId('memberList'),'.item');
    	function bibao() {
      		return function (i) {
        		$api.addEvt(item[i],'click',function () {
          			alert(arr[i]);
        		}); 
      		}
    	}
    	for (var i = 0,itemLen = item.length; i < itemLen; i++) {
      		var func = bibao();
      		func(i);           
    	}
  	}
 
利用闭包的特性来保存变量,阻止变量的提升.
可以简单的写成下面的形式

	function bindClick2() {
    	var arr = [1,2,3];
    	var item = $api.domAll($api.byId('memberList'),'.item');
    	for (var i = 0,itemLen = item.length; i < itemLen; i++) {
      		(function (j) {
        		$api.addEvt(item[j],'click',function () {
          			alert(arr[j]);
        		}); 
      		})(i)                
    	}
  	}
 
第三种最简单 利用es6的关键词 let .需要注意的是兼容性问题(可以用babel工具来转换使用)

	function bindClick() {
    	var arr = [1,2,3,4];
    	var item = $api.domAll($api.byId('memberList'),'.item');
    	for (let i = 0,itemLen = item.length; i < itemLen; i++) {
      		$api.addEvt(item[i],'click',function () {
        		alert(arr[i]);
      		});           
    	}
  	}
  
