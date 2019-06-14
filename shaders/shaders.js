var emissive_mat_vert = `
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

var emissive_mat_frag = `
uniform vec3 emissiveColor;

void main()
{
    vec3 radiance = pow(emissiveColor, vec3(1.0/2.2));
    gl_FragColor = vec4(radiance, 1.0);
}
`