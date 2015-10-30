suite('p5.Color', function() {
  var myp5 = new p5(function( sketch ) {
    sketch.setup = function() {};
    sketch.draw = function() {};
  });
  var c;

  suite('p5.prototype.color(r,g,b)', function() {
    setup(function() {
      c = myp5.color(255, 0, 102);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });

    test('shouldn\'t set HSBA property before hsb access func is called', function() {
      assert.equal(c.hsba, undefined);
    });

    test('shouldn\'t set HSLA property before hsb access func is called', function() {
      assert.equal(c.hsla, undefined);
    });
  });

  suite('p5.prototype.color("#rgb")', function() {
    setup(function() {
      c = myp5.color('#f06');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });

    suite('spot check', function() {
      test('numeric hex values', function() {
        c = myp5.color('#000');
        assert.deepEqual(c.levels, [0, 0, 0, 255]);
      });

      test('alphabetic hex values', function() {
        c = myp5.color('#fff');
        assert.deepEqual(c.levels, [255, 255, 255, 255]);
      });

      test('alphanumeric hex values', function() {
        c = myp5.color('#f00');
        assert.deepEqual(c.levels, [255, 0, 0, 255]);
        c = myp5.color('#f0e');
        assert.deepEqual(c.levels, [255, 0, 238, 255]);
      });
    });

    test('invalid hex values resolve to white', function() {
      c = myp5.color('#cat');
      assert.deepEqual(c.levels, [255, 255, 255, 255]);
    });
  });

  suite('p5.prototype.color("#rrggbb")', function() {
    setup(function() {
      c = myp5.color('#ff0066');
    });

    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });

    suite('spot check', function() {
      test('numeric hex values', function() {
        c = myp5.color('#123456');
        assert.deepEqual(c.levels, [18, 52, 86, 255]);
      });

      test('alphabetic hex values', function() {
        c = myp5.color('#abcdef');
        assert.deepEqual(c.levels, [171, 205, 239, 255]);
      });

      test('alphanumeric hex values', function() {
        c = myp5.color('#a1a1a1');
        assert.deepEqual(c.levels, [161, 161, 161, 255]);
        c = myp5.color('#14ffa8');
        assert.deepEqual(c.levels, [20, 255, 168, 255]);
      });
    });

    test('invalid hex values resolve to white', function() {
      c = myp5.color('#zzztop');
      assert.deepEqual(c.levels, [255, 255, 255, 255]);
    });
  });

  suite('p5.prototype.color("rgb(r,g,b)")', function() {
    setup(function() {
      c = myp5.color('rgb(255,0,102)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });

    test('spot check variant spacing', function() {
      // Exhaustive testing of spacing variations within RGB format is
      // prohibitive: spot check a set of representative values
      c = myp5.color('rgb(0,0,0)');
      assert.deepEqual(c.levels, [0, 0, 0, 255]);
      c = myp5.color('rgb(0,100 ,0)');
      assert.deepEqual(c.levels, [0, 100, 0, 255]);
      c = myp5.color('rgb( 100,255,137)');
      assert.deepEqual(c.levels, [100, 255, 137, 255]);
      c = myp5.color('rgb(0, 50,0)');
      assert.deepEqual(c.levels, [0, 50, 0, 255]);
      c = myp5.color('rgb(0,100, 0)');
      assert.deepEqual(c.levels, [0, 100, 0, 255]);
      c = myp5.color('rgb( 111, 255, 57)');
      assert.deepEqual(c.levels, [111, 255, 57, 255]);
      c = myp5.color('rgb(40, 0, 0)');
      assert.deepEqual(c.levels, [40, 0, 0, 255]);
      c = myp5.color('rgb(0,255, 10 )');
      assert.deepEqual(c.levels, [0, 255, 10, 255]);
    });

    test('invalid RGB values resolve to white', function() {
      c = myp5.color('rgb(100.5, 40, 3)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal R value');
      c = myp5.color('rgb(100, 40.00009, 3)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal G value');
      c = myp5.color('rgb(100, 40, 3.14159265)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal B value');
      c = myp5.color('rgb(.9, 40, 3, 1.0)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal without leading 0');
      c = myp5.color('skip a beat');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'non-color strings');
    });
  });

  suite('p5.prototype.color("rgb(r%,g%,b%)")', function() {
    setup(function() {
      c = myp5.color('rgb(100%, 0%, 40%)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });

    test('spot check variant spacing', function() {
      // Exhaustive testing of spacing variations within RGB format is
      // prohibitive: spot check a set of representative values
      c = myp5.color('rgb(100%,70%,100%)');
      assert.deepEqual(c.levels, [255, 179, 255, 255]);
      c = myp5.color('rgb(0%,0%,0% )');
      assert.deepEqual(c.levels, [0, 0, 0, 255]);
      c = myp5.color('rgb(0%,50%  ,  0%)');
      assert.deepEqual(c.levels, [0, 128, 0, 255]);
      c = myp5.color('rgb(10%, 50%,0%)');
      assert.deepEqual(c.levels, [26, 128, 0, 255]);
      c = myp5.color('rgb(0%,48%, 0%)');
      assert.deepEqual(c.levels, [0, 122, 0, 255]);
      c = myp5.color('rgb(0%,    0%, 40%)');
      assert.deepEqual(c.levels, [0, 0, 102, 255]);
      c = myp5.color('rgb(0%,87%, 10%)');
      assert.deepEqual(c.levels, [0, 222, 26, 255]);
    });

    test('spot check decimal percentage values', function() {
      // Percentage values in CSS <color> identifiers are floats 0.0%-100.0%
      c = myp5.color('rgb( 50%,100% ,.9%)');
      assert.deepEqual(c.levels, [128, 255, 2, 255], 'B% without leading 0');
      c = myp5.color('rgb( 9.90%, 12%, 50%)');
      assert.deepEqual(c.levels, [25, 31, 128, 255], 'decimal R%');
    });

    test('invalid percentage values default to white', function() {
      c = myp5.color('rgb(50, 100%, 100%');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'mixed percentage and non-percentage input');
      c = myp5.color('rgb(,0%,0%)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'missing values');
      c = myp5.color('rgb(A%,B%,C%)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'non-numeric percentages');
    });
  });

  suite('p5.prototype.color("rgba(r,g,b,a)")', function() {
    setup(function() {
      c = myp5.color('rgba(255,0,102,0.8)');
    });

    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('spot check variant spacing', function() {
      // Exhaustive testing of spacing variations within RGBA format is
      // prohibitive: spot check a set of representative values
      c = myp5.color('rgba(255,255,255,1)');
      assert.deepEqual(c.levels, [255, 255, 255, 255]);
      c = myp5.color('rgba(0,0,0,1)');
      assert.deepEqual(c.levels, [0, 0, 0, 255]);
      c = myp5.color('rgba(0,100,0,   0.5)');
      assert.deepEqual(c.levels, [0, 100, 0, 128]);
      c = myp5.color('rgba(  100,255 ,255, 0)');
      assert.deepEqual(c.levels, [100, 255, 255, 0]);
      c = myp5.color('rgba(0, 0,255, 0.1515236)');
      assert.deepEqual(c.levels, [0, 0, 255, 39]);
      c = myp5.color('rgba(100,101, 0, 0.75)');
      assert.deepEqual(c.levels, [100, 101, 0, 191]);
      c = myp5.color('rgba( 255, 255, 255, .9)');
      assert.deepEqual(c.levels, [255, 255, 255, 230]);
      c = myp5.color('rgba(0, 0, 0, 1)');
      assert.deepEqual(c.levels, [0, 0, 0, 255]);
      c = myp5.color('rgba(255,0, 10 , 0.33)');
      assert.deepEqual(c.levels, [255, 0, 10, 84]);
    });

    test('invalid RGBA values resolve to white', function() {
      c = myp5.color('rgba(100.5, 40, 3, 1.0)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal R% value');
      c = myp5.color('rgba(100, 40.00009, 3, 1.0)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal G% value');
      c = myp5.color('rgba(100, 40, 3.14159265, 1.0)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal B% value');
      c = myp5.color('rgba(.9, 40, 3, 1.0)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'decimal R% without leading 0');
    });
  });

  suite('p5.prototype.color("rgba(r%,g%,b%,a)")', function() {
    setup(function() {
      c = myp5.color('rgba(100.0%,0.0%,40%,0.8)');
    });

    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('spot check variant spacing', function() {
      // Exhaustive testing of spacing variations within RGBA format is
      // prohibitive: spot check a set of representative values
      c = myp5.color('rgba(100%,10.9%,100%,1)');
      assert.deepEqual(c.levels, [255, 28, 255, 255]);
      c = myp5.color('rgba(37%,     0%,0%,1)');
      assert.deepEqual(c.levels, [94, 0, 0, 255]);
      c = myp5.color('rgba(0%,50%,0%, 0.5)');
      assert.deepEqual(c.levels, [0, 128, 0, 128]);
      c = myp5.color('rgba( 50%,.9% ,100%, 0)');
      assert.deepEqual(c.levels, [128, 2, 255, 0]);
      c = myp5.color('rgba(10%, 50%,0%, 0.2515236)');
      assert.deepEqual(c.levels, [26, 128, 0, 64]);
      c = myp5.color('rgba(0%,50%, 0%, 0.75)');
      assert.deepEqual(c.levels, [0, 128, 0, 191]);
      c = myp5.color('rgba( 100%, 12%, 100%, .9)');
      assert.deepEqual(c.levels, [255, 31, 255, 230]);
      c = myp5.color('rgba(0%, 0%, 0%, 1)');
      assert.deepEqual(c.levels, [0, 0, 0, 255]);
      c = myp5.color('rgba(0%,87%, 10% , 0.3)');
      assert.deepEqual(c.levels, [0, 222, 26, 77]);

    });

    test('spot check decimal percentage values', function() {
      // Percentage values in CSS <color> identifiers are floats 0.0%-100.0%
      c = myp5.color('rgba(90.5%, 40%, 3%, 0.45)');
      assert.deepEqual(c.levels, [231, 102, 8, 115], 'Decimal A% value');
      c = myp5.color('rgba(90%, 40.00009%, 3%, 0.45)');
      assert.deepEqual(c.levels, [230, 102, 8, 115], 'Decimal G% value');
      c = myp5.color('rgba(90%, 40%, 3.14159265%, 0.45)');
      assert.deepEqual(c.levels, [230, 102, 8, 115], 'Decimal B% value');
      c = myp5.color('rgba(90%, 40%, .9%, 0.45)');
      assert.deepEqual(c.levels, [230, 102, 2, 115], 'Decimal B% without leading 0');
    });

    test('invalid RGBA percentage values resolve to white', function() {
      c = myp5.color('rgb(50,100%,100%,1');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'mixed percentage and non-percentage input');
      c = myp5.color('rgb(A%,B%,C%,0.5)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'non-numeric percentages');
      c = myp5.color('rgba(,50%,20%,1)');
      assert.deepEqual(c.levels, [255, 255, 255, 255], 'missing values');
    });
  });

  suite('p5.prototype.color("hsl(h, s%, l%)")', function() {
    setup(function() {
      c = myp5.color('hsl(336, 100%, 50%)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });
  });

  suite('p5.prototype.color("hsla(h, s%, l%, a)")', function() {
    setup(function() {
      c = myp5.color('hsla(336, 100%, 50%, 0.8)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });
  });

  suite('p5.prototype.color("hsb(h, s%, b%)")', function() {
    setup(function() {
      c = myp5.color('hsb(336, 100%, 100%)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });
  });

  suite('p5.prototype.color("hsba(h, s%, b%, a)")', function() {
    setup(function() {
      c = myp5.color('hsba(336, 100%, 100%, 0.8)');
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });
  });

  suite('p5.prototype.color("svgnamedcolor")', function() {
    setup(function() {
      c = myp5.color('papayawhip');
    });

    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 239, 213, 255]);
    });

    test('spot check color keywords', function() {
      c = myp5.color('red');
      assert.deepEqual(c.levels, [255, 0, 0, 255]);
      c = myp5.color('magenta');
      assert.deepEqual(c.levels, [255, 0, 255, 255]);
      c = myp5.color('limegreen');
      assert.deepEqual(c.levels, [50, 205, 50, 255]);
    });
  });

  suite('p5.prototype.color([])', function() {
    setup(function() {
      c = myp5.color([255, 0, 102]);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });
  });

  suite('p5.prototype.color(r,g,b,a)', function() {
    setup(function() {
      c = myp5.color(255, 0, 102, 204);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });

    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly get hue/saturation/brightness/lightness', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getBrightness()), 100);
      assert.equal(Math.round(c._getLightness()), 50);
    });

    test('should correctly get RGBA values', function() {
      assert.equal(Math.round(c._getRed()), 255);
      assert.equal(Math.round(c._getGreen()), 0);
      assert.equal(Math.round(c._getBlue()), 102);
      assert.equal(Math.round(c._getAlpha()), 204);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  // Color Mode
  suite('p5.Color in RGB mode with custom range', function() {
    setup(function() {
      myp5.colorMode(myp5.RGB, 1);
      c = myp5.color(1, 0, 0.4, 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly get RGBA property', function() {
      assert.equal(c._getRed(), 1);
      assert.equal(c._getGreen(), 0);
      assert.equal(c._getBlue(), 0.4);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });

    test('should correctly get RGBA property after overwrite', function() {
      myp5.colorMode(myp5.RGB, 255, 255, 255, 255);
      assert.equal(c._getRed(), 255);
      assert.equal(c._getGreen(), 0);
      assert.equal(c._getBlue(), 102);
      assert.equal(c._getAlpha(), 204);
    });
  });

  suite('p5.Color in HSL mode', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL);
      c = myp5.color(336, 100, 50);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });
  });

  suite('p5.Color in HSL mode with Alpha', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL);
      c = myp5.color(336, 100, 50, 0.8);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly get hue/saturation/lightness/alpha', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getLightness()), 50);
      assert.equal(c._getAlpha(), 0.8);
    });
  });

  suite('p5.Color in HSL mode with custom range', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL, 100, 200, 300, 10);
      c = myp5.color(93.33, 200, 150, 8);
    });

    test('should correctly get HSLA property', function() {
      assert.equal(Math.round(c._getHue()), 93);
      assert.equal(Math.round(c._getSaturation()), 200);
      assert.equal(Math.round(c._getLightness()), 150);
      assert.equal(Math.round(c._getAlpha()), 8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSL mode with RGB string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL, 360, 100, 100, 1);
      c = myp5.color('rgba(255, 0, 102, 0.8)');
    });

    test('should correctly get HSLA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getLightness()), 50);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSL mode with HSL string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL, 360, 100, 100, 1);
      c = myp5.color('hsla(336, 100%, 50%, 0.8)');
    });

    test('should correctly get HSLA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getLightness()), 50);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSL mode with HSB string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSL, 360, 100, 100, 1);
      c = myp5.color('hsba(336, 100%, 100%, 0.8)');
    });

    test('should correctly get HSLA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getLightness()), 50);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSB mode', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB);
      c = myp5.color(336, 100, 100);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 255]);
    });
  });

  suite('p5.Color in HSB mode with Alpha', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB);
      c = myp5.color(336, 100, 100, 0.8);
    });
    test('should create instance of p5.Color', function() {
      assert.instanceOf(c, p5.Color);
    });
    test('should correctly set RGBA property', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly get hue/saturation/brightness/alpha', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getBrightness()), 100);
      assert.equal(c._getAlpha(), 0.8);
    });
  });

  suite('p5.Color in HSB mode with custom range', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB, 100, 200, 300, 10);
      c = myp5.color(93.33, 200, 300, 8);
    });

    test('should correctly get HSBA property', function() {
      assert.equal(Math.round(c._getHue()), 93);
      assert.equal(Math.round(c._getSaturation()), 200);
      assert.equal(Math.round(c._getBrightness()), 300);
      assert.equal(Math.round(c._getAlpha()), 8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSB mode with RGB string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB, 360, 100, 100, 1);
      c = myp5.color('rgba(255, 0, 102, 0.8)');
    });

    test('should correctly get HSBA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getBrightness()), 100);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSB mode with HSB string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB, 360, 100, 100, 1);
      c = myp5.color('hsba(336, 100%, 100%, 0.8)');
    });

    test('should correctly get HSBA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getBrightness()), 100);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });

  suite('p5.Color in HSB mode with HSL string', function() {
    setup(function() {
      myp5.colorMode(myp5.HSB, 360, 100, 100, 1);
      c = myp5.color('hsla(336, 100%, 50%, 0.8)');
    });

    test('should correctly get HSBA property', function() {
      assert.equal(Math.round(c._getHue()), 336);
      assert.equal(Math.round(c._getSaturation()), 100);
      assert.equal(Math.round(c._getBrightness()), 100);
      assert.equal(c._getAlpha(), 0.8);
    });

    test('should correctly convert to RGBA', function() {
      assert.deepEqual(c.levels, [255, 0, 102, 204]);
    });

    test('should correctly render color string', function() {
      assert.equal(c.toString(), 'rgba(255,0,102,0.8)');
    });
  });
});
