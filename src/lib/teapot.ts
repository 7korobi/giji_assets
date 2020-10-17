export function chrImgChange(
  target: HTMLImageElement,
  select: HTMLSelectElement,
  prefix: string,
  csid: string,
  postfix: string
) {
  var i = select.selectedIndex
  var value = select.options[i].value + postfix
  var path = prefix + value.replace(csid, '')
  target.src = path
}
