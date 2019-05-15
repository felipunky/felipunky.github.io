var A;
var B;
var C;
var W;
var WO;
var t = 0;
var siz = 5;
var sizT = siz * 2;
var sizTh = sizT * 2;
var rate = 120;
var off = 30;
var wei;
var deg;
var steps = 0.01;

p5.disableFriendlyErrors = true; // disables FES

function setup()
{

    frameRate( rate );

    A = createVector( windowWidth * 0.1, windowHeight * 0.1 );
    B = createVector( windowWidth * 0.1, windowHeight * 0.3 );
    C = createVector( windowWidth * 0.7, windowHeight * 0.1 );
    D = createVector( windowWidth * 0.9, windowHeight * 0.2 );
    
    var canvas = createCanvas( windowWidth, windowHeight * 0.5 );
    canvas.parent( "container" );

    wei = new Weight();
    deg = new Degree();

    var gui = new dat.GUI();
    gui.add( deg, "value", 2, 4, 1 ).name( "Degree" );
    var weights = gui.addFolder( "Weights" );
    weights.add( wei, "wO", 0.1, 5.0 ).name( "WeightOne" );
    weights.add( wei, "wT", 0.1, 5.0 ).name( "WeightTwo" );
    weights.add( wei, "wTh", 0.1, 5.0 ).name( "WeightThree" );
    weights.add( wei, "wF", 0.1, 5.0 ).name( "WeightFour" );

    var customContainer = document.getElementById("GUIContainer");
    customContainer.appendChild(gui.domElement);
        
}

function draw()
{

    var time = 0.5 * sin(t) + 0.5;

    background( 0 );

    if( deg.value === 4 )
    {

        /*
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < C.x + off && mouseX > C.x - off && mouseY < C.y + off && mouseY > C.y - off  )
        {
        
            C = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( D.x, D.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < D.x + off && mouseX > D.x - off && mouseY < D.y + off && mouseY > D.y - off  )
        {
        
            D = createVector( mouseX, mouseY );
        
        }
        */

        lineCubicB( A, B, C, D );
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
        ellipse( W.x, W.y, siz, siz );

    }

    if( deg.value === 3 )
    {

        /*
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < C.x + off && mouseX > C.x - off && mouseY < C.y + off && mouseY > C.y - off  )
        {
        
            C = createVector( mouseX, mouseY );
        
        }
        */

        lineQuadB( A, B, C );
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 );
        ellipse( B.x, B.y, sizT, sizT );
        fill( 0, 255, 250 );
        ellipse( C.x, C.y, sizT, sizT );
        quadB( A, B, C, time );
        fill( 255, 0, 0 );
        ellipse( W.x, W.y, siz, siz );

    }

    if( deg.value === 2 )
    {

        /*
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
        */

        lineLinear( A, B );
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 )
        ellipse( B.x, B.y, sizT, sizT );
        lInterp( A, B, time );
        fill( 255, 0, 0 )
        ellipse( W.x, W.y, siz, siz );

    }

    t += 0.01;
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    /*
    let fps = frameRate();
    text("FPS: " + fps.toFixed(2), 100, 200);
    */
    stroke( 255 );
    //fill( 255 );

}

function windowResized()
{
    
    resizeCanvas( windowWidth, windowHeight * 0.5 );
    A = createVector( windowWidth * 0.1, windowHeight * 0.1 );
    B = createVector( windowWidth * 0.1, windowHeight * 0.3 );
    C = createVector( windowWidth * 0.7, windowHeight * 0.1 );
    D = createVector( windowWidth * 0.5, windowHeight * 0.2 );

}

