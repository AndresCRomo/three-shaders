
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#define PI 3.14159265359
/* 
* SMOOTH MOD
* - authored by @charstiles -
* based on https://math.stackexchange.com/questions/2491494/does-there-exist-a-smooth-approximation-of-x-bmod-y
* (axis) input axis to modify
* (amp) amplitude of each edge/tip
* (rad) radius of each edge/tip
* returns => smooth edges
*/

float smoothMod(float axis, float amp, float rad){
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

void main() {
    vec2 uv= vUv;
    uv.y +=uTime;
    gl_FragColor = vec4(vec3(smoothMod(uv.y * 15.0,1.f,1.5)),1); // Color

}
