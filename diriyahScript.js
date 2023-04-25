let myVideo = document.getElementById("myVideo");
let playbackSpeed = 1;
let testCrash = 6000;
const testButton = document.getElementById("testButton");
const raceStartTime = 2340;
const raceStartUTC = new Date('2023-01-27T17:03:00.000Z');
const raceStartMilli = raceStartUTC.getTime();
let intervalId = null;

myVideo.addEventListener('play', () => {
  let tweets = [];

  fetch('diriyahTwitter.json')
    .then(response => response.json())
    .then(data => {
      tweets = data;
    });
    

  myVideo.addEventListener('timeupdate', () => {
    const currentTime = myVideo.currentTime;
    const currentSecond = Math.floor(currentTime);
    const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    const tweetsInCurrentTimeframe = tweets.filter(tweet => {
      const timestamp = new Date(tweet.created_at);
      const timestampMilli = timestamp.getTime();
      const timestampRelativeToRaceStart = (timestampMilli - raceStartMilli) + (raceStartTime * 1000);
      const tweetTime = Math.floor(timestampRelativeToRaceStart / 1000);

      return tweetTime >= currentSecond && tweetTime < currentSecond + 20;
    });
    
    tweetsInCurrentTimeframe.forEach(tweet => {
        const row = table.insertRow();
        const userCell = row.insertCell();
        const textCell = row.insertCell();
        const retweetsCell = row.insertCell();
        const favoritesCell = row.insertCell();
        const urlCell = row.insertCell();

        userCell.innerHTML = tweet.user.screen_name;
        textCell.innerHTML = tweet.full_text;
        retweetsCell.innerHTML = tweet.retweet_count;
        favoritesCell.innerHTML = tweet.favorite_count;
        urlCell.innerHTML = '<a href=' + tweet.url + ' target="_blank">Link to Site</a>';
      });
  });
  
  intervalId = setInterval(() => {
    console.log('The video is still playing');
  }, 20000);
});



// Add an event listener to detect when the video has stopped playing
myVideo.addEventListener('pause', () => {
  // Clear the interval so it stops running
  clearInterval(intervalId);
});

function playVideo() {
  myVideo.play();
}

function pauseVideo() {
  myVideo.pause();
}

function fastForward() {
  myVideo.currentTime += 5;
}

function rewind() {
  myVideo.currentTime -= 5;
}



function raceStart(){
 myVideo.currentTime = raceStartTime;
}

function topPosts(){
  clearInterval(intervalId);

  fetch('diriyahTwitter.json')
.then(response => response.json())
.then(data => {
  const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
  table.innerHTML = '';
  data.forEach(tweet => {
    if(tweet.favorite_count > 200 ){
    const row = table.insertRow();
    const userCell = row.insertCell();
    const textCell = row.insertCell();
    const retweetsCell = row.insertCell();
    const favoritesCell = row.insertCell();
    //const mediaCell = row.insertCell();
    const urlCell = row.insertCell();

    userCell.innerHTML = tweet.user.screen_name;
    textCell.innerHTML = tweet.full_text;
    retweetsCell.innerHTML = tweet.retweet_count;
    favoritesCell.innerHTML = tweet.favorite_count;
    //mediaCell.innerHTML = '<a href=' + tweet.urls.media.media_url + '> Link to Media </a>';
    urlCell.innerHTML = '<a href=' + tweet.url + ' target="_blank"> Link to Site </a>';
    }

  });
});


}

