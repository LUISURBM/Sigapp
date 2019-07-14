export function log (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
    return {
        value: function( ... args: any[]) {
            console.log(descriptor.value.name,'::', args.join(", "));
            const result = descriptor.value.apply(target, args);
            return result;
        }
    }
};