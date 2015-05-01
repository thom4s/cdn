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

        <div class="footer-infos-first l-4col">
          <?php dynamic_sidebar( 'footer-1' ); ?>
        </div> 

        <div class="footer-infos-second l-7col l-1col-push">
          <?php dynamic_sidebar( 'footer-2' ); ?>
        </div> 

        <div class="footer-infos-third l-3col l-last">
          <?php dynamic_sidebar( 'footer-3' ); ?>
        </div> 

      </div><!-- .footer-infos-inner -->
    </div><!-- .footer-infos -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,200italic,300,300italic,900italic,900,700italic,700,600italic,600,400italic|Roboto+Slab:400,700,300,100' rel='stylesheet' type='text/css'>

</body>
</html>