function timeStamp(timestamp)
    {
      const videoTime = ((timestamp/1000) - (raceStartMilli/1000)  )  + raceStartTime;
      myVideo.currentTime = videoTime;
       console.log(timestamp + '------' +  raceStartMilli + '++++++++' + raceStartTime + '======' + videoTime);
    }

    function sortTableLikes() {
      var table = document.getElementById("twitter-posts");
      var tbody = table.getElementsByTagName("tbody")[0];
      var rows = tbody.getElementsByTagName("tr");
      var sortArrow = table.querySelector(".sort-arrow");
  
      // If this is the first click, add a sort arrow to the header
      if (!sortArrow) {
        sortArrow = document.createElement("span");
        sortArrow.classList.add("sort-arrow");
        table.getElementsByTagName("th")[3].appendChild(sortArrow);
      }
  
      // Toggle the sort direction
      var sortOrder = sortArrow.classList.contains("asc") ?  "asc" : "desc" ;
      sortArrow.classList.toggle("asc", sortOrder === "asc");
      sortArrow.classList.toggle("d-none", false);
  
      // Sort the rows by likes
      var sortedRows = Array.from(rows);
      sortedRows.sort(function(rowA, rowB) {
        var likesA = parseInt(rowA.getElementsByTagName("td")[3].textContent);
        var likesB = parseInt(rowB.getElementsByTagName("td")[3].textContent);
        return sortOrder === "asc" ? likesA - likesB : likesB - likesA;
      });
  
      // Clear the existing rows from the table
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
  
      // Add the sorted rows back to the table
      sortedRows.forEach(function(row) {
        tbody.appendChild(row);
      });
    }

    function sortTableRetweets() {
      var table = document.getElementById("twitter-posts");
      var tbody = table.getElementsByTagName("tbody")[0];
      var rows = tbody.getElementsByTagName("tr");
      var sortArrow = table.querySelector(".sort-arrow");
  
      // If this is the first click, add a sort arrow to the header
      if (!sortArrow) {
        sortArrow = document.createElement("span");
        sortArrow.classList.add("sort-arrow");
        table.getElementsByTagName("th")[2].appendChild(sortArrow);
      }
  
      // Toggle the sort direction
      var sortOrder = sortArrow.classList.contains("asc") ?  "asc" : "desc" ;
      sortArrow.classList.toggle("asc", sortOrder === "asc");
      sortArrow.classList.toggle("d-none", false);
  
      // Sort the rows by retweets
      var sortedRows = Array.from(rows);
      sortedRows.sort(function(rowA, rowB) {
        var retweetsA = parseInt(rowA.getElementsByTagName("td")[2].textContent);
        var retweetsB = parseInt(rowB.getElementsByTagName("td")[2].textContent);
        return sortOrder === "asc" ? retweetsA - retweetsB : retweetsB - retweetsA;
      });

      
  
      // Clear the existing rows from the table
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
  
      // Add the sorted rows back to the table
      sortedRows.forEach(function(row) {
        tbody.appendChild(row);
      });
    }

    function sortTableUpvotes() {
      var table = document.getElementById("reddit-posts");
      var tbody = table.getElementsByTagName("tbody")[0];
      var rows = tbody.getElementsByTagName("tr");
      var sortArrow = table.querySelector(".sort-arrow");
  
      // If this is the first click, add a sort arrow to the header
      if (!sortArrow) {
        sortArrow = document.createElement("span");
        sortArrow.classList.add("sort-arrow");
        table.getElementsByTagName("th")[1].appendChild(sortArrow);
      }
  
      // Toggle the sort direction
      var sortOrder = sortArrow.classList.contains("asc") ?  "asc" : "desc" ;
      sortArrow.classList.toggle("asc", sortOrder === "asc");
      sortArrow.classList.toggle("d-none", false);
  
      // Sort the rows by retweets
      var sortedRows = Array.from(rows);
      sortedRows.sort(function(rowA, rowB) {
        var retweetsA = parseInt(rowA.getElementsByTagName("td")[1].textContent);
        var retweetsB = parseInt(rowB.getElementsByTagName("td")[1].textContent);
        return sortOrder === "asc" ? retweetsA - retweetsB : retweetsB - retweetsA;
      });

      
  
      // Clear the existing rows from the table
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
  
      // Add the sorted rows back to the table
      sortedRows.forEach(function(row) {
        tbody.appendChild(row);
      });
    }


