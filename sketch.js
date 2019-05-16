var A;
var B;
var C;
var W;
var WO;
var t = 0;
var siz = 5;
var sizT = siz * 2;
var rate = 120;
var off = 30;
var wei;
var wT;
var wTT;
var wTTh;
var wTF;
var wTFi;
var wOut;
var wOutO;
var wOutT;
var deg;
var con;
var tim;
var ite;
var scale;
var steps;

function setup()
{

    frameRate( rate );

    scale = window.devicePixelRatio;

    A = createVector( windowWidth * 0.1, windowHeight * 0.1 );
    B = createVector( windowWidth * 0.1, windowHeight * 0.3 );
    C = createVector( windowWidth * 0.7, windowHeight * 0.1 );
    D = createVector( windowWidth * 0.9, windowHeight * 0.2 );
    
    var canvas = createCanvas( windowWidth, windowHeight * 0.5 );
    canvas.parent( "container" );

    tim = new Time();
    wei = new Weight();
    deg = new Degree();
    con = new Construction();
    ite = new Iterations();

    var gui = new dat.GUI();
    var degree = gui.add( deg, "value", 2, 4, 1 ).name( "Degree" );
    degree.onChange( function( value )
    {

        if( value === 3 || value == 2 )
        {

            weightFour.domElement.style.pointerEvents = "none";
            weightFour.domElement.style.opacity = 0.5;

        }

        else
        {

            weightFour.domElement.style.pointerEvents = "auto";
            weightFour.domElement.style.opacity = 1.0;

        }

        if( value === 2 )
        {

            weightThree.domElement.style.pointerEvents = "none";
            weightThree.domElement.style.opacity = 0.5;

        }

        else
        {

            weightThree.domElement.style.pointerEvents = "auto";
            weightThree.domElement.style.opacity = 1.0;

        }

    });

    var pointsFolder = gui.addFolder( "Points" );
    pointsFolder.add( ite, "iterations", [ "Ten", "OneHundred" ] ).name( "Iterations" );
    pointsFolder.add( con, "value", 0, 1, 1 ).name( "ShowConstruction" );
    var times = gui.addFolder( "Time" );
    var manualTime = times.add( tim, "manual", 0, 1, 1 ).name( "ManualTime" );
    manualTime.onChange( function( value ) {

        if( value === 1 ) 
        {

            speed.domElement.style.pointerEvents = "none";
            speed.domElement.style.opacity = 0.5;
            tParam.domElement.style.pointerEvents = "auto";
            tParam.domElement.style.opacity = 1.0;

        }

        else
        {

            speed.domElement.style.pointerEvents = "auto";
            speed.domElement.style.opacity = 1.0;
            tParam.domElement.style.pointerEvents = "none";
            tParam.domElement.style.opacity = 0.5;

        }

    });

    var tParam = times.add( tim, "t", 0, 1, 0.01 ).name( "t" );
    tParam.domElement.style.pointerEvents = "none";
    tParam.domElement.style.opacity = 0.5;
    var speed = times.add( tim, "speed", 0.1, 2.0, 0.01 ).name( "Speed" );
    var weights = gui.addFolder( "Weights" );
    weightOne = weights.add( wei, "wO", 0.1, 5.0 ).name( "WeightOne" );
    weightTwo = weights.add( wei, "wT", 0.1, 5.0 ).name( "WeightTwo" );
    var weightThree = weights.add( wei, "wTh", 0.1, 5.0 ).name( "WeightThree" );
    var weightFour = weights.add( wei, "wF", 0.1, 5.0 ).name( "WeightFour" );

    var customContainer = document.getElementById( "GUIContainer" );
    customContainer.appendChild(gui.domElement);
        
}

