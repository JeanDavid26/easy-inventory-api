import { Transform } from 'class-transformer';

export function TransformNumber() {
  return Transform((value: any) => {
    if (typeof value.value === 'string') {
      return parseFloat(value.value);
    }
    return value.value;
  });
}
