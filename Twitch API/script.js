let curl = 'https://wind-bow.gomix.me/twitch-api/channels/'
let surl = 'https://wind-bow.gomix.me/twitch-api/streams/'
let url2 = '?callback=?';
let monster = 'https://wind-bow.gomix.me/twitch-api/streams/monstercat?callback=?';
let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const wrapper = $('.wrapper');
const input = $('#search');

$.getJSON(monster, data => {
  $('.result').html(`
    <li><a href="${data.stream.channel.url}"><img src="${data.stream.channel.logo}" width="40" height="40">
    <span class="name">${data.stream.channel.display_name}</span><span class="status" style="display: block">${data.stream.channel.status}</span></a><span class="online">${data.stream.viewers}<span></span></span></li>
  `)
})

let onlineArray = [];
for (let j = 0; j < channels.length; j++) {
  $.getJSON(surl+channels[j]+url2, stream=> {
      if(stream.stream) {
        onlineArray.push({
          name: stream.stream.channel.display_name,
          viewers: stream.stream.viewers
        })
      }
    }
  )
}

let dataArray = [];
for (let i = 0; i < channels.length; i++) {
  $.getJSON(curl+channels[i]+url2, data => {
    dataArray.push(data);
  })
}

setTimeout(() => {
  dataArray.forEach((data, key)=> {
        wrapper.append(`
          <li id="id${key}"style="left:${(key+1)*5}%"><a href="${data.url}"><img src="${data.logo}" width="40" height="40">
          <span class="name">${data.display_name}</span><span class="status">${data.status}</span></a></li>
        `)
      }
    )
}, 500)

setTimeout(() => {
  let elements=$('li .name');
  for (let k = 0; k < elements.length; k++) {
    onlineArray.forEach(e => {
      if (e.name === elements[k].innerText) {
        let id = $('#id'+(k-1))
        $('#id'+(k-1)+'> a > .status').css('display', 'block');
        id.append(`<span class="online">${e.viewers}<span></span></span>`)
      }
    })
  }
}, 500)

input.on('keypress', e => {
  if (e.key === 'Enter') {
    $.getJSON(surl+e.target.value+url2, data => {
      if (!data.stream) {
        $('.result').html(`
          <li><span class="name">The channel does not exist or is currently offline!</span></li>
        `)
      } else {
        $('.result').html(`
          <li><a href="${data.stream.channel.url}"><img src="${data.stream.channel.logo}" width="40" height="40">
          <span class="name">${data.stream.channel.display_name}</span><span class="status" style="display: block">${data.stream.channel.status}</span></a><span class="online">${data.stream.viewers}<span></span></span></li>
        `)
      }
    })
  }
})