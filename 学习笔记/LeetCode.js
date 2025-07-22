/* 1. 两数之和
注意事项：只需要遍历nums.length - 1即可
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。 */

var twoSum = function (nums, target) {
    let obj = {};
    for (var i = 0; i < nums.length; i++) {
        if (obj[target - nums[i]] !== undefined) {
            return [obj[target - nums[i]], i];
        }
        obj[nums[i]] = i;
    }
}

// 方法2 对象映射
// 遍历数组，将出现过的数值和索引记录在对象中，再通过属性 in 对象来检查想要的目标在不在对象中
twoSum = function (nums, target) {
    var map = {}
    for (let i = 0; i < nums.length; i++) {
        let need = target - nums[i]
        if (need in map) {
            return [map[need], i]
        } else {
            map[nums[i]] = i
        }
    }
}

// 2. 两数相加
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
// 思路：将其转化为数组后相加，得到新的数组后转化为链表
var addTwoNumbers = function (l1, l2) {
    function listToArray(list) {
        let result = []
        while (list != null) {
            result.push(list.val)
            list = list.next
        }
        return result
    }
    function arrTolist(arr) {
        let head = new ListNode()
        let remmber = head
        for (let i = 0; i < arr.length; i++) {
            node = new ListNode(arr[i])
            head.next = node
            head = node
        }
        return remmber.next
    }
    let arr1 = listToArray(l1)
    let arr2 = listToArray(l2)
    while (arr1.length < arr2.length) {
        arr1.push(0)
    }
    while (arr1.length > arr2.length) {
        arr2.push(0)
    }
    let upper = 0
    let i = 0; j = 0
    let result = []
    while (i < arr1.length) {
        let number = arr1[i++] + arr2[j++] + upper
        if (number >= 10) {
            number = number % 10
            upper = 1
        } else {
            upper = 0
        }
        result.push(number)
    }
    if (upper) {
        result.push(1)
    }
    return arrTolist(result)
};

// 3. 无重复字符的最长子串
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// 双指针配合映射，记录两个指针之间的最大距离，用map记录是否重复，一但重复慢指针往前走一步，再判断
var lengthOfLongestSubstring = function (s) {
    const map = new Map()
    let maxLen = 0, left = 0
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i]) && map.get(s[i]) >= left) {
            left = map.get(s[i]) + 1
        }
        map.set(s[i], i)
        maxLen = Math.max(maxLen, i - left + 1)
    }
    return maxLen
};

// 4. 寻找两个有序数组的中位数
// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
// 你可以假设 nums1 和 nums2 不会同时为空。
var findMedianSortedArrays = function (nums1, nums2) {
    let n = nums1.length
    let m = nums2.length
    let num3 = new Array(n + m)
    let i = 0, j = 0, k = 0
    while (i < n && j < m) {
        if (nums1[i] >= nums2[j]) {
            num3[k++] = nums2[j++]
        } else {
            num3[k++] = nums1[i++]
        }
    }
    while (i < n) {
        num3[k++] = nums1[i++]
    }
    while (j < m) {
        num3[k++] = nums2[j++]
    }
    let result = Math.floor((n + m) / 2)
    return ((n + m) % 2) == 0 ? (num3[result] + num3[result - 1]) / 2 : num3[result]
};

// 5. 最长回文子串
// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
var longestPalindrome = function (s) {
    function center(s, left, right) {
        if (s.length <= 1) { return s.length }
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        return right - left - 1
    } // 判断以某个点或2个点为中心向外扩展时的最大回文长度
    let start = 0, end = 0
    for (let i = 0; i < s.length; i++) {
        let length1 = center(s, i, i)  //奇数回文
        let length2 = center(s, i, i + 1) //偶数回文
        let L = Math.max(length1, length2)
        if (L > end - start + 1) {
            end = i + Math.floor(L / 2)
            start = end - L + 1
        }
    }
    return s.slice(start, end + 1)
}

// 7. 整数反转
// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
var reverse = function (x) {
    var a = Math.abs(x)
    var s = 0
    while (a > 0) {
        var digits = a % 10
        s = 10 * s + digits
        a = (a - digits) / 10
    }
    if (x >= 0) {
        if (s > (2 ** 31 - 1)) {
            return 0
        } else {
            return s
        }
    } else {
        if (-s < (0 - 2 ** 31)) {
            return 0
        } else {
            return -s
        }
    }
};

// console.log(reverse(1534236469))

// 9 回文数
// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
//  注意左边右边各为什么，先把该位数变为最后一位，再%10就是该值
var isPalindrome = function (n) {
    if (n < 0) {
        return false
    }
    var a = String(n).length
    if (a === 1) {
        return true
    }
    for (i = 1; i <= a / 2; i++) {
        var right = Math.floor(n / 10 ** (i - 1)) % 10
        var left = Math.floor(n / 10 ** (a - i)) % 10
        if (right !== left) {
            return false
        }
    }
    return true
};

// 11. 盛最多水的容器
var maxArea = function (height) {
    let max = 0
    for (let i = 0; i < height.length - 1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            let temp = (j - i) * Math.min(height[j], height[i])
            max = temp > max ? temp : max
        }
    }
    return max
}

// 双指针，一个指向开头，一个指向末尾，此时容器宽度最大；
// 算出此时的面积并记录；
// 移动指针，哪个指针指向的高度小就把哪个指针向内移动，因为宽度减少了要想找到面积更大的就必须把高度小的替换为高度大的
var maxArea = function (height) {
    let start = 0
    let end = height.length - 1
    let max = 0
    while (end > start) {
        let width = end - start
        let height1 = Math.min(height[start], height[end])
        max = Math.max(max, width * height1)
        if (height[start] > height[end]) {
            end--
        } else {
            start++
        }
    }
    return max
}

// 12. 整数转罗马数字
// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 条件判断 ，一层一层往下判断
var intToRoman = function (num) {
    let str = ""
    let singleNumber = num % 10
    let tensNumber = Math.floor(num / 10) % 10
    let hundredsNumber = Math.floor(num / 100) % 10
    let thousandsNumber = Math.floor(num / 1000) % 10
    if (thousandsNumber != 0) {
        for (let i = 0; i < thousandsNumber; i++) {
            str = "M" + str
        }
    }
    if (hundredsNumber != 0) {
        if (hundredsNumber == 9) {
            str = str + "CM"
        } else if (hundredsNumber >= 5) {
            str = str + "D"
            for (let i = 5; i < hundredsNumber; i++) {
                str = str + "C"
            }
        } else if (hundredsNumber == 4) {
            str = str + "CD"
        } else {
            for (let i = 0; i < hundredsNumber; i++) {
                str = str + "C"
            }
        }
    }
    if (tensNumber != 0) {
        if (tensNumber == 9) {
            str = str + "XC"
        } else if (tensNumber >= 5) {
            str = str + "L"
            for (let i = 5; i < tensNumber; i++) {
                str = str + "X"
            }
        } else if (tensNumber == 4) {
            str = str + "XL"
        } else {
            for (let i = 0; i < tensNumber; i++) {
                str = str + "X"
            }
        }
    }
    if (singleNumber != 0) {
        if (singleNumber == 9) {
            str = str + "IX"
        } else if (singleNumber >= 5) {
            str = str + "V"
            for (let i = 5; i < singleNumber; i++) {
                str = str + "I"
            }
        } else if (singleNumber == 4) {
            str = str + "IV"
        } else {
            for (let i = 0; i < singleNumber; i++) {
                str = str + "I"
            }
        }
    }
    return str
};

// 13. 罗马数字转整数
// 条件判断
var romanToInt = function (s) {
    var arr = s.split("")
    let l = arr.length
    let sum = 0
    let m = 0
    for (i = 0; i < l; i++) {
        if (arr[i] == "M") {
            m++
        } else {
            break
        }
    }
    sum = sum + m * 1000
    // 先判断千位
    for (let i = m; i < l; i++) {
        if (arr[i] == "C" && arr[i + 1] == "M") {
            sum = sum + 900
            m = m + 2
            break
        } else if (arr[i] == "C" && arr[i + 1] == "D") {
            sum = sum + 400
            m = m + 2
            break
        } else if (arr[i] == "D") {
            sum = sum + 500
            m = m + 1
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "C") {
                    n++
                    m++
                } else {
                    break
                }

            }
            sum = sum + 100 * n
            break
        } else if (arr[i] == "C") {
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "C") {
                    n++
                    m++
                } else {
                    break
                }
            }
            sum = sum + 100 * n
            break
        } else {

        }
    }
    // 再判断百位
    for (let i = m; i < l; i++) {
        if (arr[i] == "X" && arr[i + 1] == "C") {
            sum = sum + 90
            m = m + 2
            break
        } else if (arr[i] == "X" && arr[i + 1] == "L") {
            sum = sum + 40
            m = m + 2
            break
        } else if (arr[i] == "L") {
            sum = sum + 50
            m = m + 1
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "X") {
                    n++
                    m = m + 1
                } else {
                    break
                }
            }
            sum = sum + 10 * n
            break
        } else if (arr[i] == "X") {
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "X") {
                    n++
                    m = m + 1
                } else {
                    break
                }
            }
            sum = sum + 10 * n
            break
        } else {

        }
    }
    // 再判断十位
    for (let i = m; i < l; i++) {
        if (arr[i] == "I" && arr[i + 1] == "X") {
            sum = sum + 9
            m = m + 2
            break
        } else if (arr[i] == "I" && arr[i + 1] == "V") {
            sum = sum + 4
            m = m + 2
            break
        } else if (arr[i] == "V") {
            sum = sum + 5
            m = m + 1
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "I") {
                    n++
                    m = m + 1
                } else {
                    break
                }
            }
            sum = sum + n
            break
        } else if ((arr[i] == "I")) {
            let n = 0
            for (let i = m; i < l; i++) {
                if (arr[i] == "I") {
                    n++
                    m = m + 1
                } else {
                    break
                }
            }
            sum = sum + n
            return sum
        } else {

        }
    }
    // 最后判断个位
    return sum
};
console.log(romanToInt("MDCXCV"))

// 14. 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。
// 双层for循环
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return ""
    }
    let a = strs.length
    let b = strs[0].length
    let Str = ""
    var flag = false
    for (let j = 0; j < b; j++) {
        var chat = (strs[0])[j]
        for (let i = 1; i < a; i++) {
            if ((strs[i])[j] !== chat) {
                flag = true
                break
            }
        }
        if (!flag) {
            Str = Str + chat
        } else {
            break
        }
    }
    return Str
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]))

// 15 三数之和
// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。注意：答案中不可以包含重复的三元组。
var threeSum = function (nums) {
    nums.sort((a, b) => a - b); // 排序

    const res = [];

    for (let i = 0; i < nums.length - 2; i++) { // 外层遍历
        let n1 = nums[i];
        if (n1 > 0) break; // 如果已经爆0，不用做了，break
        if (i - 1 >= 0 && n1 == nums[i - 1]) continue; // 遍历到重复的数，跳过    

        let left = i + 1;            // 左指针
        let right = nums.length - 1; // 右指针

        while (left < right) {
            let n2 = nums[left], n3 = nums[right];

            if (n1 + n2 + n3 === 0) {  // 三数和=0，加入解集res
                res.push([n1, n2, n3]);
                while (left < right && nums[left] == n2) left++; // 直到指向不一样的数
                while (left < right && nums[right] == n3) right--; // 直到指向不一样的数
            } else if (n1 + n2 + n3 < 0) { // 三数和小于0，则左指针右移
                left++;
            } else {      // 三数和大于0，则右指针左移
                right--;
            }
        }
    }
    return res;
}

// 16. 最接近的三数之和
// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
// 返回这三个数的和。
// 假定每组输入只存在恰好一个解
var threeSumClosest = function (nums, target) {
    let minAdd1 = Infinity
    let minAdd2 = Infinity
    nums.sort((a, b) => { return a - b })
    for (let i = 1; i < nums.length - 1; i++) {
        let j = 0, k = nums.length - 1
        while (j < i && i < k) {
            let a = nums[j], b = nums[k], c = nums[i]
            if (a + b + c > target) {
                minAdd1 = Math.min(minAdd1, a + b + c - target)
                k--
            } else if (a + b + c < target) {
                minAdd2 = Math.min(minAdd2, target - a - b - c)
                j++
            } else {
                return target
            }
        }
    }
    return minAdd1 > minAdd2 ? target - minAdd2 : target + minAdd1
};

// 17. 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母
var letterCombinations = function (digits) {
    let array = [0, 0, ["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"], ["j", "k", "l"], ["m", "n", "o"], ["p", "q", "r", "s"], ["t", "u", "v"], ["w", "x", "y", "z"]]
    let res = []
    if (digits.length == 0) {
        return []
    }
    function backtrack(beforeSymbol, digits) {
        if (digits.length == 0) {
            res.push(beforeSymbol)
            return
        }
        let curSymbol = array[digits[0]]
        for (let i = 0; i < curSymbol.length; i++) {
            backtrack(beforeSymbol + curSymbol[i], digits.slice(1))
        }
    }
    backtrack("", digits)
    return res
}

// 19. 删除链表的倒数第N个节点,并且返回链表的头结点
// 利用双指针，双指针的距离为n+1，需要创造一个额外的节点保证双指针距离大于n
var removeNthFromEnd = function (head, n) {
    if (n == 0) { return head }
    if (!head || !head.next) { return null }
    let dummy = new ListNode(-Infinity)
    dummy.next = head
    let index = 1
    while (index < n) {
        head = head.next
        index++
    }
    let left = dummy
    let right = head
    while (right.next) {
        right = right.next
        left = left.next
    }
    left.next = left.next.next
    return dummy.next
};

// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串
// 先进后出,栈原理
var isValid = function (s) {
    function change(Str) {
        if (Str == ")") { Str = "(" }
        if (Str == "}") { Str = "{" }
        if (Str == "]") { Str = "[" }
        return Str
    }
    let stack = []
    let char = s.length
    if (char == 0) { return true }
    for (let i = 0; i < char; i++) {
        if (s[i] == "{" || s[i] == "[" || s[i] == "(") {
            stack.push(s[i])
            // 遇到正括号进栈
        } else {
            if (stack[stack.length - 1] === change(s[i])) {
                stack.pop()
                // 遇到反括号判断和最后一个进栈的正括号是否对应，对应就删除，否则返回false
            } else {
                return false
            }
        }
    }
    return stack == 0
};

// 21. 合并两个有序链表
// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

var mergeTwoLists = function (l1, l2) {
    let hummy = new ListNode()
    let hummy2 = hummy
    while (l1 && l2) {
        if (l1.val < l2.val) {
            hummy2.next = l1
            l1 = l1.next
        } else {
            hummy2.next = l2
            l2 = l2.next
        }
        hummy2 = hummy2.next
    }
    hummy2.next = l1 || l2
    return hummy.next
}

var mergeTwoLists = function (l1, l2) {
    if (!l1 || !l2) {
        return l1 || l2
    }
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}

// 22. 括号生成
// 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
var generateParenthesis = function (n) {
    function isValid(s) {
        function change(Str) {
            if (Str == ")") { Str = "(" }
            return Str
        }
        let stack = []
        let char = s.length
        if (char == 0) { return true }
        for (let i = 0; i < char; i++) {
            if (s[i] == "(") {
                stack.push(s[i])
            } else {
                if (stack[stack.length - 1] === change(s[i])) {
                    stack.pop()
                } else {
                    return false
                }
            }
        }
        return stack == 0
    }
    let res = []
    if (n <= 0) { return res }
    function backtrack(result, n) {
        if (result.length === 2 * n) {
            if (isValid(result)) {
                res.push(result)
            }
            return
        }
        if (isValid(result)) {
            var next = "("
        } else {
            var next = "()"
        }
        for (let i = 0; i < next.length; i++) {
            backtrack(result + next[i], n)
        }
    }
    backtrack("", n)
    return res
}

// 23. 合并K个排序链表
// 利用链表的归并配合reduce函数
var mergeKLists = function (lists) {
    function mergeTwoLists(l1, l2) {
        let hummy = new ListNode()
        let hummy2 = hummy
        while (l1 && l2) {
            if (l1.val < l2.val) {
                hummy2.next = l1
                l1 = l1.next
            } else {
                hummy2.next = l2
                l2 = l2.next
            }
            hummy2 = hummy2.next
        }
        hummy2.next = l1 || l2
        return hummy.next
    }
    if (lists.length == 0) { return null }
    let result = lists.reduce(function (x, y) { return mergeTwoLists(x, y) })
    return result
}


// 24. 两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 递归分析
var swapPairs = function (head) {
    if (!head || !head.next) { return head }
    let result = head.next
    let newHead = head.next.next
    head.next.next = head
    head.next = swapPairs(newHead)
    return result
};

/* 26. 删除排序数组中的重复项
注意事项：注意return的位置，需要在第一个for循环后面
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。 */
var removeDuplicates = function (nums) {
    var c = nums.length;
    for (i = 0; i < c - 1; i++) {
        for (a = i + 1; a < c; a++) {
            if (nums[i] === nums[a]) {
                nums.splice(i, 1)
                c = c - 1
                a = a - 1
                i = i - 1
            };
        };
    } return nums.length;
};

console.log(removeDuplicates([1, 1, 1, 2, 2, 4, 4, 5, 5]))

// 方法二  双指针
// 指针1：nextpoz   记录储存每个不同的数，有条件的走，走得慢
// 指针2：i    将索引为i和i-1 的数比较，将不同时的对应的素传递给nextpoz,连续走，走得快
var removeDuplicates = function (nums) {
    var nextpoz = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[nextpoz] = nums[i]
            nextpoz++
        }
    }
    return nextpoz
}

/*
27. 移除元素
给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。 */
var removeElement = function (nums, val) {
    var c = nums.length;
    for (i = 0; i < c; i++) {
        if (nums[i] === val) {
            nums.splice(i, 1)
            c = c - 1
            i = i - 1
        };
    }; return nums.length;
};
console, console.log(removeElement([0, 1, 2, 2, 3, 3, 5, 4, 0, 4, 2], 3));

// 28. 实现strStr()
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
var strStr = function (haystack, needle) {
    if (needle.length == 0) { return 0 }
    for (let i = 0; i < haystack.length; i++) {
        if ((haystack[i] == needle[0]) && (i + needle.length) <= haystack.length) {
            let result = i
            for (var j = 1; j < needle.length; j++) {
                i = i + 1
                if (haystack[i] != needle[j]) {
                    i = result
                    break
                }
            }
            if (j == needle.length) { return result }
        }
    }
    return -1
};

