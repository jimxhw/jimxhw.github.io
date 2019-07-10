var jimxhw = {
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
        return array.push(...val)
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
        function flatten(array) {
            var n = 0
            for (let i = 0; i < array.length; i++) {
                if (Array.isArray(array[i])) {
                    result.push(...array[i])
                } else {
                    n++
                    result.push(array[i])
                }
            }
            if (n == array.length) {
                return result
            } else {
                return flatten(result)
            }
        }
        return flatten(array)
    },
    flattenDepth: function (array, depth = 1) {
        let result = []
        function flatten(array) {
            for (let i = 0; i < array.length; i++) {
                if (Array.isArray(array[i])) {
                    result.push(...array[i])
                } else {
                    result.push(array[i])
                }
            }
            depth--
            if (depth) {
                return flatten(result)
            } else {
                return result
            }
        }
        return flatten(array)
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
            return x + separator + y
        }, "")
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




}