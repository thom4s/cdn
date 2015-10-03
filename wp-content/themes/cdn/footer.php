<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package cdn
 */
?>

  	</div><!-- #content -->
  </div><!-- .main-col -->



	<footer id="colophon" class="site-footer plain" role="contentinfo">

		<div class="footer-contacts">
      <div class="footer-contacts-inner wrap row">

        <?php dynamic_sidebar( 'upper-footer' ); ?>

      </div>
		</div><!-- .site-contacts -->

    <div class="footer-infos">
      <div class="footer-info-inner wrap row">

        <div class="s-12col s-1col-push m-4col s-first l-4col footer-infos-first ">
          <?php dynamic_sidebar( 'footer-1' ); ?>
        </div> 

        <div class=" s-12col s-1col-push s-first m-6col m-1col-push l-7col l-1col-push footer-infos-second">
          <?php dynamic_sidebar( 'footer-2' ); ?>
        </div> 

        <div class=" s-12col s-1col-push s-first m-6col m-last l-5col l-last footer-infos-third">
          <?php dynamic_sidebar( 'footer-3' ); ?>
        </div> 

      </div><!-- .footer-infos-inner -->
    </div><!-- .footer-infos -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>


<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,200italic,900italic,900,700italic,700,400italic|Roboto+Slab:400,700' rel='stylesheet' type='text/css'>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63808747-1', 'auto');
  ga('send', 'pageview');

</script>

</body>
</html>
