export function logExecutionTime(seconds: boolean = false) {

  let sufix = seconds ? 's' : 'ms';
  let divisor = seconds ? 1000 : 1;
  
  return function(target: any, propertyKeys: string, descriptor: PropertyDescriptor) {
    
    const originMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {

      console.log('----------------');
      let t1 = performance.now();
      const ret = originMethod.apply(this, args);
      let t2 = performance.now();
      console.log(`Method:${ propertyKeys }`);
      console.log(`Execution time:${ ((t2 - t1)/divisor) + sufix }`);
      console.log('----------------');
      return ret;
    }

    return descriptor;
  }
}