function minNumberInRotateArray(rotateArray)
{
    // write code here
    if(rotateArray === null || rotateArray.length <= 0){
      return null
    }
    let p1 = 0;
    let p2 = rotateArray.length -1;
    let mid = null;
    while(p1 < p2){
      if(p1 + 1 === p2){
        mid = p2;
        break;
      }
      mid = (p1 + p2) >> 1;
      if(rotateArray[mid] >= rotateArray[p1]){
        p1 = mid;
      } else if(rotateArray[mid] <= rotateArray[p2]){
        p2 = mid;
      }
    }
    return rotateArray[mid]
}

// 重复率较高的写法
function Fibonacci1(n)
{
    // write code here
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 1;
    return Fibonacci(n-1) + Fibonacci(n-2)
}

function Fibonacci(n)
{
    // write code here
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 1;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 1;
    for(let i = 3;i<=n;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[n]
}

function jumpFloor1(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    return jumpFloor(number - 1) + jumpFloor(number - 2)
}

function jumpFloor(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 2;
    for(let i =3;i<=number;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[number]
}

function jumpFloorII(number)
{
    // write code here
    return Math.pow(2, number-1)
}

function rectCover(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 2;
    for(let i =3;i<=number;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[number]
}

// 负数用补码
// 原码，反码（正数的反码为本身, 负数反码为符号位不变，其他位取反），补码（正数补码为本身，负数为反码加1）
function NumberOf1(n)
{
    // write code here
    
}