/* 1. 两数之和
注意事项：只需要遍历nums.length - 1即可
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。 */
/* var twoSum = function (nums, target) {
    for (i = 0; i < nums.length - 1; i++) {
        for (a = i + 1; a < nums.length; a++) {
            if (target === nums[i] + nums[a]) {
                return [i, a]
            };
        };
    }
}
console.log(twoSum([3, 2, 4], 6)) */

// 方法2 对象映射
// 遍历数组，将出现过的数值和索引记录在对象中，再通过属性 in 对象来检查想要的目标在不在对象中
/* var twoSum = function (nums, target) {
    var map = {}
    for (let i = 0; i < nums.length; i++) {
        let need = target - nums[i] 
        if (need in map) {
            return [map[need],i]
        }else{
            map[nums[i]] = i
        }
    }
} */


// 2. 两数相加
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
// 思路：将其转化为数组后相加，得到新的数组后转化为链表
/* var addTwoNumbers = function (l1, l2) {
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
    while(arr1.length < arr2.length) {
        arr1.push(0)
    }
    while(arr1.length > arr2.length) {
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
        }else{
            upper = 0
        }
        result.push(number)
    }
    if(upper){
        result.push(1)
    }
    return arrTolist(result)
}; */


// 3. 无重复字符的最长子串
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// 双指针配合映射，记录两个指针之间的最大距离，用map记录是否重复，一但重复慢指针往前走一步，再判断
/* var lengthOfLongestSubstring = function (s) {
    if (s.length == 0) { return 0 }
    let map = {}
    let i = 0, j = 0, n = 0
    let sum = []
    while (j < s.length) {
        if (s[j] in map) {
            delete map[s[i]]
            i++
            sum.push(n)
            n = n - 1
        } else {
            map[s[j]] = j
            n++
            if (j == s.length - 1) {
                sum.push(n)
                break
            } else {
                j++
            }
        }
    }
    return Math.max(...sum)
};
console.log(lengthOfLongestSubstring("pwwkew")) */





// 7. 整数反转
// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
/* var reverse = function (x) {
    var a = Math.abs(x)
    var s = 0
    while (a > 0) {
        var digits = a % 10
        s = 10*s + digits
        a = (a - digits)/10
    }
    if(x>=0){
       if(s > (2**31 - 1)){
           return 0
       }else{
           return s
       }
    }else{
        if(-s < (0 - 2**31)){
            return 0
        }else{
            return -s
        }
    }
}; */

// console.log(reverse(1534236469))

// 9 回文数
// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
//  注意左边右边各为什么，先把该位数变为最后一位，再%10就是该值
/* var isPalindrome = function(n) {
    if(n<0){
        return false
    }
    var a = String(n).length
    if(a===1){
        return true
    }
    for(i=1;i<=a/2;i++){
        var right = Math.floor(n / 10**(i-1)) % 10
        var left = Math.floor(n / 10**(a-i)) % 10
        if(right!==left){
            return false
        }
    }
    return true
};

console.log(isPalindrome(132231)) */




// 12. 整数转罗马数字
// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 条件判断 ，一层一层往下判断
/* var intToRoman = function(num) {
    let str = ""
    let singleNumber = num % 10
    let tensNumber = Math.floor(num/10)%10
    let hundredsNumber = Math.floor(num/100)%10
    let thousandsNumber = Math.floor(num/1000)%10
    if(thousandsNumber!=0){
        for(let i = 0 ; i < thousandsNumber;i++){
            str = "M" + str
        }
    }
    if(hundredsNumber!=0){
        if(hundredsNumber==9){
            str = str + "CM"
        }else if(hundredsNumber>=5){
            str = str + "D"
            for(let i = 5 ; i <hundredsNumber;i++){
                str = str + "C"
            }
        }else if(hundredsNumber ==4){
                str = str + "CD"
        }else{
            for(let i = 0 ; i < hundredsNumber;i++){
                str = str + "C"
            }
        }
    }
    if(tensNumber!=0){
        if(tensNumber==9){
            str = str + "XC"
        }else if(tensNumber>=5){
            str = str + "L"
            for(let i = 5 ; i <tensNumber;i++){
                str = str + "X"
            }
        }else if(tensNumber ==4){
                str = str + "XL"
        }else{
            for(let i = 0 ; i < tensNumber;i++){
                str = str + "X"
            }
        }
    }
    if(singleNumber!=0){
        if(singleNumber==9){
            str = str + "IX"
        }else if(singleNumber>=5){
            str = str + "V"
            for(let i = 5 ; i <singleNumber;i++){
                str = str + "I"
            }
        }else if(singleNumber ==4){
                str = str + "IV"
        }else{
            for(let i = 0 ; i < singleNumber;i++){
                str = str + "I"
            }
        }
    }
    return str
};  */


