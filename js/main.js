window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 640, 640, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var player;
    var exit;
    
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    
    var upAni;
    var downAni;
    var leftAni;
    var rightAni;
    
    var bgMusic;
    
    var text;
    var style;
    var t;
    
    function preload() {
        game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.spritesheet('player', 'assets/player_sprite.png', 24, 24, 8);
        game.load.image('ground', 'assets/ground.png');
        game.load.image('trees', 'assets/trees.png');
        game.load.image('cave', 'assets/opening.png');
        
        game.load.audio('bgMusic', 'assets/TooExcited.mp3')
    }
    
    var map;
    var layer;
    var floor;
    
    function create() {   
        // Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        map = game.add.tilemap('map');
        
        map.addTilesetImage('ground');
        map.addTilesetImage('trees');
        
        map.setCollisionBetween(1, 8, true, 'Maze Layer');
        
        layer = map.createLayer('Ground Layer');
        layer = map.createLayer('Maze Layer');
        
        layer.resizeWorld();
        
        // Player
        player = game.add.sprite(288, 600, 'player', 2);
        player.smoothed = false;
        
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        upAni = player.animations.add('up', [4,5], 8, true);
        downAni = player.animations.add('down', [2,3], 8, true);
        leftAni = player.animations.add('left', [0,1], 8, true);
        rightAni = player.animations.add('right', [6,7], 8, true);
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        // Music
        bgMusic = game.add.audio('bgMusic');
        bgMusic.play();
        
        // Exit
        exit = game.add.sprite(288, 0, 'cave');
        game.physics.enable(exit, Phaser.Physics.ARCADE);
        
        exit.body.checkCollision.down = true;
        exit.body.immovable = true;
        
        text = "You have escaped!";
        style = { font: "65px Arial", fill: "#000000", align: "center" };
    }
    
    function update() {
        game.physics.arcade.collide(player, layer);
        
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        if (upKey.isDown)
        {
            player.body.velocity.y = -200;
            player.play('up');
        }
        else if (downKey.isDown)
        {
            player.body.velocity.y = 200;
            player.play('down');
        }
        else if (leftKey.isDown)
        {
            player.body.velocity.x = -200;
            player.play('left');
        }
        else if (rightKey.isDown)
        {
            player.body.velocity.x = 200;
            player.play('right');
        }
        else
            player.animations.stop();
        
        // Music
        if (!(bgMusic.isPlaying))
            {
                bgMusic.play();
            }
        
        // End
        if (game.physics.arcade.collide(player, exit))
        {
            player.destroy();
            t = game.add.text(game.world.centerX-300, 0, text, style);
            
        } 
            
    }
};
