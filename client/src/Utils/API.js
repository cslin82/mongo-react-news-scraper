import axios from 'axios';

export default {
  getPosts: function() {
    return axios.get('/api/articles');
  },
  getOnePost: function(id) {
    return axios.get('/api/articles/' + id);
  },
  scrape: function() {
    return axios.get('/api/scrape');
  },
  postNote: function(noteData) {
    return axios.post('/api/notes', noteData);
  },
  toggleStory: function(articleId) {
    return axios.put('/api/articles/' + articleId);
  },
  deleteNote: function(noteId) {
    return axios.delete('/api/notes/' + noteId);
  },
  echo: function(whateverdata) {
    console.log(whateverdata);
    return axios.post('/api/echo', whateverdata);
  }
};
