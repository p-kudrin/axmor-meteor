var fs = Meteor.npmRequire('fs');

Router.route('/uploads/:file', {
  where: 'server',
  action: function() {
    var e, file, filepath;
    try {
      filepath = Meteor.getUploadFilePath(this.params.file);
      file = fs.readFileSync(filepath);
      this.response.writeHead(200, {
        'Content-Type': 'image/jpg'
      });
      return this.response.end(file, 'binary');
    } catch (_error) {
      e = _error;
      this.response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      return this.response.end('404. Not found.');
    }
  }
});