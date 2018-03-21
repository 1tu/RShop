import { values } from 'lodash';

export function serverValidationErrorMessage(message: any[]) {
  return message.map(m => values(m.constraints).join(', ')).join(', ');
}