// 13. 罗马数字转整数
// 条件判断
/* var romanToInt = function (s) {
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
            m =  m + 1
            let n = 0
            for (let i = m ; i < l; i++) {
                if (arr[i] == "C") {
                    n++
                    m++
                }else{
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
            for (let i = m ; i < l; i++) {
                if (arr[i] == "X") {
                    n++
                    m = m + 1
                }else{
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
                }else{
                    break
                }
            }
            sum = sum + n
            break
        } else if((arr[i] =="I") ){
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
        }else{

        }
    }
    // 最后判断个位
    return sum
};
console.log(romanToInt("MDCXCV")) */


// 14. 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。
// 双层for循环
/* var longestCommonPrefix = function (strs) {
    if(strs==0){
        return ""
    }
    let a = strs.length
    let b = strs[0].length
    let Str = ""
    var d = 0
    for (let j = 0; j < b; j++) {
        var chat = (strs[0])[j]
        for (let i = 1; i < a; i++) {
            if ((strs[i])[j] !== chat) {
                if (j == 0) {
                    return ""
                }
                d = 1
                break
            }
        }
        if(d == 0){
            Str = Str + chat
        }else{
            break
        }
    }
    return Str
};
console.log(longestCommonPrefix( ["flower","flow","flight"])) */



// 15 三数之和
// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。注意：答案中不可以包含重复的三元组。
//  该方法思路：向筛选出所有的三元组，然后筛选出重复的；先排序，再转化字符串筛选， 筛选时用splice删除后添加一个[]，循环执行完毕再用高阶函数filter筛选出想要的
/*   var threeSum = function (nums) {
    var removeDuplicates = function (x) {
        var e = x.length;
        for (i = 0; i < e - 1;i++) {
            for (f = i + 1; f < e; f++) {
                if (x[i].sort(function(z,y){return z- y}).join() === x[f].sort(function(z,y){return z- y}).join()) {
                    x.splice(i, 1,[]);
                };
            };
        }
        return  x.filter(function (number) { return number.join() !=="" })
    };
    var b = [];
    for (i = 0; i < nums.length - 2; i++) {
        for (c = i + 1; c < nums.length; c++) {
            for (d = c + 1; d < nums.length; d++) {
                var a = [];
                if (nums[i] + nums[c] + nums[d] == 0) {
                    a.push(nums[i], nums[c], nums[d]);
                    b.push(a);
                }
            }
        }
    }
    return removeDuplicates(b)
}
console.log(threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))  */


// 19. 删除链表的倒数第N个节点,并且返回链表的头结点
// 利用双指针，双指针的距离为n+1，需要创造一个额外的节点保证双指针距离大于n
/* var removeNthFromEnd = function (head, n) {
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
}; */




// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串
// 先进后出,栈原理
/* var isValid = function (s) {
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
console.log(isValid("()"))
 */




// 21. 合并两个有序链表
// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
/* var mergeTwoLists = function (l1, l2) {
    function listToArray(list) {
        let result = []
        while (list !== null) {
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
    // 将链表转化为数组，数组合并后排序，再将数组转化为链表
    let arr1 = listToArray(l1)
    let arr2 = listToArray(l2)
    let Arr = arr1.concat(arr2).sort(function (a, b) { return a - b })
    return arrTolist(Arr)
}; */

