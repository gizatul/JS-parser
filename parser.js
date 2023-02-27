window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  let textNodes = []; // создаем массив для сбора данных

  function recursy(element) {
    element.childNodes.forEach(node => {
      if (node.nodeName.match(/^H\d/)) { //ищем те случаи когда начало строки начинается на H и продолжается какой-то цифрой d - это пример, можем указать свое условие
        const obj = {
          header: node.nodeName,
          content: node.textContent.trim(), //trim - удаляет пробелы в начале и в конце
        };
        textNodes.push(obj); //в массив textNodes пушим содержание .textContent наших nodes
      } else {
        recursy(node);
      }
    });
  } 
  recursy(body);
  console.log(textNodes);
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(textNodes),
  })
  .then(res => res.json())
  .then(json => console.log(json));
});
