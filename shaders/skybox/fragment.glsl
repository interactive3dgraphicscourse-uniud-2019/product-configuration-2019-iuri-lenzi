//sky-fragment
varying vec2 vUV;
uniform sampler2D skyMap;
uniform float diffOnly;

void main()
{
    vec3 skyColor = texture2D(skyMap, vec2(1.0 - vUV.x, vUV.y)).rgb;
    if(!(diffOnly == 1.0))
        gl_FragColor = vec4(pow(skyColor, vec3(1.0/2.2)), 1.0);
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}