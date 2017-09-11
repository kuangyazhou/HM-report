/**
 * 获取元素的高度, 包括边距, 边框.
 */
export function outerHeight (elm) {
  let height = elm && elm.offsetHeight
  const style = elm && window.getComputedStyle(elm)
  if (elm) {
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
    return height
  }
  return 0
}

// 获得当前视口的高度.
// 改高度不包含滚动条的高度.
export function getViewportHeight () {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}
