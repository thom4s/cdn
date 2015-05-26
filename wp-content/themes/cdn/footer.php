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

        <div class=" s-12col s-1col-push s-first m-6col m-last l-4col l-last footer-infos-third">
          <?php dynamic_sidebar( 'footer-3' ); ?>
        </div> 

      </div><!-- .footer-infos-inner -->
    </div><!-- .footer-infos -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,200italic,900italic,900,700italic,700,400italic|Roboto+Slab:400,700' rel='stylesheet' type='text/css'>

</body>
</html>
