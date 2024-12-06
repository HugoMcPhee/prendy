const shaders = {
  backdropAndDepth: {
    backdropVertex: `
    // Attributes
    attribute vec2 position;
    
    // Parameters
    uniform vec2 slatePos;
    uniform vec2 stretchSceneAmount;
    uniform vec2 stretchVideoAmount;
    
    uniform float currentFrameIndex;
    uniform float framesPerRow;
    uniform float framesPerColumn;
    uniform vec2 frameSize;

    
    uniform vec2 scale;
    // Output
    varying vec2 vUV;
    varying vec2 newUv;
    varying vec2 newUvFlipped;
    varying vec2 frameUV;
    varying vec2 vUVdepth;
    varying vec2 vUVbackdrop;
    
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

    // Hash function to generate a pseudo-random float based on two inputs
    float customRand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }


    
    #define CUSTOM_VERTEX_DEFINITIONS
    
    void main(void) {
    
    #define CUSTOM_VERTEX_MAIN_BEGIN

    const float wobbleIntensity = 0.0005;
    const float wobbleFrequency = 0.1;
    
    // Use this in vUV to make the screen shake!
    // const float wobbleIntensity = 0.005;
    // const float wobbleFrequency = 0.1;
    // vec2 pos = position;
    // pos.x += sin(currentFrameIndex * wobbleFrequency + pos.y * 10.0) * wobbleIntensity;
    // pos.y += cos(currentFrameIndex * wobbleFrequency + pos.x * 10.0) * wobbleIntensity;
    
      
    
      vUV = (position * madd + madd) * scale;



      vec2 trans_position = slatePos;  
      vec2 trans_scale = stretchSceneAmount;  
      float rotation = 0.0;   // degrees
      float r = rotation/180.0*3.14159; // radians
          
      vec2 target_res = vec2(1.0,1.0);
      
      
      
      
      mat3 mt = makeTranslation( trans_position );
      mat3 mr = makeRotation( r ); 
      mat3 ms = makeScale( 1.0/trans_scale ); 
      mat3 msVideo = makeScale( 1.0/stretchVideoAmount ); 
      
    // Compute the column and row indices for the current frame
    // float col = mod(currentFrameIndex, framesPerRow);
    // float row = floor(currentFrameIndex / framesPerRow);

    // Adjust the original UV coordinates to select the correct frame
    // vec2 frameUV = vUV * frameSize + vec2(col * frameSize.x, row * frameSize.y);


      //transform
      vec3 newCoord = vec3(vUV.xy,1.0);                
      newCoord = mt*newCoord; 
      newCoord = mr*ms*vec3(newCoord.x - 0.5*target_res.x, newCoord.y - 0.5*target_res.y,0.0) + vec3(0.5*target_res, 0.0);
      newCoord.xy*= 1./target_res;
      
      newUv = vec2(newCoord.x, newCoord.y);

    // vec2 pos = position;
    // newUv.x += sin(currentFrameIndex * wobbleFrequency + newUv.y * 10.0) * wobbleIntensity;
    // newUv.y += cos(currentFrameIndex * wobbleFrequency + newUv.x * 10.0) * wobbleIntensity;
    
    // Generate a unique seed for each vertex based on position and frame index
    vec2 seed = vec2(position.x, position.y) + currentFrameIndex;

    // Generate random offsets
    float offsetX = (customRand(seed) - 0.5) * 2.0 * wobbleIntensity; // Range: [-wobbleIntensity, +wobbleIntensity]
    float offsetY = (customRand(seed + vec2(1.0, 0.0)) - 0.5) * 2.0 * wobbleIntensity;

    // Apply the offsets to the vertex position
    // vec3 pos = position;
    newUv.x += offsetX;
    newUv.y += offsetY;



      // Compute the column and row indices for the current frame
      float col = mod(currentFrameIndex, framesPerRow);
      float row = floor(currentFrameIndex / framesPerRow);

      // make the same as newUv but flipped on the y axis
      newUvFlipped = vec2((newCoord.x * frameSize.x) + (col * frameSize.x), ((1.0 - newCoord.y) * frameSize.y)+ + (row * frameSize.y));


      // Adjust the original UV coordinates to select the correct frame
      // vec2 frameUV = newUvFlipped * frameSize + vec2(col * frameSize.x, row * frameSize.y);

      // frameUV = vec2(newCoord.x * col * frameSize.x, 1.0 - newCoord.y * row * frameSize.y);
      // frameUV = vec2(newCoord.x * frameSize.x, 1.0 - newCoord.y * frameSize.y);
      // frameUV = vec2(newCoord.x * frameSize.x, 1.0 - newCoord.y * frameSize.y);


      // Adjust the original UV coordinates to select the correct frame
      // vec2 frameUV = vUV * frameSize + vec2(col * frameSize.x, row * frameSize.y);
      // frameUV = vUV * frameSize + vec2(col * frameSize.x, row * frameSize.y);




      // frameUV = vec2(newCoord.x * 0.5 ,  newCoord.y * frameSize.y);

    
      // Adjust the original UV coordinates to select the correct frame
      // vec2 frameUV = newUvFlipped * frameSize + vec2(col * frameSize.x, row * frameSize.y);
      // vec2 frameUV = newUvFlipped;

      
      vec3 newVideoCoord = vec3(vUV.xy,1.0);                
      newVideoCoord = mt*newVideoCoord; 
      newVideoCoord = mr*msVideo*vec3(newVideoCoord.x - 0.5*target_res.x, newVideoCoord.y - 0.5*target_res.y,0.0) + vec3(0.5*target_res, 0.0);
      newVideoCoord.xy*= 1./target_res;
      vec2 newVideoUv = vec2(newVideoCoord.x, newVideoCoord.y);
      
      vUVdepth = vec2(newVideoUv.x ,newVideoUv.y * 0.5);
      vUVbackdrop = vec2(newVideoUv.x ,newVideoUv.y * 0.5 + 0.5);


      gl_Position = vec4(position, 0.0, 1.0);
    
    #define CUSTOM_VERTEX_MAIN_END
    }    
    `,
    backdropFragment: `
precision highp float;

#ifdef GL_ES
  precision mediump float;
#endif


/// <summary>
/// Uniform variables.
/// <summary>
uniform sampler2D DepthTextureSample; // picture Depth texture
uniform sampler2D BackdropTextureSample; // Backdrop texture
// uniform highp sampler2DArray BackdropColorTextureSample; // Backdrop array texture
uniform highp sampler2D BackdropColorTextureSample; // Backdrop texture
uniform highp sampler2D BackdropDepthTextureSample; // Backdrop texture
uniform highp sampler2D SceneDepthTexture;
uniform sampler2D textureSampler; // color texture from webgl?
uniform highp float randomNumber;
uniform highp float randomNumberB;
uniform highp float randomNumberC;
uniform highp float paintAmount;


/// <summary>
/// Varying variables.
/// <summary>
varying vec2 vUV;
varying vec2 newUv;
varying vec2 newUvFlipped;
varying vec2 frameUV;
varying vec2 vUVdepth;
varying vec2 vUVbackdrop;


// Samplers
// varying vec2 vUV;
// uniform sampler2D textureSampler;

// Parameters
// uniform vec2 slatePos;
// uniform vec2 stretchSceneAmount;
// uniform vec2 stretchVideoAmount;

float gradientNoise(in vec2 uv, in float seed)
{
	// return fract(52.9829189 * fract(dot(uv, vec2(0.06711056, 0.00583715))));
  return fract(52.9829189 * fract(dot(uv + vec2(seed), vec2(0.06711056, 0.00583715))));
}

// // Function to adjust contrast
// vec3 adjustContrast(vec3 color, float contrast) {
//     return ((color - 0.5) * contrast) + 0.5;
// }

// // Function to adjust saturation
// vec3 adjustSaturation(vec3 color, float saturation) {
//     // Calculate luminance
//     float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
//     return mix(vec3(luminance), color, saturation);
// }

// // Function to adjust brightness
// vec3 adjustBrightness(vec3 color, float brightness) {
//     return color + vec3(brightness);
// }



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


// Kuwahara Filter Function
vec4 kuwaharaFilter(sampler2D tex, vec2 uv, float texelScale) {
    const vec2 resolution = vec2(512.0, 512.0);

    // Define texel size
    vec2 texel = texelScale / resolution;

    // Define offsets for a 3x3 window
    vec2 offsets[9];
    offsets[0] = vec2(-texel.x, -texel.y);
    offsets[1] = vec2( 0.0f,    -texel.y);
    offsets[2] = vec2( texel.x, -texel.y);
    offsets[3] = vec2(-texel.x,  0.0f);
    offsets[4] = vec2( 0.0f,     0.0f);
    offsets[5] = vec2( texel.x,  0.0f);
    offsets[6] = vec2(-texel.x,  texel.y);
    offsets[7] = vec2( 0.0f,     texel.y);
    offsets[8] = vec2( texel.x,  texel.y);

    // Initialize variables to store region statistics
    float minVariance = 1e20;
    vec4 meanColor = vec4(0.0);

    // Define four regions (quadrants)
    int regions = 4;
    for(int r = 0; r < regions; r++) {
        vec4 sum = vec4(0.0);
        vec4 sumSq = vec4(0.0);
        int samples = 0;

        // Define each region's sample indices
        // Region 0: Top-left
        // Region 1: Top-right
        // Region 2: Bottom-left
        // Region 3: Bottom-right
        for(int i = 0; i < 4; i++) {
            int idx = r * 2 + i;
            if(idx >= 0 && idx < 9) { // Ensure index is within bounds
                vec4 the_sample = texture2D(tex, uv + offsets[idx]);
                sum += the_sample;
                sumSq += the_sample * the_sample;
                samples++;
            }
        }

        // Calculate mean and variance
        vec4 mean = sum / float(samples);
        vec4 variance = (sumSq / float(samples)) - (mean * mean);
        float var = (variance.r + variance.g + variance.b) / 3.0;

        // Select the region with the smallest variance
        if(var < minVariance) {
            minVariance = var;
            meanColor = mean;
        }
    }

    return meanColor;
}

void main(void)
{



// vec4 color = texture2D(textureSampler, newUv);
vec4 sceneDepthTexture = texture2D(SceneDepthTexture, newUv);
// vec4 depthTexture = texture2D(BackdropTextureSample, vUVdepth);
// vec4 backdropTexture = texture2D(BackdropTextureSample, vUVbackdrop);
// vec4 newColor = texture2D(BackdropColorTextureSample, vec3(newUv, 0));
vec4 depthTexture = texture2D(BackdropDepthTextureSample, newUvFlipped);
vec4 backdropTexture = texture2D(BackdropColorTextureSample, newUvFlipped);


float imageDepth = depthTexture.x;
float sceneDepth = sceneDepthTexture.r;	// depth value from DepthRenderer: 0 to 1

// const float texelScale = 2.0;
// vec4 color = kuwaharaFilter(textureSampler, newUv, texelScale);
vec4 color = kuwaharaFilter(textureSampler, newUv, paintAmount);


// Good for low compression
// float quantizationLevelsA = 100.0;
// Good for high compression
float quantizationLevelsA = 64.0;

// Quantize each color channel
color.r = floor(color.r * quantizationLevelsA) / quantizationLevelsA;
color.g = floor(color.g * quantizationLevelsA) / quantizationLevelsA;
color.b = floor(color.b * quantizationLevelsA) / quantizationLevelsA;
    

// Define the number of noise layers you want to apply
// const float noiseLayers_color = 18.0;
const float noiseLayers_color = 6.0;

// Calculate the noise once
float noise_color = gradientNoise(gl_FragCoord.xy, randomNumber);

// Scale the noise by the number of layers and adjust the offset
color += vec4((noise_color * noiseLayers_color / 255.0) - (0.5 * noiseLayers_color / 255.0));

// Good for low compression
// float quantizationLevels = 10.0;
// Good for high compression
float quantizationLevels = 32.0;

// Quantize each color channel
color.r = floor(color.r * quantizationLevels) / quantizationLevels;
color.g = floor(color.g * quantizationLevels) / quantizationLevels;
color.b = floor(color.b * quantizationLevels) / quantizationLevels;
    



// Apply brightness adjustment
// color.rgb = adjustBrightness(color.rgb, -0.3);

// Apply contrast adjustment
// color.rgb = adjustContrast(color.rgb, 0.9);
// color.rgb = adjustContrast(color.rgb, 1.0);

// Apply saturation adjustment
// color.rgb = adjustSaturation(color.rgb, 1.025);


// Clamp the color to [0.0, 1.0] to avoid artifacts
// color.rgb = clamp(color.rgb, 0.0, 1.0);


// Define the number of noise layers you want to apply
const float noiseLayers_backrop = 18.0;

// Calculate the noise once
float noise_backrop = gradientNoise(gl_FragCoord.xy, randomNumberB);

// Scale the noise by the number of layers and adjust the offset
backdropTexture += vec4((noise_backrop * noiseLayers_backrop / 255.0) - (0.5 * noiseLayers_backrop / 255.0));


vec4 sceneOnBackdropColor = (sceneDepth >= imageDepth) ?   backdropTexture : color;

// this one prevents the weird white outlines
vec4 sceneOnBackdropColorSmoother = mix(backdropTexture, sceneOnBackdropColor, color.a);

// amount for color
// amount for backdrop
// should both be a number combined make 1


// gl_FragColor = vec4(bgcolor, 1.0);


// Define the number of noise layers you want to apply
const float noiseLayers_combined = 8.0;

// Calculate the noise once
float noise_combined = gradientNoise(gl_FragCoord.xy, randomNumberC);

// Scale the noise by the number of layers and adjust the offset
backdropTexture += vec4((noise_combined * noiseLayers_combined / 255.0) - (0.5 * noiseLayers_combined / 255.0));


gl_FragColor = sceneOnBackdropColorSmoother;
// gl_FragColor = newColor;
// gl_FragColor = backdropTexture;



}
    `,
  },
};

export default shaders;