// 33. 搜索旋转排序数组
// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
// (例如，数组[0, 1, 2, 4, 5, 6, 7] 可能变为[4, 5, 6, 7, 0, 1, 2] ) 。
// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 - 1 。
// 你可以假设数组中不存在重复的元素。
// 你的算法时间复杂度必须是 O(log n) 级别。
var search = function (nums, target) {
    if (nums == 0) { return -1 }
    // nums为[]时的判定
    var findMin = function (nums) {
        let left = 0
        let right = nums.length - 1
        var mid = Math.floor((left + right) / 2)
        while (((right - left) != 1) && ((right - left) != 0)) {
            if (nums[mid] > nums[0]) {
                left = mid
            } else {
                right = mid
            }
            mid = Math.ceil((left + right) / 2)
        }
        if (nums[0] < nums[right]) {
            return 0
        } else {
            return right
        }
    }
    // 构造寻找最小值函数
    let n = findMin(nums)
    if (n == 0) {
        let left = 0
        let right = nums.length - 1
        let mid = Math.ceil((left + right) / 2)
        if (nums[left] == target) {
            return left
        }
        if (nums[right] == target) {
            return right
        }
        while (((right - left) != 1) && ((right - left) != 0)) {
            if (nums[mid] > target) {
                right = mid
            } else if (nums[mid] < target) {
                left = mid
            } else {
                return mid
            }
            mid = Math.ceil((left + right) / 2)
        }
        return -1
    }
    // 数组升序排列时

    // 数组不是升序排列时
    if (target > nums[0]) {
        let left = 0
        let right = n - 1
        let mid = Math.ceil((left + right) / 2)
        if (nums[right] == target) {
            return right
        }
        while (((right - left) != 1) && ((right - left) != 0)) {
            if (nums[mid] > target) {
                right = mid
            } else if (nums[mid] < target) {
                left = mid
            } else {
                return mid
            }
            mid = Math.ceil((left + right) / 2)
        }
        return -1
    } else if (target < nums[0]) {
        let left = n
        let right = nums.length - 1
        let mid = Math.ceil((left + right) / 2)
        if (nums[left] == target) {
            return left
        }
        if (nums[right] == target) {
            return right
        }
        while (((right - left) != 1) && ((right - left) != 0)) {
            if (nums[mid] > target) {
                right = mid
            } else if (nums[mid] < target) {
                left = mid
            } else {
                return mid
            }
            mid = Math.ceil((left + right) / 2)
        }
        return -1
    } else {
        return 0
    }
};
console.log(search([1, 3], 2))

// 34. 在排序数组中查找元素的第一个和最后一个位置
// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 你的算法时间复杂度必须是 O(log n) 级别。
// 如果数组中不存在目标值，返回 [-1, -1]。
// 二分法求解
var searchRange = function (nums, target) {
    let right = nums.length - 1
    let number = Math.ceil((Math.log(right + 1) / Math.log(2)))
    let g = 0
    // 计算二分法最多计算次数，循环大于该次数就结束
    let left = 0
    let mid = Math.floor((right + left) / 2)
    var m = -1
    // 用变量m记录循环结束时的状态，是怎么样结束的
    while (true) {
        g++
        if (target > nums[mid]) {
            left = mid
            mid = Math.ceil((right + left) / 2)
        }
        if (target < nums[mid]) {
            right = mid
            mid = Math.floor((right + left) / 2)
        }
        if (target == nums[mid]) {
            m = mid
            break
        }
        if (g > number) {
            break
        }
    };
    if (m == -1) {
        return [-1, -1]
    } else {
        var a = nums[m]
        var n = m, j = m
        while (nums[n] == a) {
            n--
        }
        while (nums[j] == a) {
            j++
        }
        return [n + 1, j - 1]
    }
}
console.log(searchRange([7], 8))

/* 35. 搜索插入位置
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。 */
var searchInsert = function (nums, target) {
    var c = nums.length;
    for (i = 0; i < c; i++) {
        if (nums[i] >= target) {
            return i
        };
    };
    return c
};
console.log(searchInsert([1, 1, 1, 2, 3, 4], 5))

// 36. 有效的数独
// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
var isValidSudoku = function (board) {
    function checkNine(arr) {
        let map = {}
        for (let i = 0; i < 9; i++) {
            let char = arr[i]
            if (char !== ".") {
                if (char in map) {
                    return false
                } else {
                    map[char] = 0
                }
            }
        }
        return true
    }
    // 创建判断单个数组是不是符合数独的函数

    for (let i = 0; i < 9; i++) {
        if (!checkNine(board[i])) {
            return false
        }
    }
    // 横着检查一遍
    for (let i = 0; i < 9; i++) {
        let arr2 = []
        for (let j = 0; j < 9; j++) {
            arr2.push(board[j][i])
        }
        if (!checkNine(arr2)) {
            return false
        }
    }
    // 竖着检查一遍
    let Map = { "Arr1": [], "Arr2": [], "Arr3": [], "Arr4": [], "Arr5": [], "Arr6": [], "Arr7": [], "Arr8": [], "Arr9": [] }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (i < 3) {
                if (j < 3) {
                    Map["Arr1"].push(board[i][j])
                } else if (j < 6) {
                    Map["Arr2"].push(board[i][j])
                } else {
                    Map["Arr3"].push(board[i][j])
                }
            } else if (i < 6) {
                if (j < 3) {
                    Map["Arr4"].push(board[i][j])
                } else if (j < 6) {
                    Map["Arr5"].push(board[i][j])
                } else {
                    Map["Arr6"].push(board[i][j])
                }
            } else {
                if (j < 3) {
                    Map["Arr7"].push(board[i][j])
                } else if (j < 6) {
                    Map["Arr8"].push(board[i][j])
                } else {
                    Map["Arr9"].push(board[i][j])
                }
            }
        }
    }
    // 创建9宫格数组对象，在依次检查
    for (let keys in Map) {
        if (!checkNine(Map[keys])) {
            return false
        }
    }
    return true

};

// 39. 组合总和
// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的数字可以无限制重复被选取。
var combinationSum = function (candidates, target) {
    function sunArray(arr) { return arr.reduce((a, b) => { return a + b }, 0) }
    let parts = [], res = [], set = new Set()
    var combinationSum1 = function (candidates, target) {
        if (target === sunArray(parts)) {
            let temp = parts.slice().sort((a, b) => { return a - b }).join("")
            if (set.has(temp)) {
                return
            } else {
                set.add(temp)
                res.push(parts.slice())
            }
        }
        if (target < sunArray(parts)) { return }
        for (let i = 0; i < candidates.length; i++) {
            if (sunArray(parts) < target) {
                parts.push(candidates[i])
                combinationSum1(candidates, target)
                parts.pop()
            }
        }
    }
    combinationSum1(candidates, target)
    return res
}

// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用一次。
var combinationSum2 = function (candidates, target) {
    function sunArray(arr) { return arr.reduce((a, b) => { return a + b }, 0) }
    let parts = [], res = [], set = new Set()
    var combinationSum1 = function (candidates, target, i = 0) {
        if (target === sunArray(parts)) {
            let temp = parts.slice().sort((a, b) => { return a - b }).join("")
            if (set.has(temp)) {
                return
            } else {
                set.add(temp)
                res.push(parts.slice())
            }
        }
        if (target < sunArray(parts)) { return }
        for (; i < candidates.length; i++) {
            if (sunArray(parts) < target) {
                parts.push(candidates[i])
                combinationSum1(candidates, target, i + 1)
                parts.pop()
            }
        }
    }
    combinationSum1(candidates, target)
    return res
}

// 49. 字母异位词分组
// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
var groupAnagrams = function (strs) {
    let map = {}
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i]
        let char = str.split("").sort().join()
        // 通过这个方法将相同字母异位词转化为一样的输出，作为属性储存到对象中
        if (char in map) {
            map[char].push(str)
        } else {
            map[char] = [str]
        }
        // 每个词都遍历，同分异位的push到同一个数组中，不同的就创造一个属性，作为映射储存在对象中
    }
    let result = []
    for (let keys in map) {
        result.push(map[keys])
    }
    // 将map里面的值都push到一个数组里，作为结果返回
    return result
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))


//50  实现 pow(x, n) ，即计算 x 的 n 次幂函数。
//  将n拆分   ，n =c * j ,转化为x的c次幂的j次幂
// 特殊情况单独拿出来return  ，节约时间
// 优化使用递归的方法求解
var myPow = function (x, n) {
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    if (n == 0) {
        return 1
    }
    if (n % 2 == 0) {
        return myPow(x * x, n / 2)
    }
    if (n % 2 == 1) {
        return x * myPow(x * x, (n - 1) / 2)
    }
}

/* 53. 最大子序和
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
最大子序列和，必须以正数开头，遍历出所有正数开头的连续子数列的和，储存出来保留最大值*/
function maxSubArray(nums) {
    var maxSum = nums[0],
        sum = nums[0],
        l = nums.length;
    for (i = 0; i < l; i++) {
        if (sum < 0) {
            sum = nums[i + 1];
        } else {
            sum += nums[i + 1];
        }

        if (sum > maxSum) {
            maxSum = sum;
        }
    }
    return maxSum;
}


// 43. 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
var multiply = function (Num1, Num2) {
    let addStrings = function (num1, num2) {
        let arr1 = num1.split(""), a = arr1.length
        let arr2 = num2.split(""), b = arr2.length
        let result = ""
        for (let i = 0; i < a; i++) {
            arr1[i] = Number(arr1[i])
        }
        for (let i = 0; i < b; i++) {
            arr2[i] = Number(arr2[i])
        }
        while (a - b > 0) {
            arr2.unshift(0)
            b++
        }
        while (a - b < 0) {
            arr1.unshift(0)
            a++
        }
        for (let i = 0; i < a; i++) {
            if (arr1[a - i - 1] + arr2[b - i - 1] < 10) {
                result = arr1[a - i - 1] + arr2[b - i - 1] + result
            } else {
                result = arr1[a - i - 1] + arr2[b - i - 1] - 10 + result
                if (a - i - 2 >= 0) {
                    arr1[a - i - 2] = arr1[a - i - 2] + 1
                } else {
                    var d = true
                }
            }
        }
        if (d) {
            return "1" + result
        } else {
            return result
        }
    }
    // 构造字符串相加函数
    let a = Num1.length
    let b = Num2.length
    let arr1 = []
    // 将短的字符串上面的每一个数依次和上面的长数相乘（用加法代替乘法），得到的结果补上若干0得到正确的结果
    if (a >= b) {
        for (let i = 0; i < b; i++) {
            let times = +Num2[i]
            let j = i
            var results = "0"
            for (let i = 0; i < times; i++) {
                results = addStrings(Num1, results)
            }
            for (let i = b - 1 - j; i > 0; i--) {
                results = results + "0"
            }
            arr1.push(results)
        }
    } else {
        for (let i = 0; i < a; i++) {
            let times = +Num1[i]
            let j = i
            var results = "0"
            for (let i = 0; i < times; i++) {
                results = addStrings(Num2, results)
            }
            for (let i = a - 1 - j; i > 0; i--) {
                results = results + "0"
            }
            arr1.push(results)
        }
    }
    // 依次把得到的每个位上的结果放到数组中
    let Result = "0"
    for (let i = 0; i < arr1.length; i++) {
        Result = addStrings(arr1[i], Result)
    }
    return Result
}

// 46. 全排列
// 给定一个没有重复数字的序列，返回其所有可能的全排列。
const permute = (nums) => {
    const res = [];
    const used = {};

    function dfs(path) {
        if (path.length == nums.length) { // 个数选够了
            res.push(path.slice()); // 拷贝一份path，加入解集res
            return;                 // 结束当前递归分支
        }
        for (const num of nums) { // for枚举出每个可选的选项
            if (used[num]) continue; // 使用过的，跳过
            path.push(num);         // 选择当前的数，加入path
            used[num] = true;       // 记录一下 使用了
            dfs(path);              // 基于选了当前的数，递归
            path.pop();             // 上一句的递归结束，回溯，将最后选的数pop出来
            used[num] = false;      // 撤销这个记录
        }
    }

    dfs([]); // 递归的入口，空path传进去
    return res;
};

// 47. 全排列 II ；给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
var permuteUnique = function (nums) {
    // 先排序  排序后相等的元素相邻方便去重
    nums.sort((a, b) => a - b);
    let res = [];
    const visited = new Array(nums.length).fill(false);
    const backtrack = (path) => {
        // 个数满足条件了就退出
        if (path.length == nums.length) return res.push(path.slice());
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === nums[i - 1] && !visited[i - 1]) continue;
            // 如果当前数字没有在path中存在，就可以加入
            if (!visited[i]) {
                // 加入当前数字并置状态位为已加入选择
                path.push(nums[i]);
                visited[i] = true;
                // 继续回溯
                backtrack(path);
                // 撤销选择并还原状态位
                path.pop();
                visited[i] = false;
            }
        }
    };
    backtrack([]);
    return res;
};

// 61. 旋转链表
// 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
// 画图分析，先将其转化为循环链表，用双指针
var rotateRight = function (head, k) {
    if (!head || !head.next) { return head }
    let hummy1 = head
    let hummy2 = new ListNode()
    hummy2.next = head
    let lengthList = 1
    while (head.next) {
        lengthList++
        head = head.next
    }
    head.next = hummy1
    k = k % lengthList
    let record = lengthList - k
    let index = 0
    while (index < record) {
        hummy1 = hummy1.next
        hummy2 = hummy2.next
        index++
    }
    hummy2.next = null
    return hummy1
};

// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 问总共有多少条不同的路径？
let map = {}
// 创建一个映射表，属性名为独一无二的坐标，注意要加上逗号，用于减少重复操作
var uniquePaths = function (m, n) {
    let keys = "" + m + "," + n
    if (keys in map) {
        return map[keys]
    }
    if (m == 1 || n == 1) { return 1 }
    let sum = uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
    // 创建一个变量接受递归值，并存到映射中
    map[keys] = sum
    return sum
};

/*66  给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。 */
var plusOne = function (digits) {
    var i;
    for (i = digits.length - 1; i >= 0; i--) {
        if (digits[i] == 9) {
            digits[i] = 0;
        }
        else {
            digits[i]++;
            return digits;
        }
    }
    if (i == -1) {
        digits.unshift(1);
    }
    return digits;
};

// 67. 二进制求和
// 给定两个二进制字符串，返回他们的和（用二进制表示）。
// 输入为非空字符串且只包含数字 1 和 0。
/* var addBinary = function (num1, num2) {
    var arr1 = num1.split(""), a = arr1.length
    var arr2 = num2.split(""), b = arr2.length
    var result = ""
    for (let i = 0; i < a; i++) {
        arr1[i] = Number(arr1[i])
    }
    for (let i = 0; i < b; i++) {
        arr2[i] = Number(arr2[i])
    }
    // 将两个字符串转化为数字数组
    while (a - b > 0) {
        arr2.unshift(0)
        b++
    }
    while (a - b < 0) {
        arr1.unshift(0)
        a++
    }
    // 保证两个数组长度一致，不足前面补0
    for (let i = 0; i < a; i++) {
        if (arr1[a - i - 1] + arr2[b - i - 1] < 2) {
            result = arr1[a - i - 1] + arr2[b - i - 1] + result
        } else {
            result = arr1[a - i - 1] + arr2[b - i - 1] - 2 + result
            if (a - i - 2 >= 0) {
                arr1[a - i - 2] = arr1[a - i - 2] + 1
            } else {
                var d = true
                // 用d的状态记录最后一次计算是否进位
            }
        }
    }
    if (d) {
        return "1" + result
    } else {
        return result
    }
}; */

// 69 x的平方根
// 计算并返回 x 的平方根，其中 x 是非负整数。
// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去
//  利用牛顿法求平方根， x2 =x1 - (x1**2 - n)/2x1 =(x1 + n/x1)/2
var mySqrt = function (n) {
    var x = n
    while (Math.abs(x * x - n) > 0.1) {
        x = (x + n / x) / 2
    }
    x = Math.floor(x)
    return x
};

// 70. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 用递归会超时，将递归转化为循环做,递归优雅易懂，循环快速
// f(n) = f(n-1) + f(n-2)
var climbStairs = function (n) {
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return 2
    }
    let first = 1 //爬上一阶的组合
    let second = 2  //爬上二阶的组合
    for (let i = 3; i <= n; i++) {
        let third = first + second
        first = second
        second = third
    }
    return second
};

// 71. 简化路径
/* var simplifyPath = function (path) {
    let arr = path.split("/")
    let arr1 = arr.filter(x => { return x !== "" && x !== "." })
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === "..") {
            if (i == 0) {
                arr1.splice(i, 1)
                i--
            } else {
                arr1.splice(i - 1, 2)
                i = i - 2
            }
        }
    }
    if (arr1.length === 0) { return "/" }
    let result = arr1.reduce((x, y) => { return x + "/" + y }, "")
    return result
} */

// 77. 组合
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
var combine = function (n, k) {
    let res = []
    if (n < k) {
        return res
    }
    function backtrack(result, n, k) {
        if (result.length === k) {
            res.push(result.slice())
            return   //结束条件，返回上一层
        }
        for (let i = n; i > 0; i--) {
            result.push(i)
            backtrack(result, i - 1, k)
            result.pop()
        }
    }
    backtrack([], n, k)
    return res
}


// 78. 子集
// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集
var subsets = function (nums) {
    let res = []
    if (nums.length === 0) {
        return res
    }
    let l = nums.length
    function backtrack(results, nums) {
        if (results.length == l) {
            res.push(results.slice())
            return
        }
        if (results.length > 0 && results.length < l) {
            res.push(results.slice())
        }
        for (let i = 0; i < nums.length; i++) {
            results.push(nums[i])
            backtrack(results, nums.slice(i + 1))
            results.pop()
        }
    }
    backtrack([], nums)
    res.push([])
    return res
}

// 80. 删除排序数组中的重复项 II
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
// 3个指针移动分析
/* var removeDuplicates = function (nums) {
    if (nums.length < 3) { return nums.length }
    let i = 0; j = 1; z = 2
    while (z < nums.length) {
        if (nums[i] === nums[j] && nums[j] === nums[z]) {
            nums.splice(i, 1)
        } else {
            i++
            j++
            z++
        }
    }
    return nums.length
} */

