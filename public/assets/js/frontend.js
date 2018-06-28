$(document).ready(function() {

  $(document).on('click', '.action-save', function (event) {
    event.preventDefault();
    console.log('clicked save ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/togglestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })

  // DRY this up later
  $(document).on('click', '.action-unsave', function (event) {
    event.preventDefault();
    console.log('clicked unsave ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/togglestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })

  $(document).on('click', '.action-deletenote', function (event) {
    event.preventDefault();
   
    $.ajax({
      method: "POST",
      url: "/api/deletenote",
      data: $(this).data()
    })
    .then((data) => {
      console.log(data);
      $(this).parent().remove();
    } )
    
  });

  $(document).on('submit', 'form.note-form', function(event) {
    event.preventDefault();

    let tempNote = {
      // not just the first note-text field
      noteText: $(this).find('input[name=note-text]').val().trim(),
      articleID: $(this).find('input[name=article-id]').val()
    }

    $.ajax({
      method: "POST",
      url: "/api/article/" + tempNote.articleID,
      data: tempNote
    })
    .then((data) => {
      console.log(data);
      location.reload();
      // $(this).parent().remove();
    } )

  });

});