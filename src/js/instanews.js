$(function() {
    $('#select-menu').selectric();

    $('select').on('change', function() {
        event.preventDefault();

        //Change header
        $('header').removeClass("head-large").addClass("head-small");
        $('img').removeClass("logo-large").addClass("logo-small");

        //Loader
        $('.news-articles').empty();
        $('.loading').show();

        var option = $('.option-menu').val();


        $.ajax({
                method: 'GET',
                url: `https://api.nytimes.com/svc/topstories/v2/${option}.json?api-key=59dd0b6bd5454e248e4e6b674fa66548`,
            })
            .done(function(data) {

                if (data.results.length === 0) {
                    $('.news-').append('<p>Sorry, nothing found. Please try another section.</p>');
                } else {
                	let nytData = data.results.filter(function(item) {
                        return item.multimedia.length;
                    }).splice(0, 12)
                    .forEach(function(item, index) {
                        $('.news-articles').append(`
                          <a href="${item.url}">
                            <div class="all-articles article-${index}">
                              <div class="text-${index} text-content">
                                <a href="${item.url}" class="text"> ${item.abstract} </a>
                              </div>
                            </div>
                          </a>`);

                        let img = item.multimedia[4];
                        $('.article-' + index).css('background-image', `url("${img.url}")`);

                        $('.text-'+index).hide();
                        $('.article-'+index).hover(function() {
                            $('.text-'+index).slideToggle('slow', function() {});
                    });
                  });
                }

            }).always(function() {
                $('.loading').hide();
            });
    });
});