// 82 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。
// 递归配合映射
/* var deleteDuplicates = function (head) {
    let map = {}
    var deleteDuplicates2 = function (head) {
        if (!head) { return null }
        if (!head.next) {
            if (head.val in map) {
                return deleteDuplicates2(head.next)
            } else {
                return head
            }
        }
        if (head.val === head.next.val) {
            map[head.val] = true
            return deleteDuplicates2(head.next.next)
        } else {
            if (head.val in map) {
                return deleteDuplicates2(head.next)
            } else {
                head.next = deleteDuplicates2(head.next)
                return head
            }
        }
    }
    return deleteDuplicates2(head)
} */

// 83. 删除排序链表中的重复元素
// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 画图分析
var deleteDuplicates = function (list) {
    if (list == null) { return null }
    let head = list
    let node = head.next
    while (node != null) {
        if (head.val === node.val) {
            head.next = node.next
            node = node.next
        } else {
            head = node
            node = node.next
        }
    }
    return list
};

// 86. 分隔链表
// 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
// 你应当保留两个分区中每个节点的初始相对位置。
/* var partition = function (head, x) {
    if (!head || !head.next) {
        return head;
    }
    let bigger = null, b = bigger
    let smaller = null, s = smaller
    while (head) {
        if (head.val < x) {
            if (smaller) {
                s.next = head
                s = head
            } else {
                smaller = head
                s = head
            }
        } else {
            if (bigger) {
                b.next = head
                b = head
            } else {
                bigger = head
                b = head

            }
        }
        head = head.next
    }
    if (bigger) {
        b.next = null
    }
    if (smaller) {
        s.next = bigger
        return smaller
    } else {
        return bigger
    }
}; */

// 88. 合并两个有序数组
// 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
/* var merge = function(nums1, m, nums2, n) {
    var a = nums1.length - m
    nums1.splice(m,a)
        for(let i = 0 ; i < n; i ++ ){
            nums1.push(nums2[i])
        }
        nums1.sort(function(a,b){return a - b})
        return nums1
    };
console.log(merge([1,2,3,0,0,0],3,[2,5,6],3)) */

/* 92. 反转链表 II
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。 */
// 思路：多个指针画图分析，配合链表反转函数使用
/*     var reverseBetween = function (head, m, n) {
    function  reverseList (head) {
        if (!head || !head.next) { return head }
        let newHead = reverseList(head.next)
        head.next.next = head
        head.next = null
        return newHead
    };
    if(!head || m == n){return head}
    let hummy1 = head
    let hummy2 = head
    let hummy5 = new ListNode()
    hummy5.next = head
    let index = 1
    while(index!=m){
        index++
        hummy1 = hummy1.next
        hummy2 = hummy2.next
        hummy5 = hummy5.next
    }
    while(index!=n){
        index++
        hummy2 = hummy2.next
    }
    let hummy4 = hummy2.next
    hummy2.next = null
    reverseList(hummy1)
    hummy5.next = hummy2
    hummy1.next = hummy4
    if(m==1){
        return hummy2
    }
    return head
};
*/

// 93. 复原IP地址
// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
/* var restoreIpAddresses = function (s) {
    let res = []
    for (var i = 1; i <= 3; i++) {
        var part1 = s.slice(0, i)
        if (isIPart(part1)) {
            for (var j = i + 1; j <= i + 3; j++) {
                var part2 = s.slice(i, j)
                if (isIPart(part2)) {
                    for (var k = j + 1; k <= j + 3; k++) {
                        var part3 = s.slice(j, k)
                        if (isIPart(part3)) {
                            var part4 = s.slice(k)
                            if (isIPart(part4)) {
                                res.push([part1, part2, part3, part4].join("."))
                            }
                        }
                    }
                }
            }
        }
    }
    return res
}
function isIPart(s) {
    if (s[0] == "0") {
        return s.length === 1
    }
    return s.length && (+s) < 256
} */

// 94. 二叉树的中序遍历
/* var inorderTraversal = function (root, action) {
    function inOrderTraverse1(root, action) {
        if (root) {
            inOrderTraverse1(root.left, action)
            action(root.val)
            inOrderTraverse1(root.right, action)
        }
    }
    let n = 0, result = []
    inOrderTraverse1(root, val => { result[n++] = val })
    return result
}; */

// 98. 验证二叉搜索树
/* var isValidBST = function (root) {
    var pre = -Infinity
    try {
        inOrderTraverse(root)
        return true
    } catch (e) {
        return e
    }
    function inOrderTraverse(root) {
        if (root) {
            inOrderTraverse(root.left)
            if (root.val <= pre) {
                throw false
            } else {
                pre = root.val
            }
            inOrderTraverse(root.right)
        }
    }
} */

// 100. 相同的树
// 递归
/* var isSameTree = function (p, q) {
    if (!p && !q) { return true }
    if (!p || !q) { return false }
    if (p.val !== q.val) { return false }
    return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right))
}; */

// 101 对称的数
/* var isSymmetric = function (root) {
    function isSymmetricAry(arr) {
        let i = 0, j = arr.length - 1
        while (i < j) {
            if (arr[i++] != arr[j--]) {
                return false
            }
        }
        return true
    }
    if (root == null) { return true }
    let nodes = [root]
    while (nodes.length) {
        let a = nodes.length
        let temp = []
        for (let i = 0; i < a; i++) {
            let current = nodes.shift()
            if (current) {
                temp.push(current.val)
                nodes.push(current.left, current.right)
            } else {
                temp.push("a")
            }
        }
        if (!isSymmetricAry(temp)) {
            return false
        }
    }
    return true
}; */

// 102. 二叉树的层次遍历
/* var levelOrder = function (root) {
    if (root == null) { return [] }
    let result = []
    let nodes = [root]
    while (nodes.length) {
        let a = nodes.length
        let temp = []
        for (let i = 0; i < a; i++) {
            let current = nodes.shift()
            if (current) {
                temp.push(current.val)
                nodes.push(current.left, current.right)
            }
        }
        result.push(temp)
    }
    result.pop()
    return result
} */

// 103. 二叉树的锯齿形层次遍历
/* var zigzagLevelOrder = function (root) {
    if (!root) { return [] }
    let result = []
    let queue = [root]
    let flags = false
    while (queue.length) {
        flags = !flags
        let l = queue.length
        let temp = []
        for (let i = 0; i < l; i++) {
            let curr = queue.shift()
            if (curr) {
                if (flags) {
                    temp.push(curr.val)
                    queue.push(curr.left, curr.right)
                } else {
                    temp.unshift(curr.val)
                    queue.push(curr.left, curr.right)
                }
            }
        }
        result.push(temp)
    }
    result.pop()
    return result
} */

// 104. 二叉树的最大深度
/* var maxDepth = function (root) {
    if (!root) {
        return 0
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}; */

// 105. 从前序与中序遍历序列构造二叉树
/* var buildTree = function (preorder, inorder) {
    function indexOfArr(arr, k) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == k) {
                return i
            }
        }
    }
    if (inorder.length == 0 || preorder.length == 0) {
        return null
    }
    let root = preorder[0]
    let b = indexOfArr(inorder, root)
    root = new TreeNode(root)
    let inOrderAfter = inorder.slice(b + 1)
    let inOrderBefore = inorder.slice(0, b)
    let c = inOrderBefore.length
    let preorderBefore = preorder.slice(1, c + 1)
    let preorderAfter = preorder.slice(c + 1)
    root.left = buildTree(preorderBefore, inOrderBefore)
    root.right = buildTree(preorderAfter, inOrderAfter)
    return root
}; */

// 106. 从中序与后序遍历序列构造二叉树
/* var buildTree = function (inorder, postorder) {
    function indexOfArr(arr, k) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == k) {
                return i
            }
        }
    }
    if (inorder.length == 0 || postorder.length == 0) {
        return null
    }
    let root = postorder[postorder.length - 1]
    let b = indexOfArr(inorder, root)
    root = new TreeNode(root)
    let inOrderAfter = inorder.slice(b + 1)
    let inOrderBefore = inorder.slice(0, b)
    let c = inOrderAfter.length
    let postorderBefore = postorder.slice(0, b)
    let postorderAfter = postorder.slice(b, b + c)
    root.left = buildTree(inOrderBefore, postorderBefore)
    root.right = buildTree(inOrderAfter, postorderAfter)
    return root
}; */

// 107. 二叉树的层次遍历 II
/* var levelOrderBottom = function(root) {
    var levelOrder = function (root) {
        if (root == null) { return [] }
        let result = []
        let nodes = [root]
        while (nodes.length) {
            let a = nodes.length
            let temp = []
            for (let i = 0; i < a; i++) {
                let current = nodes.shift()
                if (current) {
                    temp.push(current.val)
                    nodes.push(current.left, current.right)
                }
            }
            result.push(temp)
        }
        result.pop()
        return result
    }
    let result = levelOrder(root)
    return result.reverse()
}; */

// 108. 将有序数组转换为二叉搜索树
// 递归
/* var sortedArrayToBST = function (nums) {
    if (nums.length == 0) { return null }
    let a = (nums.length / 2) | 0
    let left = nums.slice(0, a)
    let right = nums.slice(a + 1)
    let root = new TreeNode(nums[a])
    root.left = sortedArrayToBST(left)
    root.right = sortedArrayToBST(right)
    return root
}; */

// 109. 有序链表转换二叉搜索树
/* var sortedListToBST = function (head) {
    if (!head) { return null }
    let arr1 = []
    while (head) {
        arr1.push(head.val)
        head = head.next
    }
    var sortedListToBST1 = function (arr) {
        if(arr.length==0){return null}
        let target = ((arr.length - 1) / 2) | 0
        let node = new TreeNode(arr[target])
        let arr2 = arr.slice(0, target)
        let arr3 = arr.slice(target + 1)
        node.left = sortedListToBST1(arr2)
        node.right = sortedListToBST1(arr3)
        return node
    }
    return sortedListToBST1(arr1)
} */

// 110. 平衡二叉树
// 左右子节点都是平衡数，且左右子节点的深度差不大于1
/* function maxDepth(root) {
    if (!root) {
        return 0
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
var isBalanced = function (root) {
    if (!root) { return true }
    if (Math.abs(maxDepth(root.left) - maxDepth(root.right)) < 2) {
        return isBalanced(root.left) && isBalanced(root.right)
    } else {
        return false
    }
};
 */

// 111. 二叉树的最小深度
// 递归
/* var minDepth = function (root) {
    if (!root) {
        return 0
    }
    if (!root.left && !root.right) {
        return 1
    }
    if (root.left && root.right) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    }
    if (root.left && !root.right) {
        return minDepth(root.left) + 1
    }
    if (root.right && !root.left) {
        return minDepth(root.right) + 1
    }
}; */

// 112. 路径总和
// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
// 说明: 叶子节点是指没有子节点的节点
//  有关叶子节点的问题要分多种情况讨论
/* var hasPathSum = function (root, sum) {
    if (!root) { return false }
    if (!root.left && !root.right) {
        return root.val === sum
    }
    if (root.left && root.right) {
        return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
    }
    if (root.left && !root.right) {
        return hasPathSum(root.left, sum - root.val)
    }
    if (root.right && !root.left) {
        return hasPathSum(root.right, sum - root.val)
    }
}; */

// 113. 路径总和 II
// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
// 说明: 叶子节点是指没有子节点的节点。
// 分情况递归分析，构造必要函数使用，先找出所有路径，再筛选
/* var pathSum = function (root, sum) {
    function addToArr(array, val) {
        for (let i = 0; i < array.length; i++) {
            array[i].unshift(val)
        }
        return array
    }
    var binaryTreePaths = function (root) {
        if (root) {
            if (!root.left && !root.right) {
                return [[root.val]]
            }
            if (root.left && !root.right) { return addToArr(binaryTreePaths(root.left), root.val) }
            if (!root.left && root.right) { return addToArr(binaryTreePaths(root.right), root.val) }
            if (root.left && root.right) { return addToArr(binaryTreePaths(root.left), root.val).concat(addToArr(binaryTreePaths(root.right), root.val)) }
        }
    }
    if (!root) { return []}
    let a = binaryTreePaths(root)
    let result = []
    for (let i = 0; i < a.length; i++) {
        let b = a[i].reduce((x, y) => { return x + y })
        if (b == sum) {
            result.push(a[i])
        }
    }
    return result
}; */

// 118. 杨辉三角
// 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
// 用函数将规律表示出来
/* var generate = function(numRows) {
    if(numRows==0){return []}
    if(numRows==1){return[[1]]}
    if(numRows==2){return[[1],[1,1]]}
    let result = [[1],[1,1]]
    if(numRows>=3){
        for(let i =3;i <=numRows; i++){
            var arrSon = [1]
            for(let j = 1 ; j < i-1;j++){
                arrSon.push(result[i - 2][j-1] + result[i - 2][j])
            }
            arrSon.push(1)
            result.push(arrSon)
        }
    }
    return result
};
console.log(generate(6)) */

// 119. 杨辉三角 II
// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
/* var getRow = function (rowIndex) {
    if (rowIndex == 0) { return [] }
    if (rowIndex == 1) { return [1] }
    if (rowIndex == 2) { return [1, 1] }
    var generate = function (rowIndex) {
        let result = [[1], [1, 1]]
        for (let i = 3; i <= rowIndex; i++) {
            var arrSon = [1]
            for (let j = 1; j < i - 1; j++) {
                arrSon.push(result[i - 2][j - 1] + result[i - 2][j])
            }
            arrSon.push(1)
            result.push(arrSon)
        }
        return arrSon
    };
    return generate(rowIndex)
};
console.log(getRow(6))
*/

// 120. 三角形最小路径和
// 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
// 从倒数第二行往上到第一行的每个数组里面的每个值映射为当前位置最小路径和
/* var minimumTotal = function (triangle) {
    let a = triangle.length
    for (let i = a - 2; i >= 0; i--) {
        let c = triangle[i]
        let b = c.length
        for (let j = 0; j < b; j++) {
            c[j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + c[j]
        }
    }
    return triangle[0][0]
}; */

// 121. 买卖股票的最佳时机
//  给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
// 注意你不能在买入股票前卖出股票。
// 方法1 遍历所有可能
/* var maxProfit = function (prices) {
    let result = 0
    for (let i = 0; i < prices.length - 1; i++) {
        let Max = 0
        for (let j = i + 1; j < prices.length; j++) {
            Max = Math.max(prices[j] - prices[i], Max)
        }
        result = Math.max(result,Max)
    }
    return result
};
console.log(maxProfit([7,1,5,3,6,4]))
*/

/*  方法二
遍历一次，记录最小的买入价格和最大的利润差
var maxProfit = function (prices) {
    let maxProfit = 0;
    let buy = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < buy) {
            buy = prices[i];
        } else if (prices[i] - buy > maxProfit) {
            maxProfit = prices[i] - buy;
        }
    }
    return maxProfit;
}; */

// 122. 买卖股票的最佳时机 II
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
/* var maxProfit = function(prices) {

}; */

// 129. 求根到叶子节点数字之和
// 构造相关功能函数
/* var sumNumbers = function (root) {
    if(!root){return 0}
    function arrToNumber(arr) {
        let j = arr.length - 1
        let sum = arr.reduce((x, y, i) => { return x + y * 10 ** (j - i) }, 0)
        return sum
    }
    function addToArr(array, val) {
        for (let i = 0; i < array.length; i++) {
            array[i].unshift(val)
        }
        return array
    }
    var binaryTreePaths = function (root) {
        if (root) {
            if (!root.left && !root.right) {
                return [[root.val]]
            }
            if (root.left && !root.right) { return addToArr(binaryTreePaths(root.left), root.val) }
            if (!root.left && root.right) { return addToArr(binaryTreePaths(root.right), root.val) }
            if (root.left && root.right) { return addToArr(binaryTreePaths(root.left), root.val).concat(addToArr(binaryTreePaths(root.right), root.val)) }
        }
    }
    let result = binaryTreePaths(root)
    return result.reduce((x, y) => { return x + arrToNumber(y) }, 0)
}; */

//  136 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 任何数和自身异或都为0，任何数和0异或都为自身；并且异或运算满足交换律
/* var singleNumber = function (nums) {
    var s = nums[0];
    for(i=1;i<nums.length;i++){
        s = nums[i] ^ s
    };
    return s ;
};
console.log(singleNumber([1,2,1,2,3,4,5,4,3])); */

// 137 只出现一次的数字II
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
// 暴力解法 先排序 再判断相邻元素是否相等来求出结果
/* var singleNumber = function (nums) {
    nums.sort(function (a, b) {
        return a - b
    })
    for (i = 0; i < nums.length; i++) {
        if (!(nums[i] == nums[i + 1] || nums[i] == nums[i + 2] || nums[i] == nums[i - 1] || nums[i] == nums[i - 2])) {
            return nums[i]
        }
    }
}
console.log(singleNumber([1, 1, 2, 2, 2, 4,4,4,6,0,0,0, 1])) */

// 141. 环形链表
// 给定一个链表，判断链表中是否有环。
// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
//  双指针，一个指针一次走一步，node1 = node1.next；一个指针一次走2次，node2 = node2.next.next，如果指针相遇则循环
/* var hasCycle = function (head) {
    if (!head) { return false }
    if (!head.next) { return false }
    if (!head.next.next) { return false }
    let node1 = head.next
    let node2 = head.next.next
    while (node2) {
        if (node1.val != node2.val) {
            node1 = node1.next
            if (node2.next == null || node2.next.next == null) { return false }
            node2 = node2.next.next
        } else {
            return true
        }
    }
    return false
}; */

// 142. 环形链表 II
// 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
// 说明：不允许修改给定的链表
// 方法1  将下一个链表断开，如果下一个链表不是是环，则返回链表
/* var detectCycle = function (head) {
    var hasCycle = function (head) {
        if (!head) { return false }
        if (!head.next) { return false }
        if (!head.next.next) { return false }
        let node1 = head.next
        let node2 = head.next.next
        while (node2) {
            if (node1.val != node2.val) {
                node1 = node1.next
                if (node2.next == null || node2.next.next == null) { return false }
                node2 = node2.next.next
            } else {
                return true
            }
        }
        return false
    }
    if (!hasCycle(head)) {
        return null
    }
    while (true) {
        let hummy = head.next
        head.next = null
        if (hasCycle(hummy)) {
            head.next = hummy
        } else {
            head.next = hummy
            return head
        }
        head = head.next
    }
}; */

// 方法2  类似映射，指针到达过自己就在自己里面留个记号，第一个重复访问的就是起点
/* var detectCycle = function (head) {
    let hummy = head
    while (hummy) {
        if (hummy.visited == true) {
            return hummy
        } else {
            hummy.visited = true
            hummy = hummy.next
        }
    }
    return null
} */

