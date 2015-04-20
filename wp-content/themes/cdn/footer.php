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

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'cdn' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'cdn' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'cdn' ), 'cdn', '<a href="http://thomasflorentin.net" rel="designer">Thomas Florentin</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,200italic,300,300italic,900italic,900,700italic,700,600italic,600,400italic|Roboto+Slab:400,700,300,100' rel='stylesheet' type='text/css'>

</body>
</html>
