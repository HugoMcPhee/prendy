const shaders = {
  backdropAndDepth: {
    backdropVertex: `
    // Attributes
    attribute vec2 position;
    
    // Parameters
    uniform vec2 planePos;
    uniform vec2 stretchSceneAmount;
    uniform vec2 stretchVideoAmount;

    // uniform vec2 texelSize;
    vec2 texelSize = vec2(1.0,1.0);

    
    uniform vec2 scale;
    // Output
    varying vec2 vUV;
    varying vec2 newUv;
    varying vec2 vUVdepth;
    varying vec2 vUVbackdrop;

    varying vec2 sampleCoordS;
    varying vec2 sampleCoordE;
    varying vec2 sampleCoordN;
    varying vec2 sampleCoordW;
    varying vec2 sampleCoordNW;
    varying vec2 sampleCoordSE;
    varying vec2 sampleCoordNE;
    varying vec2 sampleCoordSW;

    
    const vec2 madd = vec2(0.5, 0.5);
    

    mat3 makeTranslation(vec2 t) {  
      mat3 m = mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, t.x, t.y, 1.0);
      return m;
    }   
    mat3 makeRotation( float angleInRadians ){
        float c = cos(angleInRadians);
        float s = sin(angleInRadians);
        mat3 m = mat3(c, -s, 0, s, c, 0, 0, 0, 1);
        return m;
    }
    mat3 makeScale(vec2 s) {
      mat3 m = mat3( s.x, 0, 0, 0, s.y, 0, 0, 0, 1);
        return m;
    }


    
    #define CUSTOM_VERTEX_DEFINITIONS
    
    void main(void) {
    
    #define CUSTOM_VERTEX_MAIN_BEGIN
      
    
      vUV = (position * madd + madd) * scale;



      vec2 trans_position = planePos;  
      vec2 trans_scale = stretchSceneAmount;  
      float rotation = 0.0;   // degrees
      float r = rotation/180.0*3.14159; // radians
          
      vec2 target_res = vec2(1.0,1.0);
      
      
      
      
      mat3 mt = makeTranslation( trans_position );
      mat3 mr = makeRotation( r ); 
      mat3 ms = makeScale( 1.0/trans_scale ); 
      mat3 msVideo = makeScale( 1.0/stretchVideoAmount ); 
      
      //transform
      vec3 newCoord = vec3(vUV.xy,1.0);                
      newCoord = mt*newCoord; 
      newCoord = mr*ms*vec3(newCoord.x - 0.5*target_res.x, newCoord.y - 0.5*target_res.y,0.0) + vec3(0.5*target_res, 0.0);
      newCoord.xy*= 1./target_res;
      
      newUv = vec2(newCoord.x, newCoord.y);
      
      vec3 newVideoCoord = vec3(vUV.xy,1.0);                
      newVideoCoord = mt*newVideoCoord; 
      newVideoCoord = mr*msVideo*vec3(newVideoCoord.x - 0.5*target_res.x, newVideoCoord.y - 0.5*target_res.y,0.0) + vec3(0.5*target_res, 0.0);
      newVideoCoord.xy*= 1./target_res;
      vec2 newVideoUv = vec2(newVideoCoord.x, newVideoCoord.y);
      
      vUVdepth = vec2(newVideoUv.x ,newVideoUv.y * 0.5);
      vUVbackdrop = vec2(newVideoUv.x ,newVideoUv.y * 0.5 + 0.5);


      sampleCoordS = newUv + vec2(0.0, 1.0) * texelSize;
      sampleCoordE = newUv + vec2(1.0, 0.0) * texelSize;
      sampleCoordN = newUv + vec2(0.0, -1.0) * texelSize;
      sampleCoordW = newUv + vec2(-1.0, 0.0) * texelSize;

      sampleCoordNW = newUv + vec2(-1.0, -1.0) * texelSize;
      sampleCoordSE = newUv + vec2(1.0, 1.0) * texelSize;
      sampleCoordNE = newUv + vec2(1.0, -1.0) * texelSize;
      sampleCoordSW = newUv + vec2(-1.0, 1.0) * texelSize;


      gl_Position = vec4(position, 0.0, 1.0);
    
    #define CUSTOM_VERTEX_MAIN_END
    }    
    `,
    postProcessNoFXAA: `
precision highp float;

#ifdef GL_ES
  precision mediump float;
#endif


/// <summary>
/// Uniform variables.
/// <summary>
uniform sampler2D DepthTextureSample; // picture Depth texture
uniform sampler2D BackdropTextureSample; // Backdrop texture
uniform highp sampler2D SceneDepthTexture;
uniform sampler2D textureSampler; // color texture from webgl?

// uniform vec2 texelSize;
vec2 texelSize = vec2(1.0, 1.0);


/// <summary>
/// Varying variables.
/// <summary>
varying vec2 vUV;
varying vec2 newUv;
varying vec2 vUVdepth;
varying vec2 vUVbackdrop;

varying vec2 sampleCoordS;
varying vec2 sampleCoordE;
varying vec2 sampleCoordN;
varying vec2 sampleCoordW;
varying vec2 sampleCoordNW;
varying vec2 sampleCoordSE;
varying vec2 sampleCoordNE;
varying vec2 sampleCoordSW;


// Samplers
// varying vec2 vUV;
// uniform sampler2D textureSampler;

// Parameters
uniform vec2 planePos;
uniform vec2 stretchSceneAmount;
uniform vec2 stretchVideoAmount;


#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
	#define TEXTUREFUNC(s, c, l) texture2DLodEXT(s, c, l)
#else
	#define TEXTUREFUNC(s, c, b) texture2D(s, c, b)
#endif


mat3 makeTranslation(vec2 t) {  
    mat3 m = mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, t.x, t.y, 1.0);
    return m;
}   
mat3 makeRotation( float angleInRadians ){
    float c = cos(angleInRadians);
    float s = sin(angleInRadians);
    mat3 m = mat3(c, -s, 0, s, c, 0, 0, 0, 1);
    return m;
}
mat3 makeScale(vec2 s) {
  mat3 m = mat3( s.x, 0, 0, 0, s.y, 0, 0, 0, 1);
    return m;
}

const float fxaaQualitySubpix = 1.0;
const float fxaaQualityEdgeThreshold = 0.166;
const float fxaaQualityEdgeThresholdMin = 0.0833;
const vec3 kLumaCoefficients = vec3(0.2126, 0.7152, 0.0722);

#define FxaaLuma(rgba) dot(rgba.rgb, kLumaCoefficients)

void main(void)
{

  


  // ----------------------

vec4 color = texture2D(textureSampler, newUv);
vec4 sceneDepthTexture = texture2D(SceneDepthTexture, newUv);
vec4 depthTexture = texture2D(BackdropTextureSample, vUVdepth);
vec4 backdropTexture = texture2D(BackdropTextureSample, vUVbackdrop);

float imageDepth = depthTexture.x;
float sceneDepth = sceneDepthTexture.r;	// depth value from DepthRenderer: 0 to 1


vec4 sceneOnBackdropColor = (sceneDepth >= imageDepth) ?   backdropTexture : color;

// this one prevents the weird white outlines
vec4 sceneOnBackdropColorSmoother = mix(backdropTexture, sceneOnBackdropColor, color.w);

// amount for color
// amount for backdrop
// should both be a number combined make 1

gl_FragColor = sceneOnBackdropColorSmoother;






// ------------------------------------

// vec2 posM;

//   posM.x = newUv.x;
//   posM.y = newUv.y;

//   vec4 rgbyM = TEXTUREFUNC(textureSampler, vUV, 0.0);
//   float lumaM = FxaaLuma(rgbyM);
//   float lumaS = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordS, 0.0));
//   float lumaE = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordE, 0.0));
//   float lumaN = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordN, 0.0));
//   float lumaW = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordW, 0.0));
//   float maxSM = max(lumaS, lumaM);
//   float minSM = min(lumaS, lumaM);
//   float maxESM = max(lumaE, maxSM);
//   float minESM = min(lumaE, minSM);
//   float maxWN = max(lumaN, lumaW);
//   float minWN = min(lumaN, lumaW);
//   float rangeMax = max(maxWN, maxESM);
//   float rangeMin = min(minWN, minESM);
//   float rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;
//   float range = rangeMax - rangeMin;
//   float rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);

// #ifndef MALI
//   if(range < rangeMaxClamped) {
//     gl_FragColor = rgbyM;
//     return;
//   }
// #endif

//   float lumaNW = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordNW, 0.0));
//   float lumaSE = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordSE, 0.0));
//   float lumaNE = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordNE, 0.0));
//   float lumaSW = FxaaLuma(TEXTUREFUNC(textureSampler, sampleCoordSW, 0.0));
//   float lumaNS = lumaN + lumaS;
//   float lumaWE = lumaW + lumaE;
//   float subpixRcpRange = 1.0 / range;
//   float subpixNSWE = lumaNS + lumaWE;
//   float edgeHorz1 = (-2.0 * lumaM) + lumaNS;
//   float edgeVert1 = (-2.0 * lumaM) + lumaWE;
//   float lumaNESE = lumaNE + lumaSE;
//   float lumaNWNE = lumaNW + lumaNE;
//   float edgeHorz2 = (-2.0 * lumaE) + lumaNESE;
//   float edgeVert2 = (-2.0 * lumaN) + lumaNWNE;
//   float lumaNWSW = lumaNW + lumaSW;
//   float lumaSWSE = lumaSW + lumaSE;
//   float edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);
//   float edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);
//   float edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;
//   float edgeVert3 = (-2.0 * lumaS) + lumaSWSE;
//   float edgeHorz = abs(edgeHorz3) + edgeHorz4;
//   float edgeVert = abs(edgeVert3) + edgeVert4;
//   float subpixNWSWNESE = lumaNWSW + lumaNESE;
//   float lengthSign = texelSize.x;
//   bool horzSpan = edgeHorz >= edgeVert;
//   float subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;

//   if(!horzSpan) {
//     lumaN = lumaW;
//   }

//   if(!horzSpan) {
//     lumaS = lumaE;
//   }

//   if(horzSpan) {
//     lengthSign = texelSize.y;
//   }

//   float subpixB = (subpixA * (1.0 / 12.0)) - lumaM;
//   float gradientN = lumaN - lumaM;
//   float gradientS = lumaS - lumaM;
//   float lumaNN = lumaN + lumaM;
//   float lumaSS = lumaS + lumaM;
//   bool pairN = abs(gradientN) >= abs(gradientS);
//   float gradient = max(abs(gradientN), abs(gradientS));

//   if(pairN) {
//     lengthSign = -lengthSign;
//   }

//   float subpixC = clamp(abs(subpixB) * subpixRcpRange, 0.0, 1.0);
//   vec2 posB;

//   posB.x = posM.x;
//   posB.y = posM.y;

//   vec2 offNP;

//   offNP.x = (!horzSpan) ? 0.0 : texelSize.x;
//   offNP.y = (horzSpan) ? 0.0 : texelSize.y;

//   if(!horzSpan) {
//     posB.x += lengthSign * 0.5;
//   }

//   if(horzSpan) {
//     posB.y += lengthSign * 0.5;
//   }

//   vec2 posN;

//   posN.x = posB.x - offNP.x * 1.5;
//   posN.y = posB.y - offNP.y * 1.5;

//   vec2 posP;

//   posP.x = posB.x + offNP.x * 1.5;
//   posP.y = posB.y + offNP.y * 1.5;

//   float subpixD = ((-2.0) * subpixC) + 3.0;
//   float lumaEndN = FxaaLuma(TEXTUREFUNC(textureSampler, posN, 0.0));
//   float subpixE = subpixC * subpixC;
//   float lumaEndP = FxaaLuma(TEXTUREFUNC(textureSampler, posP, 0.0));

//   if(!pairN) {
//     lumaNN = lumaSS;
//   }

//   float gradientScaled = gradient * 1.0 / 4.0;
//   float lumaMM = lumaM - lumaNN * 0.5;
//   float subpixF = subpixD * subpixE;
//   bool lumaMLTZero = lumaMM < 0.0;

//   lumaEndN -= lumaNN * 0.5;
//   lumaEndP -= lumaNN * 0.5;

//   bool doneN = abs(lumaEndN) >= gradientScaled;
//   bool doneP = abs(lumaEndP) >= gradientScaled;

//   if(!doneN) {
//     posN.x -= offNP.x * 3.0;
//   }

//   if(!doneN) {
//     posN.y -= offNP.y * 3.0;
//   }

//   bool doneNP = (!doneN) || (!doneP);

//   if(!doneP) {
//     posP.x += offNP.x * 3.0;
//   }

//   if(!doneP) {
//     posP.y += offNP.y * 3.0;
//   }

//   if(doneNP) {
//     if(!doneN)
//       lumaEndN = FxaaLuma(TEXTUREFUNC(textureSampler, posN.xy, 0.0));
//     if(!doneP)
//       lumaEndP = FxaaLuma(TEXTUREFUNC(textureSampler, posP.xy, 0.0));
//     if(!doneN)
//       lumaEndN = lumaEndN - lumaNN * 0.5;
//     if(!doneP)
//       lumaEndP = lumaEndP - lumaNN * 0.5;

//     doneN = abs(lumaEndN) >= gradientScaled;
//     doneP = abs(lumaEndP) >= gradientScaled;

//     if(!doneN)
//       posN.x -= offNP.x * 12.0;
//     if(!doneN)
//       posN.y -= offNP.y * 12.0;

//     doneNP = (!doneN) || (!doneP);

//     if(!doneP)
//       posP.x += offNP.x * 12.0;
//     if(!doneP)
//       posP.y += offNP.y * 12.0;
//   }

//   float dstN = posM.x - posN.x;
//   float dstP = posP.x - posM.x;

//   if(!horzSpan) {
//     dstN = posM.y - posN.y;
//   }
//   if(!horzSpan) {
//     dstP = posP.y - posM.y;
//   }

//   bool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;
//   float spanLength = (dstP + dstN);
//   bool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;
//   float spanLengthRcp = 1.0 / spanLength;
//   bool directionN = dstN < dstP;
//   float dst = min(dstN, dstP);
//   bool goodSpan = directionN ? goodSpanN : goodSpanP;
//   float subpixG = subpixF * subpixF;
//   float pixelOffset = (dst * (-spanLengthRcp)) + 0.5;
//   float subpixH = subpixG * fxaaQualitySubpix;
//   float pixelOffsetGood = goodSpan ? pixelOffset : 0.0;
//   float pixelOffsetSubpix = max(pixelOffsetGood, subpixH);

//   if(!horzSpan) {
//     posM.x += pixelOffsetSubpix * lengthSign;
//   }

//   if(horzSpan) {
//     posM.y += pixelOffsetSubpix * lengthSign;
//   }







// // #ifdef MALI
// //   if(range < rangeMaxClamped) {
// //     gl_FragColor = rgbyM;
// //   } else {
// //     gl_FragColor = TEXTUREFUNC(textureSampler, posM, 0.0);
// //   }
// // #else
// //   gl_FragColor = TEXTUREFUNC(textureSampler, posM, 0.0);
// // #endif


}
    `,
  },
};

export default shaders;
