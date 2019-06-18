//emissive-fragment
uniform vec3 emissiveColor;
uniform float diffOnly;

void main()
{
    vec3 radiance = pow(emissiveColor, vec3(1.0/2.2));
    gl_FragColor = vec4(radiance, 1.0);
}