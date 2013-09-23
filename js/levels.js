/*

What this is:

Each level is described by a list of rows.  The first and last row and column are for emitters
and sensors, all the inner cells are for the filters.

Each row is written as a string with double quotes around it.  Each character of the string
is a column.

 The lasers are indicated using r, g, or b for a red, green, or blue laser (note lower case)
 The sensors are indicated using R, G, or B for a red, green, or blue sensor (note upper case)
 If the outer edge has a space, there will be no laser or sensor there.
 The filter characters can be one of r, g, or b for red, green, or blue; x for a blocker,
 m or M for mirrors at alternative angles, and empty space for the "clear" filter that allows
 all beams to pass.
 To eliminate a pivot and leave empty space, set one or more of its filters to '-'.

Following the rows is a list of numbers representing rotation of the pivots.  The pivots will
be rotated the number of times given, going left to right, then top to bottom.  If too few
rotation values are given it will repeat the pattern.  If too many are given it will ignore
any extras.

You can force the game to launch the level you are working on immediately on startup by adding
a hash to the location bar.  For example if you initally loaded the game at:

 file:///E:/projects/games/1gam/1gam-LaserPuzzle/index.html#level=10

But you're working on level 18, modify the location as follows and reload:

 file:///E:/projects/games/1gam/1gam-LaserPuzzle/index.html#level=18

As long as that "#level=18" is on the end, hitting reload (i.e. press F5) will reload
the game right on that level.  This saves the trouble of skipping to the desired level
each time.

 */

