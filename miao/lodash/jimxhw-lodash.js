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
    },//返回一个函数，将该函数的参数和指定对象进行深对比
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
        if (typeof predicate === "string") {
            predicate = it => it[predicate]
        }
        for (let i = fromIndex; i < array.length; i++) {
            if (predicate(array[i])) {
                return i
            }
        }
        return -1
    },
    findLastIndex: function (array, predicate = jimxhw.identity, fromIndex = array.length - 1) {
        if (typeof predicate === "string") {
            predicate = it => it[predicate]
        }
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
    xor: function () {
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
            if (map[key] == false) {
                result.push(Number(key))
            }
        }
        return result
    },
    every: function (collection, predicate) {
        for (let keys of collection) {
            if (!(predicate(keys))) {
                return false
            }
        }
        return true
    },
    filter: function (collection, predicate) {
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
        var hasOwn = Object.prototype.hasOwnProperty
        for (let keys in obj) {
            if (hasOwn.call(obj[keys])) {
                iterator(obj[keys], keys, obj)
            }
        }
    },
    isObjectLike: function (value) {
        return typeof (value) == "object" && value !== value
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
    isNaN: function (value) {
        if (Object.prototype.toString.call(value) === "[object Null]") { return false }
        return value === value ? false : true
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
    dropRightWhile: function (arr, predicate = jimxhw.identity) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
            if (!predicate(arr[x])) {
                var arr2 = arr.slice(0, i)
                break
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            result.push(arr[x])
        }
        return result
    },
    dropWhile: function (arr, predicate = jimxhw.identity) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
            if (!predicate(arr[x])) {
                var arr2 = arr.slice(i)
                break
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            result.push(arr[x])
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
    }
}    