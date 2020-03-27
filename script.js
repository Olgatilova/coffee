"use strict" /* включение строгого режима, невозможность без let назначить переменные*/

let balance = document.querySelector(".balance")/*баланс, используя метод document.querySelector(".balance")в инпут пишем сумму*/
let displayText = document.querySelector(".display-text") /* замена текста в окне Выбирите кофе*/
let progressBar = document.querySelector(".progress-bar");/* переменная прогресс бак*/
let coffeeCup = document.querySelector(".coffee-cup img");
let coffeeStatus = "waiting"; //"cooking", "ready" статус кофе машины, ожидание, готовка, готов//

coffeeCup.onclick = takeCoffee; // 1 вариант забрать кружку

//coffeCup.addEventListener t("click", takeCoffee, buyCoffee, "Американо", 21); // второй вариант забрать кружку

/*coffeCup.onclick = function() {
 takeCoffee(this);*/
 // забрать кружку



function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") { /* запрет на списание повторно при приготовлении*/
    return;
  }
  let afterBuyValue = +balance.value - cost;/* переменная afterBuyValue вычесление сдачи*/
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red"; /* при недостатке средств подсветка инпута красным*/
    balance.style.backgroundColor = "pink"; /* тело инпута в розовый*/
    changeDisplayText("Недостаточно средств"); /* сообщение*/
    
    return;
  }
  balance.style.border = "none"; /* при достатке средств подсветки нет инпута */
  balance.style.backgroundColor = "white"; /* задний фон инпута в белый*/
  
  balance.value = (+balance.value - cost).toFixed(2);/* .toFixed(2)обрезка двух цифр после точки*/
  cookCoffee(name, elem); 
}
function cookCoffee(name, elem) {
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");/* при выборе кофе пишиться */
   // coffeeCup.classList.add(""); Добавить класс

  let cupImg = elem.querySelector("img");// выбор картинки того кофе, которое выбрано
  let cupSrc = cupImg.getAttribute("src");// выбор картинки того кофе, которое выбрано
  coffeeCup.setAttribute("src", cupSrc);// выбор картинки того кофе, которое выбрано
  coffeeCup.style.opacity = "0%"; // кружка появляется постепенно
  coffeeCup.classList.remove("d-none"); //убрать класс
  //coffeeCup.classList.toggle(""); вкл/выкл класс
  //coffeeCup.classList.contains("d-none"); Содержит ли?
  
  let readyPercent = 0;/* на сколько % приготовилось*/
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";/* тик интервала появления кружки*/
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов!");
      coffeeCup.style.cursor = "pointer"; // курсор на кружке появляется пальчик, при полной загрузке
      clearInterval(cookingInterval); /* шкала окончание*/
    }
  }, 100);
}

function takeCoffee() {
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе");

}

function changeDisplayText(text) { /* функция к переменной let dispiyText = document.querySelector(".dispiy-text")- замена текста в окне Выбирите кофе*/
  displayText.innerHTML = "<span>"+text+"</span>";
  //displayText.innerText = "<span>"+text+"</span>"; свойство 

}
