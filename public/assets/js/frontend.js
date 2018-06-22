$(document).ready(function() {

  $(document).on('click', '.action-save', function (event) {
    event.preventDefault();
    console.log('clicked save ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/savestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })

  $(document).on('click', '.action-unsave', function (event) {
    event.preventDefault();
    console.log('clicked unsave ' + $(this).data('articleId'));
    
    $.ajax({
      url: '/api/unsavestory/' + $(this).data('articleId'),
      success: () => location.reload(),
    });
  })



  // $('.action-scrape').on('click', function (event) {
  //   event.preventDefault();
  //   console.log('clicked scrape');
    
  // })


});