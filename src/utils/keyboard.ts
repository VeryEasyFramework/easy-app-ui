import {onBeforeUnmount, onMounted} from "vue";

const isControlPressed = (event: KeyboardEvent | MouseEvent): boolean => {
   return event.getModifierState("Control") || event.metaKey;
};
const onControlS = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "s") {
         e.preventDefault();
         callback();
      }
   }
};
const onControlEnter = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "Enter") {
         e.preventDefault();
         callback();
      }
   }
};
const onControlA = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "a") {
         e.preventDefault();
         callback();
      }
   }
};

const onControlN = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "n") {
         e.preventDefault();
         callback();
      }
   }
};
const onEnter = (e: KeyboardEvent, callback: () => void) => {
   if (e.key === "Enter") {
      e.preventDefault();
      callback();
   }
};
const onEscape = (e: KeyboardEvent, callback: () => void) => {
   if (e.key === "Escape") {
      e.preventDefault();
      callback();
   }
};
const onControlZ = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "z") {
         e.preventDefault();
         callback();
      }
   }
};
const onControlK = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "k") {
         e.preventDefault();
         callback();
      }
   }
};

const onCopy = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "c") {
         e.preventDefault();
         callback();
      }
   }
};

const onPaste = (e: KeyboardEvent, callback: () => void) => {
   if (isControlPressed(e)) {
      if (e.key === "v") {
         e.preventDefault();
         callback();
      }
   }
};

type KeyPressCallback = {
   (e: KeyboardEvent): void;
}


const listenForKeyPress = (
   callback: KeyPressCallback,
   el?: HTMLElement | HTMLFormElement,
) => {
   const cb = callback as EventListener;
   onMounted(() => {
      el
         ? el.addEventListener("keydown", cb)
         : document.addEventListener("keydown", cb);
   });
   onBeforeUnmount(() => {
      el
         ? el.removeEventListener("keydown", cb)
         : document.removeEventListener("keydown", cb);
   });
};

export {
   onControlS,
   isControlPressed,
   listenForKeyPress,
   onControlA,
   onControlN,
   onEscape,
   onEnter,
   onControlZ,
   onControlK,
   onControlEnter,
   onCopy,
   onPaste
};
