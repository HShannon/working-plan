# code piece
1. 反转
```
function revert(x){
  let y = 0
  while(x >= 1){
    y = y * 10 + x % 10;
    x = Math.floor(x / 10)
  }
  return y
}
```

