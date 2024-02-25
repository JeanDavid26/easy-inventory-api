import { Transform } from 'class-transformer';

export function TransformDate() {
  return Transform((value: any) => {
    if (typeof value.value === 'string') {
      const date = new Date(value.value);
      return date;
    }
    return value.value;
  });
}
