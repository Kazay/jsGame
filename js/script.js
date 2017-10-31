$(document).ready(function() {

  function init() {
    // Verifie que la key gameState n'existe pas dans le local storage
    if(localStorage.getItem('gameState') == null) {
      // Attribue la valeur optionScreen a la key gameState pour afficher la page d'options
      localStorage.setItem('gameState', 'optionScreen');
      // Affiche la page d'options
      displayScreen(localStorage.getItem('gameState'));
    } else {
      if(localStorage.getItem('gameState') == "playScreen") {
        generateGame();
      }
      // Affiche la page correspondante à la valeur stockée a la key gameState
      displayScreen(localStorage.getItem('gameState'));
    }
  }

  function generateGame() {
    // Transforme la string stockée dans le local storage en objet pour récupérer l'axe X
    var baseX = JSON.parse(localStorage.getItem('gameAxes')).x;
    // Transforme la string stockée dans le local storage en objet pour récupérer l'axe Y
    var baseY = JSON.parse(localStorage.getItem('gameAxes')).y;
    var playScreen = $('section[data-state="playScreen"]');
    var html = "<div style='width:" + baseX * 40 + "px' class='gameContainer'>";
    for (var y = 1; y <= baseY; y++) {
      for (var x = 1; x <= baseX; x++) {
        html += "<div data-x='" + x + "' data-y='" + y + "' class='gameDiv'></div>";
      }
    }
    html += "</div>";
    $(playScreen).html(html);
    insertObjects();
  }

  function insertObjects() {
    if(localStorage.getItem('playerPos') == null) {
      var pos = {
        "x" : 1,
        "y" : 1
      };
      localStorage.setItem('playerPos', JSON.stringify(pos));
    };
    if(localStorage.getItem('goalPos') == null) {
      var pos = {
        "x" : JSON.parse(localStorage.getItem('gameAxes')).x,
        "y" : JSON.parse(localStorage.getItem('gameAxes')).y
      };
      localStorage.setItem('goalPos', JSON.stringify(pos));
    };
    $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/corgi.gif">');
    $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('goalPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('goalPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/cake.gif">');
    $('body').on('keydown', function(e){
      if (e.keyCode == 38/* UP */) {
        movePlayer('UP');
      }
      else if (e.keyCode == 40/* DOWN */) {
        movePlayer('DOWN');
      }
      else if (e.keyCode == 37/* LEFT */) {
        movePlayer('LEFT');
      }
      else if (e.keyCode == 39/* RIGHT */) {
        movePlayer('RIGHT');
      }
    });
  }

  function checkVictory(currentPlayerPos) {
    if((currentPlayerPos.x == JSON.parse(localStorage.getItem('goalPos')).x) && (currentPlayerPos.y == JSON.parse(localStorage.getItem('goalPos')).y)) {
      displayScreen('victory');
      localStorage.setItem('gameState', 'victory');
    }
  }

  function movePlayer(direction) {
    var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos'));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if (direction == "UP"/* UP */) {
      if((currentPlayerPos.y - 1) > 0) {
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('');
        currentPlayerPos.y -= 1;
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkVictory(currentPlayerPos);
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/corgi.gif">');
      } else {
      }
    }
    else if (direction == "DOWN"/* DOWN */) {
      if((currentPlayerPos.y + 1) <= (gameSize.y)) {
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('');
        currentPlayerPos.y += 1;
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkVictory(currentPlayerPos);
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/corgi.gif">');
      } else {
      }
    }
    else if (direction == "LEFT"/* LEFT */) {
      if((currentPlayerPos.x - 1) > 0) {
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('');
        currentPlayerPos.x -= 1;
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkVictory(currentPlayerPos);
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/corgi.gif">');
      } else {
      }
    }
    else if (direction == "RIGHT"/* RIGHT */) {
      if((currentPlayerPos.x + 1) <= (gameSize.x)) {
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('');
        currentPlayerPos.x += 1;
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkVictory(currentPlayerPos);
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('playerPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('playerPos')).y + '"]').html('<img style="width:100%;height:100%;" src="../img/corgi.gif">');
      } else {
      }
    }
  }

  function displayScreen(gameState) {
    // Ajoute la classe hidden à toutes les sections avec dont le data-state != gameState passé dans la fonction
    $.each($('section[data-state!="' + gameState + '"]'), function(key, value) {
      $(this).addClass('hidden');
    });
    // Supprime la classe hidden à toutes les sections dont le data-state = gameState passé dans la fonction
    $('section[data-state="' + gameState + '"]').removeClass('hidden');
  }

  // Listener sur le bouton startGame
  $('button[data-action="startGame"]').on('click', function () {
    // Copie la valeur de l'input X dans une variable baseX
    var baseX = $('input[name="x"]').val();
    // Copie la valeur de l'input Y dans une variable baseY
    var baseY = $('input[name="y"]').val();
    // Si une des valeurs est vide
    if(baseX == "" || baseY == "") {
      // Affiche une alerte
      alert('Erreur de valeur X ou Y');
    } else {
      // Sinon, ajoute ces valeurs dans un objet JSON
      var axes = {
        "x": baseX,
        "y": baseY
      };
      // Ajoute la key gameAxes avec en valeur une string de l'objet JSON axes
      localStorage.setItem('gameAxes', JSON.stringify(axes));
      // Ajoute la key gameAxes avec en valeur playScreen
      localStorage.setItem('gameState', 'playScreen');
      // Call la fonction qui genere le plateau de jeu
      generateGame();
      // Call la fonction qui affiche la page correspondante à la valeur de gameState
      displayScreen(localStorage.getItem('gameState'));
    }
  })

  // Listener sur le bouton Reset
  $('button[data-action="reset"]').on('click', function() {
    // Nettoie le localStorage
    localStorage.clear();
    // Recharge la page
    location.reload();
  });

  // Call la fonction d'initialisation
  init();


})
