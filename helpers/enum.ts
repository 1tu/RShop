export function enum2arr($enum) {
  const arr = [];
  for (let key in $enum) arr.push(key);
  return arr;
}
