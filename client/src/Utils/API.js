import axios from 'axios';

export default {
  getPosts: function() {
    return axios.get('/api/articles');
  },
  scrape: function() {
    return axios.get('/api/scrape');
  },
  postNote: function(articleID) {
    return axios.post('/api/notes/' + articleID);
  },
  toggleStory: function(articleID) {
    return axios.get('/api/toggleStory/' + articleID);
  },
  deleteNote: function(noteID) {
    return axios.delete('/api/notes/' + noteID);
  }
};
