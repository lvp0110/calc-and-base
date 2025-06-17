const obj = {
  arr: [1, 2, 3],
  fn: function (a, b) {
    // console.log(this.arr);
  },
};

// obj.fn.apply
// obj.fn.bind

obj.fn(); // [1, 2, 3]
obj.fn.call({}, 1, 2); // undefined
obj.fn.call({ arr: [1] }); // [1]
obj.fn.apply({}, [1, 2]); // undefined

const todo = {
  list: [],
  add: function (item) {
    this.list.push(item);
  },
};

const app = [
  { 1: [] },
  {
    arr: [
      {
        test: 213,
        fn: function () {
          this.test;
        },
      },
    ],
  },
];

app[1].arr[0].fn();

const app2 = {
  arr: [
    [
      {
        arr2: [function () {}],
      },
    ],
  ],
};

app2['arr'][0][0]['arr2'][0]()

const path = (obj, path) => {

}

const fn = path(app2, ['arr', 0, 0, 'arr2', 0])


const example = [
  {
    number: 0,
  },
  [
    [
      {
        number2: 1
      }
    ]
  ]
]

console.log(`rezult:${example[0].number + example[1][0][0].number2}`);

const str = "123"
const srt2 = "qwerty"

"123_qwerty"

str + "_" + srt2
// `${str}_${srt2}`
str.concat("_", srt2)

str.startsWith("12")
str.endsWith("23")
str.includes("2")

srt2.toLowerCase().includes("W".toLowerCase())

str.replace("23", "32")

const firstLetterUppercase = (value) => {
  return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()
}

const search = (value, query) => {
  return value.toLowerCase().includes(query.toLowerCase())
}

const sum = (a, b) => {
    return a + b
}

const pow = (a, b) => {
    return a * b
}
// node test.js
const date = '10.4.1982';

const day = (value) => {
    return value.slice(0, 2)
}

const month = (value) => {
    return value.slice(3, 5) 
}

const year = (value) => {
    return value.slice(6)
}

// console.log(month(date));
// console.log(day(date));
// console.log(year(date));

const data = date.split(".")

const d = new Date(1748877266)

// console.log(d.getDate());
// console.log(d.getMonth());
// console.log(d.getFullYear());

// const formatter = Intl.DateTimeFormat('ru-RU').format()

const a = 1
const b = "1"

String(a) === b

const o = []
const o2 = o

// o === o2 // true
// ({}) === ({}) // false
// ([]) === ([]) // false
// null === null // true

typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof null // "object"  (2)

typeof Date // "object"  (1)
typeof {} // "object"  (1)
typeof [] // "object"  (1)
typeof month // "function"  (3)


const arr = [{ value: 2 }, { value: 4 }, { value: 6 }] // 3

arr.forEach((item, index) => {
    // console.log(item);
})

const res = arr.map((item) => {
  const newItem = item.value + 2

  return newItem
})
const el = arr.find((item) => item.value % 2 === 0)
const everyResult = arr.every((item) => item.value % 2 === 0)
const stringArray = res.join(", ").split(", ")

const arr1 = [1, 2, 3]


// => [2, 3, 1] (мутации массива)
// => сумму всех значений arr (reduce)
// => добавить ко всем значениям +2 (for)
// => преобразовать массив со строками в массив с числами
