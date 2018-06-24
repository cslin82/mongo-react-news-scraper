$(document).ready(function() {

  $(document).on('click', '.action-save', function (event) {
    event.preventDefault();
    console.log('clicked save ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/savestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })

  // DRY this up later
  $(document).on('click', '.action-unsave', function (event) {
    event.preventDefault();
    console.log('clicked unsave ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/unsavestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })

  $(document).on('click', '.action-deletenote', function (event) {
    event.preventDefault();
    // console.log('clicked deletenote ' + '\narticleId:' + $(this).parents().data('articleId') +
    // '\nnoteId:' + $(this).data('noteId')
   
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
  // $("form").submit(function (event) {
  // $("form").submit(function (event) {
    event.preventDefault();

    let tempNote = {
      // not just the first note-text field
      noteText: $('#note-text').val().trim(),
      articleID: $('#article-id').val()
    }

    console.log(tempNote);

    $.post("/api/article/" + tempNote.articleID, tempNote), function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    };

  });
  // /api/deletenote

  // $('.action-scrape').on('click', function (event) {
  //   event.preventDefault();
  //   console.log('clicked scrape');
    
  // })


});