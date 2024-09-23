
uniform float uTime;
uniform vec3 uColor;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vcoords;
varying float vDisplacement;


void main() {
    
    gl_FragColor = vec4(uColor*vDisplacement,1); // Color

}
