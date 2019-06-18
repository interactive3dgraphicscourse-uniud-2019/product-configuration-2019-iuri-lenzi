//post-fragment
varying vec2 vUV;

uniform sampler2D tDiffuseScene;
uniform sampler2D tDiffuseEmi;
uniform float width;
uniform float height;
uniform int bloomRadius;
uniform float kernel[9];
uniform float diffOnly;


vec3 BlurTexture(sampler2D tex)
{
    float step_w = float(bloomRadius) / width;
    float step_h = float(bloomRadius) / height;

    vec2 offset[9];
    offset[0] = vec2(-step_w, -step_h);
    offset[1] = vec2(    0.0, -step_h);
    offset[2] = vec2( step_w, -step_h);
    offset[3] = vec2(-step_w,     0.0);
    offset[4] = vec2(    0.0,     0.0);
    offset[5] = vec2( step_w,     0.0);
    offset[6] = vec2(-step_w,  step_h);
    offset[7] = vec2(    0.0,  step_h);
    offset[8] = vec2( step_w,  step_h);

    vec3 sum = vec3(0.0);

    for(int i = 0; i < 9; i++)
        sum += pow(texture2D(tex, vUV + offset[i]).rgb, vec3(2.2)) * kernel[i];

    return sum;
}

void main()
{
    vec3 emiDiff = pow(texture2D(tDiffuseEmi, vUV).rgb, vec3(2.2));
    vec3 sceneDiff = pow(texture2D(tDiffuseScene, vUV).rgb, vec3(2.2));
    vec3 bleed = BlurTexture(tDiffuseEmi);
    vec3 diff = bleed - emiDiff;
    vec3 color = diff + 0.5*emiDiff + sceneDiff;
    gl_FragColor = vec4(color, 1.0);
}