function draw()
{

    var time = 0;

    if( tim.manual === 1 )
    {

        time = tim.t;

    }

    else
    {

        time = 0.5 * sin( t * tim.speed ) + 0.5;

    }

    var sizeF = scale * 30;

    background( 0 );

    if( deg.value === 4 )
    {

        
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            C = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( D.x, D.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            D = createVector( mouseX, mouseY );
        
        }

        // Construction.

        if( con.value === 1 )
        {

            strokeWeight( 1 );
            line( A.x, A.y, B.x, B.y, siz, siz );
            line( B.x, B.y, C.x, C.y, siz, siz );
            line( C.x, C.y, D.x, D.y, siz, siz );
            lInterpCO( A, B, time, wei.wO, wei.wT );   // wT    - inter
            noStroke();
            fill( 244, 241, 66 );
            ellipse( wT.x, wT.y, siz, siz );
            lInterpCT( B, C, time, wei.wT, wei.wTh );  // wTT   - interT
            ellipse( wTT.x, wTT.y, siz, siz );
            lInterpCTh( C, D, time, wei.wTh, wei.wF ); // wTTh  - interTh
            ellipse( wTTh.x, wTTh.y, siz, siz );
            lInterpCF( wT, wTT, time, wOut, wOutO );   // wTF   - interN
            fill( 219, 148, 6 );
            ellipse( wTF.x, wTF.y, siz, siz );
            lInterpCFi( wTT, wTTh, time, wOutO, wOutT );// wTFi  - interNT
            ellipse( wTFi.x, wTFi.y, siz, siz );
            stroke( 255 );
            line( wT.x, wT.y, wTT.x, wTT.y, siz, siz );
            line( wTT.x, wTT.y, wTTh.x, wTTh.y, siz, siz );
            line( wTF.x, wTF.y, wTFi.x, wTFi.y, siz, siz );

        }

        // Cubic Bézier.
        strokeWeight( 3 );

        if( ite.iterations === "OneHundred" )

            lineCubicB( A, B, C, D );

        else
        {

            lineCubicBT( A, B, C, D );

        }

        // Magenta.
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        // Green.
        fill( 40, 255, 90 );
        ellipse( B.x, B.y, sizT, sizT );
        // Blue.
        fill( 0, 0, 255 );
        ellipse( C.x, C.y, sizT, sizT );
        // Cyan.
        fill( 0, 255, 250 );
        ellipse( D.x, D.y, sizT, sizT );
        cubicB( A, B, C, D, time );
        // Red.
        fill( 255, 0, 0 );
        ellipse( W.x, W.y, sizT, sizT );

    }

    if( deg.value === 3 )
    {

        
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            C = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( D.x, D.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            D = createVector( mouseX, mouseY );
        
        }

        // Construction.
        if( con.value === 1 )
        {

            var negTime = ( 1.0 - time );
            strokeWeight( 1 );
            line( A.x, A.y, C.x, C.y, siz, siz );
            line( D.x, D.y, C.x, C.y, siz, siz );
            lInterpT( A, C, time, wei.wO, wei.wT );
            fill( 219, 148, 6 );
            noStroke();
            ellipse( wT.x, wT.y, siz, siz );
            lInterpOT( D, C, negTime, wei.wTh, wei.wT );
            ellipse( wTT.x, wTT.y, siz, siz );
            stroke( 255 );
            line( wT.x, wT.y, wTT.x, wTT.y, siz, siz );

        }

        // Bézier.
        strokeWeight( 3 );

        if( ite.iterations === "OneHundred" )

            lineQuadB( A, C, D, wei.wO, wei.wT, wei.wTh, wei.wF );

        else
        {

            lineQuadBT( A, C, D, wei.wO, wei.wT, wei.wTh, wei.wF );

        }

        noStroke();
        fill( 255, 22, 255 );
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 );
        ellipse( C.x, C.y, sizT, sizT );
        fill( 0, 255, 250 );
        ellipse( D.x, D.y, sizT, sizT );
        quadB( A, C, D, wei.wO, wei.wT, wei.wTh, time );
        fill( 255, 0, 0 );
        ellipse( W.x, W.y, sizT, sizT );

    }

    if( deg.value === 2 )
    {

        
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizeF && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )
        {
        
            B = createVector( mouseX, mouseY );
        
        }

        strokeWeight( 3 );
        line( A.x, A.y, B.x, B.y, siz, siz );
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 )
        ellipse( B.x, B.y, sizT, sizT );
        lInterp( A, B, time );
        fill( 255, 0, 0 )
        ellipse( W.x, W.y, sizT, sizT );

    }

    t += 0.01;
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    /*
    let fps = frameRate();
    text("FPS: " + fps.toFixed(2), 100, 200);
    */
    stroke( 255 );

}

