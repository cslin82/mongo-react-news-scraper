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
    console.log($(this).data());
    console.log($(this).parent().data());
    
  });

  // /api/deletenote

  // $('.action-scrape').on('click', function (event) {
  //   event.preventDefault();
  //   console.log('clicked scrape');
    
  // })


});