const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  constructor() {
    //  Holds the current state of a given key
    this.keyStates = new Map();
    //  Holds the callback function for a keycode
    this.keyMap = new Map();
  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    // Did not have key mapped
    if (!this.keyMap.has(keyCode)) {
      return;
    }

    event.preventDefault();
    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    // Only register changes
    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    // console.log("KeyCode: ", keyCode);
    // console.log("KeyState: ", keyState);
    // Execute callback
    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}
