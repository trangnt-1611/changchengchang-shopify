var products_on_page = $('.products-on-page');
var next_url = products_on_page.data('next-url');
var load_more_btn = $('.load-more__btn');
var load_more_spinner = $('.load-more__spinner');
var isPreviousEventComplete = true
var isDataAvailable = true;

$(window).scroll(function() {
   if($(window).scrollTop() >= $('.products-on-page').offset().top + $('.products-on-page').outerHeight() - window.innerHeight) {
     if (isPreviousEventComplete && isDataAvailable) {
        isPreviousEventComplete = false;
       
        $.ajax({
            url: next_url,
            type: 'GET',
            dataType: 'html',
            beforeSend: function() {
              load_more_btn.hide();
              load_more_spinner.show();
            }
          }).done(function (next_page) {
            load_more_spinner.hide();
            var new_products = $(next_page).find('.products-on-page');
            var new_url = new_products.data('next-url');
            if (new_url) {
              load_more_btn.show();
            } else {
              isDataAvailable = false;
            }
            next_url = new_url;
            products_on_page.append(new_products.html());
            isPreviousEventComplete = true;
          });
     }
   }
});