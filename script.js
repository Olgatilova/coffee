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

function takeCoffee() { // варит кофе
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none"); // кружка исчезает при клик
  coffeeCup.style.cursor = "auto"; 
  progressBar.style.width = "0%"; // обнуляется при завершении
  changeDisplayText("Выберите кофе");

}

function changeDisplayText(text) { /* функция к переменной let dispiyText = document.querySelector(".dispiy-text")- замена текста в окне Выбирите кофе*/
  displayText.innerHTML = "<span>"+text+"</span>";
  //displayText.innerText = "<span>"+text+"</span>"; свойство 

}


//------------------------------drag'n'Drop------------------------

let bills = document.querySelectorAll(".wallet img"); //переменная  возвращает массив
for(let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney; // нажатие на купюру
  // bills[i].onmousedown = () => {takeMoney()}; // нажатие на купюру
  
}

function takeMoney(event) { //обьект эвент, event.clientX, event.clientY -положение курсора на экране
  event.preventDefault(); // сбрасывает браузерные настройки (призрак купюры)
  
  let bill = this;
  let billCost = bill.getAttribute("cost"); //значение атрибута cost из html

  bill.style.position = "absolute"; //вывод купюр из дом дерева, для передвижения по экрану
  bill.style.transform = "rotate(90deg)"; //поворот купюры 90 градусов по оси
  
  let billCoords = bill.getBoundingClientRect(); // координаты купюры
  let billWidth = billCoords.width; //переменная выводит ширину 
  let billHeight = billCoords.height;//переменная выводит высоту
  
  bill.style.top = event.clientY - billWidth/2 + "px"; // купюра по ширине и высоте, при нажатии встает по центру курсора
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = (event) => {
      bill.style.top = event.clientY - billWidth/2 + "px"; // купюра летает 
      bill.style.left = event.clientX - billHeight/2 + "px";
  };
    
  bill.onmouseup = dropMoney;
}

function dropMoney() {
  window.onmousemove = null; //отключается движение купюры при отпуске клавиши мыши
  
  let bill = this;
  let billCost = bill.getAttribute("cost"); //значение атрибута cost из html
  
  if (inAtm(bill)) {
    balance.value = +balance.value + +billCost; //сумма купюры выводитьься в баланс
    bill.remove(); //скрыть купюру
  }
}

function inAtm(bill) { 
  
  let billCoord = bill.getBoundingClientRect();// определение координат купюры на купюроприемнике
  let atm = document.querySelector(".atm");//нашли и обратились к купюроприемнику
  let atmCoord = atm.getBoundingClientRect();
  //координаты купюроприемника
  
  let billLeftTopCornerX = billCoord.x; //координаты верхнего левого угла купюры
  let billLeftTopCornerY = billCoord.y;  //координаты верхнего левого угла купюры
  
  let billRightTopCornerX = billCoord.x + billCoord.width; //координаты верхнего правого угла купюры ширина
  let billRightTopCornerY = billCoord.y; //координаты верхнего правого угла купюры высота
  
  
  let atmLeftTopCornerX = atmCoord.x;//координаты верхнего левого угла купюроприемника по ширине
  let atmLeftTopCornerY = atmCoord.y;//координаты верхнего левого угла купюроприемника по высоте
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;//координаты верхнего правого угла купюроприемника по ширине + ширина купюроприемника
  let atmRightTopCornerY = atmCoord.y;//координаты верхнего правого угла купюроприемника по высоте
  
  let atmLeftBottomCornerX = atmCoord.x;//координаты нижнего левого угла купюроприемника по ширине
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;//координаты нижнего нижнего угла купюроприемника по высоте + высота купюроприемника

  let atmRightBottomCornerX = atmCoord.x + atmCoord.width;//координаты нижнего правого угла купюроприемника по ширине + ширина купюроприемника
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;

  
 /* console.log([[billLeftTopCornerX, billLeftTopCornerY] , [billRightTopCornerX, billRightTopCornerY]], [[atmLeftBottomCornerX, atmLeftBottomCornerY], [atmRightBottomCornerX, atmRightBottomCornerY]]);
  
  console.log([billCoord, atmCoord]);*/
  
  if (
    billLeftTopCornerX >= atmLeftTopCornerX //если левый верхний край купюры >= левому верхнему краю купюроприемника по ширине
    && billLeftTopCornerY >= atmLeftTopCornerY //если левый верхний край купюры >= левому верхнему краю купюроприемника по высоте правда/ложь
    && billRightTopCornerX <= atmRightTopCornerX //если правый верхний край купюры Б<= правого верхнему краю купюроприемника по ширине
    && billRightTopCornerY >= atmRightTopCornerY //если правый верхний край купюры >= правому верхнему краю купюроприемника по высоте правда/ложь
    && billLeftTopCornerX >= atmLeftBottomCornerX
    && billLeftTopCornerY <= atmLeftBottomCornerY
    ) {
      return true;
    } else {
      return false;
    }
}    
  //---------------------------сдача-----------------------
  
  
let changeBtn = document.querySelector(".change");
changeBtn.onclick = takeChange;

function takeChange() {
  tossCoin("10");// монеты с 10
}

function tossCoin(cost) {  //сдача, привязка картинок
  let changeContainer = document.querySelector(".change-box");
  let changeContainerCoords = changeContainer.getBoundingClientRect();
  let coinSrc = "";
  
  switch (cost) {
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;

  }
  
/*  changeContainer.innerHTML += `
   <img src="${coinSrc}" style="height: 50px">  
  ` //вывод картирки монеты в контейнере, ее размер как вариант += для еще
*/
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc);
  coin.style.height = "50px"; // размер монеты
  coin.style.cursor = "pointer"; 
  coin.style.display = "inline-block";//перевод строчного элемента в строчно-блочный
  coin.style.position = "absolute";// монеты кладутся друг на друга
  
  changeContainer.append(coin);// прикреплять после внутри элемента changeContainer.prepend(coin) - прикреплять до*/
/*  changeContainer.after(coin); // после контейнера
  changeContainer.before(coin); // перед контейнера
  changeContainer.replace(coin); // заменяет элементы
*/    
 /* console.log(coinSrc);*/
 coin.style.top = Math.round(Math.random() * (changeContainerCoords.height- 53)) + "px"; //монетки попадают в контейнер
 coin.style.left = Math.round(Math.random() * (changeContainerCoords.width - 53)) + "px";
 coin.onclick = () => coin.remove(); //убрать, скрыть монетки в контейнере
 
 
}