// 143. 重排链表
/* 给定一个单链表 L：L0→L1→…→Ln-1→Ln
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 */
/* var reorderList = function (head) {
    if (!head || !head.next || !head.next.next) { return head }
    let newHead = head
    while (newHead.next) {
        newHead = newHead.next
    }
    let newHead2 = head.next
    head.next = newHead
    newHead.next = reorderList(newHead2)
}; */

// 144. 二叉树的前序遍历
/* var preorderTraversal = function (root) {
    function preOrderTraverse1(root, action) {
        if (root) {
            action(root.val)
            preOrderTraverse1(root.left, action)
            preOrderTraverse1(root.right, action)
        }
    }
    let n = 0, result = []
    preOrderTraverse1(root, val => { result[n++] = val })
    return result
}; */

// 144. 二叉树的后序遍历
/* var postorderTraversal = function (root) {
    function postOrderTraverse1(root, action) {
        if (root) {
            postOrderTraverse1(root.left, action)
            postOrderTraverse1(root.right, action)
            action(root.val)
        }
    }
    let n = 0, result = []
    postOrderTraverse1(root, val => { result[n++] = val })
    return result
}; */

// 148. 排序链表
// 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
/* var sortList = function (head) {
    if (!head || !head.next) {
        return head
    }
    let hummy = new ListNode()
    hummy.next = head
    let slow = hummy
    let fast = hummy
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let left = head
    let right = slow.next
    slow.next = null
    left = sortList(left)
    right = sortList(right)
    function mergeTwoLists(l1, l2) {
        let hummy = new ListNode()
        let hummy2 = hummy
        while (l1 && l2) {
            if (l1.val < l2.val) {
                hummy2.next = l1
                l1 = l1.next
            } else {
                hummy2.next = l2
                l2 = l2.next
            }
            hummy2 = hummy2.next
        }
        hummy2.next = l1 || l2
        return hummy.next
    }
    return mergeTwoLists(left, right)
}; */

// 150. 逆波兰表达式求值
/* var evalRPN = function (tokens) {
    tokens = tokens.map(x => {
        if (Number(x) === Number(x)) {
            return Number(x)
        } else {
            return x
        }
    })
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == "*") {
            tokens[i - 2] = tokens[i - 2] * tokens[i - 1]
            tokens.splice(i - 1, 2)
            i = i - 2
        } else if (tokens[i] == "/") {
            tokens[i - 2] = (tokens[i - 2] / tokens[i - 1]) | 0
            tokens.splice(i - 1, 2)
            i = i - 2
        } else if (tokens[i] == "+") {
            tokens[i - 2] = tokens[i - 2] + tokens[i - 1]
            tokens.splice(i - 1, 2)
            i = i - 2
        } else if (tokens[i] == "-") {
            tokens[i - 2] = tokens[i - 2] - tokens[i - 1]
            tokens.splice(i - 1, 2)
            i = i - 2
        }
    }
    return tokens[0]
} */

// 153. 寻找旋转排序数组中的最小值
// 假设按照升序排序的数组在预先的某个点上进行了旋转。
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
// 请找出其中最小的元素。
// 你可以假设数组中不存在重复元素
/* var findMin = function(nums) {
    nums.sort(function(a,b){return a - b})
    return nums[0]
}; */
// 方法二  二分法
// 思考靠哪一点逼近，返回左或者右
var findMin = function (nums) {
    let left = 0
    let right = nums.length - 1
    var mid = Math.floor((left + right) / 2)
    while (((right - left) != 1) && ((right - left) != 0)) {
        if (nums[mid] > nums[0]) {
            left = mid
        } else {
            right = mid
        }
        mid = Math.ceil((left + right) / 2)
    }
    return Math.min(nums[right], nums[0])
}
console.log(findMin([4, 5, 6, 7, 0, 1, 2]))

// 155. 最小栈
/* var MinStack = function (val) {
    this.tops = null
    this.val = val
    this.Min = []
}
MinStack.prototype.push = function (x) {
    this.Min.push(x)
    let node = {
        val: x,
        next: this.tops
    }
    this.tops = node
}
MinStack.prototype.pop = function () {
    this.Min.pop()
    this.tops = this.tops.next
}
MinStack.prototype.top = function () {
    return this.tops.val
}
MinStack.prototype.getMin = function () {
    return Math.min(...this.Min)
} */

// 160. 相交链表
// 编写一个程序，找到两个单链表相交的起始节点。
// 双指针从2个链表开始，一个指针走完了接着走另外一个，这样两个指针总会相遇，如果相遇时都是null，则不相交，遍历完前就相交则有交点
/* var getIntersectionNode = function (l1, l2) {
    if (!l1 || !l2) {
        return null
    }
    let list1 = l1, list2 = l2
    while (list1 != list2) {
        list1 = list1 == null ? l2 : list1.next
        list2 = list2 == null ? l1 : list2.next
    }
    return list1
}; */

// 167. 两数之和 II - 输入有序数组
// 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
// 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
// 返回的下标值（index1 和 index2）不是从零开始的。
// 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
//  双指针，一遍从最大的开始，一遍从最小的开始，大于目标最大的左移，小于目标最大的右移
/* var twoSum = function (numbers, target) {
    var i = 0, j = numbers.length - 1
    while (numbers[i] + numbers[j] !== target) {
        if (numbers[i] + numbers[j] > target) {
            j--
        }
        if (numbers[i] + numbers[j] < target) {
            i++
        }
    }
    return [i + 1, j + 1]
}; */

// 168. Excel表列名称
// 给定一个正整数，返回它在 Excel 表中相对应的列名称。
//  实际就是26进制，但是由Z表示0
/* var convertToTitle = function (n) {
    var str = ""
    while (n >0 ){
        var d = n % 26
        if(d==0){
            str = "Z"  + str
            n = (n - 26) / 26
        }else{
            str = String.fromCharCode(d + 64)  + str
            n = (n - d)/26
        }
    }
    return str
}; */

// 169. 求众数
// 给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在众数。
/* var majorityElement = function(nums) {
    for(let i = 0 ;i < nums.length ;i++){
        let n = 0
        for(var j = 0 ; j < nums.length; j ++){
            if(nums[i]==nums[j]){
                n++
            }
        }
        if(n*2 > nums.length){
            return nums[i]
        }
    }
};
console.log(majorityElement([6,5,5])) */

// 方法二
// 互异相消 活到最后的同类最多；count==0时表示前面被抵消了抬走下一个
/* var majorityElement = function(nums) {
    let count = 0;
    let majority = nums[0];
    for (let i = 0; i < nums.length; i++) {
        if (count === 0) {
            majority = nums[i];
        }
        if (majority === nums[i]) {
            count++;
        } else {
            count--;
        }
    }
    return majority;
}
console.log(majorityElement([6,5,5])) */

// 171. Excel表列序号
// 给定一个Excel表格中的列名称，返回其相应的列序号。
// 其实就是个26进制
/* var titleToNumber = function(s) {
    let l = s.length
    Sum = 0
    for(let i = 0 ; i < l ; i ++){
        var d = s[i].charCodeAt() - 64
        Sum = Sum*26 + d
    }
    return Sum
};
console.log(titleToNumber("AB")) */

// 173. 二叉搜索树迭代器
// 利用栈,每次把左边的先进栈
/* 方法1
class BSTIterator {
    constructor(root){
      this.stack = [];
      this.traverse(root);
    }

  traverse(node){
    while(node){
      this.stack.push(node);
      node = node.left;
    }
  }

  hasNext(){
    return this.stack.length
  }

  next(){
    let node = this.stack.pop();
    this.traverse(node.right);
    return node.val
  }
}; */

// 方法二
/* function BSTIterator(root) {
    var stack = [];
    return {hasNext, next };

    function hasNext() {
        return root || stack.length;
    }
    function next() {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        var result = root.val;
        root = root.right;
        return result;
    }
} */

// 189 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
/* var rotate = function (nums, k) {
    let a = nums.length
    k = k % a
    var arr = nums.slice(a - k)
    nums.splice(a - k, k)
    for (let i = 0; i < arr.length; i++) {
        nums.unshift(arr[arr.length - 1 - i])
    }
    return nums
};
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)) */

// 190颠倒二进制位
// 颠倒给定的 32 位无符号整数的二进制位。
/* var reverseBits = function(n) {
    var a = n.toString(2)
    var b = a.length
    while(b<32){
        a = "0" + a
        b++
    }
    var c = 0
    for(let i = 0; i < 32 ; i++){
        if (a[32 - i - 1] === '1') {
            c = c + Math.pow(2, 32 - i - 1)
        }
    }
    return c
};
console.log(reverseBits(12312321314)) */

// 方法二
/* var reverseBits = function(n) {
    var sum = 0
    for(let i = 0; i < 32 ; i++){
        let d = (n >>>i) & 1
        sum = (sum * 2) + d
    }
    return sum
} */

// 191. 位1的个数
// 编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。
//  n&(n-1)  去掉最后一位1  化为0
/* var hammingWeight = function(n) {
    var a = 0
    while(n!== 0){
        n = n & (n - 1)
        a++
    }
    return a
};
console.log(hammingWeight(111)) */

// 198. 打家劫舍
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
/* var rob = function (nums) {

} */

// 204. 计数质数
// 统计所有小于非负整数 n 的质数的数量。
// 方法1  将所有的数依次判断是不是素数，是就加1
/* var countPrimes = function (n) {
    var isPrimes = function (x) {
        var a = Math.floor(Math.sqrt(x))
        for (let i = 2; i <= a; i++) {
            if (x % i == 0) {
                return false
            }
        }
        return true
    }

    if (n <= 2) {
        return 0
    }

    var count = 0

    for (let i = 2; i < n; i++) {
        if (isPrimes(i)) {
            count++
        }
    }
    return count
};
console.log(countPrimes(100)); */

/* var countPrimes = function (n) {
    if (n < 2) {
        return 0
    }
    var flags = []
    for (var i = 0; i < n; i++) {
        flags[i] = 1
    }
// 数组上每个数为1表示为素数

    var sqrt_n = Math.floor(Math.sqrt(n))

    for (var i = 2; i <= sqrt_n; i++) {
        if (flags[i]) {
            var step = i % 2 ? i * 2 : i
            for (var j = i * i; j < n; j += step) {
                flags[j] = 0
            }
        }
    }
    // 将合数都筛掉，变为0
    var count = 0
    for (var i = 2; i < n; i++) {
        count += flags[i]
    }
    return count
};
*/

// 202 快乐数
// 一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数
//  不快乐的数组最后会进入一个循环
/* var  isHappy = function(n){
    var s = 0
    while(n > 0){
        var digit =  n % 10
        s = s + digit * digit
        n = (n - digit)/10
    }
    if(s==1){
        return true
    }else if(s==4||s==16||s==37||s==58||s==89||s==145||s==42||s==20){
        return false
    }else{
        return isHappy(s)
    }
}  */

// 203. 移除链表元素
// 删除链表中等于给定值 val 的所有节点。
// 递归写法
/* var removeElements = function (head, val) {
    if (!head) { return null }
    if (head.val == val) {
        return removeElements(head.next, val)
    } else {
        head.next = removeElements(head.next, val)
        return head
    }
}; */

// 205. 同构字符串
// 给定两个字符串 s 和 t，判断它们是否是同构的。所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。
/* var isIsomorphic = function (s, t) {
    let mapChar = {}
    for (let i = 0; i < s.length; i++) {
        if (s[i] in mapChar) {
            if (t[i] !== mapChar[s[i]]) {
                return false
            }
            // 将s和t的映射关系建立到对象，顺着字符串的字母建立，如果和之前的有冲突，返回错误
        } else {
            mapChar[s[i]] = t[i]
            for (let keys in mapChar) {
                if (mapChar[keys] == t[i] && keys != s[i]) {
                    return false
                }
                // 注意判断映射关系是11对应的
            }
        }
    }
    return true
};
console.log(isIsomorphic("paper", "title")) */

// 206. 反转链表
/* var reverseList = function (head) {
    if (!head || !head.next) { return head }
    let newHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return newHead
}; */
// 反转head后面的链表，再把反转的链表指向head

// 217. 存在重复元素
// 给定一个整数数组，判断是否存在重复元素。
// 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
/* var containsDuplicate = function (nums) {
    let arr1 = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if(nums[i]==arr1[j]){
                return true
            }
        }
        arr1.push(nums[i])
    }
    return false
};
console.log(containsDuplicate([2,14,18,12,12])) */

// 方法二 利用Set函数
/* var containsDuplicate = function (nums) {
    var a = nums.length
    if(a == 1){return false}
    let b = new Set(nums)
    if(a == b.size){
        return false
    }else{
        return true
    }
} */

// 215. 数组中的第K个最大元素
// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
//  原地快排，第k大就是第s小，i==s时返回即可
/* var findKthLargest = function (nums, k){
    let s = nums.length - k
    var findKthLargest1 = function (nums, k, start = 0, end = nums.length - 1) {
        function swap(array, i, j) {
            if (i != j) {
                let t = array[i]
                array[i] = array[j]
                array[j] = t
            }
            return array
        }
        if (end - start <= 0) { return nums[start] }
        let l = end - start + 1
        let randomIndex = (Math.random() * l | 0) + start
        let randomNumber = nums[randomIndex]
        swap(nums, end, randomIndex)
        let i = start, j = start
        for (; j < end; j++) {
            if (nums[j] < randomNumber) {
                swap(nums, i, j)
                i++
            }
        }
        swap(nums, i, end)
        if (i == s ) {
            return nums[i]
        } else if (i > s ) {
            return findKthLargest1(nums, k + i - l, start, i - 1)
        } else {
            return findKthLargest1(nums, k, i + 1, end)
        }
    }
    return findKthLargest1(nums,k)
} */

// 216. 组合总和 III
// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
// candidates 中的每个数字在每个组合中只能使用一次。

// 219. 存在重复元素 II
// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
/* var containsNearbyDuplicate = function (nums, k) {
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        let char = nums[i]
        if (char in map) {
            if (i - map[char] <= k) {
                return true
            } else {
                map[char] = i
            }
        } else {
            map[char] = i
        }
    }
    return false
} */

// 222. 完全二叉树的节点个
/* var countNodes = function (root) {
    function traverse(root, sum = 0) {
        if (!root) { return 0 }
        if (root) {
            sum = 1 + traverse(root.left, sum) + traverse(root.right, sum)
            return sum
        }
    }
    return traverse(root)
} */

// 225. 用队列实现栈
/* var MyStack = function (val = []) {
    this.tops = null
    for (let key of val) {
        this.push(key)
    }
}
MyStack.prototype.push = function (x) {
    var node = {
        val: x,
        next: this.tops
    }
    this.tops = node
}
MyStack.prototype.pop = function () {
    if (!this.tops) {
        return undefined
    } else {
        var node = this.tops
        this.tops = this.tops.next
        return node.val
    }
}
MyStack.prototype.top = function () {
    if (!this.tops) {
        return undefined
    } else {
        return this.tops.val
    }
}
MyStack.prototype.empty = function () {
    return this.tops === null
} */

// 226. 翻转二叉树
// 翻转一棵二叉树
/* var invertTree = function (root) {
    if (!root) {
        return null
    }
    root.temp1 = invertTree(root.right)
    root.temp2 = invertTree(root.left)
    root.right = root.temp2
    root.left = root.temp1
    return root
}; */

// 227 基本计算器 II
/* var calculate = function (s) {
    let arr = s.split(/(?=[\+\-\*\/])|(?<=[\+\-\*\/])/g)
    arr = arr.map(x => {
        if (Number(x) === Number(x)) {
            return Number(x)
        } else {
            return x
        }
    })
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "*") {
            arr[i - 1] = arr[i - 1] * arr[i + 1]
            arr.splice(i, 2)
            i--
        } else if (arr[i] == "/") {
            arr[i - 1] = (arr[i - 1] / arr[i + 1]) | 0
            arr.splice(i, 2)
            i--
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "-") {
            arr[i + 1] = 0 - arr[i + 1]
        }
    }
    return arr.filter(x => typeof x === "number").reduce((x, y) => x + y)
} */

// 230. 二叉搜索树中第K小的元素
// 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。
/* var kthSmallest = function (root, k) {
    function inOrderTraverse(root, action) {
        if (root) {
            inOrderTraverse(root.left, action)
            action(root.val)
            inOrderTraverse(root.right, action)
        }
    }
    let n = 0, arr = []
    inOrderTraverse(root, val => {
        arr[n++] = val
    })
    return arr[k - 1]
}; */

// 231  2的幂
// 给定一个整数，写一个函数来判断它是否是 2的幂次方。
// 先判断  ，再创建一个子元素递归递归
/* var  isPowerOfTwo = function (n) {
    if (n < 1) {
        return false
    }
    if (n == 1) {
        return true
    }
    if (n % 2 == 0) {
        n = n / 2
        if (n == 1) {
            return true
        }
        if (n < 1) {
            return false
        }
        return isPowerOfTwo(n)
    } else {
        return false
    }
}
console.log(isPowerOfTwo(20))

var  isPowerOfTwo = function (n) {
    if (n < 1) {
        return false
    }
    while(n % 2 ==0){
        n = n / 2
    }
    return  n == 1
}
*/

// 232. 用栈实现队列
/* var MyQueue = function (val = []) {
    this.head = null
    this.tail = null
    for (let arr of val) {
        this.push(arr)
    }
}
MyQueue.prototype.push = function (x) {
    let node = {
        val: x,
        next: null
    }
    if (!this.head) {
        this.head = this.tail = node
    } else {
        this.tail.next = node
        this.tail = node
    }
}
MyQueue.prototype.pop = function () {
    if (!this.head) {
        return undefined
    }
    var node = this.head
    this.head = this.head.next
    if (!this.head) {
        this.head = this.tail = null
    }
    return node.val
}
MyQueue.prototype.peek = function () {
    if (!this.head) {
        return undefined
    } else {
        return this.head.val
    }
}
MyQueue.prototype.empty = function () {
    return this.head === null
} */

// 234. 回文链表
// 请判断一个链表是否为回文链表。
/* var isPalindrome = function (head) {
    if (!head || !head.next) { return true }
    let arr1 = []
    while (head) {
        arr1.push(head.val)
        head = head.next
    }
    let i = 0, j = arr1.length - 1
    while (i <= j) {
        if (arr1[i] !== arr1[j]) {
            return false
        }
        i++
        j--
    }
    return true
}; */

