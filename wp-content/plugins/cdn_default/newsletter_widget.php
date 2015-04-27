<?php
class Newsletter_Widget extends WP_Widget {
     
    function __construct() {

      parent::__construct(
           
          // base ID of the widget
          'newsletter_submission',
           
          // name of the widget
          __('Inscription à la Newsletter', 'cdn' ),
           
          // widget options
          array (
              'description' => __( '', 'cdn' )
          )
           
      );


    }
     
    function form( $instance ) {

      $defaults = array(
          'title' => 'Newsletter'
      );
      $title = $instance[ 'title' ];
       
      // markup for form ?>
      <p>
          <label for="<?php echo $this->get_field_id( 'title' ); ?>">Titre :</label>
          <input class="widefat" type="text" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>">
      </p>
               
  <?php

    }
     
    function update( $new_instance, $old_instance ) { 

        $instance = $old_instance;
        $instance[ 'title' ] = strip_tags( $new_instance[ 'title' ] );
        return $instance;


    }
     
    function widget( $args, $instance ) {
         
      extract( $args );
      echo $before_widget;        
      echo $before_title . $instance[ 'title' ] . $after_title; ?>

        <form role="submit" method="get" class="newsletter-form" action="<?php echo home_url( '/' ); ?>">
          <input type="email" class="email-field" placeholder="<?php echo esc_attr_x( 'hello@mon-email.com', 'placeholder' ) ?>" value="<?php echo get_search_query() ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
          <input type="submit" class="newsletter-submit" value="<?php echo esc_attr_x( 'Soumettre', 'submit button' ) ?>" />
        </form>

     <?php
      echo $after_widget;

    }
     
}
?>