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
obj.fn.apply({}, [1, 2]);

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

fn()
