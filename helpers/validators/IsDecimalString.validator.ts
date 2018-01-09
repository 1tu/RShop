import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDecimalString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDecimalString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && !isNaN(parseFloat(value));
        },
        defaultMessage(args: ValidationArguments) {
          return '($value) is not decimal number';
        }
      }
    });
  };
}
