/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = new Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for(let i = 1;i<=amount+1;i++){
    for(let j = 0; j < coins.length; j++){
      if(coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i-coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
};

let x = coinChange([1,2,11], 11);
console.log(x);

// 二叉树的遍历 前序遍历 中序遍历 后序遍历
// 归并排序类似后续                    