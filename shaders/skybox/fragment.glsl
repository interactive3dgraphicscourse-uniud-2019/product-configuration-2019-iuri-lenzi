//sky-fragment
varying vec2 vUV;
uniform sampler2D skyMap;

void main()
{
    vec3 skyColor = texture2D(skyMap, vUV).rgb;
    gl_FragColor = vec4(pow(skyColor, vec3(1.0/2.2)), 1.0);
}