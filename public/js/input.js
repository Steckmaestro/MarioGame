import Keyboard from "./KeyboardState.js";

export function setupKeyboard(mario) {
  const input = new Keyboard();
  input.addMapping("KeyW", keyState => {
    if (keyState === 1) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });
  input.addMapping("KeyP", keyState => {
    mario.turbo(keyState);
  });
  input.addMapping("KeyD", keyState => {
    mario.go.direction += keyState ? 1 : -1;
  });
  input.addMapping("KeyA", keyState => {
    mario.go.direction += keyState ? -1 : 1;
  });
  input.listenTo(window);
}