function windowResized()
{
    
    resizeCanvas( windowWidth, windowHeight * 0.5 );
    A = createVector( windowWidth * 0.1, windowHeight * 0.1 );
    B = createVector( windowWidth * 0.1, windowHeight * 0.3 );
    C = createVector( windowWidth * 0.7, windowHeight * 0.1 );
    D = createVector( windowWidth * 0.5, windowHeight * 0.2 );

}

function lInterp( A, B, t )
{
    
    var temp = ( 1.0 - t ) * wei.wO; var tempO = wei.wT * t; var w = temp + tempO;

    W = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lInterpO( A, B, t )
{

    var temp = ( 1.0 - t ) * wei.wO; var tempO = wei.wT * t; var w = temp + tempO;

    WO = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lInterpT( A, B, t, w1, w2 )
{
    
    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; var w = temp + tempO;
    wT = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lInterpOT( A, B, t, w1, w2 )
{

    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; var w = temp + tempO;

    wTT = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lInterpCO( A, B, t, w1, w2 )
{
    
    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; wOut = temp + tempO;
    wT = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      wOut,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      wOut
                    );
    
}

function lInterpCT( A, B, t, w1, w2 )
{

    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; wOutO = temp + tempO;

    wTT = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      wOutO,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      wOutO
                    );
    
}

function lInterpCTh( A, B, t, w1, w2 )
{
    
    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; wOutT = temp + tempO;
    wTTh = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      wOutT,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      wOutT
                    );
    
}

function lInterpCF( A, B, t, w1, w2 )
{

    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; var w = temp + tempO;

    wTF = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lInterpCFi( A, B, t, w1, w2 )
{

    var temp = ( 1.0 - t ) * w1; var tempO = w2 * t; var w = temp + tempO;

    wTFi = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lineQuadB( A, B, C, W0, W1, W2 )
{

    for( var i = 0.0; i <= 1.0; i += 0.01 )
    {
        
        quadB( A, B, C, W0, W1, W2, i );
        quadBO( A, B, C, W0, W1, W2, i + 0.01 );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
}

function lineQuadBT( A, B, C, W0, W1, W2 )
{

    for( var i = 0.0; i <= 0.9; i += 0.1 )
    {
        
        quadB( A, B, C, W0, W1, W2, i );
        quadBO( A, B, C, W0, W1, W2, i + 0.1 );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
}

function quadB( A, B, C, W0, W1, W2, t )
{
    
    var ber = 1.0 - t; var berO = t * t;

    W = createVector( ( ber * ber * W0 * A.x                  +
                        2.0 * ( t * B.x * W1 ) * ber          +
                        berO * C.x * W2 ) 
                        /
                        ( ber * ber * W0                      +
                        2.0 * ( t * W1 ) * ber                +
                        berO * W2 ),
                        ( ber * ber * W0 * A.y                +
                        2.0 * ( t * B.y * W1 ) * ber          +
                        berO * C.y * W2 ) 
                        /
                        ( ber * ber * W0                      +
                        2.0 * ( t * W1 ) * ber                +
                        berO * W2 )
                    );
    
}

function quadBO( A, B, C, W0, W1, W2, t )
{
    
    var ber = 1.0 - t; var berO = t * t;

    WO = createVector( ( ber * ber * W0 * A.x                  +
                        2.0 * ( t * B.x * W1 ) * ber          +
                        berO * C.x * W2 ) 
                        /
                        ( ber * ber * W0                      +
                        2.0 * ( t * W1 ) * ber                +
                        berO * W2 ),
                        ( ber * ber * W0 * A.y                +
                        2.0 * ( t * B.y * W1 ) * ber          +
                        berO * C.y * W2 ) 
                        /
                        ( ber * ber * W0                      +
                        2.0 * ( t * W1 ) * ber                +
                        berO * W2 )
                    );
    
}

function lineCubicB( A, B, C, D )
{

    for( var i = 0.0; i < 1.0; i += 0.01 )
    {

        cubicB( A, B, C, D, i );
        cubicBO( A, B, C, D, i + 0.01 );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
}

function lineCubicBT( A, B, C, D )
{

    for( var i = 0.0; i < 0.9; i += 0.1 )
    {

        cubicB( A, B, C, D, i );
        cubicBO( A, B, C, D, i + 0.1 );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
}

function cubicB( A, B, C, D, t )
{

    var ber = 1.0 - t; var berO = t * t;

    W = createVector( ( pow( ber, 3.0 ) * A.x * wei.wO           +
                        3.0 * ( ber * ber ) * t * B.x * wei.wT   +
                        3.0 * ( ber ) * berO * C.x * wei.wTh     +
                        pow( t, 3.0 ) * D.x * wei.wF
                      ) 
                      /
                      ( pow( ber, 3.0 ) * wei.wO               +
                        3.0 * ( ber * ber ) * t * wei.wT       +
                        3.0 * ( ber ) * berO * wei.wTh         +
                        pow( t, 3.0 ) * wei.wF
                      ),
                      ( pow( ber, 3.0 ) * A.y * wei.wO           +
                        3.0 * ( ber * ber ) * t * B.y * wei.wT   +
                        3.0 * ( ber ) * berO * C.y * wei.wTh     +
                        pow( t, 3.0 ) * D.y * wei.wF
                      ) 
                      /
                      ( pow( ber, 3.0 ) * wei.wO               +
                        3.0 * ( ber * ber ) * t * wei.wT       +
                        3.0 * ( ber ) * berO * wei.wTh         +
                        pow( t, 3.0 ) * wei.wF
                      )
                    );

}

function cubicBO( A, B, C, D, t )
{

    var ber = 1.0 - t; var berO = t * t;

    WO = createVector( ( pow( ber, 3.0 ) * A.x * wei.wO           +
                        3.0 * ( ber * ber ) * t * B.x * wei.wT   +
                        3.0 * ( ber ) * berO * C.x * wei.wTh     +
                        pow( t, 3.0 ) * D.x * wei.wF
                      ) 
                      /
                      ( pow( ber, 3.0 ) * wei.wO               +
                        3.0 * ( ber * ber ) * t * wei.wT       +
                        3.0 * ( ber ) * berO * wei.wTh         +
                        pow( t, 3.0 ) * wei.wF
                      ),
                      ( pow( ber, 3.0 ) * A.y * wei.wO           +
                        3.0 * ( ber * ber ) * t * B.y * wei.wT   +
                        3.0 * ( ber ) * berO * C.y * wei.wTh     +
                        pow( t, 3.0 ) * D.y * wei.wF
                      ) 
                      /
                      ( pow( ber, 3.0 ) * wei.wO               +
                        3.0 * ( ber * ber ) * t * wei.wT       +
                        3.0 * ( ber ) * berO * wei.wTh         +
                        pow( t, 3.0 ) * wei.wF
                      )
                    );

}

function Time()
{

    this.manual = 0;
    this.t = 0.5;
    this.speed = 0.5;

}

function Weight()
{

    this.wO = 1.0;
    this.wT = 1.0;
    this.wTh = 1.0;
    this.wF = 1.0;

}

function Degree()
{

    this.value = 4;

}

function Construction()
{

    this.value = 1;

}

function Iterations()
{

    this.iterations = "OneHundred";

}