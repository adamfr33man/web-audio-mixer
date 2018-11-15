const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;
const audioPath = 'audio';

// Setup directories to serve statically
app.use(express.static('public'));
app.use('/audio', express.static(audioPath));

app.get('/songs', async (req, res) => {
  let songs = [];

  fs.readdir(audioPath, async (err, items) => {
    console.log(songs);
 
    for (var i = 0; i < items.length; i++) {
      let song = items[i];
      let tracks = await getTracks(song);
      songs.push({
        name: song,
        tracks: tracks
      });
    }

    res.send(JSON.stringify(songs));
  });
});


async function getTracks(song) {
  return new Promise( (resolve, reject) => {
    let tracks = [];
    fs.readdir(`${audioPath}/${song}`, function(err, items) {
      if(err) {
        reject(err);
      }
      console.log(items);
   
      for (var i=0; i<items.length; i++) {
        tracks.push(`${song}/${items[i]}`);
      }
  
      resolve(tracks);
    });
  });  
}

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));