"use strict" /* включение строгого режима, невозможность без let назначить переменные*/

let balance = document.querySelector(".balance")/*баланс, используя метод document.querySelector(".balance")в инпут пишем сумму*/

function buyCoffee(name, cost) {
  let afterBuyValue = +balance.value - cost;/* переменная afterBuyValue*/
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    alert("Недостаточно средств!");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2);/* .toFixed(2)обрезка двух цифр после точки*/
  alert("Ваш " + name + " готовится!");
}

