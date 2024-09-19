
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
    vec3 color = vec3(0.3, 0.0, 1.0); // Color
    
    gl_FragColor = vec4(vUv.xxx, 1.0); // Color

}
