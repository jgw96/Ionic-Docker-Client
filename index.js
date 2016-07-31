const express = require('express');
const bodyParser = require('body-parser');
const Docker = require('dockerode');
const cors = require('cors');

const app = express();
const docker = new Docker();

app.use(cors());
app.use(express.static('public/www'));

app.use(bodyParser.json());

app.get('/allContainers', (req, res) => {
  docker.listContainers({ all: true }, (err, containers) => {
    if (err) {
      console.error(err);
    } else {
      res.send(containers);
      res.end();
    }
  });
});

app.get('/allImages', (req, res) => {
  docker.listImages({all: true}, (err, images) => {
    if (err) {
      console.error(err);
    } else {
      res.send(images);
      res.end();
    }
  });
})

app.post('/containerInfo', (req, res) => {
  console.log(req.body);
  let container = docker.getContainer(req.body.id);
  container.inspect((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data);
      res.end();
    }
  });
});

app.post('/startContainer', (req, res) => {
  let container = docker.getContainer(req.body.id);
  container.start((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/stopContainer', (req, res) => {
  let container = docker.getContainer(req.body.id);
  container.stop((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.post('/removeContainer', (req, res) => {
  let container = docker.getContainer(req.body.id);
  container.remove((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.post('/createContainer', (req, res) => {
  let options = {
    Image: req.body.image,
    Cmd: req.body.command,
    Name: req.body.name
  };
  
  docker.createContainer(options, (err, container) => {
    if (err) {
      console.error(err);
    } else {
      console.log(container);
      res.send(container);
      res.end();
    }
  });
});

app.post('/getImage', (req, res) => {
  let image = docker.getImage(req.body.id);
  image.inspect((err, data) => {
    if (err) {
      consol.error(err);
    } else {
      res.send(data);
      res.end();
    }
  });
});

app.post('/removeImage', (req, res) => {
  let image = docker.getImage(req.body.id);
  image.remove((err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/pullImage', (req, res) => {
  docker.pull(req.body.image, (err, stream) => {
    stream.pipe(res);
  });
});

app.listen('8000', () => {
  console.log('listening on port 8000');
});