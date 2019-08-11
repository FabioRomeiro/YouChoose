export function throttle(milliseconds: number = 500) {

  
  return function (target: any, propertyKeys: string, descriptor: PropertyDescriptor) {
    
    const originMethod = descriptor.value;
    let timer = 0;

    descriptor.value = function (...args: any[]) {

      if (event)
        event.preventDefault();

      clearTimeout(timer);
      timer = setTimeout(() => originMethod.apply(this, args), milliseconds)
    }

    return descriptor;
  }
}