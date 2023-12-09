// import React, { useRef, useState } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import * as THREE from 'three';

// export default function Model(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF("/electric_motor.glb");
//   const { actions } = useAnimations(animations, group);

//   const [temperature, setTemperature] = useState(150); // Initial temperature

//   // Set up materials with enhanced shading properties
//   materials.parts.color.set("0xffffff"); // Change to white
//   materials.closingParts.color.set("#0000ff"); // Change to black

//   // Adjust shading properties for a more vibrant 3D effect
//   materials.parts.metalness = 0.8; // Increase metalness for a shiny effect
//   materials.parts.roughness = 0.1; // Decrease roughness for a glossy effec
//   materials.closingParts.metalness = 0.8;
//   materials.closingParts.roughness = 0.1;

//   // Function to update the temperature and simulate overheating
//   const simulateOverheating = () => {
//     const newTemperature = temperature + 10; // Increase the temperature
//     setTemperature(Math.min(newTemperature, 150)); // Cap the temperature at 150
//   };

//   // Function to determine color based on temperature
//   const getBodyColor = () => {
//     let color;

//     if (temperature < 50) {
//       // Sky blue to white gradient
//       const t = temperature / 50;
//       color = new THREE.Color(0.6, 0.8, 1).lerp(new THREE.Color(1, 1, 1), t);
//     } else if (temperature <= 100) {
//       // Red to orange gradient
//       const t = (temperature - 50) / 50;
//       color = new THREE.Color(1, t * 0.5, 0);
//     } else {
//       // Red to orange to yellow gradient
//       const t = (temperature - 100) / 50;
//       color = new THREE.Color(1, 0.5, 0).lerp(new THREE.Color(1, 1, 0), t);
//     }

//     // Enhance brightness
//     return color.multiplyScalar(1.5);
//   };

//   // Set up the body material with dynamic color based on temperature
//   materials.body.color.copy(getBodyColor());

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//         <group rotation={[Math.PI / 2, 0, 0]}>
//           {/* Motor model */}
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.defaultMaterial.geometry}
//             material={materials.body}
//             onClick={simulateOverheating}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.defaultMaterial_1.geometry}
//             material={materials.parts}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.defaultMaterial_2.geometry}
//             material={materials.closingParts}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/electric_motor.glb");


import React, { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from 'three';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/electric_motor.glb");
  const { actions } = useAnimations(animations, group);

  const [temperature, setTemperature] = useState(20); // Initial temperature

  // Set up materials with enhanced shading properties
  materials.parts.color.set("0xffffff"); // Change to white
  materials.closingParts.color.set("#0000ff"); // Change to black

  // Adjust shading properties for a more vibrant 3D effect
  materials.parts.metalness = 0.8; // Increase metalness for a shiny effect
  materials.parts.roughness = 0.1; // Decrease roughness for a glossy effect

  materials.closingParts.metalness = 0.8;
  materials.closingParts.roughness = 0.1;

  // Function to update the temperature and simulate overheating
  const simulateOverheating = () => {
    const newTemperature = temperature + 10; // Increase the temperature
    setTemperature(Math.min(newTemperature, 150)); // Cap the temperature at 150
  };

  // Function to determine color based on temperature
  const getBodyColor = () => {
    if (temperature < 50) {
      return new THREE.Color(0.6, 0.8, 1).multiplyScalar(3); // Enhance blue color
    } else if (temperature >= 50 && temperature <= 100) {
      const t = (temperature - 50) / 50; // Normalize temperature between 50 and 100
      return new THREE.Color(1, t * 0.5, 0).multiplyScalar(1.5); // Enhance red color
    } else {
      // Dark red with orange and yellow tones, highlighted
      return new THREE.Color(1, 0, 0).multiplyScalar(1.2).add(new THREE.Color(1, 0.9, 0.5).multiplyScalar(0.6));
    }
  };

  // Set up the body material with dynamic color based on temperature
  materials.body.color.copy(getBodyColor());

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Motor model */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.body}
            onClick={simulateOverheating}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.closingParts}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/electric_motor.glb");