// 方法二  链表的归并
/* var mergeTwoLists = function (l1, l2) {
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
} */

// 方法3  递归
/* var mergeTwoLists = function (l1, l2) {
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
} */



// 23. 合并K个排序链表
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
    let result = lists.reduce(function(x,y){return mergeTwoLists(x,y)})   
    return result
}

    // 24. 两两交换链表中的节点
    // 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
    // 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
    // 递归分析
    /* var swapPairs = function (head) {
        if (!head || !head.next) { return head }
        let result = head.next
        let newHead = head.next.next
        head.next.next = head
        head.next = swapPairs(newHead)
        return result
    }; */




    /* 26. 删除排序数组中的重复项
    注意事项：注意return的位置，需要在第一个for循环后面
    给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
    不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。 */
    /* var removeDuplicates = function (nums) {
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
    
    console.log(removeDuplicates([1, 1, 1, 2, 2, 4,4,5,5])) */




    // 方法二  双指针
    // 指针1：nextpoz   记录储存每个不同的数，有条件的走，走得慢
    // 指针2：i    将索引为i和i-1 的数比较，将不同时的对应的素传递给nextpoz,连续走，走得快
    /* var removeDuplicates = function (nums) {
        var nextpoz = 0
        for(let i = 0 ;i < nums.length ; i++){
            if(nums[i]!==nums[i-1]){
                nums[nextpoz] = nums[i]
                nextpoz++
            }
        }
        return nextpoz
    } */




    /*
    27. 移除元素
    给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
    不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
    元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。 */
    /* var removeElement = function (nums, val) {
        var c = nums.length;
        for (i = 0; i < c; i++) {
            if (nums[i] === val) {
                nums.splice(i, 1)
                c = c - 1
                i = i - 1
            };
        }; return nums.length;
    };
    console, console.log(removeElement([0, 1, 2, 2, 3, 3, 5, 4, 0, 4, 2], 3)); */


    // 28. 实现strStr()
    // 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
    /* var strStr = function (haystack, needle) {
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
    }; */





    // 33. 搜索旋转排序数组
    // 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    // (例如，数组[0, 1, 2, 4, 5, 6, 7] 可能变为[4, 5, 6, 7, 0, 1, 2] ) 。
    // 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 - 1 。
    // 你可以假设数组中不存在重复的元素。
    // 你的算法时间复杂度必须是 O(log n) 级别。
    /* var search = function(nums, target) {
        if(nums==0){return -1}
        // nums为[]时的判定
        var findMin = function(nums) {
            let left = 0
            let right = nums.length - 1
            var mid = Math.floor((left + right)/2)
            while(((right - left) != 1) && ((right - left) != 0)){
                if(nums[mid]>nums[0]){
                    left =  mid
                }else{
                    right = mid
                }
                mid = Math.ceil((left + right)/2)
            }
            if(nums[0]<nums[right]){
                return 0
            }else{
                return right
            }
        }
        // 构造寻找最小值函数
        let n = findMin(nums)
        if(n==0){
            let left = 0
            let right = nums.length - 1
            let mid = Math.ceil((left+right)/2)
            if(nums[left]==target){
                return left
            }
            if(nums[right]==target){
                return right
            }
            while(((right - left) != 1) && ((right - left) != 0)) {
                if(nums[mid]>target){
                    right = mid
                }else if(nums[mid]<target){
                    left = mid
                }else{
                    return mid
                }
                mid = Math.ceil((left+right)/2)
            }
            return -1
        }
        // 数组升序排列时
    
        // 数组不是升序排列时
        if(target > nums[0]){
            let left = 0
            let right = n -1
            let mid = Math.ceil((left+right)/2)
            if(nums[right]==target){
                return right
            }
            while(((right - left) != 1) && ((right - left) != 0) ) {
                if(nums[mid]>target){
                    right = mid
                }else if(nums[mid]<target){
                    left = mid
                }else{
                    return mid
                }
                mid = Math.ceil((left+right)/2)
            }
            return -1
        }else if(target < nums[0]){
            let left = n
            let right = nums.length - 1
            let mid = Math.ceil((left+right)/2)
            if(nums[left]==target){
                return left
            }
            if(nums[right]==target){
                return right
            }
            while(((right - left) != 1) && ((right - left) != 0)) {
                if(nums[mid]>target){
                    right = mid
                }else if(nums[mid]<target){
                    left = mid
                }else{
                    return mid
                }
                mid = Math.ceil((left+right)/2)
            }
            return -1
        }else{
            return 0
        }
    };
    console.log(search([1,3],2)) */












    // 34. 在排序数组中查找元素的第一个和最后一个位置
    // 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
    // 你的算法时间复杂度必须是 O(log n) 级别。
    // 如果数组中不存在目标值，返回 [-1, -1]。
    // 二分法求解
    /* var searchRange = function (nums, target) {
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
    console.log(searchRange([7], 8)) */


    /* 35. 搜索插入位置
    注意return是终止函数而不是for循环
    给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
    你可以假设数组中无重复元素。 */
    /* var searchInsert = function (nums, target) {
        var c = nums.length;
        for (i = 0; i < c; i++) {
            if (nums[i] >= target) {
                return i
            };
        };
        return c
    };
    console.log(searchInsert([1, 1, 1, 2, 3, 4], 5)) */


    // 36. 有效的数独
    // 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
    // 数字 1-9 在每一行只能出现一次。
    // 数字 1-9 在每一列只能出现一次。
    // 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
    /* var isValidSudoku = function (board) {
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
            if (!checkNine(arr2) ){
                return false
            }
        }
    // 竖着检查一遍
        let Map = { "Arr1":[], "Arr2":[], "Arr3":[], "Arr4":[], "Arr5":[], "Arr6":[], "Arr7":[], "Arr8":[], "Arr9":[] }
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
    
    }; */




    // 49. 字母异位词分组
    // 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
    // 
    /* var groupAnagrams = function (strs) {
        let map = {}
        for(let i = 0 ;i <strs.length;i++){
            let str = strs[i]
            let char = str.split("").sort().join()
            // 通过这个方法将相同字母异位词转化为一样的输出，作为属性储存到对象中
            if(char in map){
                map[char].push (str)
            }else{
                map[char]=[str]
            }
            // 每个词都遍历，同分异位的push到同一个数组中，不同的就创造一个属性，作为映射储存在对象中
        }
        let result = []
        for(let keys in map){
            result.push(map[keys])
        }
        // 将map里面的值都push到一个数组里，作为结果返回
        return result
    }
    console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
     */

    //50  实现 pow(x, n) ，即计算 x 的 n 次幂函数。
    //  将n拆分   ，n =c * j ,转化为x的c次幂的j次幂
    // 特殊情况单独拿出来return  ，节约时间
    /* var myPow = function(x, n) {
        if(x==1){
            return 1
        }
        if(x == -1){
            if(n % 2 == 0){
                return 1
            }else{
                return -1
            }
        }
        var d
        if(n<0){
            d = 1
            n = -n
        }
        var s = 1,a = Math.floor(Math.sqrt(n))
        for(j=a;j>=1;j--){
           if(n % j == 0){
              break
           }
        }
        for(i=0;i<j;i++){
            s = s * x
        }
        var c = n / j
        var S =1
        for(k=0;k<c;k++){
            S = s * S
            if(S==Infinity){
                if(d==1){
                    return 0
                }else {
                    return Infinity
                }
            }
        }
        if(d==1){
            return 1/S
        }else {
            return S
        }
    }; */

    // 优化使用递归的方法求解
    /* var myPow = function(x, n){
        if(n<0){
            return 1 / myPow(x,-n)
        }
        if(n == 0 ){
            return  1
        }
        if(n % 2 == 0){
            return myPow(x*x,n/2)
        }
        if(n % 2 == 1){
            return x * myPow(x*x,(n-1)/2)
        }
    } */




    /* 53. 最大子序和
    给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    最大子序列和，必须以正数开头，遍历出所有正数开头的连续子数列的和，储存出来保留最大值
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
    
    console.log(maxSubArray([1, 2, 3, 4, 5, -9, -3, 13])) */


    // 43. 字符串相乘
    // 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
    /* var multiply = function (Num1, Num2) {
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
            Result = addStrings(arr1[i],Result)
        }
        return Result
    }
    // 数组中的结果依次进行字符串加法运算得到结果
    console.log(multiply("0", "0")) */


    // 61. 旋转链表
    // 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
    // 画图分析，先将其转化为循环链表，用双指针
    /* var rotateRight = function (head, k) {
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
    }; */


    // 62. 不同路径
    // 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
    // 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
    // 问总共有多少条不同的路径？
    /* let map = {}
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
    console.log(uniquePaths(23, 12)) */



    /*66  给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
    最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
    你可以假设除了整数 0 之外，这个整数不会以零开头。 */
    /* var plusOne = function (digits) {
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
    
    console.log(plusOne([9,9])) */




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
    /* var mySqrt = function(n) {
        var x = n
        while(Math.abs(x*x - n)>0.1){
            x = (x + n/x)/2
        }
        x = Math.floor(x)
        return x
    }; */


    // 70. 爬楼梯
    // 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
    // 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
    // 用递归会超时，将递归转化为循环做,递归优雅易懂，循环快速

    /* var climbStairs = function (n) {
        if (n == 1) {
            return 1
        }
        if (n == 2) {
            return 2
        }
        var first  = 1
        var second = 2
        for(let i = 3; i <= n ; i ++){
            let third=first + second
            first = second
            second = third
        }
        return second
    };
    console.log(climbStairs(45)) */

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
    /* var deleteDuplicates = function (list) {
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
    /* var reverseBetween = function (head, m, n) {
        
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


    // 153. 寻找旋转排序数组中的最小值
    // 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    // ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    // 请找出其中最小的元素。
    // 你可以假设数组中不存在重复元素
    /* var findMin = function(nums) {
        nums.sort(function(a,b){return a - b})
        return nums[0]
    }; */
    // 方法二  二分法
    // 思考靠哪一点逼近，返回左或者右
    /* var findMin = function(nums) {
        let left = 0
        let right = nums.length - 1
        var mid = Math.floor((left + right)/2)
        while(((right - left) != 1) && ((right - left) != 0)){
            if(nums[mid]>nums[0]){
                left =  mid
            }else{
                right = mid
            }
            mid = Math.ceil((left + right)/2)
        }
        return  Math.min(nums[right],nums[0])
    }
    console.log(findMin([4,5,6,7,0,1,2])) */


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



    // 219. 存在重复元素 II
    // 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
    /* var containsNearbyDuplicate = function(nums, k) {
     
    } */

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
    /* var isPerfectSquare = function (num) {
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
    } */


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


// 409. 最长回文串
// 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
// 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
/* var longestPalindrome = function (s) {
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
}; */

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







// 633. 平方数之和
// 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a**2 + b**2 = c。
//  结合三角形思考,a+b>根号c ,二分法逼近结果
/* var judgeSquareSum = function (c) {
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
}; */


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



// 704. 二分查找
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
/* var search = function(nums, target) {
    var left = 0
    var right = nums.length - 1
    var mid = Math.ceil((left + right )/2)
    if(nums[left]==target){
        return left
    }
    if(nums[right]==target){
        return right
    }
    while((right - left)>1){
        if(nums[mid]>target){
            right = mid
        }else if (nums[mid]<target){
            left = mid
        }else{
            return mid
        }
        mid = Math.ceil((left + right )/2)
    }
    return -1
}; */


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


// 938. 二叉搜索树的范围和
// 给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。
// 二叉搜索树保证具有唯一的值。



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


