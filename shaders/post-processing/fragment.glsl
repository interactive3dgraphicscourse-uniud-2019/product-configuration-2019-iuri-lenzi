//post-fragment
varying vec2 vUV;

uniform sampler2D tDiffuseScene;
uniform sampler2D tDiffuseEmi;
uniform float diffOnly;

void main()
{
    vec3 color = texture2D(tDiffuseEmi, vUV).rgb;
    gl_FragColor = vec4(color, 1.0);
}