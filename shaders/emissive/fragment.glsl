//emissive-fragment
uniform vec3 emissiveColor;
uniform float diffOnly;

void main()
{
    vec3 radiance = emissiveColor;
    gl_FragColor = vec4(radiance, 1.0);
}