function lineLinear( A, B )
{

    for( var i = 0.0; i <= 1.0; i += steps )
    {
        
        lInterp( A, B, i );
        lInterpO( A, B, i + steps );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
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

    var temp = (1.0 - t) * wei.wO; var tempO = wei.wT * t; var w = temp + tempO;

    WO = createVector( ( temp * A.x + tempO * B.x ) 
                      /
                      w,
                      ( temp * A.y + tempO * B.y ) 
                      /
                      w
                    );
    
}

function lineQuadB( A, B, C )
{

    for (var i = 0.0; i <= 1.0; i += steps )
    {
        
        quadB( A, B, C, i );
        quadBO( A, B, C, i + steps );
        line( W.x, W.y, WO.x, WO.y, siz, siz );
        
    }
    
}

function quadB( A, B, C, t )
{
    
    var ber = 1.0 - t; var berO = t * t;

    W = createVector( ( ber * ber * wei.wO * A.x                  +
                        2.0 * ( t * B.x * wei.wT ) * ber          +
                        berO * C.x * wei.wTh ) 
                        /
                        ( ber * ber * wei.wO                      +
                        2.0 * ( t * wei.wT ) * ber                +
                        berO * wei.wTh ),
                        ( ber * ber * wei.wO * A.y                +
                        2.0 * ( t * B.y * wei.wT ) * ber          +
                        berO * C.y * wei.wTh ) 
                        /
                        ( ber * ber * wei.wO                      +
                        2.0 * ( t * wei.wT ) * ber                +
                        berO * wei.wTh )
                    );
    
}

function quadBO( A, B, C, t )
{
    
    var ber = 1.0 - t; var berO = t * t;

    WO = createVector( ( ber * ber * wei.wO * A.x                  +
                         2.0 * ( t * B.x * wei.wT ) * ber          +
                         berO * C.x * wei.wTh ) 
                         /
                         ( ber * ber * wei.wO                      +
                         2.0 * ( t * wei.wT ) * ber                +
                         berO * wei.wTh ),
                         ( ber * ber * wei.wO * A.y                +
                         2.0 * ( t * B.y * wei.wT ) * ber          +
                         berO * C.y * wei.wTh ) 
                         /
                         ( ber * ber * wei.wO                      +
                         2.0 * ( t * wei.wT ) * ber                +
                         berO * wei.wTh )
                    );
    
}

function lineCubicB( A, B, C, D )
{

    for (var i = 0.0; i < 1.0; i += steps )
    {

        cubicB( A, B, C, D, i );
        cubicBO( A, B, C, D, i + steps );
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

function touchMoved()
{

    if( deg.value === 4 )
    {

        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < C.x + off && mouseX > C.x - off && mouseY < C.y + off && mouseY > C.y - off  )
        {
        
            C = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( D.x, D.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < D.x + off && mouseX > D.x - off && mouseY < D.y + off && mouseY > D.y - off  )
        {
        
            D = createVector( mouseX, mouseY );
        
        }
        /*
        lineCubicB( A, B, C, D );
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
        ellipse( W.x, W.y, siz, siz );
        */
    }

    if( deg.value === 3 )
    {
        
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
    
        else if( mouseIsPressed && dist( C.x, C.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < C.x + off && mouseX > C.x - off && mouseY < C.y + off && mouseY > C.y - off  )
        {
        
            C = createVector( mouseX, mouseY );
        
        }
        /*
        lineQuadB( A, B, C );
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 );
        ellipse( B.x, B.y, sizT, sizT );
        fill( 0, 255, 250 );
        ellipse( C.x, C.y, sizT, sizT );
        quadB( A, B, C, time );
        fill( 255, 0, 0 );
        ellipse( W.x, W.y, siz, siz );
        */
    }

    if( deg.value === 2 )
    {
        
        if( mouseIsPressed && dist( A.x, A.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//if( mouseIsPressed && mouseX < A.x + off && mouseX > A.x - off && mouseY < A.y + off && mouseY > A.y - off  )
        {
        
            A = createVector( mouseX, mouseY );
        
        }

        else if( mouseIsPressed && dist( B.x, B.y, mouseX, mouseY ) < sizTh && mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0 )//else if( mouseIsPressed && mouseX < B.x + off && mouseX > B.x - off && mouseY < B.y + off && mouseY > B.y - off  )
        {
        
            B = createVector( mouseX, mouseY );
        
        }
        /*
        lineLinear( A, B );
        fill( 255, 22, 255 );
        noStroke();
        ellipse( A.x, A.y, sizT, sizT );
        fill( 0, 0, 255 )
        ellipse( B.x, B.y, sizT, sizT );
        lInterp( A, B, time );
        fill( 255, 0, 0 )
        ellipse( W.x, W.y, siz, siz );
        */
    }

}


