var scrambleLevel = function scrambleLevel(levelSpec) {
  var level = levelSpec[0].slice(0);
  var offsets = levelSpec[1];
  var n=0;
  for(var row=1; row<level.length-1; row+=2) {
    var rowSpec1 = level[row];
    var rowSpec2 = level[row+1];
    var newRowSpec1 = ""+rowSpec1[0];
    var newRowSpec2 = ""+rowSpec2[0];

    for(var column=1; column<rowSpec1.length-1; column+=2) {
      var pivotSpec = rowSpec1[column]+
          rowSpec1[column+1]+
          rowSpec2[column+1]+
          rowSpec2[column];
      var turns = offsets[n % offsets.length];
      n++;
      newRowSpec1 += pivotSpec[turns] + pivotSpec[(turns+1)%4];
      newRowSpec2 += pivotSpec[(turns+3)%4] + pivotSpec[(turns+2)%4];
    }
    newRowSpec1 += rowSpec1[rowSpec1.length-1];
    newRowSpec2 += rowSpec2[rowSpec2.length-1];
    level[row] = newRowSpec1;
    level[row+1] = newRowSpec2;
    return level;
  }
};

var stopSound = function(id) {
  if (!pc.device.soundEnabled) return;
  var sound = pc.device.loader.get(id).resource;
  sound.pause();
};

var restartSound = function(id, volume, loop) {
  stopSound(id);
  playSound(id, volume, loop);
};

var playSound = function(id, volume, loop) {
  if (!pc.device.soundEnabled) return;
  var sound = pc.device.loader.get(id).resource;
  sound.setVolume(volume || 1);
  sound.play(loop || false);
};

var getImage = function(id) {
  return pc.device.loader.get(id).resource;
}
