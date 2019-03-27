# Современный JS

---
## Деструктуризация
Синтаксис присваивания, при котором можно присвоить массив или объект сразу нескольким переменным

---
## Деструктуризация. Массив
```js
let [firstName, lastName] = ["Антонио", "Бандерос"];

alert(firstName); // Антонио
alert(lastName);  // Бандерос
```
---
## Оператор «spread»
Можно добавить ещё один параметр, который получит «всё остальное», при помощи оператора "..." («spread»):

```js
let [firstName, lastName, ...rest] 
	= "Юлий Цезарь Император Рима".split(" ");

alert(firstName); // Юлий
alert(lastName);  // Цезарь
alert(rest);      // Император,Рима (массив из 2х элементов)
```

---
## Как ещё это может работать
Более мощный литерал массива
```js
var parts = ['shoulders', 'knees']; 
var lyrics = ['head', ...parts, 'and', 'toes']; 
// ["head", "shoulders", "knees", "and", "toes"]
```
Копирование массива (не подходить для копирования многоразмерных массивов)
```js
var arr2 = [...arr]; // like arr.slice()
```
Лучший способ конкатенации массивов
```js
arr1 = [...arr1, ...arr2]; // like arr1 = arr1.concat(arr2);
```
---
## Значения по умолчанию
Если значений в массиве меньше, чем переменных - присвоится undefined:
```js
let [firstName, lastName] = [];

alert(firstName); // undefined
```
Можно задать значение по умолчанию
```js
let [firstName="Гость", lastName="Анонимный"] = [];

alert(firstName); // Гость
alert(lastName);  // Анонимный
```
Или c выражением
```js
let [firstName, lastName=defaultLastName()] = ["Вася"];
```

---
## Деструктуризация объекта
Можно деструктуризовать как по текущим именам, так и присвоив новое имя используя "двоеточие" `:`
```js
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

let {width: w, height: h, title} = options;

alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200
```
---
## Деструктуризация объекта
Если каких-то свойств в объекте нет, можно указать значение по умолчанию через знак равенства `=`
```js
let options = {
  title: "Меню"
};

let {width=100, height=200, title} = options;
```

Можно сочетать одновременно присвоение нового имени и значение по умолчанию
```js
let options = {
  title: "Меню"
};

let {width:w=100, height:h=200, title} = options;
```

---
## Rest/Spread операторы для объекта (ES9)

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```
- Поверхностное копирование (без прототипа)
- Или объединение объектов

---
## Где почитать подробнее
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
- https://javascript.info/destructuring-assignment

---
# Arrow functions

Два фактора добавления стрелочных функций: 
- более короткий синтаксис 
- отсутствие this.

---
## Arrow functions have no “this”
Стрелочные функции не имеют `this`, если `this` запрашивается, тогда оно берётся из вне.
```js
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```
Обычная функция выдала бы ошибку.
`The error occurs because forEach runs functions with this=undefined by default`

---
## Ещё
- Стрелочная функция не может быть вызвана с `new` (как конструктор)
- Arrow functions VS bind
Стрелочная функция не создаёт привязки, как `bind`. Она просто не имеет `this`
При обращении к `this` его поиск происходит как для обычной переменной: во внешнем  lexical environment.
- Стрелочная функция не имеет “arguments”
- Стрелочная функция также не имеет super

---
## Где почитать подробнее
- https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://javascript.info/arrow-functions

---
# Шаблонные строки

Шаблонными строками называются строки, допускающие использование выражений внутри

Основные отличия:
- многострочные литералы
```js
`строка текста 1
 строка текста 2`
```
- строковая интерполяцию
```js
`строка текста ${выражение} строка текста`
```
---

## Теговые шаблоны (Tagged templates)
Расширенной формой шаблонных строк являются теговые шаблоны. Они позволяют разбирать шаблонные строки с помощью функции. Первый аргумент такой функции содержит массив строк, а остальные содержат выражения из подстановок.

```js
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {
  var str0 = strings[0]; // "That "
  var str1 = strings[1]; // " is a "

  // Some logic
  
  return `${str0}${personExp}${str1}${ageStr}`;
}

var output = myTag`That ${ person } is a ${ age }`;
```
Функция тега не обязана возвращать строку

---
## Теговые шаблоны. Есть проблема с Unicode.

Проблема теговых шаблонов: следуя грамматике ECMAScript, анализатор кода, найдя символ \, будет искать корректное представление символа Unicode, но может не найти его вовсе.
```js
latex`\unicode`
// В старых версиях ECMAScript (ES2016 и раньше) выкинет исключение:
// SyntaxError: malformed Unicode character escape sequence
```
В ECMAScript 2016 теговые шаблоны следуют правилам:

- символы Unicode, начинающиеся с "\u", например, \u00A9
- точки кода Unicode, начинающиеся с "\u{}", например, \u{2F804}
- шестнадцатеричные представления символов, начинающиеся с "\x", например, \xA9
- восьмеричные представления символов, начинающиеся с "\", например, \251​​​​​​

---
## Теговые шаблоны. Raw strings - решение проблемы
Специальное свойство `raw`, доступное для первого аргумента тегового шаблона, позволяет получить строку в том виде, в каком она была введена, без экранирования.
```js
function tag(strings) {
  return strings.raw[0];
}

tag`string text line 1 \\n string text line 2`;
// выводит "string text line 1 \\n string text line 2",
// включая 'n' и два символа '\'
```
- Cуществует метод `String.raw()`, возвращающий точно такую же исходную строку, какую вернула бы функция шаблонной строки без экранирования.
```js
var str = String.raw`Hi\n${2+3}!`;
// "Hi\n5!"
```

---
## Где почитать подробнее
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals