let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=';
let randomUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&origin=*';
const wrapper = $('.wrapper');


$('img').on('click', () => {
  $.getJSON(randomUrl, data => {
    let site = 'https://en.wikipedia.org/wiki/'+data.query.random[0].title;
    window.open(site);
  });
})

$('input').on('keypress', (e)=> {
  if (e.key === 'Enter') {
    $('.image-search').css({marginTop: '0'});
    $('img').attr('width', '100');
    $('img').attr('height', '100');
    $.getJSON(url+e.target.value, data => {
      wrapper.html('<ul>');
      for (let key in data.query.pages) {
        wrapper.append('<li><a href="https://en.wikipedia.org/?curid=' + data.query.pages[key].pageid+ '">'   + data.query.pages[key].title + '</a></li>');
      }
      wrapper.append('</ul>');
    });
  }
  
})
