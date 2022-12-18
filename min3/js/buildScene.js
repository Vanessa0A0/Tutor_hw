import { SpriteText2D, MeshText2D, textAlign } from '@kinyoklion/three-text2d/dist/three-text2d.js';
import * as THREE from 'three';

import {scene} from './main-3';

function buildScene() {


   let box = new THREE.Mesh (new THREE.BoxGeometry(50,25,10), new THREE.MeshNormalMaterial());
   box.position.set(0, 12, 0);		
   scene.add (box);


   let text_Hi = new MeshText2D("Hi~", { align: textAlign.center, font: '20px Arial',
							fillStyle: '#000000', antialias: true });
	text_Hi.position.set(0, 25, 10);						
	
	let text_Bye = new MeshText2D("Bye~", { align: textAlign.center, font: '20px Arial',
							fillStyle: '#000000', antialias: true });
	text_Bye.position.set(0, 25, -10);
	text_Bye.rotation.y =  Math.PI;
	
   let text_Say = new SpriteText2D("Say", { align: textAlign.center, font: '30px Arial',
                            fillStyle: '#000000', antialias: true });
	text_Say.position.set(5, 45, 0);							
	
   scene.add(text_Hi, text_Bye, text_Say);
}

export { buildScene };