// 235. 二叉搜索树的最近公共祖先
// 递归画图分析
/* var lowestCommonAncestor = function (root, p, q) {
    let a = root.val
    let b = Math.max(p.val, q.val)
    let c = Math.min(p.val, q.val)
    if (a >= c && a <= b) {
        return root
    } else if (a < c) {
        return lowestCommonAncestor(root.right, p, q)
    } else {
        return lowestCommonAncestor(root.left, p, q)
    }
}; */

// 236. 二叉树的最近公共祖先
// 利用try语句来接收结果终止递归
/* var lowestCommonAncestor = function (root, p, q) {
    function dadRoot(root, target) {
        try {
            inOrderTraverse(root, target)
            return false
        } catch (e) {
            return e
        }
        function inOrderTraverse(root, target) {
            if (root) {
                inOrderTraverse(root.left, target)
                if (root.left === target || root.right === target) {
                    throw root
                }
                inOrderTraverse(root.right, target)
            }
        }
    }
    function dadAndSun(x, y) {
        if (x) {
            if (x.left === y || x.right === y) {
                return true
            } else {
                return dadAndSun(x.left, y) || dadAndSun(x.right, y)
            }
        } else {
            return false
        }

    }
    if (dadAndSun(p, q)) {
        return p
    }
    if (dadAndSun(q, p)) {
        return q
    }
    let a = dadRoot(root, q)
    let b = dadRoot(root, p)
    if (a === b) {
        return a
    }
    return lowestCommonAncestor(root, a, b)
}; */

// 237. 删除链表中的节点
/* var deleteNode = function (node) {
    node.val = node.next.val
    node.next = node.next.next
}; */

// 242. 有效的字母异位词
// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
/* var isAnagram = function(s, t) {
    return s.split("").sort().join()==t.split("").sort().join()
};
    */

/* 257. 二叉树的所有路径
给定一个二叉树，返回所有从根节点到叶子节点的路径。
说明: 叶子节点是指没有子节点的节点。 */
// 寻找递归方法，构造实现该方法的函数
/* var binaryTreePaths = function (root) {
    function addToString(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = val + "->" + arr[i]
        }
        return arr
    }
    if(!root){return []}
    if (root) {
        if (!root.left && !root.right) {
            return [String(root.val)]
        }
        if (!root.left && root.right) {
            return addToString(binaryTreePaths(root.right), root.val)
        }
        if (root.left && !root.right) {
            return addToString(binaryTreePaths(root.left), root.val)
        }
        if (root.left && root.right) {
            return addToString(binaryTreePaths(root.left), root.val).concat(addToString(binaryTreePaths(root.right), root.val))
        }
    }
}; */

/* 258 各位相加
给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。 */
// 递归
/* var addDigits = function (num) {
    var s = 0
    while (num > 0) {
        var digits = num % 10
        s = s + digits
        num = (num - digits)/10
    }
    if(s >=10){
        return addDigits(s)
    }else{
        return s
    }
};

console.log(addDigits(38)) */

// 260 只出现一次的数字III
// 给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。
// 暴力解法 先排序 再判断相邻元素是否相等来求出结果
/* var singleNumber = function (nums) {
    nums.sort(function (a, b) {
        return a - b
    })
    var c = [];
    for (i = 0; i < nums.length; i++) {
        if (!(nums[i] == nums[i + 1] || nums[i] == nums[i - 1])) {
            c.push(nums[i])
        }
    }
    return c;
};

console.log(singleNumber([1, 2, 1, 3, 2, 0,0,5])) */

// 263 丑数
// 编写一个程序判断给定的数是否为丑数。丑数就是只包含质因数 2, 3, 5 的正整数
// 解法：一直除以2,3,5直到num等于0
/* var isUgly = function(num) {
    while(num>=1){
        if(num==1){
            return true
    }
    if(num%2==0){
            num=num/2
        }else if(num%3==0){
            num=num/3
        }else if(num%5==0){
            num=num/5
        }else {
            return false
        }
    }
    return false
}; */

// 264. 丑数 II
/* 编写一个程序，找出第 n 个丑数。
丑数就是只包含质因数 2, 3, 5 的正整数。 */
/* 1 每个丑数都是由前面的丑数*2或3或5得到的
2 用3个指针来记录丑数有没有乘过2或3或5，一旦乘过就指向下一个丑数
3 每次选择3个指针所指向丑数乘以对应的指针因子（2/3/5）中的最小值 */
/* var nthUglyNumber = function (n) {
    let result = [1]
    let p2 = 0, p3 = 0, p5 = 0
    while (n > 1) {
        let temp = Math.min(result[p2] * 2, result[p3] * 3, result[p5] * 5)
        result.push(temp)
        if (result[p2] * 2 === temp) { p2++ }
        if (result[p3] * 3 === temp) { p3++ }
        if (result[p5] * 5 === temp) { p5++ }
        n--
    }
    return result[result.length - 1]
}; */

// 268 缺失的数字
// 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
//  不缺失的和减去缺失的和
/* var missingNumber = function (nums) {
    var n = nums.length
    let s = 0
    for (let i = 0; i < n; i++) {
        s = s + nums[i]
    }
    return n * (n + 1) / 2 - s
};
console.log(missingNumber([9,6,4,2,3,5,7,0,1])) */

// 283 移动0
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
//  删除0的同时末尾加0  添加计数元素a来终止循环
/* var moveZeroes = function (nums) {
    var d = nums.length
    var a = 0
    for (var i = 0; i < d; i++) {
        if (nums[i] === 0) {
            nums.splice(i,1);
            nums.push(0);
            i--
        }
        a++
        if(a==d){
            break
        }
    }
    return nums
};
console.log(moveZeroes([0, 1, 0, 3, 12,0,1]))
    */

// 300. 最长上升子序列
/* var lengthOfLIS = function (nums) {
    let map = {}
    let maxLength = 0
    for (let i = 0; i < nums.length; i++) {
        if (maxLength == 0) {
            map[nums[i]] = 1
            maxLength = 1
        } else {
            map[nums[i]] = 1
            for (let j = i - 1; j >= 0; j--) {
                if (nums[i] > nums[j]) {
                    map[nums[i]] = Math.max(map[nums[j]] + 1, map[nums[i]])
                    if (map[nums[i]] > maxLength) { break }
                }
            }
            maxLength = Math.max(maxLength, map[nums[i]])
        }
    }
    return maxLength
} */

// 313. 超级丑数
// 编写一段程序来查找第 n 个超级丑数。
// 超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。
//  用k个指针，创造一个数组来记录k个指针的状态
/* var nthSuperUglyNumber = function (n, primes) {
    let res = [1]
    let l = primes.length
    let points = Array(l).fill(0)
    while (n > 1) {
        let arr1 = points.map(x => res[x])
        let arr2 = primes.map((x, i) => { return x * arr1[i] })
        let minIdx = 0
        for (let i = 1; i < arr2.length; i++) {
            if (arr2[minIdx] > arr2[i]) {
                minIdx = i
            }
        }
        let againTime = [minIdx]
        for (let i = 0; i < arr2.length; i++) {
            if (arr2[minIdx] == arr2[i] && minIdx !== i) {
                againTime.push(i)
            }
        }
        for (let i = 0; i < againTime.length; i++) {
            points[againTime[i]]++
        }
        res.push(arr2[minIdx])
        n--
    }
    return res[res.length - 1]
} */

// 326  3的幂
// 给定一个数，写一个函数来判断它是否是 3 的幂次方。
// 先判断  ，再创建一个子元素递归递归
/* var isPowerOfThree = function (n) {
    if (n <= 0) {
        return false
    }
    if (n < 1 && n > 0) {
        n = 1 / n
    }
    if (n == 1) {
        return true
    }
    var isPowerOfThree2 = function (n) {
        if (n % 3 == 0) {
            n = n / 3
            if (n == 1) {
                return true
            }
            if (n < 1) {
                return false
            }
            return isPowerOfThree2(n)
        } else {
            return false
        }
    }
    return isPowerOfThree2(n)
}
console.log(isPowerOfThree(27)) */

// 328. 奇偶链表
// 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
// 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
// 双指针，画图分析
/* var oddEvenList = function (head) {
    if (!head || !head.next || !head.next.next) { return head }
    let dummy1 = head.next
    let dummyOdd = head
    let dummyEven = head.next
    while (dummyEven && dummyOdd && dummyEven.next) {
        dummyOdd.next = dummyEven.next
        dummyOdd = dummyOdd.next
        dummyEven.next = dummyOdd.next
        dummyEven = dummyEven.next
    }
    dummyOdd.next = dummy1
    return head
}; */

// 338. 比特位计数
// 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。
// 构造一个计算1的函数，加到数组中
/* var countBits = function(num) {
    var hammingWeight = function(n) {
        var a = 0
        while(n!== 0){
            n = n & (n - 1)
            a++
        }
        return a
    };
    var result = []
    for(let i = 0 ; i <=num ; i ++){
        result.push(hammingWeight(i))
    }
    return result
};
    */

//  方法二
//  i & (i - 1)会得到一个在原来的基础上-2**n 的数，而这个数刚好+1就是原来数i的二进制1的个数
/*  var countBits = function(num) {
    var result =[0]
    for(let i = 1 ; i <= num; i++){
        result[i] = 1 + result[i & (i - 1)]
    }
        return result
    }
    console.log(countBits(2)) */

// 342  4的幂
// 给定一个整数，写一个函数来判断它是否是 4 的幂次方。
// 先判断  ，再创建一个子元素递归递归
/* var  isPowerOfFour = function (n) {
    if (n < 1) {
        return false
    }
    if (n == 1) {
        return true
    }
    if (n % 4 == 0) {
        n = n / 4
        if (n == 1) {
            return true
        }
        if (n < 1) {
            return false
        }
        return isPowerOfFour(n)
    } else {
        return false
    }
}
console.log(isPowerOfFour(20))
*/

// 344. 反转字符串
// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
// 将第一个和最后一个交换位置，直到开始指针和结束指针结束
/* var reverseString = function (s) {
    let end = s.length - 1
    let start = 0
    while (start < end) {
        let newOne = s[start]
        s[start++] = s[end]
        s[end--] = newOne
    }
    return s
}; */

// 345. 反转字符串中的元音字母
/* var reverseVowels = function (s) {
    let map = { "a": true, "e": true, "i": true, "o": true, "u": true, "A": true, "E": true, "I": true, "O": true, "U": true }
    let i = 0, j = s.length - 1
    s = s.split("")
    while (i < j) {
        if (s[i] in map) {
            if (s[j] in map) {
                let temp = s[i]
                s[i++] = s[j]
                s[j--] = temp
            } else {
                j--
            }
        } else {
            if (s[j] in map) {
                i++
            } else {
                i++
                j--
            }
        }
    }
    return s.join("")
} */

// 347. 前 K 个高频元素
// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
/* var topKFrequent = function (nums, k) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let minIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && array[leftIdx] < array[minIdx]) {
                minIdx = leftIdx
            }
            if (rightIdx < end && array[rightIdx] < array[minIdx]) {
                minIdx = rightIdx
            }
            if (array[minIdx] != array[currIdx]) {
                swap(array, minIdx, currIdx)
                currIdx = minIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        let char = nums[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let result = []
    for (let key in map) {
        result.push(map[key])
    }
    let resultK = result.slice(0, k)
    heapfy(resultK)
    for (let i = k; i < result.length; i++) {
        if (resultK[0] < result[i]) {
            resultK[0] = result[i]
            heapdown(resultK, 0)
        }
    }
    let resultOne = resultK[0]
    let Result = []
    for (let key in map) {
        if (map[key] >= resultOne) {
            Result.push(+key)
        }
    }
    return Result
}
console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)) */

// 349. 两个数组的交集
// 给定两个数组，编写一个函数来计算它们的交集。
/* var intersection = function (nums1, nums2) {
    let map = []
    for (let i = 0; i < nums1.length; i++) {
        let char = nums1[i]
        map[char] = 1
    }
    let result = []
    for (let i = 0; i < nums2.length; i++) {
        let char = nums2[i]
        if (char in map) {
            result.push(char)
        }
    }
    // 通过映射求出所有交集
    let killDouble = []
    for (let i = 0; i < result.length; i++) {
        if (result[i] in killDouble) {
            result.splice(i, 1)
            i--
        } else {
            killDouble[result[i]] = 1
        }
    }
    // 通过映射除重复
    return result
};
console.log(intersection([1, 2, 2, 1, 6, 7, 8], [1, 2, 2, 6, 8])) */

// 350. 两个数组的交集 II
// 给定两个数组，编写一个函数来计算它们的交集。
/* var intersect = function (nums1, nums2) {
    if (nums1.length < nums2.length) {
        return intersect(nums2, nums1)
    }
    // 保证长的数组作为映射接收者
    let map = {}
    for (let i = 0; i < nums1.length; i++) {
        let char = nums1[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let map2 = {}
    for (let i = 0; i < nums2.length; i++) {
        let char = nums2[i]
        if (char in map2) {
            map2[char]++
        } else {
            map2[char] = 1
        }
    }
    // 将2个数组都映射到对象里
    let result = []
    for (let keys in map2) {
        if (keys in map) {
            map2[keys] = Math.min(map2[keys], map[keys])
        } else {
            delete map2[keys]
        }
    }
    // 比较两个对象的属性值，去相同属性的最小值为公共重复部分
    for (let keys in map2) {
        for (let i = 0; i < map2[keys]; i++) {
            result.push(+keys)
        }
    }
    // 将重复的部分输出到数组
    return result
};
console.log(intersect([1, 2], [1, 1])) */

// 367. 有效的完全平方数

// 给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False
/* var isPerfectSquare = function(num) {
    for(i=1;i*i<=num;i++){
        if(num/i==i){
            return true
        }
    }
    return false
}; */

// 二分法求该结果，二分法的关键点是找到终止循环的条件，即两个界值之间的差为多少停止；注意特殊值单独求解
var isPerfectSquare = function (num) {
    var low = 1
    var high = num
    if (num == 1) {
        return true
    }
    while (high - low > 1) {
        var mid = Math.floor((low + high) / 2)
        if (mid * mid > num) {
            high = mid
        } else if (mid * mid < num) {
            low = mid
        } else {
            return true
        }
    }
    return false
}

// 371. 两整数之和
// 异或的一个重要特性是无进位加法
// 进位结果使用与运算和移位运算计算得出
/* var getSum = function(a, b) {
    while(b!=0){
        let temp = a^b;
        b = (a&b)<<1;
        a = temp;
    }
    return a;
};
*/

// 373. 查找和最小的K对数字
// 给定两个以升序排列的整形数组 nums1 和 nums2, 以及一个整数 k。
// 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2。
// 找到和最小的 k 对数字 (u1,v1), (u2,v2) ... (uk,vk)。
/* var kSmallestPairs = function (nums1, nums2, k) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let minIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && sumArray(array[leftIdx]) < sumArray(array[minIdx])) {
                minIdx = leftIdx
            }
            if (rightIdx < end && sumArray(array[rightIdx]) < sumArray(array[minIdx])) {
                minIdx = rightIdx
            }
            if (sumArray(array[minIdx]) != sumArray(array[currIdx])) {
                swap(array, minIdx, currIdx)
                currIdx = minIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    function sumArray(array) {
        return array.reduce((x, y) => { return x + y })
    }
    function Pop(array) {
        let result = array[0]
        let last = array.pop()
        if (array.length == 0) { return result }
        array[0] = last
        heapdown(array, 0)
        return result
    }
    if (nums1.length == 0 || nums2.length == 0) { return [] }
    let map = []
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            map.push([nums1[i], nums2[j]])
        }
    }
    heapfy(map)
    let result = []
    while (result.length < k && map.length > 0) {
        let temp = Pop(map)
        result.push(temp)
    }
    return result
} */

// 378. 有序矩阵中第K小的元素
// 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第k小的元素。
// 请注意，它是排序后的第k小元素，而不是第k个元素。
/* var kthSmallest = function (matrix, k) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let maxIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && array[leftIdx] > array[maxIdx]) {
                maxIdx = leftIdx
            }
            if (rightIdx < end && array[rightIdx] > array[maxIdx]) {
                maxIdx = rightIdx
            }
            if (array[maxIdx] != array[currIdx]) {
                swap(array, maxIdx, currIdx)
                currIdx = maxIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    let result = matrix.reduce((x, y) => { return x.concat(y) }, [])
    let arr1 = result.slice(0, k)
    heapfy(arr1)
    for (let i = k; i < result.length; i++){
        if(result[i]<arr1[0]){
            arr1[0] = result[i]
            heapdown(arr1,0)
        }
    }
    return arr1[0]
} */

// 383. 赎金信
// 给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串ransom能不能由第二个字符串magazines里面的字符构成。如果可以构成，返回 true ；否则返回 false。
/* var canConstruct = function (ransomNote, magazine) {
    let map = {}
    for (let i = 0; i < magazine.length; i++) {
        let char = magazine[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    for (let i = 0; i < ransomNote.length; i++) {
        let char = ransomNote[i]
        if (char in map) {
            map[char]--
            if (map[char] < 0) {
                return false
            }
        } else {
            return false
        }
    }
    return true
} */

// 387. 字符串中的第一个唯一字符
// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
// 遍历字符串，将字符和对应的次数添加到数组中，再次遍历字符串，查看对应字符映射到对象中对应的次数，为1返回对应索引
/* var firstUniqChar = function (s) {
    let map = {}
    for (let i = 0; i < s.length; i++) {
        var char = s[i]
        if (char in map) {
            map[char] = map[char] + 1
        } else {
            map[char] = 1
        }
    }
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] == 1) {
            return i
        }
    }
    return -1
} */

