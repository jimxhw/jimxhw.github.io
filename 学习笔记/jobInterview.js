// 深拷贝
function cloneDeep(obj) {
	let objCatch = new Map();
	return clone(obj);
	function clone(obj) {
		if (objCatch.has(obj)) {
			return objCatch[obj];
		}
		let res = Array.isArray(obj) ? [] : {};
		objCatch.set(obj, res);
		for (let key in obj) {
			let value = obj[key];
			if (typeof value === 'object') {
				res[key] = clone(value);
			} else {
				res[key] = value;
			}
		}
		return res;
	}
}

// 冒泡排序 每次把最值放到最后
function bubbleSort(arr) {
	function swap(arr, i, t) {
		let temp = arr[i];
		arr[i] = arr[t];
		arr[t] = temp;
	}
	for (let i = arr.length - 1; i > 0; i--) {
		let hasSwap = false;
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr, j, j + 1);
				hasSwap = true;
			}
		}
		if (!hasSwap) break;
	}
	return arr;
}

// 快排
function quickSort(ary) {
	if (ary.length < 2) return ary;
	const randomIndex = Math.floor(Math.random() * ary.length);
	const randomValue = ary[randomIndex];

	const left = [],
		right = [],
		middle = [];
	for (let i = 0; i < ary.length; i++) {
		if (ary[i] > randomValue) {
			right.push(ary[i]);
		} else if (ary[i] < randomValue) {
			left.push(ary[i]);
		} else {
			middle.push(ary[i]);
		}
	}

	const leftArray = quickSort(left);
	const rightArray = quickSort(right);
	return [...leftArray, ...middle, ...rightArray];
}

// 数组转化为链表
function arrToList(arr) {
	if (!arr.length) return null;
	let node = {
		value: arr[0],
		next: null,
	};
	let remember = node;
	for (let i = 1; i < arr.length; i++) {
		let temp = {
			value: arr[i],
			next: null,
		};
		node.next = temp;
		node = node.next;
	}
	return remember;
}

// 链表反转
var reverseList = function (head) {
	if (!head || !head.next) {
		return head;
	}
	let newHead = reverseList(head.next);
	head.next.next = head;
	head.next = null;
	return newHead;
};

// 链表转化为数组
function listToArr(list) {
	let res = [];
	while (list !== null) {
		res.push(list.value);
		list = list.next;
	}
	return res;
}

// myBind
function myBind(thisArg, ...otherArg) {
	let self = this;
	return function (...arguments) {
		let arg = otherArg.push(...arguments);
		return self.apply(thisArg, arg);
	};
}

// myNew
function myNew(obj, ...arg) {
	let res = Object.create(obj.prototype);
	let value = obj.apply(res, arg);
	if (typeof value === 'object') return value;
	return res;
}

// debounce
function debounce(f, time) {
	let timeId = null;
	return function () {
		clearTimeout(timeId);
		timeId = setTimeout(f, time);
	};
}

//throttle
function throttle(f, time) {
	let timeId = null;
	let lastRunTime = 0;
	return function () {
		const keepTime = Date.now() - lastRunTime
		if (keepTime > time) {
			f();
			lastRunTime = Date.now();
		} else {
			clearTimeout(timeId);
			timeId = setTimeout(() => {
				f();
				lastRunTime = Date.now();
			}, time - keepTime);
		}
	};
}

// 函数柯里化 f.length表示函数的形参
function curry(f) {
	return function (...arg) {
		if (arg.length >= f.length) {
			return f(...arg)
		} else {
			const newFun = f.bind(this, ...arg)
			return curry(newFun)
		}
	}
}

// compose函数
function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg;
	}
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function get(object, path, defaultValue) {
	const pathArray = path.split('.');
	for (let index = 0; index < pathArray.length; index++) {
		const it = pathArray[index];
		if (object) {
			object = object[it];
		} else {
			return defaultValue;
		}
	}
	return object;
}

// 回溯算法
// 核心就是for循环里的递归，在递归之前做选择，在递归之后撤销选择
// 全排列 给定一个没有重复数字的序列，返回其所有可能的全排列。
const permute = (nums) => {
	const res = [];
	const used = {};

	function dfs(path) {
		if (path.length == nums.length) {
			res.push(path.slice());
			return;
		}
		for (const num of nums) {
			if (used[num]) continue;
			path.push(num);
			used[num] = true;
			dfs(path);
			path.pop();
			used[num] = false;
		}
	}
	dfs([]);
	return res;
};

