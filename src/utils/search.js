export function textSearch() {
  function wrapTextInTextNode(textNode, searchText, wrapBlank) {
    let textContent = textNode.textContent;
    let lowerTextContent = textContent.toLocaleLowerCase();
    let resNodes = [];
    let beginIndex = 0;
    while (true) {
      let index = lowerTextContent.indexOf(searchText, beginIndex);
      if (index === -1) break;

      let prevText = textContent.slice(beginIndex, index);
      if (prevText.length > 0) resNodes.push(document.createTextNode(prevText));

      let elem = wrapBlank.cloneNode(false);
      elem.textContent = textContent.slice(index, index + searchText.length);
      resNodes.push(elem);

      beginIndex = index + searchText.length;
    }
    if (beginIndex === 0) return resNodes;
    let prevText = textContent.slice(beginIndex);
    if (prevText.length > 0) resNodes.push(document.createTextNode(prevText));
    return resNodes;
  }

  function wrapTextNodes(elementNode, searchText, wrapBlank) {
    let childNodes = Array.from(elementNode.childNodes);
    for (let child of childNodes)
      switch (child.nodeType) {
        case Node.TEXT_NODE:
          let nodesArr = wrapTextInTextNode(child, searchText, wrapBlank);
          if (nodesArr.length === 0) break;
          let prev = child;
          for (let node of nodesArr) {
            prev.after(node);
            prev = node;
          }
          child.remove();
          break;
        case Node.ELEMENT_NODE:
          wrapTextNodes(child, searchText, wrapBlank);
          break;
      }
  }

  function unwrapTextNodes(elementNode, wrapBlank) {
    let wrappedNodes = elementNode.querySelectorAll("." + wrapBlank.className);
    for (let i = 0; i < wrappedNodes.length; ++i) {
      let prevNode = wrappedNodes[i].previousSibling;
      let nextNode = wrappedNodes[i].nextSibling;

      let textNode = document.createTextNode(wrappedNodes[i].textContent);
      wrappedNodes[i].replaceWith(textNode);

      if (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
        prevNode.textContent += textNode.textContent;
        textNode.remove();
        textNode = prevNode;
      }
      if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
        textNode.textContent += nextNode.textContent;
        nextNode.remove();
      }
    }
  }

  const wrapBlank = document.createElement("span"); //Заготовка для оборачивания результатов поиска
  wrapBlank.className = "found-result"; //Класс для идентификации результатов поиска.

  // const searchBlock = document.getElementById("search-block");
  const searchBlock = document.body;
  const controlInputText = document.getElementById("search");

  controlInputText.addEventListener("input", handlerInputText);
  handlerInputText();

  function handlerInputText() {
    unwrapTextNodes(searchBlock, wrapBlank);

    let searchText = controlInputText.value.trim().toLocaleLowerCase();
    if (searchText.length > 0) {
      wrapTextNodes(searchBlock, searchText, wrapBlank);
    }
  }
}
