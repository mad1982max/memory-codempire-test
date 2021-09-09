export const classHelper = {

 manipulationIfNotContain: function (baseClass, notContainedClass, whatClass, action) {
  const actionFn = this.defineAction(action);
  const allElements = [...document.querySelectorAll(`.${baseClass}`)];

  console.log(baseClass, notContainedClass, whatClass, action);
  console.log(allElements);
  allElements.forEach(item => {
   if (!item.classList.contains(notContainedClass)) {
    actionFn(item, whatClass)
   }
  })
 },

 manipulation: function (baseClass, whatClass, action) {
  const allElements = [...document.querySelectorAll(`.${baseClass}`)];

  const actionFn = this.defineAction(action);
  allElements.forEach(item => actionFn(item, whatClass));
 },

 defineAction: function (type) {
  let actionFn;

  if (type === 'add') {
   actionFn = (item, whatClass) => item.classList.add(...whatClass);
  } else {
   actionFn = (item, whatClass) => item.classList.remove(...whatClass);
  }
  return actionFn;
 }
}