// 47. 全排列 II ；给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
var permuteUnique = function (nums) {
	// 先排序  排序后相等的元素相邻方便去重
	nums.sort((a, b) => a - b);
	let res = [];
	const visited = new Array(nums.length).fill(false);
	const backtrack = (path) => {
		if (path.length == nums.length) return res.push(path.slice());
		for (let i = 0; i < nums.length; i++) {
			if (nums[i] === nums[i - 1] && !visited[i - 1]) continue;
			// 如果当前数字没有在path中存在，就可以加入
			if (!visited[i]) {
				// 加入当前数字并置状态位为已加入选择
				path.push(nums[i]);
				visited[i] = true;
				backtrack(path);
				path.pop();
				visited[i] = false;
			}
		}
	};
	backtrack([]);
	return res;
};
// 动态规划
// 最长递增子序列长度
const lengthOfLIS = function (array) {
	if (array.length <= 0) return 0
	let dp = [1]
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < i; j++) {
			if (array[j] < array[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1)
			}
		}
	}
	return Math.max(...dp)
}
// 事件通信
class EventEmitter {
	constructor() {
		this.events = {}
	}

	on(type, handler) {
		if (type in this.events) {
			this.events[type].push(handler)
		} else {
			this.events[type] = [handler]
		}
		return this
	}

	off(type, handler) {
		var listeners = this.events[type]
		this.events[type] = listeners.filter(it => it !== handler)
		return this
	}

	emit(type, ...args) {
		var listeners = this.events[type]
		if (listeners) {
			for (var i = 0; i < listeners.length; i++) {
				var handler = listeners[i]
				handler(args)
			}
		}
	}
}

// 用原生js实现类继承
// 带来的问题是所有的子类都继承同一个对象
function Animal(name) {
	this.name = name;
}
Animal.prototype.sayName = function () {
	console.log('My name is ' + this.name);
}
// 子类
function Dog(name, breed) {
	Animal.call(this, name);  // 调用父类的构造函数
	this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);  // 使子类的原型对象继承自父类的原型对象
Dog.prototype.constructor = Dog;  // 修复构造器指向，constructor 属性应该指向了用于构造此实例对象的构造函数。
Dog.prototype.bark = function () {
	console.log('Woof!');
}

// 用clas实现类的继承
class Animal {
	constructor(name) {
		this.name = name;
	}
	sayName() {
		console.log('My name is ' + this.name);
	}
}
class Dog extends Animal {
	constructor(name, breed) {
		super(name);  // 调用父类的构造函数
		this.breed = breed;
	}
	bark() {
		console.log('Woof!');
	}
}

// 堆
// 是1个完全二叉树
// 构建最小堆类 n>>1==Math.floor(n/2)
class MinHeap {
	constructor() {
		this.heap = []
	}
	// 交换
	swap(i1, i2) {
		let temp = this.heap[i1]
		this.heap[i1] = this.heap[i2]
		this.heap[i2] = temp
	}
	// 获取父节点位置
	getParentIndex(i) {
		return (i - 1) >> 1
	}
	// 获取左子节点位置
	getLeftIndex(i) {
		return 2 * i + 1
	}
	// 获取右子节点位置
	getRightIndex(i) {
		return 2 * i + 2
	}
	// 上移
	upShift(index) {
		if (index == 0) return
		const parentIndex = this.getParentIndex(index)
		if (this.heap[parentIndex] > this.heap[index]) {
			this.swap(index, parentIndex)
			this.upShift(parentIndex)
		}
	}
	// 下移
	downShift(index) {
		const leftIndex = this.getLeftIndex(index)
		const rightIndex = this.getRightIndex(index)
		if (this.heap[leftIndex] < this.heap[index]) {
			this.swap(leftIndex, index)
			this.downShift(leftIndex)
		}
		if (this.heap[rightIndex] < this.heap[index]) {
			this.swap(rightIndex, index)
			this.downShift(rightIndex)
		}
	}
	// 末尾插入
	insert(value) {
		this.heap.push(value)
		this.upShift(this.heap.length - 1)
	}
	// 删除堆顶
	pop() {
		this.heap[0] = this.heap.pop()
		this.downShift(0)
	}
}

// 手写promise
// 满足promise A+ 规范的都是Promise
const FULFILLED = 'fulfilled'
const PENDING = 'pending'
const REJECTED = 'rejected'

