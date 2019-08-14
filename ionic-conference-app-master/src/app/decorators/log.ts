export function log(): MethodDecorator {
    return function(target: Function, key: string, descriptor: any) {

      const originalMethod = descriptor.value;

      descriptor.value =  function (...args: any[]) {

        console.log(`Entering ${key} method`);
        const result = originalMethod.apply(this, args);

        return result;
      };

      return descriptor;
    };
  }