// 389. 找不同
// 给定两个字符串 s 和 t，它们只包含小写字母。
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
// 请找出在 t 中被添加的字母。
/* ar findTheDifference = function(s, t) {
let a = s.split("").sort()
let b = t.split("").sort()
let i = 0
while(a[i]==b[i]){
i++
}
return b[i]
};
console.log(findTheDifference("ymbgaraibkfmvocpizdydugvalagaivdbfsfbepeyccqfepzvtpyxtbadkhmwmoswrcxnargtlswqemafandgkmydtimuzvjwxvlfwlhvkrgcsithaqlcvrihrwqkpjdhgfgreqoxzfvhjzojhghfwbvpfzectwwhexthbsndovxejsntmjihchaotbgcysfdaojkjldprwyrnischrgmtvjcorypvopfmegizfkvudubnejzfqffvgdoxohuinkyygbdzmshvyqyhsozwvlhevfepdvafgkqpkmcsikfyxczcovrmwqxxbnhfzcjjcpgzjjfateajnnvlbwhyppdleahgaypxidkpwmfqwqyofwdqgxhjaxvyrzupfwesmxbjszolgwqvfiozofncbohduqgiswuiyddmwlwubetyaummenkdfptjczxemryuotrrymrfdxtrebpbjtpnuhsbnovhectpjhfhahbqrfbyxggobsweefcwxpqsspyssrmdhuelkkvyjxswjwofngpwfxvknkjviiavorwyfzlnktmfwxkvwkrwdcxjfzikdyswsuxegmhtnxjraqrdchaauazfhtklxsksbhwgjphgbasfnlwqwukprgvihntsyymdrfovaszjywuqygpvjtvlsvvqbvzsmgweiayhlubnbsitvfxawhfmfiatxvqrcwjshvovxknnxnyyfexqycrlyksderlqarqhkxyaqwlwoqcribumrqjtelhwdvaiysgjlvksrfvjlcaiwrirtkkxbwgicyhvakxgdjwnwmubkiazdjkfmotglclqndqjxethoutvjchjbkoasnnfbgrnycucfpeovruguzumgmgddqwjgdvaujhyqsqtoexmnfuluaqbxoofvotvfoiexbnprrxptchmlctzgqtkivsilwgwgvpidpvasurraqfkcmxhdapjrlrnkbklwkrvoaziznlpor",
"qhxepbshlrhoecdaodgpousbzfcqjxulatciapuftffahhlmxbufgjuxstfjvljybfxnenlacmjqoymvamphpxnolwijwcecgwbcjhgdybfffwoygikvoecdggplfohemfypxfsvdrseyhmvkoovxhdvoavsqqbrsqrkqhbtmgwaurgisloqjixfwfvwtszcxwktkwesaxsmhsvlitegrlzkvfqoiiwxbzskzoewbkxtphapavbyvhzvgrrfriddnsrftfowhdanvhjvurhljmpxvpddxmzfgwwpkjrfgqptrmumoemhfpojnxzwlrxkcafvbhlwrapubhveattfifsmiounhqusvhywnxhwrgamgnesxmzliyzisqrwvkiyderyotxhwspqrrkeczjysfujvovsfcfouykcqyjoobfdgnlswfzjmyucaxuaslzwfnetekymrwbvponiaojdqnbmboldvvitamntwnyaeppjaohwkrisrlrgwcjqqgxeqerjrbapfzurcwxhcwzugcgnirkkrxdthtbmdqgvqxilllrsbwjhwqszrjtzyetwubdrlyakzxcveufvhqugyawvkivwonvmrgnchkzdysngqdibhkyboyftxcvvjoggecjsajbuqkjjxfvynrjsnvtfvgpgveycxidhhfauvjovmnbqgoxsafknluyimkczykwdgvqwlvvgdmufxdypwnajkncoynqticfetcdafvtqszuwfmrdggifokwmkgzuxnhncmnsstffqpqbplypapctctfhqpihavligbrutxmmygiyaklqtakdidvnvrjfteazeqmbgklrgrorudayokxptswwkcircwuhcavhdparjfkjypkyxhbgwxbkvpvrtzjaetahmxevmkhdfyidhrdeejapfbafwmdqjqszwnwzgclitdhlnkaiyldwkwwzvhyorgbysyjbxsspnjdewjxbhpsvj")) */

// 393. UTF-8 编码验证
// 给定一个表示数据的整数数组，返回它是否为有效的 utf-8 编码。
// 输入是整数数组。只有每个整数的最低 8 个有效位用来存储数据。这意味着每个整数只表示 1 字节的数据。
// var validUtf8 = function (data) {}

/* function oneValidUtf8(data) {
    function add8(str) {
        while (str.length < 8) {
            str = "0" + str
        }
        return str
    }
    let first = add8(data[0].toString(2))
    let n
    if (first[0] == "0") { n = 1 }
    else if (first[0] == "1" && first[1] == "1" && first[2] == "0") { n = 2 }
    else if (first[0] == "1" && first[1] == "1" && first[2] == "1" && first[3] == "0") { n = 3 }
    else if (first[0] == "1" && first[1] == "1" && first[2] == "1" && first[3] == "1" && first[4] == "0") { n = 4 }
    else { return false }
    if (n == 1) {
        if (first[0] == "0") {
            return true
        } else {
            return false
        }
    } else if (n == 2) {
        let second = add8(data[1].toString(2))
        if (first[0] == "1" && first[1] == "1" && first[2] == "0") {
            if (second[0] == "1" && second[1] == "0") {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } else if (n == 3) {
        let second = add8(data[1].toString(2))
        let third = add8(data[2].toString(2))
        if (first[0] == "1" && first[1] == "1" && first[2] == "1" && first[3] == "0") {
            if (second[0] == "1" && second[1] == "0") {
                if (third[0] == "1" && third[1] == "0") {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } else if (n == 4) {
        let second = add8(data[1].toString(2))
        let third = add8(data[2].toString(2))
        let fourth = add8(data[3].toString(2))
        if (first[0] == "1" && first[1] == "1" && first[2] == "1" && first[3] == "1" && first[4] == "0") {
            if (second[0] == "1" && second[1] == "0") {
                if (third[0] == "1" && third[1] == "0") {
                    if (fourth[0] == "1" && fourth[1] == "0") {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
}
console.log(oneValidUtf8([255])) */

// 394. 字符串解码
/* var decodeString = function (s) {
    s = s.split(/(?!\d)|(?<!\d)/g)
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] == "]") {
            for (let j = stack.length - 1; j >= 0; j--) {
                if (stack[j] === "[") {
                    let n = +stack[j - 1]
                    let temp = stack.slice(j + 1, stack.length).join("")
                    stack.splice(j - 1, stack.length - j + 1, temp.repeat(n))
                    break
                }
            }
        } else {
            stack.push(s[i])
        }
    }
    return stack.join("")
} */

// 404计算给定二叉树的所有左叶子之和。
// 递归，注意极限判断
/* var sumOfLeftLeaves = function (root) {
    if (!root) {
        return 0
    }
    if (root.left && !root.left.left && !root.left.right) {
        return sumOfLeftLeaves(root.right) + root.left.val
    }
    return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
}; */

