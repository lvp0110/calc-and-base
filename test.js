const obj = {
  arr: [1, 2, 3],
  fn: function (a, b) {
    console.log(this.arr);
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

example[0].number + example[1][0][0].number2

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
const date = '18.04.1982';

const day = () => {}
const month = () => {}
const year = () => {}