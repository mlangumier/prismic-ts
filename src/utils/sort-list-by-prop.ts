export function sortListByProp(list: any[], prop: string) {
  return list.sort((a, b) => a[prop].localeCompare(b[prop]));
}
