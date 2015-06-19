(function() {
   tinymce.create('tinymce.plugins.colonne', {
      init : function(ed, url) {
         ed.addButton('colonne', {
            title : 'Ajouter une colonne',
            image : url+'/recentpostsbutton.png',
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
})();
