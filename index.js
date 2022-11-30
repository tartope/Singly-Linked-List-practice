//class making practice:
//this: when inside a constructor, this refers to individual instance of the class (so line 243, 244, or 246)

//Example 1:
class Student{
  constructor(firstName, lastName, year){
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = year;
    this.tardies = 0;
    this.scores = [];
      
  }

  //Example of instance methods:
  fullName(){
    return `Your full name is ${this.firstName} ${this.lastName}.`;
  }
  //adds to tardies method
  markLate(){
    this.tardies += 1;
    if(this.tardies >= 3){
      return 'YOU ARE EXPELLED!!'
    }
    return `${this.firstName} ${this.lastName} has been late ${this.tardies} times.`;
  }
  //adds scores method
  addScore(score){
    this.scores.push(score);
    return this.scores;
  }
  //calculate average method
  calculateAverage(){
    //sum all the scores and divide by the length of the array
    let sum = this.scores.reduce(function(a,b){return a+b});
    return Math.round(sum / this.scores.length);
  }
  
  //Example of class method using 'static' keyword:
  static enrollStudents(){
    return 'ENROLLING STUDENTS!';
  }
}

//instantiate the class:
let emil = new Student('Emil', 'Katz', 3);
emil.firstName // 'Emil'
emil.lastName  // 'Katz'
emil.grade      // 3

let firstStudent = new Student('Colt', 'Steele', 1); //Student { firstName: 'Colt', lastName: 'Steele', grade: 1 }
let secondStudent = new Student('Blue', 'Steele');  //Student { firstName: 'Blue', lastName: 'Steele', grade: undefined }
secondStudent.grade = 4; //4  So now: Student { firstName: 'Blue', lastName: 'Steele', grade: 4 }
let kitty = new Student('Kitty', 'Kat', 1);  //Student { firstName: 'Kitty', lastName: 'Kat', grade: 1 }

//method calls:
//console.log(firstStudent.fullName());   //Your full name is Colt Steele
// console.log(firstStudent.tardies);     //0
// console.log(firstStudent.markLate());  //Colt Steele has been late 1 times.
// console.log(firstStudent.markLate());  //Colt Steele has been late 2 times.
// console.log(firstStudent.markLate());  //YOU ARE EXPELLED!!

// console.log(secondStudent.scores);        //[]
// console.log(secondStudent.addScore(92));  //[ 92 ]
// console.log(secondStudent.addScore(87));  //[ 92, 87 ]
// console.log(secondStudent.scores);        //[ 92, 87 ]

// console.log(secondStudent.scores);          //[]
// console.log(secondStudent.addScore(98));    //[ 98 ]
// console.log(secondStudent.addScore(76));    //[ 98, 76 ]
// console.log(secondStudent.calculateAverage());  //87
// console.log(secondStudent.addScore(100));       //[ 98, 76, 100 ]
// console.log(secondStudent.calculateAverage());  //91  

//console.log(Student.enrollStudents());

