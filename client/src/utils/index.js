import { Prompts } from "../constants";
export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(
        Math.random()*Prompts.length
    );
    const randomPrompt=Prompts[randomIndex];

if(randomPrompt==prompt) return getRandomPrompt(prompt) 
    return randomPrompt;
}

export async function downloadImage(_id,photo) {
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
    
}