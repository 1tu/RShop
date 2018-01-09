export function enum2arr($enum) {
  const arr = [];
  for (let key in $enum) {
    const index = $enum[key];
    if (!isNaN(parseInt(index))) arr.push(index);
  }
  return arr;
}
