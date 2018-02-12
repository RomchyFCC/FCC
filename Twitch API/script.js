let curl = 'https://wind-bow.gomix.me/twitch-api/channels/'
let surl = 'https://wind-bow.gomix.me/twitch-api/streams/'
let url2 = '?callback=?';
let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const wrapper = $('.wrapper');
/*$.getJSON(url, data => {
  wrapper.append(`
  <ul>
    <li><a href="${data.url}"><img src="${data.logo}" width="50" height="50"><span class="name">${data.display_name}</span><span class="status">${data.status}</span></a></li>
  </ul>
  `);
  console.log(data.display_name)
  console.log(data.logo)
  console.log(data.status)
  console.log(data.url)
});*/
//$('document').ready(()=> {
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
          <li style="left:${[key]*5}%"><a href="${data.url}"><img src="${data.logo}" width="40" height="40">
          <span class="name">${data.display_name}</span><span class="status">${data.status}</span></a></li>
        `)
      }
    )
}, 900)
//});


/*
channels: 
data.status -> ime streama
data.display_name -> name of the channel
data.logo -> pic of the channel
data.url -> direct link to the channel

streams: 
data.stream.viewers
*/