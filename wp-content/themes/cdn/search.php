<?php
/**
 * The template for displaying search results pages.
 *
 * @package cdn
 */



get_header(); ?>

	<section id="primary" class="content-area content-results">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) : ?>

			<header class="entry-header row content-part ">
				<div class="entry-header-inner l-12col l-first l-1col-push">

					<h1 class="entry-title"><?php printf( __( 'Votre recherche : %s', 'cdn' ), '<span><em>' . get_search_query() . '</em></span>' ); ?></h1>

				</div><!-- .entry-header-inner -->
			</header><!-- .entry-header -->

<?php 

	$last_type="";
	$typecount = 0;
	while (have_posts()){
    the_post();
    if ($last_type != $post->post_type){
        $typecount = $typecount + 1;
        if ($typecount > 1){
            echo '</div>'; //close type container
        }
        // save the post type.
        $last_type = $post->post_type;
        //open type container
        switch ($post->post_type) {
            case 'post':
                echo '<div class="l-1col-push l-11col l-first title-underline-red"><h2>Informations</h2><div class="line-dotted"></div></div><div id="grid" class="content-part row cards-list" data-columns>';
                break;
            case 'page':
                echo '<div class="l-1col-push l-11col l-first title-underline-red"><h2>Pages</h2><div class="line-dotted"></div></div><div id="grid" class="content-part row cards-list" data-columns>';
                break;
            case 'event':
                echo '<div class="l-1col-push l-11col l-first title-underline-red"><h2>Evénements</h2><div class="line-dotted"></div></div><div id="grid" class="content-part row cards-list" data-columns>';
                break;
        }
    } 
    get_template_part( 'content', 'search' );
  } ?>

  	</div>
  
    <?php 

        cdn_posts_navigation(); 

		else : ?>

			<?php get_template_part( 'content', 'none' ); ?>

		<?php endif; ?>

		</main><!-- #main -->
	</section><!-- #primary -->

<?php get_footer(); ?>
