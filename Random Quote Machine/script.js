let author;
$(document).ready(() => {
  getQuote();
});

function getQuote(){
    
  let url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="+Math.round(Math.random()*1000)+1;
  $.getJSON(url, data => {
    author = data[0].title;
    $(".quote").html(data[0].content);
    $(".author").html(data[0].title);
  });
}

$("#twitter").on('click', () => {
  let quote = $(".quote > p").text();
  quote = quote.replace(/[&\/\\#+()$~%'":*?<>{}]/g,' ');
  window.open("https://twitter.com/intent/tweet?text="+ '\"' + quote + '\" -' + author);
});

$("#newQuote").on('click', () => {
  getQuote();
});