// 409. 最长回文串
// 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
// 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
var longestPalindrome = function (s) {
    let map = {}
    let i = 0
    while (i < s.length) {
        let char = s[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
        i++
    }
    let L = 0
    for (let keys in map) {
        if (map[keys] % 2 == 0) {
            L = L + map[keys]
        } else {
            L = L + map[keys] - 1
            var odd = true
        }
    }
    if (odd) { return L + 1 } else { return L }
};

// 412  Fizz Buzz
/* 写一个程序，输出从 1 到 n 数字的字符串表示。
1. 如果 n 是3的倍数，输出“Fizz”；
2. 如果 n 是5的倍数，输出“Buzz”；
3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。 */
/* var fizzBuzz = function (n) {
    var a = []
    for (let i = 1; i <= n; i++) {
        if (i % 15 == 0) {
            a.push("FizzBuzz")
        } else if (i % 3 == 0) {
            a.push("Fizz")
        } else if (i % 5 == 0) {
            a.push("Buzz")
        } else {
            a.push(Number(i))
        }
    }
    return a
};
console.log(fizzBuzz(15)) */

// 414. 第三大的数
// 给定一个非空数组，返回此数组中第三大的数。如果不存在，则返回数组中最大的数。要求算法时间复杂度必须是O(n)。
/* var thirdMax = function (nums) {
    let Map = {}
    for (let i = 0; i < nums.length; i++) {
        let char = nums[i]
        Map[char] = 1
    }
    let result = []
    for (let keys in Map) {
        result.push(keys)
    }
    let i = result.length
    let s = result.sort((a, b) => { return a - b })
    if (i < 3) {
        return s[i - 1]
    } else {
        return s[i - 3]
    }
}; */

// 415. 字符串相加
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
/* var addStrings = function (num1, num2) {
    var arr1 = num1.split(""), a = arr1.length
    var arr2 = num2.split(""), b = arr2.length
    var result = ""
    for(let i = 0 ; i < a ; i ++){
        arr1[i] = Number(arr1[i])
    }
    for(let i = 0 ; i < b ; i ++){
        arr2[i] = Number(arr2[i])
    }
    // 将两个字符串转化为数字数组
    while (a - b > 0) {
        arr2.unshift(0)
        b++
    }
    while (a - b < 0) {
        arr1.unshift(0)
        a++
    }
    // 保证两个数组长度一致，不足前面补0
    for (let i = 0; i < a; i++) {
        if (arr1[a - i - 1] + arr2[b - i - 1] < 10) {
            result = arr1[a - i - 1] + arr2[b - i - 1] + result
        } else {
            result = arr1[a - i - 1] + arr2[b - i - 1] - 10 + result
            if (a - i - 2 >= 0) {
                arr1[a - i - 2] = arr1[a - i - 2] + 1
            } else {
                var d = true
                // 用d的状态记录最后一次计算是否进位
            }
        }
    }
    if (d) {
        return "1" + result
    } else {
        return result
    }
};

console.log(addStrings("0" ,"0"))
 */

// 429. N叉树的层序遍历
/* var levelOrder = function (root) {
    let result = []
    let queue = [root]
    while (queue.length) {
        let temp = []
        let a = queue.length
        for (let i = 0; i < a; i++) {
            let curr = queue.shift()
            if (curr) {
                temp.push(curr.val)
                queue.push(...curr.children)
            }
        }
        if(temp.length!=0){
            result.push(temp)
        }
    }
    return result
}; */

// 441. 排列硬币
/* var arrangeCoins = function (n) {
    if (n < 2) { return n }
    function Sum(x) {
        return (1 + x) * x / 2
    }
    let start = 0
    let end = n
    let mid = ((start + end) / 2) | 0
    while (end > start + 1) {
        if (Sum(mid) < n) {
            start = mid
            mid = ((start + end) / 2) | 0
        } else if (Sum(mid) > n) {
            end = mid
            mid = ((start + end) / 2) | 0
        } else {
            return mid
        }
    }
    return start
} */

// 445. 两数相加 II
/* var addTwoNumbers = function (l1, l2) {
    function listToArray(head) {
        let res = []
        while (head) {
            res.push(head.val)
            head = head.next
        }
        return res
    }
    let arr1 = listToArray(l1)
    let arr2 = listToArray(l2)
    while (arr1.length < arr2.length) {
        arr1.unshift(0)
    }
    while (arr1.length > arr2.length) {
        arr2.unshift(0)
    }
    let upper = 0
    let i = arr1.length - 1; j = i
    let result = []
    while (i >=0) {
        let number = arr1[i--] + arr2[j--] + upper
        if (number >= 10) {
            number = number % 10
            upper = 1
        } else {
            upper = 0
        }
        result.unshift(number)
    }
    if (upper) {
        result.unshift(1)
    }
    let head = {
        value: undefined,
        next: null
    }
    let remmber = head
    for (let i = 0; i < result.length; i++) {
        var node = {
            val: result[i],
            next: null
        }
        head.next = node
        head = node
    }
    return remmber.next
} */

// 450. 删除二叉搜索树中的节点
/* var deleteNode = function (root, key) {
    function rightest(root) {
        while (root.right) {
            root = root.right
        }
        return root
    }
    if (!root) { return null }
    if (root.val > key) {
        root.left = deleteNode(root.left, key)
        return root
    } else if (root.val < key) {
        root.right = deleteNode(root.right, key)
        return root
    } else {
        if (!root.left) {
            return root.right
        } else if (!root.right) {
            return root.left
        } else {
            let temp = rightest(root.left)
            root.val = temp.val
            root.left = deleteNode(root.left,  temp.val)
            return root
        }
    }
}; */

// 451. 根据字符出现频率排序
/* var frequencySort = function (s) {
    let map = {}
    let S = s.split("")
    for (let i = 0; i < S.length; i++) {
        let char = S[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let array = []
    for (let keys in map) {
        array.push(map[keys])
    }
    array.sort((a, b) => { return b - a })
    let result = ""
    for (let i = 0; i < array.length; i++) {
        let temp = array[i]
        var char
        for (let keys in map) {
            if (map[keys] === temp) {
                char = keys
                delete map[char]
                break
            }
        }
        for (let j = 0; j < temp; j++) {
            result = result + char
        }
    }
    return result
} */

//  453. 最小移动次数使数组元素相等
// 给定一个长度为 n 的非空整数数组，找到让数组所有元素相等的最小移动次数。每次移动可以使 n - 1 个元素增加 1。
// 方法1  递归解法
/* var minMoves = function (nums) {
    let s = 0
    let n = nums.length
    nums.sort(function (a, b) { return a - b })
    var Move = function (nums) {
        let sum = nums[n - 1] - nums[0]
        s = s + sum
        if (sum == 0) {
            return s
        } else {
            for (let i = 0; i < n - 1; i++) {
                nums[i] = nums[i] + sum
            }
            nums.unshift(nums[n - 1])
            nums.pop(nums[n])
            return Move(nums)
        }
    };
    return Move(nums)
}
console.log(minMoves([4, 10, 20, 60, 400])) */

// 方法二  找到了规律
/* var minMoves = function (nums) {
    let s = 0
    let n = nums.length
    nums.sort(function (a, b) { return a - b })
    for (let i = 1; i < n; i++) {
        s = s + nums[i]
    }
    s = s - (n - 1 ) * nums[0]
    return s
}
console.log(minMoves([1])) */

// 459. 重复的子字符串
// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
/* var repeatedSubstringPattern = function (s) {
    function repeat(str, childStr) {
        let arr = str.split(childStr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== "") {
                return false
            }
        }
        return true
    }
    for (let t = 1; t <= s.length >> 1; t++) {
        let temp = s.slice(0, t)
        if (repeat(s, temp)) {
            return true
        }
    }
    return false
} */

// 大神做法
/* var repeatedSubstringPattern = function(s) {
    let str = s + s;
   return str.slice(1, str.length - 1).includes(s);
 } */

//  461 汉明距离
// 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
// 给出两个整数 x 和 y，计算它们之间的汉明距离。
//  用异或运算
/* var hammingDistance = function(x, y) {
    var a = x ^ y
    var n = 0
    while (a > 0 ){
        var  b = a % 2
        var  a = (a - b ) / 2
        if (b == 1){
            n ++
        }
    }
    return n
};
console.log( hammingDistance(1,4) )
*/

//  461 汉明距离
// 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
// 给出两个整数 x 和 y，计算它们之间的汉明距离。
//  用异或运算
/* var hammingDistance = function(x, y) {
    var a = x ^ y
    var n = 0
    while (a > 0 ){
        var  b = a % 2
        var  a = (a - b ) / 2
        if (b == 1){
            n ++
        }
    }
    return n
};
console.log( hammingDistance(1,4) )
*/

// 462. 最少移动次数使数组元素相等 II
// 给定一个非空整数数组，找到使所有数组元素相等所需的最小移动数，其中每次移动可将选定的一个元素加1或减1。 您可以假设数组的长度最多为10000。
// 找到中间那个数，求出该数到各数的距离和
/* var minMoves2 = function (nums) {
    nums.sort(function(a,b){return a - b})
    let n = nums.length
    let a = Math.floor(n / 2)
    let number = nums[a]
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum = sum + Math.abs(number - nums[i])
    }
    return sum
};
console.log(minMoves2([1,2,3])) */

// 476. 数字的补数
// 给定一个正整数，输出它的补数。补数是对该数的二进制表示取反。
/* var findComplement = function (num) {
    let a = 1
    while (true) {
        if (a > num) {
            break
        }
        a = a * 2
    }
    a--
    return num ^ a
}; */

// 485. 最大连续1的个数
// 给定一个二进制数组， 计算其中最大连续1的个数。
//  将连续1的个数保持到数组，求数组的最大值即可
/* var findMaxConsecutiveOnes = function(nums) {
    var number = 0
    var s = []
    for (let i = 0 ;i < nums.length ; i++){
        if(nums[i]==1){
            number++
        }else{
            s.push(number)
            number = 0
        }
    }
    s.push(number)
    s.sort(function(a,b){return b - a})
    return s[0]
}; */

// 504 给定一个整数，将其转化为7进制，并以字符串形式输出。
/* var convertToBase7 = function(num) {
    var n = Math.abs(num)
    var s = ""
    while(n > 0){
        var digit = n % 7
        s = digit + s
        n = (n - digit) / 7
    }
    if(num>0){
        return s
    }else if (num==0){
        return "0"
    }else{
        return "-" + s
    }
};
};




// 500. 键盘行
// 给定一个单词列表，只返回可以使用在键盘同一行的字母打印出来的单词。键盘如下图所示。
/* var findWords = function (words) {
    let result = []
    let charMap = { "q": 0, "w": 0, "e": 0, "r": 0, "t": 0, "y": 0, "u": 0, "i": 0, "o": 0, "p": 0, "a": 1, "s": 1, "d": 1, "f": 1, "g": 1, "h": 1, "j": 1, "k": 1, "l": 1, "z": 2, "x": 2, "c": 2, "v": 2, "b": 2, "n": 2, "m": 2 }
    // 创建一个映射对象，值表示在第几行
    for (let i = 0; i < words.length; i++) {
        let str = words[i]
        let str1 = str.toLowerCase()
        let arr = [0, 0, 0]
        // 创建一个数组 ，来对应三行字母
        for (let i = 0; i < str1.length; i++) {
            arr[charMap[str1[i]]] = 1
        }
        // 在哪一行出现了就把那一行的数组对应值改为0，只有1个改了表示是一行
        if (arr[0] + arr[1] + arr[2] == 1) {
             result.push(str)
        }
    }
    return result
};
console.log(findWords(["Hello", "Alaska", "Dad", "Peace"])) */

// 504 给定一个整数，将其转化为7进制，并以字符串形式输出。
/* var convertToBase7 = function(num) {
    var n = Math.abs(num)
    var s = ""
    while(n > 0){
        var digit = n % 7
        s = digit + s
        n = (n - digit) / 7
    }
    if(num>0){
        return s
    }else if (num==0){
        return "0"
    }else{
        return "-" + s
    }
};

console.log(convertToBase7(10)) */

// 508. 出现次数最多的子树元素和
// 思路：将每个节点的子元素和放到map里面，如果新来的节点和大于之前的最大值，res=[],如果等于就把新进的节点和push到res中

/* var findFrequentTreeSum = function (root) {
    let map = {}, max = 0, res = []
    var nodeSum = function (root) {
        if (!root) { return 0 }
        var left = nodeSum(root.left)
        var right = nodeSum(root.right)
        var nodeSelf = root.val + left + right
        if (map[nodeSelf] === undefined) {
            map[nodeSelf] = 1
        } else {
            map[nodeSelf]++
        }
        if (map[nodeSelf] > max) {
            res = []
            res.push(nodeSelf)
            max = map[nodeSelf]
        } else if (map[nodeSelf] == max) {
            res.push(nodeSelf)
        }
        return nodeSelf
    }
    nodeSum(root)
    return res
} */

// 509. 斐波那契数
// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
/* var fib = function (N) {
    var first = 0
    var second = 1
    if (N == 0) {
        return 0
    } else if (N == 1) {
        return 1
    } else if (N > 1) {
        for (let i = 2; i <= N; i++) {
            var third = first + second
            first = second
            second = third
        }
        return second
    }
}; */

// 520. 检测大写字母
/* var detectCapitalUse = function (word) {
    if (word.length == 1) { return true }
    let arr = word.split("")
    let arr1 = arr.map(x => { return x.charCodeAt() })
    if (arr1[0] >= 97) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] < 97) {
                return false
            }
        }
        return true
    }
    if (arr1[0] <= 90) {
        if (arr1[1] <= 90) {
            for (let i = 2; i < arr1.length; i++) {
                if (arr1[i] > 90) {
                    return false
                }
            }
            return true
        } else {
            for (let i = 2; i < arr1.length; i++) {
                if (arr1[i] < 97) {
                    return false
                }
            }
            return true
        }
    }
} */

// 559. N叉树的最大深度
/* var maxDepth = function (root) {
    if (!root) { return 0 }
    if (root.children.length==0) { return 1 }
    let j = root.children.length
    let maxN = -Infinity
    for (let i = 0; i < j; i++) {
        maxN = Math.max(maxDepth(root.children[i]), maxN)
    }
    return maxN + 1
}; */

// 575. 分糖果
// 给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹。返回妹妹可以获得的最大糖果的种类数。
/* var distributeCandies = function (candies) {
    let lCandies = candies.length
    for (let i = 0; i < candies.length - 1; i++) {
        for (let j = i + 1; j < candies.length; j++) {
            if (candies[i] == candies[j]) {
                candies.splice(j, 1)
                j--
            }
        }
    }
    // 先找到糖果种类，种类大于糖果的一半，返回糖果的一半，否则返回种类数
    let sister = candies
    let lSister = sister.length
    if(lCandies/2 >=lSister){
        return lSister
    }else{
        return lCandies/2
    }
};
console.log(distributeCandies([1, 1, 2, 3])) */

// 方法二 映射 减少重复遍历
/* var distributeCandies = function (candies) {
    let lCandies = candies.length
    let map = {}
    for (let i = 0; i < candies.length; i++) {
        let char = candies[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    // 创建1个map映射减少重复查找
    let lSister = 0
    for (let keys in map) {
        lSister++
    }
    // 先找到糖果种类，种类大于糖果的一半，返回糖果的一半，否则返回种类数
    if (lCandies / 2 >= lSister) {
        return lSister
    } else {
        return lCandies / 2
    }
};
console.log(distributeCandies([1, 1, 2, 3])) */

// 589. N叉树的前序遍历
/* var preorder = function (root) {
    var preorder1 = function (root, action) {
        if (root) {
            action(root.val)
            if (root.children) {
                for (let i = 0; i < root.children.length; i++) {
                    preorder1(root.children[i], action)
                }
            }
        }
    };
    let n = 0
    let result = []
    preorder1(root, x => { result[n++] = x })
    return result
}  */

// 590. N叉树的后序遍历
/* var postorder = function (root) {
    var postorder1 = function (root, action) {
        if (root) {
            if (root.children) {
                for (let i = 0; i < root.children.length; i++) {
                    postorder1(root.children[i], action)
                }
            }
            action(root.val)
        }
    };
    let n = 0
    let result = []
    postorder1(root, x => { result[n++] = x })
    return result
} */

// 617. 合并二叉树
// 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
// 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。
// 递归
/* var mergeTrees = function (t1, t2) {
    if (!t1 || !t2) {
        return t1 || t2
    }
    t1.val += t2.val
    t1.left = mergeTrees(t1.left, t2.left)
    t1.right = mergeTrees(t1.right, t2.right)
    return t1
}; */

// 633. 平方数之和
// 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a**2 + b**2 = c。
//  结合三角形思考,a+b>根号c ,二分法逼近结果
var judgeSquareSum = function (c) {
    var d = Math.ceil(Math.sqrt(c))
    var i = 0
    var j = d
    while (j >= i) {
        if (i * i + j * j > c) {
            j--
        } else if (i * i + j * j < c) {
            i++
        } else {
            return true
        }
    }
    return false
};

// 507. 完美数
// 对于一个 正整数，如果它和除了它自身以外的所有正因子之和相等，我们称它为“完美数”。
// 给定一个 正整数 n， 如果他是完美数，返回 True，否则返回 False
/* var checkPerfectNumber = function(num) {
    var a = Math.floor(Math.sqrt(num))
    var s = 1
    for(var i=2;i<=a;i++){
        if(num % i == 0){
            s = s + i + num/i
        }
    }
    if (a*a==num){
        s = s - a
    }
    return s === num
};
debugger;
checkPerfectNumber(6) */

// 513. 找树左下角的值
// 给定一个二叉树，在树的最后一行找到最左边的值。
//  层次遍历  最后一行的第一个就是最左边的值
/* var findBottomLeftValue = function (root) {
    function levelOrder(root) {
        if (!root) { return [] }
        let result = [[root.val]]
        let queue = [root]
        while (queue.length) {
            let a = queue.length, temp = []
            for (let i = 0; i < a; i++) {
                let current = queue.shift()
                if (current.left) {
                    temp.push(current.left.val)
                    queue.push(current.left)
                }
                if (current.right) {
                    temp.push(current.right.val)
                    queue.push(current.right)
                }
            }
            result.push(temp)
        }
        result.pop()
        return result
    }
    let arr = levelOrder(root)
    let arr1 = arr[arr.length - 1]
    return arr1[0]
}; */

// 561. 数组拆分 I
// 给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。
/* var arrayPairSum = function (nums) {
    nums.sort(function (a, b) { return a - b })
    let result = 0
    for (let i = 0; i < nums.length; i += 2){
        result = result + nums[i]
    }
    return result
}; */

// 566. 重塑矩阵
/* var matrixReshape = function (nums, r, c) {
    let arr = nums.reduce((x, y) => { return x.concat(y) }, [])
    if (arr.length !== r * c) {
        return nums
    }
    let result = []
    for (let i = 0; i < r; i++) {
        let arr2 = arr.slice(i * c, i * c + c)
        let temp = []
        for (let j = 0; j < c; j++) {
            temp.push(arr2[j])
        }
        result.push(temp)
    }
    return result
}
 */

// 606. 根据二叉树创建字符串
// 你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
// 空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。
// 分情况递归
/* var tree2str = function (t) {
    if (!t) { return "" }
    let result = ""
    if (t) {
        result = result + t.val
        if (t.left) {
            result = result + "(" + tree2str(t.left) + ")"
        }
        if (t.right) {
            if(!t.left){
                result = result + "()"
            }
            result = result + "(" + tree2str(t.right) + ")"
        }
    }
    return result
}; */

// 637. 二叉树的层平均值
// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组.
/* var averageOfLevels = function (root) {
    if (root == null) { return [] }
    let result = []
    let nodes = [root]
    while (nodes.length) {
        let a = nodes.length
        let temp = []
        for (let i = 0; i < a; i++) {
            let current = nodes.shift()
            if (current) {
                temp.push(current.val)
                nodes.push(current.left, current.right)
            }
        }
        if (temp.length) {
            result.push((temp.reduce((x, y) => { return x + y })) / temp.length)
        }
    }
    return result
}; */

// 654. 最大二叉树
// 构造函数简化思考
/* function constructMaximumArray(array) {
    let result = []
    let max = 0
    for (let i = 0; i < array.length; i++) {
        if (array[max] < array[i]) {
            max = i
        }
    }
    result.push(array.slice(0, max), array[max], array.slice(max + 1))
    return result
}
var constructMaximumBinaryTree = function (nums) {
    if (nums.length == 0) { return null }
    let result = constructMaximumArray(nums)
    let root = new TreeNode(result[1])
    root.left = constructMaximumBinaryTree(result[0])
    root.right = constructMaximumBinaryTree(result[2])
    return root
}; */

// 657. 机器人能否返回原点
/* var judgeCircle = function (moves) {
    let map = {}
    for (let i = 0; i < moves.length; i++) {
        let char = moves[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    if (map["U"] === map["D"] && map["L"] === map["R"]) {
        return true
    }
    return false
} */

// 669. 修剪二叉搜索树
// 画图递归
/* var trimBST = function (root, L, R) {
    if (!root) { return null }
    if (root.val >= L && root.val <= R) {
        root.left = trimBST(root.left, L, R)
        root.right = trimBST(root.right, L, R)
    } else if (root.val < L) {
        return trimBST(root.right, L, R)
    } else {
        return trimBST(root.left, L, R)
    }
    return root
}; */

// 682. 棒球比赛
/* var calPoints = function (ops) {
    let arr = []
    for (let i = 0; i < ops.length; i++) {
        if (+ops[i] === Number(ops[i])) {
            arr.push(+ops[i])
        } else if (ops[i] == "C") {
            arr.pop()
        } else if (ops[i] == "D") {
            arr.push(2 * arr[arr.length - 1])
        } else {
            arr.push(arr[arr.length - 2] + arr[arr.length - 1])
        }
    }
    return arr.reduce((x, y) => { return x + y })
} */

// 686. 重复叠加字符串匹配
/* var repeatedStringMatch = function (A, B) {
    let i = 0
    let x = ''
    while (x.length <= 2 * A.length + B.length) {
        i++
        x = x + A
        if (x.includes(B)) return i
    }
    return -1
} */

// 692. 前K个高频单词
// 给一非空的单词列表，返回前 k 个出现次数最多的单词。
// 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。
/* var topKFrequent = function (words, k) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let maxIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && compare(array[maxIdx], array[leftIdx]) < 0) {
                maxIdx = leftIdx
            }
            if (rightIdx < end && compare(array[maxIdx], array[rightIdx]) < 0) {
                maxIdx = rightIdx
            }
            if (array[maxIdx] !== array[currIdx]) {
                swap(array, maxIdx, currIdx)
                currIdx = maxIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    function compare(i, j) {
        if (map[i] === map[j]) {
            if (i < j) {
                return 1
            } else {
                return -1
            }
        }
        return map[i] - map[j]
    }
    function Pop(array) {
        let result = array[0]
        let last = array.pop()
        if (array.length == 0) { return result }
        array[0] = last
        heapdown(array, 0)
        return result
    }
    let map = {}
    for (let i = 0; i < words.length; i++) {
        let char = words[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let arr1 = []
    for (let keys in map) {
        arr1.push(keys)
    }
    heapfy(arr1)
    let result = []
    while (result.length < k) {
        let temp = Pop(arr1)
        result.push(temp)
    }
    return result
} */

// 700. 二叉搜索树中的搜索
// 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
/* var searchBST = function (root, val) {
    if (!root) { return null }
    if (root.val === val) { return root }
    return searchBST(root.left, val) || searchBST(root.right, val)
}; */

// 701. 二叉搜索树中的插入操作
// 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。
// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。
/* var insertIntoBST = function (root, val) {
    if (!root) {
        return new TreeNode(val)
    }
    if (root.val > val) {
        root.left = insertIntoBST(root.left, val)
    } else {
        root.right = insertIntoBST(root.right, val)
    }
    return root
}; */

// 703. 数据流中的第K大元素
// 设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。
// 你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。
/* class KthLargest {
    constructor(k, nums) {
        this.nums = nums
        this.k = k
        this.elements = this.nums.slice(0, k)
        this.heapfy()
        for (let i = this.k; i < this.nums.length; i++) {
            if (this.elements[0] < this.nums[i]) {
                this.elements[0] = this.nums[i]
                this.heapdown(0)
            }
        }
    }

    add(val) {
        if (this.elements.length < this.k) {
            this.elements.push(val)
            this.heapUp(this.elements.length - 1)
        } else {
            if (this.elements[0] < val) {
                this.elements[0] = val
                this.heapdown(0)
            }
        }
        return this.elements[0]
    }
    heapUp(currIdx) {
        while (currIdx > 0) {
            let pIdx = (currIdx - 1) >> 1
            if (this.elements[pIdx] > this.elements[currIdx]) {
                this.swap(pIdx, currIdx)
                currIdx = pIdx
            } else {
                break
            }
        }
    }
    // 将某个节点的父节点调整为堆，且保持整个堆结构

    heapdown(currIdx, end = this.elements.length) {
        while (currIdx < end) {
            let minIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && this.elements[leftIdx] < this.elements[minIdx]) {
                minIdx = leftIdx
            }
            if (rightIdx < end && this.elements[rightIdx] < this.elements[minIdx]) {
                minIdx = rightIdx
            }
            if (this.elements[minIdx] != this.elements[currIdx]) {
                this.swap(minIdx, currIdx)
                currIdx = minIdx
            } else {
                break
            }
        }
    }
    // 将某个节点调整为堆，且保持整个堆结构
    heapfy() {
        let curr = (this.elements.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            this.heapdown(i)
        }
    }
    // 从不是叶子节点开始进行倒序headdown操作，得到了整个堆结构数组

    swap(i, j) {
        let temp = this.elements[i]
        this.elements[i] = this.elements[j]
        this.elements[j] = temp
    }
} */

// 704. 二分查找
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
var search = function (nums, target) {
    var left = 0
    var right = nums.length - 1
    var mid = Math.ceil((left + right) / 2)
    if (nums[left] == target) {
        return left
    }
    if (nums[right] == target) {
        return right
    }
    while ((right - left) > 1) {
        if (nums[mid] > target) {
            right = mid
        } else if (nums[mid] < target) {
            left = mid
        } else {
            return mid
        }
        mid = Math.ceil((left + right) / 2)
    }
    return -1
};

// 705. 设计哈希集合
/* var MyHashSet = function (initialValues) {
    this[initialValues] = null
}
MyHashSet.prototype.add = function (key) {
    this[key] = null
}
MyHashSet.prototype.remove = function (key) {
    delete this[key]
}
MyHashSet.prototype.contains = function (key) {
    return key in this
} */

// 706. 设计哈希映射
/* var MyHashMap = function (initialMaps) {
    this[initialMaps] = null
}
MyHashMap.prototype.put = function (key, value) {
    this[key] = value
}
MyHashMap.prototype.get = function (key) {
    return key in this ? this[key] : -1
}
MyHashMap.prototype.remove = function (key) {
    delete this[key]
} */

// 709. 转换成小写字母
/* var toLowerCase = function (str) {
    let result = ""
    for (let i = 0; i < str.length; i++) {
        let charNumber = str.charCodeAt(i)
        if (charNumber <= 90 && charNumber >= 65) {
            charNumber += 32
        }
        result = result + String.fromCharCode(charNumber)
    }
    return result
};
console.log(toLowerCase("HELLOWORLD")) */

// 728 自除数
// 自除数 是指可以被它包含的每一位数除尽的数。
// 例如，128 是一个自除数，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。
// 还有，自除数不允许包含 0 。
// 给定上边界和下边界数字，输出一个列表，列表的元素是边界（含边界）内所有的自除数
// 输出什么，创造什么；有外到里，一步一步
/* var selfDividingNumbers = function (left, right) {
    var d = []
    while(left<=right){
        var c = String(left).length
        var f = true
        for (i = 0; i < c; i++) {
            var a = Math.floor(left / 10 ** i) % 10
            if(a == 0){
                f = false
                break
            }else{
                if(left % a !== 0){
                    f = false
                    break
                }else{
                    f = true
                }
            }
        }
        if(f === true){
            d.push(left)
        }
        left ++
    }
    return d
};
console.log(selfDividingNumbers(1 , 22)) */

// 747. 至少是其他数字两倍的最大数
// 在一个给定的数组nums中，总是存在一个最大元素 。
// 查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
// 如果是，则返回最大元素的索引，否则返回-1。
/* var dominantIndex = function (nums) {
    if (nums.length == 1) { return 0 }
    let maxS = -Infinity
    for (let i = 0; i < nums.length; i++) {
        maxS = Math.max(nums[i], maxS)
    }
    for (var i = 0; i < nums.length; i++) {
        if (maxS === nums[i]) {
            break
        }
    }
    nums.sort(function (a, b) { return b - a })
    if (nums[0] >= 2 * nums[1]) {
        return i
    } else {
        return -1
    }
};
 */

// 771. 宝石与石头
//  给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
// J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
/* var numJewelsInStones = function (J, S) {
    let map = {}
    for (let i = 0; i < S.length; i++) {
        let char = S[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let result = 0
    for (let i = 0; i < J.length; i++) {
        let char = J[i]
        if (char in map) {
            result = result + map[char]
        }
    }
    return result
}; */

// 783. 二叉搜索树结点最小距离
// 给定一个二叉搜索树的根结点 root, 返回树中任意两节点的差的最小值。
/* var minDiffInBST = function (root) {
    let minInstance
    let pre = 0, result = []
    function inOrderTraverse(root) {
        if (root) {
            inOrderTraverse(root.left)
            minInstance = root.val - pre
            result.push(minInstance)
            pre = root.val
            inOrderTraverse(root.right)
        }
    }
    inOrderTraverse(root)
    result.shift()
    return Math.min(...result)
} */

// 807. 保持城市天际线
/* var maxIncreaseKeepingSkyline = function (grid) {
    function sumArray(sum) {
        return sum.reduce((x, y) => { return x + y })
    }
    let S1 = grid.reduce((x, y) => { return x + sumArray(y) }, 0)
    let temp = grid[0].map((x, i) => { return grid.map(y => { return y[i] }) })
    let arrCol = grid.map(x => { return Math.max(...x) })
    let arrRow = temp.map(x => { return Math.max(...x) })
    grid.forEach((element, i, grid) => { grid[i] = arrRow })
    grid = JSON.parse(JSON.stringify(grid))
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > arrCol[i]) {
                grid[i][j] = arrCol[i]
            }
        }
    }
    let S2 = grid.reduce((x, y) => { return x + sumArray(y) }, 0)
    return S2 - S1
}
console.log(maxIncreaseKeepingSkyline([[3, 0, 8, 4], [2, 4, 5, 7], [9, 2, 6, 3], [0, 3, 1, 0]])) */

// 821. 字符的最短距离
/* var shortestToChar = function (S, C) {
    let indexChar = []
    for (let i = 0; i < S.length; i++) {
        if (S[i] === C) {
            indexChar.push(i)
        }
    }
    function shorinstanceToChar(idx, indexChar) {
        if (idx < indexChar[0]) {
            return indexChar[0] - idx
        }
        if (idx > indexChar[indexChar.length - 1]) {
            return idx - indexChar[indexChar.length - 1]
        }
        if (indexChar.includes(idx)) {
            return 0
        }
        for (let i = 1; i < indexChar.length; i++) {
            if (idx < indexChar[i]) {
                return Math.min(indexChar[i] - idx, idx - indexChar[i - 1])
            }
        }
    }
    S = S.split("")
    for (let i = 0; i < S.length; i++) {
        S[i] = shorinstanceToChar(i, indexChar)
    }
    return S
} */

// 832 翻转图像
// 给定一个二进制矩阵 A，我们想先水平翻转图像，然后反转图像并返回结果。
// 水平翻转图片就是将图片的每一行都进行翻转，即逆序。例如，水平翻转 [1, 1, 0] 的结果是 [0, 1, 1]。
// 反转图片的意思是图片中的 0 全部被 1 替换， 1 全部被 0 替换。例如，反转 [0, 1, 1] 的结果是 [1, 0, 0]。
/* var flipAndInvertImage = function(A) {
    for(let i = 0 ; i < A.length; i ++){
        A[i].reverse()
        for(let j = 0 ; j < A[i].length;j++){
            if(A[i][j]==0){
                A[i][j]=1
            }else{
                A[i][j]=0
            }
        }
    }
    return A
};
console.log(flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]]))
 */

// 852. 山脉数组的峰顶索引
// 我们把符合下列属性的数组 A 称作山脉：
// A.length >= 3
// 存在 0 < i < A.length - 1 使得A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
// 给定一个确定为山脉的数组，返回任何满足 A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1] 的 i 的值
/* var peakIndexInMountainArray = function (A) {
    let d = A.length
    let right = d - 1
    let left = 0
    let mid = Math.floor(d / 2)
    while (!((A[mid] > A[mid + 1]) && (A[mid] > A[mid - 1]))) {
        if (A[mid] < A[mid + 1]) {
            left = mid
            mid = Math.floor((left + right) / 2)
        }
        if (A[mid] < A[mid - 1]) {
            right = mid
            mid = Math.floor((left + right) / 2)
        }
    }
    return mid
}; */

// 867. Transpose Matrix
//   利用2个map，第一个map把第一项的每一个元素都映射为一个数组
//   第二个map把A变为一个单维数组
/* var transpose = function (A) {
    return A[0].map((_, idx) => { return A.map(row => row[idx]) })
}; */

// 868. 二进制间距
// 给定一个正整数 N，找到并返回 N 的二进制表示中两个连续的 1 之间的最长距离。
// 如果没有两个连续的 1，返回 0 。
// 先把只有一个1的情况判断出来，然后遍历a，记录最大的c到数组中
/* var binaryGap = function (n) {
    if ((n & (n - 1)) == 0) {
        return 0
    }
    var a = n.toString(2)
    var b = a.length
    var c = 0
    var d = []
    for (let i = 1; i < b; i++) {
        if (a[i] == "0") {
            c++
        } else {
            d.push(c+1)
            c = 0
        }
    }
    d.sort(function(x,y){return y - x})
    return d[0]
};
console.log(binaryGap(8)) */

// 876. 链表的中间结点
// 给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
// 如果有两个中间结点，则返回第二个中间结点。
// 记录中点的下标索引值
/* var middleNode = function (head) {
    if (!head.next) { return head }
    if (!head.next.next) { return head.next }
    let index = 0
    let dummy = head
    while (head) {
        head = head.next
        index++
    }
    let mid = Math.ceil((index + 1) / 2)
    let n = 1
    while (n < mid) {
        dummy = dummy.next
        n++
    }
    return dummy
}; */

// 889. 根据前序和后序遍历构造二叉树
/* var constructFromPrePost = function (preorder, postorder) {
    function indexOfArr(arr, k) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == k) {
                return i
            }
        }
    }
    if (preorder.length == 0 || postorder.length == 0) {
        return null
    }
    let root = postorder[postorder.length - 1]
    root = new TreeNode(root)
    if (preorder[1] == undefined) { return root }
    let b = indexOfArr(postorder, preorder[1])
    let preorderAfter = preorder.slice(b + 2)
    let preorderBefore = preorder.slice(1, b + 2)
    let c = preorderAfter.length
    let postorderBefore = postorder.slice(0, b + 1)
    let postorderAfter = postorder.slice(b + 1, b + c + 1)
    root.left = constructFromPrePost(preorderBefore, postorderBefore)
    root.right = constructFromPrePost(preorderAfter, postorderAfter)
    return root
} */

// 897. 递增顺序查找树
/* var increasingBST = function (root) {
    if (!root) { return null }
    let res = []
    var inOrderTraverse = function (root) {
        if (root) {
            inOrderTraverse(root.left)
            res.push(root)
            inOrderTraverse(root.right)
        }
    }
    inOrderTraverse(root)
    for (let i = 0; i < res.length; i++) {
        res[i].left = null
        res[i].right = null
    }
    for (let i = 0; i < res.length - 1; i++) {
        res[i].left = null
        res[i].right = res[i + 1]
    }
    return res[0]
}
 */

// 912. 排序数组
// 方法一  利用二叉搜索树排序
/* var sortArray = function (nums) {
    var insertIntoBST = function (root, val) {
        if (!root) {
            return new TreeNode(val)
        }
        if (root.val > val) {
            root.left = insertIntoBST(root.left, val)
        } else {
            root.right = insertIntoBST(root.right, val)
        }
        return root
    };
    function inOrderTraverse(root, action) {
        if (root) {
            inOrderTraverse(root.left, action)
            action(root.val)
            inOrderTraverse(root.right, action)
        }
    }
    var root = nums.reduce(insertIntoBST, null)
    k = 0
    inOrderTraverse(root, val => {
      nums[k++] = val
    })

    return nums
}; */
// 方法二  利用冒泡排序
/* var sortArray = function (nums) {
    function swap(ary, i, j) {
        if (i != j) {
            var t = ary[i]
            ary[i] = ary[j]
            ary[j] = t
        }
    }
    for (var j = nums.length - 2; j >= 0; j--) {
        var swapped = false
        for (var i = 0; i <= j; i++) {
            if (nums[i] > nums[i + 1]) {
                swap(nums, i, i + 1)
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
    }
    return nums
} */

// 922. 按奇偶排序数组 II
// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
// 你可以返回任何满足上述条件的数组作为答案。
/* var sortArrayByParityII = function (A) {
    if (A.length == 0) { return [] }
    let arrEven = A.filter(n => (n % 2) - 1)
    let arrOdd = A.filter(n => n % 2)
    let result = []
    let i = 0, j = 0
    while (i < (A.length / 2)) {
        result.push(arrEven[i++])
        result.push(arrOdd[j++])
    }
    return result
}; */

// 938. 二叉搜索树的范围和
// 给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。
// 二叉搜索树保证具有唯一的值。
/* var rangeSumBST = function (root, L, R) {
    function treeToArray(root, pos = 0, result = []) {
        if (root) {
            result[pos] = root.val
            treeToArray(root.left, pos * 2 + 1, result)
            treeToArray(root.right, pos * 2 + 2, result)
        }
        return result
    }
    let arr = treeToArray(root)
    let sum = arr.reduce(function (x, y) {
        if (y >= L && y <= R) {
            return x + y
        } else {
            return x
        }
    }, 0)
    return sum
} */

// 961. 重复 N 次的元素
/* var repeatedNTimes = function (A) {
    let map = {}
    for (let i = 0; i < A.length; i++) {
        let char = A[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    for (let key in map) {
        if (map[key] === A.length / 2) {
            return +key
        }
    }
} */

// 965. 单值二叉树
// 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。
// 只有给定的树是单值二叉树时，才返回 true；否则返回 false。
/* var isUnivalTree = function (root) {
    if (!root.left && !root.right) {
        return true
    }
    if (!root.left && root.right) {
        return root.val === root.right.val && isUnivalTree(root.right)
    }
    if (!root.right && root.left) {
        return root.val === root.left.val && isUnivalTree(root.left)
    }
    if (root.right && root.left) {

        return isUnivalTree(root.left) && isUnivalTree(root.right) && root.val === root.right.val && root.right.val === root.left.val
    }
}; */

// 973. 最接近原点的 K 个点
/* var kClosest = function (points, K) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let minIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && sumArray(array[leftIdx]) < sumArray(array[minIdx])) {
                minIdx = leftIdx
            }
            if (rightIdx < end && sumArray(array[rightIdx]) < sumArray(array[minIdx])) {
                minIdx = rightIdx
            }
            if (sumArray(array[minIdx]) != sumArray(array[currIdx])) {
                swap(array, minIdx, currIdx)
                currIdx = minIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    function sumArray(array) {
        return array[0] * array[0] + array[1] * array[1]
    }
    function Pop(array) {
        let result = array[0]
        let last = array.pop()
        if (array.length == 0) { return result }
        array[0] = last
        heapdown(array, 0)
        return result
    }
    if (points.length == 1) { return points[1] }
    heapfy(points)
    let result = []
    while (result.length < K ) {
        let temp = Pop(points)
        result.push(temp)
    }
    return result
}; */

// 977 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。
/* var sortedSquares = function(A) {
    for(let i = 0 ; i < A.length;i++){
        if(A[i]>0){
            break
        }else{
            A[i] = -A[i]
        }
    }
    A.sort(function(a,b){return a - b})
    return A.map(x => x*x)
};
console.log(sortedSquares([-7,-3,2,3,11])); */

// 方法二
/* var sortedSquares = function(A) {
    return A.sort((a,b)=>(a*a - b*b)).map(x => x*x)
}
console.log(sortedSquares([-7,-3,2,3,11])); */

// 989. 数组形式的整数加法
// 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。
// 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。
/* var addToArrayForm = function (A, K) {
    // 将K转化为数字数组
    K = String(K).split("")
    var b = K.length, a = A.length
    for (let i = 0; i < b; i++) {
        K[i] = Number(K[i])
    }
    // 保证两个数组长度一致，不足前面补0
    while (a - b > 0) {
        K.unshift(0)
        b++
    }
    while (a - b < 0) {
        A.unshift(0)
        a++
    }
    var result = []
    for (let i = 0; i < a; i++) {
        if (A[a - i - 1] + K[b - i - 1] < 10) {
            result.unshift(A[a - i - 1] + K[b - i - 1])
        } else {
            result.unshift(A[a - i - 1] + K[b - i - 1] - 10)
            if (a - i - 2 >= 0) {
                A[a - i - 2] = A[a - i - 2] + 1
            } else {
                var d = true
                // 用d的状态记录最后一次计算是否进位
            }
        }
    }
    if (d) {
        result.unshift(1)
    };
    return result
}
console.log(addToArrayForm([2,1,5],806))
*/

// 997. 找到小镇的法官
/* var findJudge = function (N, trust) {
    if(N===1){return 1}
    if(trust.length==0){return -1}
    let trust1 = trust[0].map((x, i) => { return trust.map(y => { return y[i] }) })
    let arr1 = trust1[0]
    let arr2 = trust1[1]
    let map = {}
    for (let i = 0; i < arr2.length; i++) {
        let char = arr2[i]
        if (char in map) {
            map[char]++
        } else {
            map[char] = 1
        }
    }
    let max = -1
    for (let keys in map) {
        max = Math.max(max, map[keys])
    }
    if (max !== N - 1) { return -1 }
    for (let keys in map) {
        if (map[keys] === max) {
            var temp = +keys
            break
        }
    }
    if (arr1.includes(temp)) {
        return -1
    } else { return temp }
} */

// 993. 二叉树的堂兄弟节点
//  层次遍历 ，每个节点判断x和y是不是兄弟节点，每一层判断x和y是不是堂兄弟
/* function weBothIn(arr, x, y) {
    if (arr.length < 2) { return false }
    var result = true, a = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x || arr[i] === y) {
            result = !result
            a++
        }
    }
    if (result && a == 2) {
        return true
    } else {
        return false
    }
}
var isCousins = function (root, x, y) {
    if (!root && (!root.left || !root.right)) { return false }
    let queue = [root]
    while (queue.length) {
        let a = queue.length, temp = []
        for (let i = 0; i < a; i++) {
            let curr = queue.shift()
            if (curr.left) {
                temp.push(curr.left.val)
                queue.push(curr.left)
            } else {
                temp.push(NaN)
            }
            if (curr.right) {
                temp.push(curr.right.val)
                queue.push(curr.right)
            } else {
                temp.push(NaN)
            }
            if ((temp[temp.length - 1] === x && temp[temp.length - 2] === y) || (temp[temp.length - 1] === y && temp[temp.length - 2] === x)) {
                return false
            }
        }
        if (weBothIn(temp, x, y)) {
            return true
        }
    }
    return false
} */

// 1002. 查找常用字符
// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
// 你可以按任意顺序返回答案。
/* var commonChars = function (A) {
    let map = {}
    for (let i = 0; i < A.length; i++) {
        let str = A[i]
        map[str] = {}
        for (let j = 0; j < str.length; j++) {
            if (str[j] in map[str]) {
                map[str][str[j]]++
            } else {
                map[str][str[j]] = 1
            }
        }
    }
    // 将每个字符串里面的每个字母出现的次数记录在map里面
    let Result = { "q": 101, "w": 101, "e": 101, "r": 101, "t": 101, "y": 101, "u": 101, "i": 101, "o": 101, "p": 101, "a": 101, "s": 101, "d": 101, "f": 101, "g": 101, "h": 101, "j": 101, "k": 101, "l": 101, "z": 101, "x": 101, "c": 101, "v": 101, "b": 101, "n": 101, "m": 101 }
    for (let keys2 in Result) {
        for (let keys in map) {
            if (keys2 in map[keys]) {
                Result[keys2] = Math.min(Result[keys2], map[keys][keys2])
            } else {
                delete Result[keys2]
            }
        }
    }
    // 将result分别于每个子对象里面的内容对比，不包含的字母全部删除
    let result = []
    for (let keys in Result) {
        for (let i = 0; i < Result[keys]; i++) {
            result.push(keys)
        }
    }
    return result
};
console.log(commonChars(["bella", "label", "roller"])); */

// 1008. 先序遍历构造二叉树
/* var bstFromPreorder = function (preorder) {
    if (preorder.length == 0) { return null }
    let root = preorder[0]
    for (var i = 1; i < preorder.length; i++) {
        if (preorder[i] > root) {
            break
        }
    }
    let left = preorder.slice(1, i)
    let right = preorder.slice(i)
    root = new TreeNode(root)
    root.left = bstFromPreorder(left)
    root.right = bstFromPreorder(right)
    return root
}; */

// 1030. 距离顺序排列矩阵单元格
// 给出 R 行 C 列的矩阵，其中的单元格的整数坐标为 (r, c)，满足 0 <= r < R 且 0 <= c < C。
// 另外，我们在该矩阵中给出了一个坐标为 (r0, c0) 的单元格。
// 返回矩阵中的所有单元格的坐标，并按到 (r0, c0) 的距离从最小到最大的顺序排，其中，两单元格(r1, c1) 和 (r2, c2) 之间的距离是曼哈顿距离，|r1 - r2| + |c1 - c2|。（你可以按任何满足此条件的顺序返回答案。）
/*  var allCellsDistOrder = function (R, C, r0, c0) {
    let map = {}
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            let a = Math.abs(i - r0) + Math.abs(j - c0)
            if (a in map) {
                map[a].push([i, j])
            } else {
                map[a] = [[i, j]]
            }
        }
    }
    let k = 0, result = []
    while (k in map) {
        result = result.concat(map[k++])
    }
    console.log(map)
    return result
}; */

// 1037. 有效的回旋镖
// 回旋镖定义为一组三个点，这些点各不相同且不在一条直线上。
// 给出平面上三个点组成的列表，判断这些点是否可以构成回旋镖
/* var isBoomerang = function (points) {
    let a = points[0]
    let b = points[1]
    let c = points[2]
    let k1 = (a[1] - b[1]) / (a[0] - b[0])
    let k2 = (a[1] - c[1]) / (a[0] - c[0])
    if (k1 !== k1 || k2 !== k2) { return false }
    if (k1 != k2) {
        return true
    } else {
        return false
    }
}; */

// 1046. 最后一块石头的重量
/* var lastStoneWeight = function (stones) {
    function swap(array, i, j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    function heapdown(array, currIdx, end = array.length) {
        while (currIdx < end) {
            let maxIdx = currIdx
            let leftIdx = currIdx * 2 + 1
            let rightIdx = leftIdx + 1
            if (leftIdx < end && array[leftIdx] > array[maxIdx]) {
                maxIdx = leftIdx
            }
            if (rightIdx < end && array[rightIdx] > array[maxIdx]) {
                maxIdx = rightIdx
            }
            if (array[maxIdx] != array[currIdx]) {
                swap(array, maxIdx, currIdx)
                currIdx = maxIdx
            } else {
                break
            }
        }
    }
    function heapfy(array) {
        let curr = (array.length - 2) >> 1
        for (let i = curr; i >= 0; i--) {
            heapdown(array, i)
        }
    }
    heapfy(stones)
    while (stones.length > 0) {
        let rootNumber = stones[0]
        let leftNumber = stones[1]
        let rightNumber = stones[2]
        if (leftNumber === undefined) { return stones[0] }
        if (rightNumber === undefined) { return stones[0] - stones[1] }
        if (leftNumber > rightNumber) {
            var newNumber = rootNumber - leftNumber
            stones.splice(1, 1)
        } else {
            var newNumber = rootNumber - rightNumber
            stones.splice(2, 1)
        }
        stones[0] = newNumber
        heapfy(stones)
    }
} */

// 1108. IP 地址无效化
// 给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。
// 所谓无效化 IP 地址，其实就是用 "[.]" 代替了每个 "."。
/* var defangIPaddr = function (address) {
    address = address.split("")
    let result = address.map(function (n) {
        if (n == ".") {
            return n = "[.]"
        } else {
            return n = n
        }
    })
    return result.join("")
}; */
