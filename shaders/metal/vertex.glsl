//metal-vertex
varying vec3 vNormal;
varying vec3 vViewPosition;

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * viewPos;
}