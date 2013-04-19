

var filterOffset=80;
var filterGridSize = filterOffset*2;
var globalScale=1;


TheGame = pc.Game.extend('TheGame',
    {},
    {
      gameScene:null,
      level:0,
      wantToCloseDoors:true,
      wantToStartNextLevel:false,
      levelStarted:false,
      complete:false,
      scale:1,

      onReady:function ()
      {
        this._super(); // call the base class' onReady

        // disable caching when developing
        if (pc.device.devMode)
          pc.device.loader.setDisableCache();

        var loadImage = function(name) {
          var path = 'images/'+name;
          var id = name.replace(/\....$/, "");
          pc.device.loader.add(new pc.Image(id, path));
        };
        var loadSound = function(id, maxPlaying) {
          var path = 'sounds/'+id;
          if (pc.device.soundEnabled)
            pc.device.loader.add(new pc.Sound(id, path, ['ogg','mp3'], maxPlaying || 1));
        };
        // load up resources
        loadImage('bg.jpg');
        loadImage('frame.png');
        loadImage("spritesheet.png");
        
        loadSound('door_open_sound');
        loadSound('applause');
        loadSound('level_complete_sound');
        loadSound('beep');
        loadSound('pivot_sound', 5);
        loadSound('music');

        // fire up the loader (with a callback once done)
        pc.device.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
      },

      onLoading:function (percentageComplete)
      {
        // display progress, such as a loading bar
        var ctx = pc.device.ctx;
        ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);
        ctx.font = "normal 50px Verdana";
        ctx.fillStyle = "#8f8";
        ctx.fillText('Lazer Puzzle', 40, (pc.device.canvasHeight / 2) - 50);
        ctx.font = "normal 18px Verdana";
        ctx.fillStyle = "#777";

        ctx.fillText('Loading: ' + percentageComplete + '%', 40, pc.device.canvasHeight / 2);
      },

      onLoaded:function ()
      {
        // Erase loading screen
        var ctx = pc.device.ctx;
        ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);

        // we're ready; make the magic happen
        this.gameScene = new GameScene(this);
        this.addScene(this.gameScene);

        playSound('music', 0.6, true);

        pc.device.input.bindAction(this, 'cheat', 'F8');

      },

      onAction:function(actionName) {
        if(actionName == 'cheat') {
          this.onLevelComplete();
        }
      },

      playDoorSound:function() {
        restartSound('door_open_sound');
      },

      startGame:function() {
        if(!this.levelStarted) {
          this.levelStarted = true;
          this.wantToCloseDoors = false;
          this.gameScene.startLevel();
          this.playDoorSound();
          playSound('beep');
        }
      },

      nextLevel:function() {
        if(!this.levelStarted) {
          this.wantToCloseDoors = true;
          this.playDoorSound();
          playSound('beep');
        }
      },

      onLevelComplete:function() {
        this.levelStarted = false;
        this.level ++;
        playSound('level_complete_sound');
        if(this.level == levels.length) {
          this.complete = true;
          playSound('applause');
        }

      },

      onDoorsClosed:function() {
        this.gameScene.clearGrid();
        if(this.wantToCloseDoors) {
          this.gameScene.startLevel();
          this.wantToCloseDoors = false;
          this.levelStarted = true;
          this.playDoorSound();
        }
      },

      onDoorsOpened:function() {

      },

      process:function() {
        var cw = pc.device.canvasWidth;
        var ch = pc.device.canvasHeight;
        var scale = this.scale = Math.min(1.0, Math.min(cw/1024, ch/768));
        var scaled = scale != 1;
        if(scaled) {
          pc.device.ctx.save();
          pc.device.ctx.setTransform(scale,0,0,scale,0,0);
          pc.device.canvasWidth = 1024;
          pc.device.canvasHeight = 1024;
        }
        var ok = this._super();
        if(scaled) {
          pc.device.ctx.restore();
          pc.device.canvasWidth = cw;
          pc.device.canvasHeight = ch;
        }
        if(ok) {

          if(this.levelStarted && this.gameScene.solved) {
            this.onLevelComplete();
          }
        }
        return ok;
      },

      /**
       * Check if the mouse is currently over the given image.  Assumes the
       * image is not scaled and that the image has had screen x and y coordinates
       * added to it.
       *
       * @param image
       * @returns {boolean}
       */
      isMouseOverImage: function(image) {
        var scale = this.scale;
        var x = pc.device.input.mousePos.x - image.x* scale;
        var y = pc.device.input.mousePos.y - image.y*scale;
        return (x >= 0 && x < image.width*scale &&
            y >= 0 && y < image.height*scale);
      },

      worldMouseX:function() {
        return pc.device.input.mousePos.x / this.scale;
      },

      worldMouseY:function() {
        return pc.device.input.mousePos.y / this.scale;
      }


    });


