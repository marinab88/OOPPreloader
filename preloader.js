// Base Preloader
//Abstract class

class BasePreloader {
  constructor(rootDiv) {
    this.rootDiv = rootDiv;
    //class specific logic <<<<
    this.init();
    this.onload();
  }

  onload() {
    this.timerId = setInterval(() => {
      this.step();
      if (this.condition()) {
        clearInterval(this.timerId);
      }
      this.rootDiv.innerHTML = this.render();
    }, this.speed()); 
  }

  //HW10: using set/get and the encapsulation principle, make it so the "timerId" property can be set only inside the class (any of the classes), but so it can be ONLY READ from the outside code
  get timer() {
    return this.timerId;
  }
  set timer(i) {
    this.timerId = i;
  }
    //HW4:  Improve the init() + onload() methods, so both descendant classes can use different "speed" of animation

  //abstract methods
  init() {}

  condition() {
    //HW7:  it will indirectly "check" if the descendant implemented the "condition" logic
    throw new ReferenceError("You must implement the condition() method inside the inheriting class");
  }

  step() {
      throw new ReferenceError("You must implement the step() method inside the inheriting class");
  }

  render() {
    throw new ReferenceError("You must implement the render() method inside the inheriting class");
  }

  speed() {
    throw new ReferenceError("You must implement the speed() method inside the inheriting class");
  }
}

//HW8: Run the modified code and explain what happens, explain detailed: what is "throw", why we used new ReferenceError and not simply Error? What is ReferenceError?
//Answer: 
// * It is "throw" a RefferenceError.
// * The ReferenceError object represents an error when a variable that doesn't exist (or hasn't yet been initialized) in the current scope is referenced.

//HW9: Apply the same "pattern" to the other abstract methods that have to be checked for implementation inside the descending classes


// progress like preloader component
// [ 5% ] 
class ProgressPreloader extends BasePreloader{
  constructor(rootDiv) {
    super(rootDiv);
  }

  init() {
    this.progress = 0;
  }

  // onload() {
  //   this.timerId = setInterval(() => {
  //     this.progress += 10;
  //     if (this.progress >= 100) {
  //       this.progress = 100;
  //       clearInterval(this.timerId);
  //     }
  //     this.rootDiv.innerHTML = `[ ${this.progress}%]`;
  //   }, 500); 
  // }

  //overriding methods
  condition() { 
    return this.progress >= 100;
  }
  step() {
    this.progress += 10;
    // this.progress = 100;
  }
  render() {
    return `[ ${this.progress}% ]`;
  }
  speed() {
    return 500;
  }
}


class CircularPreloader extends BasePreloader{
  constructor(rootDiv) {
    super(rootDiv);
  } 

  init() {
    this.duration = 3000;
    this.frames = ['|', '/', '--', '\\']; 
    // '\\' -JS String Character Escaping
  }
 
  // onload() {
  //   this.timerId = setInterval(() => {
  //     this.duration -= 250;
  //     if (this.duration <= 0) {
  //       clearInterval(this.timerId);
  //     }
  //     //round shift
  //     let frame = this.frames.shift();
  //     this.frames.push(frame);
  //     // console.log(this.frames.join(' '));
  //     this.rootDiv.innerHTML = `[ ${frame} ]`;
  //   }, 500); 
  // }

  condition() {
    return this.duration <= 0;
  }
  step() {
    this.duration -= 250;
     //round shift
      // let frame = this.frames.shift();
      // this.frames.push(frame);

      //HW2: change the way the frames are "shifted", this time from the back to the beginning
      let frame = this.frames.pop();
      this.frames.unshift(frame);

      //HW3: another way to "iterate" the frames without using: push, pop, unshift, or shift
      // this.frames.forEach((item, index, frame) => {
      //   item = frame[index];
      //   console.log(item);
      // });
  }
  render() {
    return `[ ${this.frames[0]} ]`;
  }
  speed() {
    return 250;
  }
}


//HW5: Add another class called IncompletePreloader (named this way because you are not going to provide all the methods required ),
// this class should be an exact copy of the ProgressPreloader class, but you have to remove the "condition" method definition from it

class IncompletePreloader extends BasePreloader {
  constructor(rootDiv) {
    super(rootDiv);
  }

  init() {
    this.progress = 0;
  }

  step() {
    this.progress += 10;
  }

  render() {
    return `[ ${this.progress}% ]`;
  }

  speed() {
    return 500;
  }
}
//HW6:  Start a preloader of this type and check it's behaviour, what changed? why? - explain in details!
// Answer: it didn't stop at 100%, because we don't have the stop condition


//////////////////////////
let pp = new ProgressPreloader(window["prel-1"]);
// console.log(pp1);
let cp = new CircularPreloader(window["prel-2"]);
// console.log(pp2);

// let ip = new IncompletePreloader(window["prel-3"]);

