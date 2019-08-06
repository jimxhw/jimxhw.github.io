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
    ceil: function (number, precision = 0) {
        let zs = number | 0

    },
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
        array.forEach(function (x) {
            for (let i = 0; i < x.length; i++) {
                var char = x[i]
                let flag = false
                for (let j = 0; j < arguments.length; j++) {
                    if (comparater(char, arguments[j])) {
                        flag = true
                        break
                    }
                }
                if (flag) {
                    result.push(char)
                }
            }
        })
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
        let result = arguments.slice()
        array.forEach(function (x) {
            for (let i = 0; i < x.length; i++) {
                var char = x[i]
                let flag = false
                for (let j = 0; j < arguments.length; j++) {
                    if (comparater(char, arguments[j])) {
                        flag = true
                        break
                    }
                }
                if (!flag) {
                    result.push(char)
                }
            }
        })
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
        path = jimxhw.toPath(path)
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
                result.push(iteratee(collection[i]))
            }
        } else {
            for (let keys in collection) {
                result.push(iteratee(collection[keys]))
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
                if(iteratee(collection[i],i,collection)===false){
                    break
                }
                iteratee(collection[i],i,collection)
            }
        } else {
            for (let keys in collection) {
                if(iteratee(collection[keys],keys,collection)===false){
                    break
                }
                iteratee(collection[keys],keys,collection)
            }
        }
        return collection
    },





}    