const shaders = {
  backdropAndDepth: {
    vertexSource: `
    precision highp float;

    // Attributes
    attribute vec3 position;
    attribute vec2 uv;

    // Uniforms
    uniform mat4 worldViewProjection;

    // Varying
    varying vec2 vUV;
    varying vec2 vUVdepth;
    varying vec2 vUVbackdrop;

    void main(void) {
        gl_Position = worldViewProjection * vec4(position, 1.0);

        // if ((0.5 - uv.y) * 2.0 > 1.0-1.0)
        //   discard;
        vUV = uv;
        vUVdepth = vec2(uv.x ,uv.y * 0.5);
        vUVbackdrop = vec2(uv.x ,uv.y * 0.5 + 0.5);;

    }

    `,
    fragmentSource: `
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

    /// <summary>
    /// Varying variables.
    /// <summary>
    varying vec2 vUV;
    varying vec2 vUVdepth;
    varying vec2 vUVbackdrop;

    // varying vec2 position;

    void main() {
      // if ((0.5 - vUV.y) * 2.0 > 1.0-sSelectedCropVal)
      // if ((0.5 - vUV.y) * 2.0 > 1.0-1.0)
      //         discard;
          // if ((vUV.y - 0.5) * 2.0 > 1.0-0.5)
          //     discard;

      // vec4 color = texture2D(textureSampler, vUV.xy);

      vec4 color = texture2D(textureSampler, vUV);
    	vec4 sceneDepthTexture = texture2D(SceneDepthTexture, vUV);
    	vec4 depthTexture = texture2D(BackdropTextureSample, vUVdepth);
    	vec4 backdropTexture = texture2D(BackdropTextureSample, vUVbackdrop);

    	float imageDepth = depthTexture.x;
    	float sceneDepth = sceneDepthTexture.r;	// depth value from DepthRenderer: 0 to 1



      vec4 testColor2A = (sceneDepth >= imageDepth) ?   backdropTexture : color;
      vec4 testColor2 = mix(backdropTexture, testColor2A, color.w);

      // amount for color
      // amount for backdrop
      // should both be a number combined make 1


    	gl_FragColor = testColor2;
    }

    `,
    postProcess: `
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

    /// <summary>
    /// Varying variables.
    /// <summary>
    varying vec2 vUV;
    vec2 vUVdepth;
    vec2 vUVbackdrop;

    // varying vec2 position;

    // Samplers
    // varying vec2 vUV;
    // uniform sampler2D textureSampler;

    // Parameters
    uniform vec2 testOffset;
    uniform float highlightThreshold;

    float highlights(vec3 color)
    {
    return smoothstep(highlightThreshold, 1.0, dot(color, vec3(0.3, 0.59, 0.11)));
    }

    void main(void)
    {

      // vUV = uv;
      vUVdepth = vec2(vUV.x ,vUV.y * 0.5);
      vUVbackdrop = vec2(vUV.x ,vUV.y * 0.5 + 0.5);;

    // vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
    // vec4 baseColor = texture2D(textureSampler, vUV + vec2(-1.0, -1.0) * texelSize) * 0.25;
    // baseColor += texture2D(textureSampler, vUV + vec2(1.0, -1.0) * texelSize) * 0.25;
    // baseColor += texture2D(textureSampler, vUV + vec2(1.0, 1.0) * texelSize) * 0.25;
    // baseColor += texture2D(textureSampler, vUV + vec2(-1.0, 1.0) * texelSize) * 0.25;
    
    // baseColor.a = highlights(baseColor.rgb);

    vec4 baseColor = texture2D(textureSampler, vUV);


    // gl_FragColor = baseColor;
    // gl_FragColor = textureSampler;
    // gl_FragColor = textureSampler;


    // if ((0.5 - vUV.y) * 2.0 > 1.0-sSelectedCropVal)
    // if ((0.5 - vUV.y) * 2.0 > 1.0-1.0)
    //         discard;
        // if ((vUV.y - 0.5) * 2.0 > 1.0-0.5)
        //     discard;

    // vec4 color = texture2D(textureSampler, vUV.xy);

    vec4 color = texture2D(textureSampler, vUV);
    vec4 sceneDepthTexture = texture2D(SceneDepthTexture, vUV);
    vec4 depthTexture = texture2D(BackdropTextureSample, vUVdepth);
    vec4 backdropTexture = texture2D(BackdropTextureSample, vUVbackdrop);

    float imageDepth = depthTexture.x;
    float sceneDepth = sceneDepthTexture.r;	// depth value from DepthRenderer: 0 to 1



    vec4 testColor2A = (sceneDepth >= imageDepth) ?   backdropTexture : color;
    vec4 testColor2 = mix(backdropTexture, testColor2A, color.w);

    // amount for color
    // amount for backdrop
    // should both be a number combined make 1


    gl_FragColor = testColor2;
    // gl_FragColor = color;
    // gl_FragColor = testColor2A;

    
    }



    `,
  },
};

export default shaders;