fetch('diriyahTwitter.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    const startDate = new Date('2023-01-27T00:00:00.000Z');
    const endDate = new Date('2023-01-28T00:00:00.000Z');


    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.created_at);

      // Check if the timestamp falls within the desired time range
      if (timestamp >= startDate && timestamp < endDate) {
        console.log('Timestamp within range:', timestamp);

        // Round the minuteSpan down to the nearest minuteSpan
        const minuteSpan = Math.floor(timestamp.getTime() / 60000) * 60000;

        // Increase the count for this minuteSpan
        if (!counts[minuteSpan]) {
          console.log('Adding new minuteSpan:', minuteSpan);
          counts[minuteSpan] = {
            count: 1,
            name: [item.user.screen_name],
            text: [item.full_text],
            date: [item.created_at],
            retweets: [item.retweet_count],
            likes: [item.favorite_count],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing minuteSpan:', minuteSpan);
          counts[minuteSpan].count++;
          counts[minuteSpan].name.push(item.user.screen_name);
          counts[minuteSpan].text.push(item.full_text);
          counts[minuteSpan].date.push(item.created_at);
          counts[minuteSpan].retweets.push(item.retweet_count);
          counts[minuteSpan].likes.push(item.favorite_count);
          counts[minuteSpan].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const minuteSpan in counts) {
      if (counts[minuteSpan].count > 9) {

        console.log('minuteSpan with more than 4 counts:', minuteSpan);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');;
        
       
        button.textContent = 'High Twitter Activity at ' + counts[minuteSpan].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((minuteSpan/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + minuteSpan);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';


          for (let i = 0; i < counts[minuteSpan].count; i++) {
          const row = table.insertRow();
          const userCell = row.insertCell();
          const textCell = row.insertCell();
          
          const retweetsCell = row.insertCell();
          const favoritesCell = row.insertCell();
          //const mediaCell = row.insertCell();
          const urlCell = row.insertCell();

          userCell.innerHTML = counts[minuteSpan].name[i];
          textCell.innerHTML = counts[minuteSpan].text[i];
          
          retweetsCell.innerHTML = counts[minuteSpan].retweets[i];
          favoritesCell.innerHTML = counts[minuteSpan].likes[i];
          //mediaCell.innerHTML = '<a href=' + tweet.urls.media.media_url + '> Link to Media </a>';
          urlCell.innerHTML = '<a href=' + counts[minuteSpan].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahReddit.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    const startDate = new Date('2023-01-27T00:00:00.000Z');
    const endDate = new Date('2023-01-28T00:00:00.000Z');


    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.createdAt);

      // Check if the timestamp falls within the desired time range
      if (timestamp >= startDate && timestamp < endDate) {
        console.log('Timestamp within range:', timestamp);

        // Round the minuteSpan down to the nearest minuteSpan
        const minuteSpan = Math.floor(timestamp.getTime() / 60000) * 60000;

         // Increase the count for this minuteSpan
         if (!counts[minuteSpan]) {
          console.log('Adding new minuteSpan:', minuteSpan);
          counts[minuteSpan] = { 
            count: 1,
            text: [item.body],
            date: [item.createdAt],
            upvotes: [item.upVotes],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing minuteSpan:', minuteSpan);
          counts[minuteSpan].count++;
          counts[minuteSpan].text.push(item.body);
          counts[minuteSpan].date.push(item.createdAt);
          counts[minuteSpan].upvotes.push(item.upVotes);
          counts[minuteSpan].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const minuteSpan in counts) {
      if (counts[minuteSpan].count > 9) {

        console.log('minuteSpan with more than 1 counts:', minuteSpan);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
        

        button.textContent = 'High Reddit Activity ' + counts[minuteSpan].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((minuteSpan/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + minuteSpan);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';
          const tableR = document.getElementById('reddit-posts').getElementsByTagName('tbody')[0];
          tableR.innerHTML = '';


          for (let i = 0; i < counts[minuteSpan].count; i++) {
          const row = tableR.insertRow();
          const textCell = row.insertCell();
          
          const upvotesCell = row.insertCell();
          const urlCell = row.insertCell();

          textCell.innerHTML = counts[minuteSpan].text[i];
          
          upvotesCell.innerHTML = counts[minuteSpan].upvotes[i];
          urlCell.innerHTML = '<a href=' + counts[minuteSpan].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahTwitter.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    const startDate = new Date('2023-01-27T00:00:00.000Z');
    const endDate = new Date('2023-01-28T00:00:00.000Z');
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.created_at);
      // Check if the timestamp falls within the desired time range
      if (/\bcrash\b/.test(item.full_text) || /\bincident\b/.test(item.full_text) || /\bsafety car\b/.test(item.full_text) || /\baccident\b/.test(item.full_text) || /\bspin\b/.test(item.full_text) || /\byellow flag\b/.test(item.full_text)){

        console.log('Item contains crash:' + item.full_text);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 180000) * 180000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = { 
            count: 1,
            name: [item.user.screen_name],
            text: [item.full_text],
            date: [item.created_at],
            retweets: [item.retweet_count],
            likes: [item.favorite_count],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].name.push(item.user.screen_name);
          counts[fiveMinWindow].text.push(item.full_text);
          counts[fiveMinWindow].date.push(item.created_at);
          counts[fiveMinWindow].retweets.push(item.retweet_count);
          counts[fiveMinWindow].likes.push(item.favorite_count);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 9) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
        
          button.textContent = 'Crash at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = table.insertRow();
          const userCell = row.insertCell();
          const textCell = row.insertCell();
          
          const retweetsCell = row.insertCell();
          const favoritesCell = row.insertCell();
          //const mediaCell = row.insertCell();
          const urlCell = row.insertCell();

          userCell.innerHTML = counts[fiveMinWindow].name[i];
          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          retweetsCell.innerHTML = counts[fiveMinWindow].retweets[i];
          favoritesCell.innerHTML = counts[fiveMinWindow].likes[i];
          //mediaCell.innerHTML = '<a href=' + tweet.urls.media.media_url + '> Link to Media </a>';
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahReddit.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    const startDate = new Date('2023-01-27T00:00:00.000Z');
    const endDate = new Date('2023-01-28T00:00:00.000Z');
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.createdAt);
      // Check if the timestamp falls within the desired time range
      if (/\bcrash\b/.test(item.body) || /\bincident\b/.test(item.body) || /\bsafety car\b/.test(item.body) || /\baccident\b/.test(item.body) || /\bspin\b/.test(item.body) || /\byellow flag\b/.test(item.body)){

        console.log('Item contains crash:' + item.body);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 180000) * 180000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = { 
            count: 1,
            text: [item.body],
            date: [item.createdAt],
            upvotes: [item.upVotes],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].text.push(item.body);
          counts[fiveMinWindow].date.push(item.createdAt);
          counts[fiveMinWindow].upvotes.push(item.upVotes);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 2) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
        

        button.textContent = 'Crash at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';
          const tableR = document.getElementById('reddit-posts').getElementsByTagName('tbody')[0];
          tableR.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = tableR.insertRow();
          const textCell = row.insertCell();
          
          const upvotesCell = row.insertCell();
          const urlCell = row.insertCell();

          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          upvotesCell.innerHTML = counts[fiveMinWindow].upvotes[i];
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahTwitter.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.created_at);
      // Check if the timestamp falls within the desired time range
      if (/\bovertake\b/.test(item.full_text) || /\bovertakes\b/.test(item.full_text) || /\bwhat a move\b/.test(item.full_text) || /\bpast\b/.test(item.full_text)){

        console.log('Item contains overtake:' + item.full_text);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 300000) * 300000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = {
            count: 1,
            name: [item.user.screen_name],
            text: [item.full_text],
            date: [item.created_at],
            retweets: [item.retweet_count],
            likes: [item.favorite_count],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].name.push(item.user.screen_name);
          counts[fiveMinWindow].text.push(item.full_text);
          counts[fiveMinWindow].date.push(item.created_at);
          counts[fiveMinWindow].retweets.push(item.retweet_count);
          counts[fiveMinWindow].likes.push(item.favorite_count);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 0) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
     
          button.textContent = 'Overtake at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = table.insertRow();
          const userCell = row.insertCell();
          const textCell = row.insertCell();
          
          const retweetsCell = row.insertCell();
          const favoritesCell = row.insertCell();
          //const mediaCell = row.insertCell();
          const urlCell = row.insertCell();

          userCell.innerHTML = counts[fiveMinWindow].name[i];
          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          retweetsCell.innerHTML = counts[fiveMinWindow].retweets[i];
          favoritesCell.innerHTML = counts[fiveMinWindow].likes[i];
          //mediaCell.innerHTML = '<a href=' + tweet.urls.media.media_url + '> Link to Media </a>';
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahReddit.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.createdAt);
      // Check if the timestamp falls within the desired time range
      if (/\bovertake\b/.test(item.body) || /\bovertakes\b/.test(item.body) || /\bwhat a move\b/.test(item.body) || /\bpast\b/.test(item.body)){

        console.log('Item contains crash:' + item.body);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 180000) * 180000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = { 
            count: 1,
            text: [item.body],
            date: [item.createdAt],
            upvotes: [item.upVotes],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].text.push(item.body);
          counts[fiveMinWindow].date.push(item.createdAt);
          counts[fiveMinWindow].upvotes.push(item.upVotes);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 1) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
        

        button.textContent = 'Crash at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {
          myVideo.pause();

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';
          const tableR = document.getElementById('reddit-posts').getElementsByTagName('tbody')[0];
          tableR.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = tableR.insertRow();
          const textCell = row.insertCell();
          
          const upvotesCell = row.insertCell();
          const urlCell = row.insertCell();

          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          upvotesCell.innerHTML = counts[fiveMinWindow].upvotes[i];
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + ' target="_blank"> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  /*
  fetch('diriyahTwitter.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.created_at);
      // Check if the timestamp falls within the desired time range
      if (/\bTeam Radio\b/.test(item.full_text) || /\bradio\b/.test(item.full_text) || /\bteam radio\b/.test(item.full_text)){

        console.log('Item contains radio:' + item.full_text);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 300000) * 300000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = {
            count: 1,
            name: [item.user.screen_name],
            text: [item.full_text],
            date: [item.created_at],
            retweets: [item.retweet_count],
            likes: [item.favorite_count],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].name.push(item.user.screen_name);
          counts[fiveMinWindow].text.push(item.full_text);
          counts[fiveMinWindow].date.push(item.created_at);
          counts[fiveMinWindow].retweets.push(item.retweet_count);
          counts[fiveMinWindow].likes.push(item.favorite_count);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 0) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
     
          button.textContent = 'Team Radio at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = table.insertRow();
          const userCell = row.insertCell();
          const textCell = row.insertCell();
          
          const retweetsCell = row.insertCell();
          const favoritesCell = row.insertCell();
          //const mediaCell = row.insertCell();
          const urlCell = row.insertCell();

          userCell.innerHTML = counts[fiveMinWindow].name[i];
          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          retweetsCell.innerHTML = counts[fiveMinWindow].retweets[i];
          favoritesCell.innerHTML = counts[fiveMinWindow].likes[i];
          //mediaCell.innerHTML = '<a href=' + tweet.urls.media.media_url + '> Link to Media </a>';
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + '> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });

  fetch('diriyahReddit.json')
  .then(response => response.json())
  .then(data => {

    // Create an object to store the counts and the associated text
    const counts = {};
    // Loop through the data
    for (const item of data) {
      // Get the created_at timestamp and convert it to a Date object
      const timestamp = new Date(item.createdAt);
      // Check if the timestamp falls within the desired time range
      if (/\bTeam Radio\b/.test(item.body) || /\bradio\b/.test(item.body) || /\bteam radio\b/.test(item.body)){

        console.log('Item contains radio:' + item.body);

        // Round the fiveMinWindow down to the nearest fiveMinWindow
        const fiveMinWindow = Math.floor(timestamp.getTime() / 180000) * 180000;

        // Increase the count for this fiveMinWindow
        if (!counts[fiveMinWindow]) {
          console.log('Adding new fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow] = { 
            count: 1,
            text: [item.body],
            date: [item.createdAt],
            upvotes: [item.upVotes],
            url: [item.url],
            timestamp: [timestamp]
          };
        } else {
          console.log('Updating existing fiveMinWindow:', fiveMinWindow);
          counts[fiveMinWindow].count++;
          counts[fiveMinWindow].text.push(item.body);
          counts[fiveMinWindow].date.push(item.createdAt);
          counts[fiveMinWindow].upvotes.push(item.upVotes);
          counts[fiveMinWindow].url.push(item.url);
        }
      }
    }

    // Output the counts and associated text
    for (const fiveMinWindow in counts) {
      if (counts[fiveMinWindow].count > 0) {

        console.log('fiveMinWindow with more than 1 counts:', fiveMinWindow);
        const buttonContainer = document.getElementById("added-buttons");
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-2');
        

        button.textContent = 'Team radio at ' + counts[fiveMinWindow].timestamp;
    
        
        button.addEventListener('click', () => {

          const videoTime = ((fiveMinWindow/1000) - (raceStartMilli/1000))  + raceStartTime;
          console.log(videoTime + '------' + raceStartMilli + '------' + fiveMinWindow);
          myVideo.currentTime = videoTime;

          const table = document.getElementById('twitter-posts').getElementsByTagName('tbody')[0];
          table.innerHTML = '';
          const tableR = document.getElementById('reddit-posts').getElementsByTagName('tbody')[0];
          tableR.innerHTML = '';


          for (let i = 0; i < counts[fiveMinWindow].count; i++) {
          const row = tableR.insertRow();
          const textCell = row.insertCell();
          
          const upvotesCell = row.insertCell();
          const urlCell = row.insertCell();

          textCell.innerHTML = counts[fiveMinWindow].text[i];
          
          upvotesCell.innerHTML = counts[fiveMinWindow].upvotes[i];
          urlCell.innerHTML = '<a href=' + counts[fiveMinWindow].url[i] + '> Link to Site </a>';
          }
        });
        buttonContainer.appendChild(button);
      }
    }
  });
  */

