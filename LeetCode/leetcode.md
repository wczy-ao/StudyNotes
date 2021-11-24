## 数组

### 1_简单：删除有序数组中的重复项

```JS
输入：nums = [1,1,2]
输出：2, nums = [1,2]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。

链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
```



- 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

- 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

#### 理解

> set去重

#### 答案：双指针

- 首先这是一个有序数组，重复值是相连的，只要拿到某个位置的元素和之前/之后比较，然后把元素删除/填充
- 其次题目要求不需要多余数组，可以用两个变量---快变量和慢变量，**快变量用来元素比较**，**慢变量用来删除/填充**

```JS
var removeDuplicates = function(nums) {
    let length=nums.length
    if(length==0){
        return 0
    }
    let fast=1,slow=1 //第一个肯定不重复，所以从 1 开始遍历
    while(fast<length){
        if(nums[fast]!==nums[fast-1]){
            nums[slow]=nums[fast]
            slow++
        }
        fast++ // 快变量自增没有条件
    }
};
```

------

------

### 2_中等：选择数组

```JS
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]


链接：https://leetcode-cn.com/problems/rotate-array

```

- 给定一个数组，将数组中的元素向右移动 `k` 个位置，其中 `k` 是非负数。

- 至少有三种不同的方法可以解决这个问题

#### 理解

- 移动k个位置，那需要看k和数组长度的比较，只需要取 k和数组长度的取余就行，然后移动这么些次
- 向右移动还是向左移动？这个要看移动次数和数组长度中间值的比较

#### 理解误差

- 要把移动的k个位置和当前index加起来对数组取余
- 都只向一个方向移动，因为你移动六个和移动一个（假设数组长度为7）时间复杂度都是O(n)

#### 答案

##### 1：使用额外数组

```JS
var rotate = function(nums, k) {
    const n = nums.length;
    const newArr = new Array(n);
    for (let i = 0; i < n; ++i) {
        newArr[(i + k) % n] = nums[i];
    }
    for (let i = 0; i < n; ++i) {
        nums[i] = newArr[i];
    }
};

复杂度分析

时间复杂度： O(n)，其中 nn 为数组的长度。

空间复杂度： O(n)O(n)。
```

##### 2：数组翻转

该方法基于如下的事实：当我们将数组的元素向右移动 k 次后，尾部 `k\mod n`  个元素会移动至数组头部，其余元素向后移动 `k\mod n` 个位置。

该方法为数组的翻转：我们可以先将所有元素翻转，这样尾部的 `k\mod n`  个元素就被移至数组头部，然后我们再翻转 [0, `k\mod n` ][0,`k\mod n` ] 区间的元素和 [`k\mod n` , n-1][kmodn,n−1] 区间的元素即能得到最后的答案。

<img src="C:\Users\wanzh\AppData\Roaming\Typora\typora-user-images\image-20210523113227497.png" alt="image-20210523113227497" style="zoom:80%;" />

```JS
const reverse = (nums, start, end) => {
    while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start += 1;
        end -= 1;
    }
}

var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
};

```

## 字符串

### 1_简单：有效的字母异味词

```JS
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

所有字符串都是小写

示例 1:

输入: s = "anagram", t = "nagaram"
输出: true
示例 2:

输入: s = "rat", t = "car"
输出: false


链接：https://leetcode-cn.com/problems/valid-anagram
```

#### 理解：

- 就是判断两个字符串内容是否一样

- 我使用的方法就是直接把他们一个一个进行比较，有相同的就删除这个，然后接着比

```JS
var isAnagram = function(s, t) {
    let sArray=s.split('')
    let tArray=t.split('')
    if(sArray.length==tArray.length){
        while(tArray.length>0){
            var temp=tArray[0]
            if(!sArray.includes(temp)){
                return false
            }else{
                let sIndex=sArray.indexOf(temp)
                sArray.splice(sIndex,1)
                tArray.splice(0,1)
            }
                if(tArray.length==0){
                    return true
                }
        }
    }else{
        return false
    }
};
```

#### 答案

#### 1：排序

- 将其转为数组，然后排序，在转为字符串，使用`===`来确认是否是字母异位词

```JS
var isAnagram = function(s, t) {
    return s.length===t.length&&[...s].sort().join('')===[...t].sort().join('')
};
```

#### 2：哈希表

- 从另一个角度考虑，t 是 s 的异位词等价于`两个字符串中字符出现的种类和次数均相等`。
- 总共26个字母，利用一个数组记录每个字母出现的频率，然后遍历另一个字符串时，在减去出现频率的次数，看最后数组中是否有值即可
- 利用Unicode值来确定频率

```JS
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const table = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
        //s.codePointAt(i):表示字符串s中第i位的Unicode值
    }
    for (let i = 0; i < t.length; ++i) {
        table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
        if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
            return false;
        }
    }
    return true;
};

```

### 2_中等：字母异味词分组

```JS
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]


链接：https://leetcode-cn.com/problems/group-anagrams
```

- 所有输入均为小写字母。
- 不考虑答案输出的顺序。

#### 理解：

- 我想着就是直接遍历，然后把数据排序变成字符串后去比较相等

#### 理解误差：

- 遍历没问题，但是怎么把当前遍历的对象和之前的对象比较，这又需要一次遍历，根据题目要求还是子数组，这如果只是通过遍历很麻烦

#### 答案

##### 1：排序

> 同一组字母异位词中的字母是相同的，可以使用这一点来区分不同的字母异位词，使用哈希表存储每一组字母异位词，哈希表的键为一组字母异位词的标志，哈希表的值为一组字母异位词列表。
>

```JS
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
        let array = Array.from(str);
        array.sort();
        let key = array.toString();
        let list = map.get(key) ? map.get(key) : new Array();//没有就传一个新的空数组，有就是之前的数组
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};


```

2：计数

> 两个字符串中的相同字母出现的次数一定是相同的，故可以将每个字母出现的次数使用字符串表示，作为哈希表的键。
>
> 由于字符串只包含小写字母，因此对于每个字符串，可以使用长度为 2626 的数组记录每个字母出现的次数。

```JS
var groupAnagrams = function(strs) {
    const map = new Object();//这个时候就是对象
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        map[count] ? map[count].push(s) : map[count] = [s];//对象的键是count的值
    }
    return Object.values(map);
};

```

