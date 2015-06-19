(function() {

   // Colonnes
   tinymce.create('tinymce.plugins.colonne', {
      init : function(ed, url) {
         ed.addButton('colonne', {
            title : 'Ajouter une colonne',
            image : url+'/column.png',
            onclick : function() {
               var column = prompt("Nombre de colonnes", "1");
               var align = prompt("Alignement", "gauche");
               var menu = prompt("menu", "");

               if (align !== null && align !== ''){
                  if (column !== null && column !== '')
                     ed.execCommand('mceInsertContent', false, '[colonne nombre="'+column+'" alignement="'+align+'" menu="'+menu+'"] Ajouter votre contenu ici [/colonne]');
                  else
                     ed.execCommand('mceInsertContent', false, '[colonne] Ajouter votre contenu ici [/colonne]');
               }
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "Colonnes",
            author : 'Thomas Florentin',
            authorurl : 'http://www.thomasflorentin.net',
            version : "1.0"
         };
      }
   });
   tinymce.PluginManager.add('colonne', tinymce.plugins.colonne);


   // Custom Title
   tinymce.create('tinymce.plugins.mytitle', {
      init : function(ed, url) {
         ed.addButton('mytitle', {
            title : 'Ajouter un titre',
            image : url+'/mytitle.png',
            onclick : function() {
               var myTitle = prompt("Titre", "En lien avec...");
               var color = prompt("Couleur", "gray");

               if (myTitle !== null && myTitle !== ''){
                  ed.execCommand('mceInsertContent', false, '[une_partie titre="'+myTitle+'" couleur="'+color+'"]');
               }
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "Custom Title",
            author : 'Thomas Florentin',
            authorurl : 'http://www.thomasflorentin.net',
            version : "1.0"
         };
      }
   });
   tinymce.PluginManager.add('mytitle', tinymce.plugins.mytitle);



})();