levels = [

  [[" r  ",
    "  x ",
    "  x ",
    "r  R",
    "  x ",
    " R  "],
   [2,2]],
  [["    ",
    " xx ",
    "r  R",
    "R  r",
    " xx ",
    "    "],
   [2,2]],
  [["  r ",
    " x  ",
    "r  R",
    " x  ",
    " x  ",
    "  R "],
   [2,1]],
  [[" r  R ",
    "  xx  ",
    "  xx  ",
    "r    R",
    "  xx  ",
    " R  r "],
   [2,1,
    3,0]],
  [["   R  ",
    "r    R",
    " xx x ",
    " xx x ",
    "R    r",
    "   r  "],
   [3,1,
    3,2]],
  [[" r  r ",
    "r    R",
    "  xx  ",
    "  xx  ",
    "r    R",
    " R  R "],
   [3,1]],
  [[" R R  ",
    "  x x ",
    "r    R",
    "  x x ",
    "      ",
    "  x-- ",
	"  x-- ",
	" r r    "],
    [1,2,2,
     1,2]],
  [[" r R  r ",
    "  x xx  ",
    "  x xx  ",
    "r      R",
    "  x xx  ",
    "R      r",
	"  x xx  ",
	" R r  R "],
    [1,2,2,
     1,2]],
  [["    ",
    " xx ",
    "g  G",
    " xx ",
    "r  R",
    "    "],
   [3,2]],
  [[" r  ",
    "  x ",
    "g  G",
    "  x ",
    "  x ",
    " R  "],
   [2,3]],   
  [["    g ",
    " xxx  ",
    "r    R",
    "r    R",
    " xxx  ",
    "    G "],
   [2,1,
    3,0]],
  [["  gg  ",
    " x  x ",
    "r    R",
    "r    R",
    " x  x ",
    "  GG  "],
    [2,1,
     3,0]],
  [[" r  G ",
    "  xx  ",
    "  xx  ",
    "  xx  ",
    "g    G",
    " R  g "],
    [3,2,
     2,1]],
  [["  gR  ",
    " x  x ",
    "r    R",
    " x  x ",
    " x  x ",
    "  Gr  "],
    [3,2,
     1,1]],
  [["  g g g ",
    "r      R",
    " x x x  ",
    "r      R",
    " x x x  ",
    "r      R",
    " x x x  ",
    "  G G G "],
    [2,1,3,0]],
  [["   g  ",
    "g    G",
    " xx x ",
    " xx x ",
    "r    R",
    " -- x ",
    " -- x ",
    "   G  "],
    [3,2,2,1]],
  [[" R G    ",
    "  x xxx ",
    "R      r",
    "  x xxx ",
    "g      G",
    "  x x-- ",
    "  x x-- ",
    " r g    "],
    [2,1,3,0]],
  [["          ",
    "r--rrrr--R",
    "G--gggg--g",
    "          "],
    [2,1]],
  [["   g  ",
    " xxgx ",
    "rrr rR",
    " --gx ",
    " --gx ",
    "   G  "],
    [2,1,3]],
  [["   G    ",
    "rrr rrrR",
    " gggrgg ",
    "rrr r--R",
    " gggr-- ",
    "   g    "],
    [1,3,2,
     2,0]],
  [["   G g  ",
    "rrr r rR",
    "Gggg g g",
    " -- x x ",
    " -- x   ",
    "R      r",
    " xx x x ",
    "   g G  "],
    [2,1,3,0]],
  [[" rG   ",
    " rg-- ",
    " rg-- ",
    "b  bbB",
	" rgrg ",
    " Rg   "],
    [1,3,2]],
  [["      ",
    "rrrrrR",
    " gggg ",
    "bbbbbB",
    " rrrr ",
    "gggggG",
    " bbbb ",
    "      "],
    [1,3,
     2,0,
     2,1]],
  [["      ",
    " bggr ",
    "bbbbbB",
    " brrb ",
    "Gggggg",
    " gbbg ",
    "rrrrrR",
    "      "],
    [3,2,
     2,1,
     1,2]],
  [[" r  B ",
    "rrrr R",
    " rxxb ",
    "G gg g",
    " rrxb ",
    " rggb ",
    " rbxb ",
    " R  b "],
    [1,3,
     2,0,
     2,1]],
  [["   r    ",
    "ggg gggG",
    " bbrgxx ",
    " --rgrx ",
    "B-- bbbb",
    "   R  "],
    [3,2,
     0,1,
     2,3]],
  [["  bg  r ",
    " xbgxxr ",
    "rr  r rR",
    " gbgbgr ",
    " gbgxgr ",
    "bbb bb B",
    " x grxr ",
    "  BG  R "],
    [2,3,1],
    [3,2,2],
    [1,2,3]],
  [[" r g  B ",
    " rxgxxb ",
    " rxgxgb ",
    "b b bbbB",
    " rggrxb ",
    "Rrr rr r",
    " rxgxxb ",
    " R G  b "],
    [1,2,3],
    [2,3,1],
    [0,3,2]],
  [["    G   ",
    "rrrr rrR",
    " xxxg r ",
    "Ggg gggg",
    " rbxgxx ",
    "bbbb bbB",
    "Rrrr rrr",
    "    g   "],
    [2,2,3],
    [2,0,1],
    [3,1,3]],
    //11 ...
  [["      ",
    "g   m ",
    "G   m ",
    " m   g",
    " m   G",
    "      "],
    [3,2]],
  [["        ",
    " xxxx-- ",
    "g  mx   ",
    " xx x   ",
    "g    m  ",
    " xx x x ",
    " xm    G",
    "  gG G  "],
    [2,2,3],
    [2,0,1],
    [3,1,3]],  
  [["        ",
    "g mxxxx ",
    " x xm  G",
    "g    Mx ",
    " x      ",
    "  m  --G",
    "   x -- ",
    "    gG  "],
    [2,2,3],
    [2,0,1],
    [3,1,3]],  
  [["   g  G ",
    " x  mm  ",
    "Gmx mm  ",
    "  m x-- ",
    "  m x-- ",
    "G  mxx  ",
    "  m   m ",
    " gg     "],
    [2,1,2],
    [2,0,1],
    [3,1,3]],
  [["   r    ",
    " ------ ",
    " ------ ",
    "R--m -- ",
    " -- m--G",
    " ------ ",
    " ------ ",
    "    g   "],
    [1]],
  [["  G r ",
    "    mR",
    "g m   ",
    "   m G",
    "rm    ",
    " R g  "],
    [3,2,1,2]],
  [["   R  ",
    "rrrmg ",
    " gggr ",
    " rrxx ",
    "gggmx ",
    "   G  "],
    [2,1,3,3]],
  [["  g  G  ",
    "rr    m ",
    "  gMM r ",
    "  mmmmr ",
    "Rrr   m ",
    "        "
  ], [1,3,2,
      2,3,3]],
  [["   R    ",
    "Rrrrrrm ",
    " xxrxxr ",
    " --rgxr ",
    " --rgxr ",
	"rrrm rr ",
	"gggggmr ",
    "     Gr "],
    [2,1,3,3]],  
  [["   R    ",
    "rrrmr-- ",
    "gggmr-- ",
    " xxg    ",
    " gmggm  ",
	"rr  r rR",
	" xggxgx ",
    "  gG G  "],
    [2,1,3,3]],


  // Original set of levels ...

  [["    b ",
    " xrbb ",
    "Gggmb ",
    " xxgb ",
    " xm  R",
    "  rgB "],
   [3,2,2,
    1,3,0]
  ],
  [[" g br   ",
    " gmbmrrR",
    " grmbbbB",
    " grbmbr ",
    " mgggggG",
    "        "],
   [3,2,2,
    1,3,0]
  ],
  [["     G  ",
    "Bbbbb m ",
    "rrrm  b ",
    "ggg gmb ",
    " xxrmxb ",
	" ----xb ",
	" ----xb ",
    "   R  b "],
   [3,2,2,
    1,3,0]
  ],
  [[" Rg   b ",
    " rg--xb ",
    " rg--rb ",
    " rmggg G",
    " rmbbbm ",
	"rmb---- ",
	" xb---- ",
    "  B     "],
   [1,3,2,
    1,2,1,
	2,2,1]],
  [[" br  g  ",
    " brrmgr ",
    " brrrmgG",
    " bmrrrm ",
    " mbbbmr ",
    " gggmbr ",
    "bbbmgbr ",
    "   B BR "],
   [1,3,2,
    0,2,1,
    3,2,3]],
  [["     G  ",
    "bbbbmgr ",
    " rrxbgr ",
    "rrmrbgb ",
    " xrgbgb ",
    "gg g mr ",
    "Rrmxbrx ",
    "    B   "],
   [1,1,2,
    3,3,1,
    3,2,3]],
  [[" gBr  G ",
    " gbrgxg ",
    " gbrmb b",
    " gbrbxg ",
    "b mm r R",
    " gxxbxg ",
    " mgg gm ",
    "    B   "],
   [3,3,2,
    3,2,1,
    2,2,1]],
  [["    gr  ",
    "bbb m m ",
    " mm  r R",
    " brmbrg ",
    "rrmg  m ",
    "ggggm m ",
    " mgggm R",
    "  G G B "],
   [2,3,1,
    2,2,0,
    3,1,2]],
  [["    r   ",
    "ggggm m ",
    " gmg g G",
    "bb b b B",
    "ggmr rm ",
    "bb bmgm ",
    "r rmbbg ",
    "  RRB G "],
   [3,1,2,
    2,1,1,
    2,2,1]],
  [["    br    ",
    "bbbbm mm B",
    "gggmbr br ",
    "rrr  rmmr ",
    " rm  rrrrR",
    "gg gm  bbB",
    "rrmgg rbm ",
    "   GGRR   "],
   [1,1,3,2,
    2,2,3,0,
    0,1,1,3,
    1,1,3,2]]
];

