// 闭包，无return，无内存泄露的例子
function outer () {
  const a = 1
  function fn () {
    console.log(a)
  }
  fn()
}
outer()

// 闭包，数据私有化
function fn1 () {
  let i = 0
  function fn2 () {
    i++
    console.log(i);
  }
  return fn2
}
const ff = fn1()
ff()//1
ff()//2
i = 100//外部无法更fn1内部的i的值
ff()//3