//post-fragment
varying vec2 vUV;

uniform sampler2D tDiffuseScene;
uniform sampler2D tDiffuseEmi;
uniform float diffOnly;

void main()
{
    vec3 color = texture2D(tDiffuseScene, vUV).rgb;
    gl_FragColor = vec4(pow(color, vec3(1.0/2.2)), 1.0);
}