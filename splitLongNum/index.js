function splitLongNum(num) {
  if(typeof num === 'number') {
    num = num + '';
  }

  let isDecimal = num.split('.').length > 1;
  let fraction = '';
  let integer = '';
  let reverse = '';
  let result = '';
  const hasThreeNum = /^(\d{3})[^$]/;

  if(isDecimal) {
    fraction = num.split('.')[1];
  }
  integer = num.split('.')[0];

  reverse = integer.split('').reverse().join('');

  while(hasThreeNum.test(reverse)) {
    reverse = reverse.replace(RegExp.$1, '');
    result += RegExp.$1 + ',';
  }

  result += reverse;

  result = result.split('').reverse().join('');

  return (result + '.' +  fraction);
}

function splitLongNum2(num) {
  num = num + '';
  return num.split('').reverse().map(function(val,idx){
    if((idx+1)%3==0){
      return ','+val
    }
    return val
  }).reverse().join('')
}

function splitLongNum3(num) {
  num += '';
  return num.replace(/(?=(\d{3})+$)/g);
}


function getRunTime(func, times=100000) {
  const start = new Date().getTime();
  for(let i = 0; i < 100000; i++) {
    func();
  }
  const end = new Date().getTime();

  return end - start;
}

console.log(getRunTime(() => { splitLongNum(1027171394); }));
console.log(getRunTime(() => { splitLongNum2(1027171394); }));
console.log(getRunTime(() => { splitLongNum3(1027171394); }));