/*------------ Stuff for clicking social icons 

$("#footer span.social").each(function () {
  var url, title;

  url = $(location).attr("href");
  title = $(document).find("title").text();

  if ( $(this).hasId("facebook") ) {
    $(this).wrap("<a href="https://www.facebook.com/sharer.php?u=" + encodeURI(url) + "&t=" + encodeURI(title) + "" target="_blank"></a>");
    return;
  }

  if ( $(this).hasId("twitter") ) {
    $(this).wrap("<a href="https://twitter.com/share?url=" + encodeURI(url) + "" target="_blank"></a>");
    return;
  }

  if ( $(this).hasId("linkedin") ) {
    $(this).wrap("<a href="http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURI(url) + "&title=" + encodeURI(title) + "" target="_blank"></a>");
    return;
  }
});
--------------------- */
