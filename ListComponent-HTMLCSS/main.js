const elements = document.querySelectorAll('.list li a');

elements.forEach(element => {
  element.addEventListener('click', (event) => {
      event.preventDefault();
     elements.forEach(el => el.classList.remove('active'));
      event.target.classList.add('active');
  })
})