class myPromise {
	#state = PENDING
	#result = undefined
	#handles = [] //调用then方法时把处理函数添加到队列
	constructor(executor) {
		const resolve = (data) => {
			this.#changeStatus(FULFILLED, data)
		}
		const reject = (reason) => {
			this.#changeStatus(REJECTED, reason)
		}
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
	#changeStatus(state, result) {
		if (this.#state !== PENDING) return//promise状态只能修改一次
		this.#state = state
		this.#result = result
		this.#run()
	}

	#isPromise(value) {
		// 满足PromiseA+规范的promise
		if (value !== null && (typeof value === 'function' || typeof value === "object")) {
			return typeof value.then === "function"
		}
		return false
	}
	#runMicroTask(fun) {
		// node 环境实现微队列
		if (typeof process === 'object' && typeof process.nextTick === 'function') {
			process.nextTick(fun)
		} else if (typeof MutationObserver === 'function') {
			// 浏览器环境下实现微队列
			const ob = new MutationObserver(fun)
			const textNode = document.createTextNode('1')
			ob.observe(textNode, { characterData: true })
			textNode.data = '2'
		}
	}
	#run() {
		while (this.#handles.length) {
			if (this.state === PENDING) return
			const { onFulfilled, onRejected, resolve, reject } = this.#handles.shift()
			if (this.#state === FULFILLED) {
				this.#runOne(onFulfilled, resolve, reject)
			}
			if (this.#state === REJECTED) {
				this.#runOne(onRejected, resolve, reject)
			}
		}
	}
	#runOne(callBack, resolve, reject) {
		this.#runMicroTask(() => {
			// 回调不是函数直接穿透
			if (typeof callBack !== 'function') {
				const currentFun = this.#state === FULFILLED ? resolve : reject
				currentFun(this.#result)
			} else {
				try {
					const data = callBack(this.#result)
					// 返回结果是promise在then方法中执行resolve, reject
					if (this.#isPromise(data)) {
						data.then(resolve, reject)
					} else {
						resolve(data)
					}
				} catch (error) {
					reject(error)
				}
			}
		})
	}
	then(onFulfilled, onRejected) {
		return new myPromise((resolve, reject) => {
			this.#handles.push({
				onFulfilled,
				onRejected, resolve, reject
			})
			this.#run()
		})
	}
	// catch/finally/resolve/reject/promiseAll/race 是ES6加上的语法糖，非A+规范
	catch(onRejected) {
		return this.then(undefined, onRejected)
	}
	finally(onFinally) {
		return this.then((data) => {
			onFinally()
			return data
		}, error => {
			onFinally()
			throw (error)
		})
	}
	// 描叙见MDN
	static resolve(value) {
		let _resolve, _reject
		const p = new myPromise((resolve, reject) => {
			_resolve = resolve
			_reject = reject
		})
		if (p.#isPromise(value)) {
			value.then(_resolve, _reject)
		} else {
			_resolve(value)
		}
		return p

	}
	static reject(reason) {
		return new myPromise((resolve, reject) => {
			reject(reason)
		})
	}

	static race(values) {
		return new myPromise((resolve, reject) => {
			for (let i = 0; i < values.length; i++) {
				myPromise.resolve(values[i]).then(resolve).catch(reject);
				// promise状态只会改变一次
			}
		});
	};

	static promiseAll(values) {
		return new myPromise((resolve, reject) => {
			let remember = 0;
			let result = [];
			if (values.length === 0) {
				resolve([]);
			}
			for (let i = 0; i < values.length; i++) {
				const promiseItem = values[i];
				myPromise.resolve(promiseItem)
					.then((res) => {
						result[i] = res;
						remember++;
						if (remember === values.length) {
							resolve(result);
						}
					})
					.catch(reject);
			}
		});
	}

}

// async await 原理
function run(generatorFunction) {
	return new Promise((resolve, reject) => {
		//async await 函数返回一个 promise
		var iter = generatorFunction(); //生成一个迭代器
		var generated;
		try {
			generated = iter.next(); //{value: promise, done:xxx}
			step();
		} catch (e) {
			reject(e);
		}
		function step() {
			if (!generated.done) {
				generated.value.then(
					(val) => {
						try {
							generated = iter.next(val); // 将 promise 的返回结果赋值给 await 的左边
							step();
							// generated.value 是一个 promise, val 在生成器函数中完成赋值，从而可以在生成器函数中操作 val ，这个 val 可以赋值到 = 号右边，这样就可以拿到异步结果
						} catch (e) {
							reject(e);
						}
					},
					(reason) => {
						try {
							generated = iter.throw(reason);
							step();
						} catch (e) {
							reject(e);
						}
					}
				);
			} else {
				Promise.resolve(generated.value).then(resolve, reject); //async await 函数结束后返回一个 promise 或者其他值，储存在 value 里面
			}
		}
	});
}


