export function domInject(selector: string, all: boolean = false) {

  return function(target: any, key: string) {
    
    let element: Element;
    let elements: NodeListOf<Element>;
    
    let getter: any;

    getter = function() {
      if (all) {
        return elements || document.querySelectorAll(selector);
      } else {
        return element || document.querySelector(selector);
      }
    }

    Object.defineProperty(target, key, {
      get: getter
    });
  };
}