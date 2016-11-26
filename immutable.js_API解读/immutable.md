##常用immutable.js API

####`fromJS()`: 从js数据转成不可变对象(支持数据嵌套)
	
	 Immutable.fromJS({ a: { c: 1 }, b: 2 });//ct: ct,b

####`Map()` `List()`: 从js对象转成不可变对象(不支持数据嵌套)

	Immutable.Map({ a: { c: 1 }, b: 2 });//ct: obj,b
	
	Immutable.List([1,2,3]);//bt
	
####更新对象和更新嵌套对象

	const immutableA = Immutable.fromJS({ a : 1, b : { c : 2 } });
	
	immutableB = immutableA.set('a', 2); //{ a : 2, b : { c : 2 } }
	
	immutableB = immutableA.setIn(['a', 'c'], 3); //{ a : 2, b : { c : 3 } }
	
	immutableB = immutableA.update('a', (x) => x + 1)//在原基础做修改(只知道变量时使用)
	
	immutableB = immutableA.updateIn(['a', 'b'], (x) => x + 1)

	
	
####访问对象和访问嵌套对象

	const immutableA = Immutable.fromJS({ a : 1, b : { c : 2 } });
	
	immutableA.get('a'); //1
	immutableList.get(-1) // List 的反向索引也可以运行

	immutableA.setIn(['a', 'c'], 3);
	
####关于 List 操作
	const list1 = Immutable.List.of(1,2,3);
	const list2 = Immutable.List([4,5]);
	list1.insert(1,4);
	console.log(list1); //没变
	list1.push(4);
	console.log(list1); //也不变,不管是insert() 还是push() 都不能改变 list1本身
	必须用新的 list 来接改变后的值 ,之前 javascript 那一套操作数组的思想要改变了
####合并对象

	immutableB = immutableA.merge(immutableC)
	
####判断属性是否存在(undefined 也是存在的):

	immutableData = Immutable.fromJS({key: null})
	immutableData.has('key')
	
####根据条件查找对象

`find()`第一个参数是一个reducer 返回符合条件的结果 依次执行直到有一个符合就不再往下运行了 ,第三个参数为没有符合条件的时候的默认返回值
	
	const immutableA = Immutable.List([1,2,3,4]);

	immmutableA.find((x) => x>2);//3 


`filter()` 用法和find相似,返回符合条件的 List 结果( Map 的 filter() 返回 Map)

####获取 key 和 value 的数组形式:

	immutableData.keySeq()
	immutableData.valueSeq()