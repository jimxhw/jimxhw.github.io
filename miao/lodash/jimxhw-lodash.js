var jimxhw = {
    identity: function (it) {
        return it
    },
    iteratee: function (iter) {
        if (typeof iter == "function") {
            return iter
        }
        if (typeof iter == "string") {
            return jimxhw.property(iter)
        }
        if (jimxhw.isArray(iter)) {
            return jimxhw.matchesProperty(...iter)
        }
        if (jimxhw.isObject(iter)) {
            return jimxhw.matches(iter)
        }
    },
    property: function (path) {
        if (typeof path == "string") {
            path = path.split(".")
        }
        return function (obj) {
            path.forEach((item) => obj = obj[item])
            return obj
        }
    },//返回给定对象的屬性路徑的值的函数
    matches: function (source) {
        return function (obj) {
            for (var prop in source) {
                if (!jimxhw.isEqual(source[prop], obj[prop])) {
                    return false
                }
            }
            return true
        }
    },//返回一个函数，将该函数的参数和指定对象进行深对比,即判断source是不是obj的子集
    matchesProperty: function (path, srcValue) {
        return function (obj) {
            return jimxhw.isEqual(jimxhw.property(path)(obj), srcValue)
        }
    },//创建一个深比较的方法来比较给定对象的 path 的值是否是 srcValue
    chunk: function (array, n) {
        let l = array.length
        if (n >= l) { return array }
        let result = []
        let i = 0
        while (i < l) {
            let arr1 = array.slice(i, i + n)
            result.push(arr1)
            i = i + n
        }
        if (i = l) {
            return result
        } else {
            return result.push(array.slice(i))
        }
    },
    compact: function (ary) {
        return ary.filter(it => it)
    },
    concat: function (array, ...val) {
        for (let i = 1; i < arguments.length; i++) {
            if (Array.isArray(arguments[i])) {
                array.push(...arguments[i])
            } else {
                array.push(arguments)
            }
        }
        return array
    },
    drop: function (arr, n = 1) {
        return arr.slice(n)
    },
    dropRight: function (arr, n = 1) {
        let l = arr.length
        if (l <= n) { return [] }
        return arr.slice(0, l - n)
    },
    fill: function (array, val, start = 0, end = array.length) {
        for (let i = start; i < end; i++) {
            array[i] = val
        }
        return array
    },
    head: function (array) {
        return array[0]
    },
    flatten: function (array) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                result.push(...array[i])
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    flattenDeep: function (array) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                let temp = this.flattenDeep(array[i])
                result.push(...temp)
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    flattenDepth: function (array, depth = 1) {
        let result = []
        if (depth == 0) {
            return array
        }
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                let temp = this.flattenDepth(array[i], depth - 1)
                result.push(...temp)
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    indexOf: function (array, val, fromIndex = 0) {
        if (jimxhw.isNaN(val)) {
            for (let i = fromIndex; i < array.length; i++) {
                if (jimxhw.isNaN(array[i])) {
                    return i
                }
            }
            return -1
        }
        for (let i = fromIndex; i < array.length; i++) {
            if (array[i] === val) {
                return i
            }
        }
        return -1
    },
    initial: function (array) {
        return array.slice(0, array.length - 1)
    },
    join: function (array, separator = ",") {
        return array.reduce(function (x, y) {
            return x + String(separator) + y
        })
    },
    last: function (array) {
        return array[array.length - 1]
    },
    lastIndexOf: function (array, val, fromIndex = array.length - 1) {
        if (jimxhw.isNaN(val)) {
            for (let i = fromIndex; i >= 0; i--) {
                if (jimxhw.isNaN(array[i])) {
                    return i
                }
            }
            return -1
        }
        for (let i = fromIndex; i >= 0; i--) {
            if (array[i] === val) {
                return i
            }
        }
        return -1
    },
    nth: function (array, n = 0) {
        if (n >= 0) {
            return array[n]
        } else {
            return array[array.length + n]
        }
    },
    reverse: function (array) {
        let i = 0; j = array.length - 1
        while (i != j) {
            let temp = array[i]
            array[i++] = array[j]
            array[j--] = temp
        }
        return array
    },
    slice: function (array, start = 0, end = array.length) {
        let result = []
        for (let i = start; i < end; i++) {
            result.push(array[i])
        }
        return result
    },
    keyby: function (ary, key) {
        let result = {}
        ary.forEach(item => { result[item[key]] = item })
        return result
    },
    findIndex: function (array, predicate = jimxhw.identity, fromIndex = 0) {
        predicate = this.iteratee(predicate)
        for (let i = fromIndex; i < array.length; i++) {
            if (predicate(array[i])) {
                return i
            }
        }
        return -1
    },
    findLastIndex: function (array, predicate = jimxhw.identity, fromIndex = array.length - 1) {
        predicate = this.iteratee(predicate)
        for (let i = fromIndex; i >= 0; i--) {
            if (predicate(array[i])) {
                return i
            }
        }
        return -1
    },
    intersection: function (...arguments) {
        let map = {}
        arguments.forEach(function (x) {
            for (let i = 0; i < x.length; i++) {
                if (x[i] in map) {
                    map[x[i]] = true
                } else {
                    map[x[i]] = false
                }
            }
        })
        let result = []
        for (let key in map) {
            if (map[key] == true) {
                result.push(Number(key))
            }
        }
        return result
    },
    pull: function (array, ...arguments) {
        let map = {}
        for (let i = 0; i < arguments.length; i++) {
            map[arguments[i]] = true
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] in map) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    },
    pullAll: function (array, arr) {
        return this.pull(array, ...arr)
    },
    sortedIndex: function (array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] >= value) {
                return i
            }
        }
        return array.length
    },
    tail: function (array) {
        return array.slice(1)
    },
    take: function (array, n = 1) {
        return array.slice(0, n)
    },
    takeRight: function (array, n = 1) {
        if (array.length - n < 0) {
            return array.slice(0, array.length)
        }
        return array.slice(array.length - n, array.length)
    },
    uniq: function (array) {
        let a = new Set(array)
        let b = Array.from(a)
        return b
    },
    without: function (array, ...arguments) {
        let map = {}
        for (let i = 0; i < arguments.length; i++) {
            map[arguments[i]] = true
        }
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (!(array[i] in map)) {
                result.push(array[i])
            }
        }
        return result
    },
    xor: function (...arguments) {
        let result = this.flatten(arguments)
        let map = {}
        for (let i = 0; i < result.length; i++) {
            let temp = result[i]
            if (temp in map) {
                map[temp]++
            } else {
                map[temp] = 1
            }
        }
        let array = []
        for (let keys in map) {
            if (map[keys] > 1) {
                array.push(+keys)
            }
        }
        return this.without(result, ...array)
    },
    every: function (collection, predicate = jimxhw.identity) {
        predicate = this.iteratee(predicate)
        for (let keys of collection) {
            if (!(predicate(keys))) {
                return false
            }
        }
        return true
    },
    some: function (collection, predicate) {
        predicate = this.iteratee(predicate)
        for (let keys of collection) {
            if (predicate(keys)) {
                return true
            }
        }
        return false
    },
    filter: function (collection, predicate) {
        predicate = this.iteratee(predicate)
        let result = []
        for (let keys of collection) {
            if (predicate(keys)) {
                result.push(keys)
            }
        }
        return result
    },
    difference: function (array, ...value) {
        let map = {}
        value.forEach(function (x) {
            for (let i = 0; i < x.length; i++) {
                map[x[i]] = true
            }
        })
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (!(array[i] in map)) {
                result.push(array[i])
            }
        }
        return result
    },
    forOwn: function (obj, iterator) {
        iterator = jimxhw.iteratee(iterator)
        for (let keys in obj) {
            if (obj.hasOwnProperty(keys)) {
                if (iterator(obj[keys], keys, obj) === false) {
                    break
                }
            }
        }
        return obj
    },
    isObjectLike: function (value) {
        return typeof (value) == "object" && value === value && !this.isNull(value)
    },
    isArguments: function (value) {
        return Object.prototype.toString.call(value) === "[object Arguments]"
    },
    isArray: function (value) {
        return Object.prototype.toString.call(value) === "[object Array]"
    },
    isBoolean: function (value) {
        return Object.prototype.toString.call(value) === "[object Boolean]"
    },
    isNull: function (value) {
        return Object.prototype.toString.call(value) === "[object Null]"
    },
    isNumber: function (value) {
        return Object.prototype.toString.call(value) === "[object Number]"
    },
    isObject: function (value) {
        var type = typeof value;
        return value != null && (type == 'object' || type == 'function');
    },
    isString: function (value) {
        return Object.prototype.toString.call(value) === "[object String]"
    },
    isUndefined: function (value) {
        return Object.prototype.toString.call(value) === "[object Undefined]"
    },
    isRegExp: function (value) {
        return Object.prototype.toString.call(value) === "[object RegExp]"
    },
    isNaN: function (value) {
        return typeof value == "number" && value != value
    },
    isEqual: function (value, other) {
        if (value === other) {
            return true
        }
        if (value != value && other != other) {
            return true
        }
        if (typeof value == "object" && typeof other == "object") {
            var valueKeys = Object.keys(value)
            var otherKeys = Object.keys(other)
            if (valueKeys.length != otherKeys.length) {
                return false
            }
            for (var prop in value) {
                if (jimxhw.isEqual(value[prop], other[prop])) {
                    continue
                } else {
                    return false
                }
            }
            return true
        }
        return value === other
    },// 深对比两个值是否相等
    differenceBy: function (array, ...arguments) {
        var iteratee
        let temp = arguments[arguments.length - 1]
        if (typeof temp === "function") {
            iteratee = arguments.pop()
        } else if (typeof temp === "string") {
            arguments.pop()
            iteratee = it => it[temp]
        }
        else {
            iteratee = it => it
        }
        let arrayOne = [].concat(...arguments)
        arrayOne = arrayOne.map(x => iteratee(x))
        let result = []
        array.forEach(function (item) {
            if (!arrayOne.includes(iteratee(item))) {
                result.push(item)
            }
        })
        return result
    },
    differenceWith: function (array, ...arguments) {
        var comparater
        let temp = arguments[arguments.length - 1]
        if (typeof temp === "function") {
            comparater = arguments.pop()
        }
        else {
            arguments.pop()
            comparater = this.isEqual
        }
        let arrayOne = [].concat(...arguments)
        let result = []
        for (let i = 0; i < array.length; i++) {
            var temps = false
            for (let j = 0; j < arrayOne.length; j++) {
                if (comparater(array[i], arrayOne[j])) {
                    temps = true
                    break
                }
            }
            if (!temps) {
                result.push(array[i])
            }
        }
        return result
    },
    dropRightWhile: function (arr, predicate = jimxhw.identity) {
        predicate = this.iteratee(predicate)
        for (let i = arr.length - 1; i >= 0; i--) {
            if (!predicate(arr[i])) {
                var arr2 = arr.slice(0, i + 1)
                break
            }
        }
        let result = []
        for (let i = 0; i < arr2.length; i++) {
            result.push(arr2[i])
        }
        return result
    },
    dropWhile: function (arr, predicate = jimxhw.identity) {
        predicate = this.iteratee(predicate)
        let result = []
        for (let i = 0; i < arr.length; i++) {
            if (!predicate(arr[i])) {
                var arr2 = arr.slice(i)
                break
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            result.push(arr2[i])
        }
        return result
    },
    fromPairs: function (arr) {
        let obj = {}
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i][0]] = arr[i][1]
        }
        return obj
    },
    union: function (...array) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            let temp = array[i]
            for (let j = 0; j < temp.length; j++) {
                if (!result.includes(temp[j])) {
                    result.push(temp[j])
                }
            }
        }
        return result
    },
    now: function () {
        let date = new Date()
        return date.getTime
    },
    intersectionBy: function (array, ...arguments) {
        let temp = arguments[arguments.length - 1]
        if (this.isArray(temp)) {
            var iteratee = jimxhw.iteratee
        } else {
            var iteratee = temp
            arguments.pop()
        }
        iteratee = jimxhw.iteratee(iteratee)
        let map = {}
        arguments.forEach(function (x) {
            for (let i = 0; i < x.length; i++) {
                var char = iteratee(x[i])
                if (char in map) {
                    map[char] = true
                } else {
                    map[char] = false
                }
            }
        })
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (String(iteratee(array[i])) in map) {
                result.push(array[i])
            }
        }
        return result
    },
    intersectionWith: function (array, ...arguments) {
        let comparater = arguments.pop()
        let result = []
        for (let i = 0; i < array.length; i++) {
            var x = array[i]
            let flag = false
            for (let j = 0; j < arguments.length; j++) {
                if (comparater(x, arguments[j])) {
                    flag = true
                    break
                }
            }
            if (flag) {
                result.push(x)
            }
        }
        return result
    },
    pullAllBy(array, values, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        return array.filter(it => { return !values.some(value => { return iteratee(value) === iteratee(it) }) })
    },
    pullAllWith(array, values, comparater) {
        return array.filter(it => { return !values.some(value => { return comparater(it, value) }) })
    },
    unionBy: function (array, ...arguments) {
        let temps = arguments[arguments.length - 1]
        if (this.isArray(temps)) {
            var iteratee = jimxhw.iteratee
        } else {
            var iteratee = temps
            arguments.pop()
        }
        iteratee = jimxhw.iteratee(iteratee)
        array = array.concat(...arguments)
        let arr = array.map(x => iteratee(x))
        let map1 = {}
        for (let i = 0; i < arr.length; i++) {
            var char = arr[i]
            if (char in map1) {
                arr.splice(i, 1)
                array.splice(i, 1)
                i--
            } else {
                map1[char] = true
            }
        }
        return array
    },
    unionWith: function (array, ...arguments) {
        let comparater = arguments.pop()
        let result = array.slice()
        for (let i = 0; i < arguments.length; i++) {
            var x = arguments[i]
            let flag = false
            for (let j = 0; j < array.length; j++) {
                if (comparater(x, array[j])) {
                    flag = true
                    break
                }
            }
            if (!flag) {
                result.push(x)
            }
        }
        return result
    },
    uniqBy: function (array, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        let result = [], map = []
        for (let i = 0; i < array.length; i++) {
            let temp = iteratee(array[i])
            if (!map.includes(temp)) {
                map.push(temp)
                result.push(array[i])
            }
        }
        return result
    },
    zip: function (...arguments) {
        return arguments[0].map((x, i) => { return arguments.map(j => j[i]) })
    },
    unzip: function (array) {
        return array[0].map((x, i) => { return array.map(j => j[i]) })
    },
    countBy: function (collection, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        let map = {}
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                let temp = iteratee(collection[i])
                if (temp in map) {
                    map[temp]++
                } else {
                    map[temp] = 1
                }
            }
        } else {
            for (let keys in collection) {
                let temp = iteratee(collection[keys])
                if (temp in map) {
                    map[temp]++
                } else {
                    map[temp] = 1
                }
            }
        }
        return map
    },
    find: function (collection, predicate = jimxhw.identity, fromIndex = 0) {
        predicate = this.iteratee(predicate)
        if (this.isArray(collection)) {
            for (let i = fromIndex; i < collection.length; i++) {
                if (predicate(collection[i])) {
                    return collection[i]
                }
            }
        } else {
            let i = -1
            for (let keys in collection) {
                i++
                if (i >= fromIndex) {
                    if (predicate(collection(keys))) {
                        return collection[key]
                    }
                }
            }
        }
        return undefined
    },
    bind: function (f, thisArg, ...fixarg) {
        return function (...Arguments) {
            let arg = fixarg
            for (let i = 0; i < arg.length; i++) {
                if (arg[i] === _) {
                    arg[i] = Arguments.shift()
                }
            }
            arg.push(...Arguments)
            return f.apply(thisArg, arg)
        }
    },
    isMath: function (obj, src) {
        if (obj === src) {
            return true
        }
        for (var key in src) {
            if (typeof src[key] == 'object' && src[key] !== null) {
                if (!this.isMatch(obj[key], src[key])) {
                    return false
                }
            } else {
                if (obj[key] != src[key]) {
                    return false
                }
            }
        }
        return true
    },
    toPath: function (value) {
        return value.split(/\.|\[|\]./g)
    },
    get: function (obj, path, defaultVal) {
        if (jimxhw.isString(path)) {
            path = jimxhw.toPath(path)
        }
        for (let i = 0; i < path.length; i++) {
            if (obj === undefined) {
                return defaultVal
            }
            obj = obj[path[i]]
        }
        return obj
    },
    map: function (collection, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        let result = []
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                result.push(iteratee(collection[i], i, collection))
            }
        } else {
            for (let keys in collection) {
                result.push(iteratee(collection[keys], keys, collection))
            }
        }
        return result
    },
    flatMap: function (collection, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        var result = []
        jimxhw.forEach(collection, x => result.push(iteratee(x)))
        return jimxhw.flatten(result)
    },
    flatMapDeep: function (collection, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let result = []
        jimxhw.forEach(collection, x => result.push(iteratee(x)))
        return jimxhw.flattenDeep(result)
    },
    flatMapDepth: function (collection, iteratee = jimxhw.identity, depth = 1) {
        iteratee = jimxhw.iteratee(iteratee)
        let result = []
        jimxhw.forEach(collection, x => result.push(iteratee(x)))
        return jimxhw.flattenDepth(result, depth)
    },
    forEach: function (collection, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                if (iteratee(collection[i], i, collection) === false) {
                    break
                }
            }
        } else {
            for (let keys in collection) {
                if (iteratee(collection[keys], keys, collection) === false) {
                    break
                }
            }
        }
        return collection
    },
    keyBy: function (collection, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let result = {}
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                result[iteratee(collection[i])] = collection[i]
            }
        } else {
            for (let keys in collection) {
                result[iteratee(collection[keys])] = collection[keys]
            }
        }
        return result
    },
    groupBy: function (collection, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let result = {}
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                let temp = iteratee(collection[i])
                if (temp in result) {
                    result[temp].push(collection[i])
                } else {
                    result[temp] = [collection[i]]
                }
            }
        } else {
            for (let keys in collection) {
                let temp = iteratee(collection[keys])
                if (temp in result) {
                    result[temp].push(collection[keys])
                } else {
                    result[temp] = [collection[keys]]
                }
            }
        }
        return result
    },
    partition: function (collection, predicate = jimxhw.identity) {
        predicate = jimxhw.iteratee(predicate)
        let trueArray = []
        let falseArray = []
        if (this.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                if (predicate(collection[i])) {
                    trueArray.push(collection[i])
                } else {
                    falseArray.push(collection[i])
                }
            }
        } else {
            for (let keys in collection) {
                if (predicate(collection[keys])) {
                    trueArray.push(collection[keys])
                } else {
                    falseArray.push(collection[keys])
                }
            }
        }
        return [trueArray, falseArray]
    },
    toArray: function (value) {
        let result = []
        if (jimxhw.isObject(value)) {
            for (let keys in value) {
                result.push(value[keys])
            }
        }
        if (jimxhw.isString(value)) {
            return value.split("")
        }
        return result
    },
    reduce: function (collection, iteratee, accumulator) {
        if (jimxhw.isObject(collection)) {
            for (let keys in collection) {
                accumulator = iteratee(accumulator, collection[keys], keys, collection)
            }
            return accumulator
        }
        let i = 0
        if (arguments.length == 2) {
            i = 1
            accumulator = collection[0]
        }
        for (; i < collection.length; i++) {
            accumulator = iteratee(accumulator, collection[i], i, collection)
        }
        return accumulator
    },
    reduceRight: function (collection, iteratee, accumulator) {
        if (this.isObject(collection)) {
            collection = Object.entries(collection).map(x => x[1])
        }
        let i = collection.length - 1
        if (arguments.length == 2) {
            i = collection.length - 2
            accumulator = collection[collection.length - 1]
        }
        for (; i >= 0; i--) {
            accumulator = iteratee(accumulator, collection[i], i, collection)
        }
        return accumulator
    },
    reject: function (collection, predicate) {
        predicate = this.iteratee(predicate)
        let result = []
        collection.forEach(x => {
            if (!predicate(x)) {
                result.push(x)
            }
        })
        return result
    },
    sample: function (collection) {
        if (this.isObject(collection)) {
            collection = Object.entries(collection).map(x => x[1])
        }
        return collection[(Math.random() * (collection.length)) | 0]
    },
    shuffle: function (collection) {
        if (this.isObject(collection)) {
            collection = Object.entries(collection).map(x => x[1])
        }
        let result = []
        while (collection.length) {
            let temp = (Math.random() * (collection.length)) | 0
            result.push(collection[temp])
            collection.splice(temp, 1)
        }
        return result
    },
    size: function (collection) {
        if (this.isObject(collection)) {
            collection = Object.entries(collection)
        }
        return collection.length
    },
    sortBy: function (collection, iteratee = jimxhw.identity) {
        function swap(ary, x, y) {
            if (x != y) {
                let temp = ary[x]
                ary[x] = ary[y]
                ary[y] = temp
            }
        }
        function quickSort(ary, iteratee, start = 0, end = ary.length - 1) {
            if (end - start <= 0) {
                return ary
            }

            var pivotIndex = Math.floor(Math.random() * (end - start + 1) + start)
            var pivot = ary[pivotIndex]

            swap(ary, pivotIndex, end)

            var i = start
            for (var j = start; j < end; j++) {
                if (iteratee(ary[j]) - iteratee(pivot) > 0) {
                    swap(ary, i, j)
                    i++
                }
            }

            swap(ary, i, end)

            quickSort(ary, iteratee, start, i - 1)
            quickSort(ary, iteratee, i + 1, end)

            return ary
        }
        iteratee = jimxhw.iteratee(iteratee)
        if (this.isObject(collection)) {
            collection = Object.entries(collection).map(x => x[1])
        }
        return quickSort(collection, iteratee)
    },
    defer: function (func, ...args) {
        return setTimeout(func, ...args)
    },
    delay: function (func, ...args) {
        let s = args.shift()
        return setTimeout(func, s, ...args)
    },
    isDate: value => { return Object.prototype.toString.call(value) == "[object Date]" },
    isElement: value => { return Object.prototype.toString.call(value) == "[object HTMLBodyElement]" },
    isEmpty: function (value) {
        if (value === null) { return true }
        if (typeof value === "object") {
            return false
        }
        return true
    },
    isError: value => { return Object.prototype.toString.call(value) == "[object Error]" },
    isFinite: value => { return typeof value === "number" && isFinite(value) },
    isFunction: value => { return Object.prototype.toString.call(value) == "[object Function]" },
    isNil: value => { return jimxhw.isNull(value) || jimxhw.isUndefined(value) },
    isMatch: function (obj, src) {
        if (obj === src) {
            return true
        }
        for (var key in src) {
            if (!jimxhw.isEqual(obj[key], src[key])) {
                return false
            }
        }
        return true
    },
    isSymbol: value => { return Object.prototype.toString.call(value) == "[object Symbol]" },
    isSet: value => { return Object.prototype.toString.call(value) == "[object Set]" },
    isWeakMap: value => Object.prototype.toString.call(value) == "[object WeakMap]",
    isWeakSet: value => Object.prototype.toString.call(value) == "[object WeakSet]",
    ceil: function (number, precision = 0) {
        return Math.ceil(number * 10 ** precision) / 10 ** precision
    },
    max: function (array) {
        if (array.length) {
            return Math.max(...array)
        }
        return undefined
    },
    maxBy: function (array, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let maxIndex = 0
        for (let i = 0; i < array.length; i++) {
            if (iteratee(array[maxIndex]) < iteratee(array[i])) {
                maxIndex = i
            }
        }
        return array[maxIndex]
    },
    min: function (array) {
        if (array.length) {
            return Math.min(...array)
        }
        return undefined
    },
    round: function (number, precision = 0) {
        return Math.round(number * 10 ** precision) / 10 ** precision
    },
    sum: function (array) {
        return array.reduce((x, y) => { return x + y })
    },
    sumBy: function (array, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        return array.map(x => iteratee(x)).reduce((x, y) => { return x + y })
    },
    random: function (lower = 0, upper = 1, floating = false) {
        if (arguments.length == 0) {
            return Math.random() | 0
        } else if (arguments.length == 1) {
            if (floating || !Number.isInteger(lower) || !Number.isInteger(upper)) {
                return Math.random()
            } else {
                return (Math.random() * arguments[0]) | 0
            }
        } else if (arguments.length == 2) {
            if (floating || !Number.isInteger(lower) || !Number.isInteger(upper)) {
                return Math.random() * arguments[0]
            } else {
                return (Math.random() * (arguments[1] - arguments[0])) | 0
            }
        } else {
            if (floating || !Number.isInteger(lower) || !Number.isInteger(upper)) {
                return Math.random() * (arguments[1] - arguments[0])
            } else {
                return (Math.random() * (arguments[1] - arguments[0])) | 0
            }
        }
    },
    assign: function (object, ...sources) {
        return sources.reduce((x, y) => { return Object.assign(x, y) }, object)
    },
    assignIn: function (object, ...sources) {
        sources.forEach(function (obj) {
            for (let key in obj) {
                object[key] = obj[key]
            }
        })
        return object
    },
    defaults: function (object, ...sources) {
        sources.forEach(function (obj) {
            for (let key in obj) {
                if (!(key in object)) {
                    object[key] = obj[key]
                }
            }
        })
        return object
    },
    findKey: function (object, predicate = jimxhw.identity) {
        predicate = jimxhw.iteratee(predicate)
        for (let key in object) {
            if (predicate(object[key])) {
                return key
            }
        }
        return undefined
    },
    forIn: function (object, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        for (let keys in object) {
            if (iteratee(object[keys], keys, object) === false) {
                break
            }
        }
        return object
    },
    forInRight: function (object, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let array = []
        for (let keys in object) {
            array.unshift(keys)
        }
        let object2 = {}
        for (let i = 0; i < array.length; i++) {
            object2[i] = object[i]
        }
        for (let keys in object2) {
            if (iteratee(object2[keys], keys, object2) === false) {
                break
            }
        }
        return object
    },
    forOwnRight: function (object, iterator) {
        iterator = jimxhw.iteratee(iterator)
        let array = []
        for (let keys in object) {
            array.unshift(keys)
        }
        let object2 = {}
        for (let i = 0; i < array.length; i++) {
            object2[i] = object[i]
        }
        for (let keys in object2) {
            if (object.hasOwnProperty(keys)) {
                if (iterator(object2[keys], keys, object2) === false) {
                    break
                }
            }
        }
        return object
    },
    functions: function (object) {
        return Object.entries(object).map(x => x[0])
    },
    has: function (object, path) {
        if (typeof path == "string") {
            path = path.split(".")
        }
        let arr1 = path.pop()
        object = jimxhw.property(path)(object)
        return object.hasOwnProperty(arr1[0])
    },
    invert: function (object) {
        let array = Object.entries(object)
        let result = {}
        array.reduce((x, y) => { return x[y[1]] = y[0] }, result)
        return result
    },
    invoke: function (object, path, ...args) {
        if (jimxhw.isString(path)) {
            path = jimxhw.toPath(path)
        }
        var func = path.pop()
        return jimxhw.get(object, path)[func](...args)
    },
    keys: function (object) {
        return Object.entries(object).map(x => x[0])
    },
    mapKeys: function (object, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let obj = {}
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let temp = iteratee(object[key], key, object)
                obj[temp] = object[key]
            }
        }
        return obj
    },
    mapValues: function (object, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let obj = {}
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let temp = iteratee(object[key], key, object)
                obj[key] = temp
            }
        }
        return obj
    },
    omit: function (object, path) {
        if (jimxhw.isString(path)) {
            path = jimxhw.toPath(path)
        }
        let obj = {}
        for (let keys in object) {
            if (!path.includes(keys)) {
                obj[keys] = object[keys]
            }
        }
        return obj
    },
    pick: function (object, path) {
        if (jimxhw.isString(path)) {
            path = jimxhw.toPath(path)
        }
        let obj = {}
        for (let keys in object) {
            if (path.includes(keys)) {
                obj[keys] = object[keys]
            }
        }
        return obj
    },
    result: function (obj, path, defaultVal) {
        if (jimxhw.isString(path)) {
            path = jimxhw.toPath(path)
        }
        for (let i = 0; i < path.length; i++) {
            if (obj === undefined) {
                obj = defaultVal
                break
            }
            obj = obj[path[i]]
        }
        if (this.isFunction(obj)) {
            return obj.bind(this)()
        }
        return obj
    },
    toPairs: function (object) {
        return Object.entries(object)
    },
    values: function (object) {
        return Object.entries(object).map(x => x[1])
    },
    pad: function (string = "", Length = 0, char = " ") {
        let l = string.length
        if (l >= Length) {
            return string
        }
        let temps = Length - l
        let t = char.length
        if (temps % (2 * t)) {
            var n = ((temps / (2 * t)) | 0) + 1
        } else {
            var n = temps / (2 * t)
        }
        string = char.repeat(n) + string + char.repeat(n)
        return string.slice(0, Length)
    },
    padEnd: function (string = "", Length = 0, char = " ") {
        let l = string.length
        if (l >= Length) {
            return string.slice(0, Length)
        }
        let temps = Length - l
        let t = char.length
        if (temps % t) {
            var n = ((temps / t) | 0) + 1
        } else {
            var n = temps / t
        }
        string = string + char.repeat(n)
        return string.slice(0, Length)
    },
    padStart: function (string = "", Length = 0, char = " ") {
        let l = string.length
        if (l >= Length) {
            return string.slice(l - Length)
        }
        let temps = Length - l
        let t = char.length
        if (temps % t) {
            var n = ((temps / t) | 0) + 1
        } else {
            var n = temps / t
        }
        string = char.repeat(n) + string
        return string.slice(string.length - Length)
    },
    repeat: function (string = '', n = 1) {
        if (n == 0) { return "" }
        let initial = string
        for (let i = 1; i < n; i++) {
            string = string + initial
        }
        return string
    },
    range: function (...args) {
        let result = []
        if (args.length == 1) {
            let end = args[0], start = 0
            if (end < 0) {
                let step = -1
                while (start > end) {
                    result.push(start)
                    start = start + step
                }
            } else {
                let step = 1
                while (start < end) {
                    result.push(start)
                    start = start + step
                }
            }
        } else if (args.length == 2) {
            let start = args[0], end = args[1], step = 1
            while (start < end) {
                result.push(start)
                start = start + step
            }
        } else {
            let start = args[0], end = args[1], step = args[2]
            if (step == 0) { return [start, start, start] }
            if (end > start) {
                while (start < end) {
                    result.push(start)
                    start = start + step
                }
            } else {
                while (start > end) {
                    result.push(start)
                    start = start + step
                }
            }
        }
        return result
    },
    negate: function (predicate) {
        return function (...arg) {
            return !predicate(...arg)
        }
    },
    curry: function (f, length = f.length) {
        return function (...args) {
            if (args.length >= length) {
                return f(...args)
            } else {
                return jimxhw.curry(f.bind(null, ...args), length - args.length)
            }
        }
    },
    times: function (n, iteratee = jimxhw.identity) {
        let result = []
        while (n > 0) {
            result.push(iteratee())
            n--
        }
        return result
    },
    uniqueId: function (prefix = "") {
        let s = ("" + Math.random()).slice(3, 6)
        return prefix + s
    },
    constant: function (value) {
        return value
    },
    propertyof: function (object) {
        return function (path) {
            return jimxhw.get(object, path, defaultVal)
        }
    },
    cloneDeep: function (value) {
        if (jimxhw.isElement(value) || jimxhw.isFunction(value) || jimxhw.isWeakMap(value) || jimxhw.isError(value)) {
            return {}
        }
        if (jimxhw.isRegExp(value)) {
            let temp = value.source
            return new RegExp(temp)
        }
        if (jimxhw.isUndefined(value)) {
            return undefined
        }
        return JSON.parse(JSON.stringify(value))
    },
    sortedIndexBy: function (array, value, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let temp = iteratee(value)
        for (let i = 0; i < array.length; i++) {
            if (iteratee(array[i]) >= temp) {
                return i
            }
        }
        return array.length
    },
    sortedIndexOf: function (array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
    },
    sortedLastIndex: function (array, value) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] <= value) {
                return i + 1
            }
        }
        return 0
    },
    sortedLastIndexBy: function (array, value, iteratee = jimxhw.identity) {
        iteratee = jimxhw.iteratee(iteratee)
        let temp = iteratee(value)
        for (let i = array.length - 1; i >= 0; i--) {
            if (iteratee(array[i]) <= temp) {
                return i + 1
            }
        }
        return 0
    },
    sortedLastIndexOf: function (array, value) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === value) {
                return i
            }
        }
    },
    sortedUniq: function (array) {
        let a = new Set(array)
        let b = Array.from(a)
        return b
    },
    sortedUniqBy: function (array, iteratee = jimxhw.identity) {
        iteratee = this.iteratee(iteratee)
        let result = [], map = []
        for (let i = 0; i < array.length; i++) {
            let temp = iteratee(array[i])
            if (!map.includes(temp)) {
                map.push(temp)
                result.push(array[i])
            }
        }
        return result
    },
    takeRightWhile: function (array, predicate = jimxhw.identity) {
        predicate = jimxhw.iteratee(predicate)
        let result = []
        for (let i = array.length - 1; i >= 0; i--) {
            if (predicate(array[i])) {
                result.unshift(array[i])
            } else {
                break
            }
        }
        return result
    },
    takeWhile: function (array, predicate = jimxhw.identity) {
        predicate = jimxhw.iteratee(predicate)
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                result.push(array[i])
            } else {
                break
            }
        }
        return result
    },















}    