//Example 2:
class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  //class method: static
  static distance(a, b){
    //this formula is used to determine distance between two points
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
//how to call static Point method:
//console.log(Point.distance(p1, p2));  //7.0710678118654755
//_________________________________________________________________

//Create Node, Singly Linked List, and methods for SLL:

//Creates a node structure with a value and next property
class Node{
  //construct the node object to assign key/value pairs
  constructor(value){
    this.value = value;
    //must have 'next' property in node object
    this.next = null;
  }
}
// let first = new Node('hi');
// first.next = new Node('there');
// first.next.next = new Node('how');
// first.next.next.next = new Node('are');
// first.next.next.next.next = new Node('you?');
//There is a better way to add nodes (manipulate list), as opposed to above.

//In addition to Node class, create Singly Linked List class with methods to manipulate list.

//Creates Singly Linked List structure
class SinglyLinkedList{
  //construct the SLL with head, tail, and length
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;  //not to be confused with JS length method
  }
  
  //adds node to end of SLL
  //the method accepts a value parameter
  push(value){
    //create a new node
    const newNode = new Node(value);
    //edge case: if SLL is empty (or head is null)
      //{assign newNode to head; assign head to tail}
    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    //else
      //{assign newNode to tails pointer; assign newNode to tail}  
    }else{
      this.tail.next = newNode;
      this.tail = newNode;
    }
    //increment length
    this.length++;
    return this;
  }
  
  //remove node from end of SLL
  //the method does not take parameters
  pop(){
    //edge case: if list is empty (or head is null), return undefined
    if(this.length === 0) return undefined;
    //keep track of current node
    let current = this.head;
    //keep track of the node before current node (they both start at head)
    let prev = current;
    //while current.next value is not null
    while(current.next !== null){
      //assign current node to previous (this tracker stays behind)
      prev = current;
      //assign current.next value to current (this tracker moves forward)
      current = current.next;
    }
    //assin previous to tail
    this.tail = prev;
    //assign null to tails pointer (this removes the connection from last node)
    this.tail.next = null;
    //decrement length
    this.length--;
    //after decrement, if the list becomes empty, assign head and tail to null (edge case)
    if(this.length === 0){
      this.head = null;
      this.tail = null;
    }
    //return current (removed node)
    return current;
  }
  
  //remove node from beginning of SLL
  //the method does not take parameters
  shift(){
    //if list is empty, return undefined (edgecase)
    if(this.length === 0) return undefined;
    //store (assign) head property in variable
    let oldHead = this.head;
    //assign current.next value to head 
    this.head = oldHead.next;
    //decrement length
    this.length--;
    //after decrement, if the list becomes empty, assign head and tail to null (edge case)
    if(this.length === 0){
      this.head = null;
      this.tail = null;
    }
    //return current (removed node)
    return oldHead;
  }

  //adds a node to beginning of SLL
  //the method accepts a value parameter
  unshift(value){
    //make a new node
    const newNode = new Node(value);
    //if SLL is empty (edge case)
      //{assign newNode to head; assign head to tail}
    if(this.length === 0){
      this.head = newNode;
      this.tail = this.head;
    //else
      //{assign head to newNode pointer; assign newNode to head}
    }else{
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  //Within SLL class, creates traverse list function
  traverse(){
    //start at beginning of list
    let current = this.head;
    //while there is a current (current !== null)
    while(current !== null){
      console.log(current.value);
      current = current.next;
    }
  }
  
  //get a node from a chosen position ("index") in the SLL
  //the method accepts an index parameter
  get(index){
    //edge case: if index is less than zero OR greater than/equal to length, return null
    if(index < 0 || index >= this.length) return undefined;
    //start an index counter at zero
    let counter = 0;
    //start the currentNode at head
    let currentNode = this.head;
    //as long as counter("index") is not equal to the index passed
    while(counter !== index){
      //keep traversing the currentNode through SLL
      currentNode = currentNode.next;
      //and increment the index counter
      counter++;
    }
    //return currentNode when the counter is equal to the index passed
    return currentNode;
  }

  //change the value of a node based on it's position in the SLL
  //the method accepts a position ("index") and a value to update the node at that index
  set(index, newValue){
    //use get function to find the specific node and assign it to a variable
    let foundNode = this.get(index);
    //if node is found
    if(foundNode){
      //{assign new value to found node's value and return true}
      foundNode.value = newValue;
      return true;
    }
    //if node not found, return false
    return false;
  }

  //add a node to SLL at a specific position ("index")
  //the method accepts a position ("index") and a value to add a new node at that index
  insert(index, value){
    //edge case: if index is less than zero OR greater than the length, return false
    if(index < 0 || index > this.length) return false;
    //edge case: if index is 0, unshift value to beginning of the list ('!!' changes output to boolean)
    if(index === 0) return !!this.unshift(value);
    //edge case: if index = length, push value to the end of the list ('!!' changes output to boolean)
    if(index === this.length) return !!this.push(value);
    
    //create new node
    const newNode = new Node(value);
    //grab the node that comes before the wanted index using get method
    let prevNode = this.get(index - 1);
    //grab the node that comes after the previous
    const afterNode = prevNode.next;
    //update the previous pointer to the newNode
    prevNode.next = newNode;
    //update the newNodes pointer to the holdingPointer
    newNode.next = afterNode;
    //increment length
    this.length++;
    //return true
    return true;
  }

  //removes a node from SLL at a specific position ("index")
  //the method accepts a position ("index")
  remove(index){
    //if index is less than zero OR greater than or equal to the length, return undefined
    if(index < 0 || index >= this.length) return undefined;
    //if index is 0, return shift method (returns whole node: this.shift() or returns value: this.shift.value)
    if(index === 0) return this.shift().value;
    //if index is the same as the length-1, pop method (returns whole node: this.pop() or returns value: this.shift.value)
    if(index === this.length - 1) return this.pop().value;
    
    //otherwise, use get method to access the node before the one to be removed
    let prevNode = this.get(index - 1); 
    //grab the node to be removed
    let removedNode = prevNode.next;
    //assign the removed nodes pointer to previous nodes pointer
    prevNode.next = removedNode.next;
    //decrement length
    this.length--;
    //return removedNode value
    return removedNode.value;
  }

  //reverses the list in place
  //creates 3 variables to track: next, previous, and node
  reverse(){
    //start current node at head, and use current node as temporary variable to swap head and tail
    let currentNode = this.head; 
    //assign tail to head to swap
    this.head = this.tail;
    //assign current node to tail to swap
    this.tail = currentNode;
    //create next variable to keep track of currentNode.next property (remains empty/undefined to start)
    let next;
    //assign null to previous (because tail will point to previous which is initially null)
    let prev = null;
    //loop through list with for loop (or while loop: "while(currentNode !== null)")
    for(let i = 0; i<this.length; i++){
      //assign node.next to next to keep track of currentNode.next property
      next = currentNode.next;
      //assign previous to node.next (changes pointer to previous which is null)
      currentNode.next = prev;
      //assign node to previous to move previous up one spot on the list
      prev = currentNode;
      //assign next to node to move node up one spot on the list
      currentNode = next;
    }
    //return list
    return this;
  }
  
  //prints a list in console that's easier to read
  printListArray(){
    //create empty array
    const array = [];
    //begin currentNode at head
    let currentNode = this.head;
    //while currentNode is not null (while loops used when we don't know input length)
    while(currentNode !== null){
      //push the currentNode value into empty array
      array.push(currentNode.value);
      //update currentNode to next node until currentNode is at null
      currentNode = currentNode.next;
    }
    //return the array
    return array;
  }
}

const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
// console.log(list.pop());
// console.log(list.shift());
// console.log(list.unshift(99));
// console.log(list.traverse());
// console.log(list.get(0));
// console.log(list.set(0, 'hello'));
// console.log(list.insert(1, 22));
// console.log(list.remove(2));
// console.log(list.reverse());

console.log(list);
console.log(list.printListArray());