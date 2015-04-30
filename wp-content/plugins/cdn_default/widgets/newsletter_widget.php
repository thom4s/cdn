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


<!-- Begin MailChimp Signup Form -->



        <form role="submit" class="newsletter-form" action="//theatre-sartrouville.us7.list-manage.com/subscribe/post?u=4a5e4efadc8e630b346c84ac7&amp;id=d94ba939fa" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>

          <input type="email" value="" name="EMAIL"  id="mce-EMAIL" class="required email-field" placeholder="<?php echo esc_attr_x( 'hello@mon-email.com', 'placeholder' ) ?>" />

          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;"><input type="text" name="b_4a5e4efadc8e630b346c84ac7_d94ba939fa" tabindex="-1" value=""></div>

          <input type="submit" class="newsletter-submit" name="subscribe" id="mc-embedded-subscribe"  value="<?php echo esc_attr_x( 'Soumettre', 'submit button' ) ?>" />
        </form>


    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text'; /*
     * Translated default messages for the $ validation plugin.
     * Locale: FR
     */
    $.extend($.validator.messages, {
            required: "Ce champ est requis.",
            remote: "Veuillez remplir ce champ pour continuer.",
            email: "Veuillez entrer une adresse email valide.",
    });}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    <!--End mc_embed_signup-->


     <?php
      echo $after_widget;

    }
     
}
?>