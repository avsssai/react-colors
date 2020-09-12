// // {
// //     paletteName: "Flat UI Colors Aussie",
// //     id: "flat-ui-colors-aussie",
// //     emoji: "🇦🇺",
// //     colors: [
// //       { name: "Beekeeper", color: "#f6e58d" },
// //       { name: "SpicedNectarine", color: "#ffbe76" },
// //       { name: "PinkGlamour", color: "#ff7979" },
// //       { name: "JuneBud", color: "#badc58" },
// //       { name: "CoastalBreeze", color: "#dff9fb" },
// //       { name: "Turbo", color: "#f9ca24" },
// //       { name: "QuinceJelly", color: "#f0932b" },
// //       { name: "CarminePink", color: "#eb4d4b" },
// //       { name: "PureApple", color: "#6ab04c" },
// //       { name: "HintOfIcePack", color: "#c7ecee" },
// //       { name: "MiddleBlue", color: "#7ed6df" },
// //       { name: "Heliotrope", color: "#e056fd" },
// //       { name: "ExodusFruit", color: "#686de0" },
// //       { name: "DeepKoamaru", color: "#30336b" },
// //       { name: "SoaringEagle", color: "#95afc0" },
// //       { name: "GreenlandGreen", color: "#22a6b3" },
// //       { name: "SteelPink", color: "#be2edd" },
// //       { name: "Blurple", color: "#4834d4" },
// //       { name: "DeepCove", color: "#130f40" },
// //       { name: "WizardGrey", color: "#535c68" }
// //     ]
// //   }

import chroma from 'chroma-js';

const levels = [50,100,200,300,400,500,600,700,800,900];

let generatePalette = (starterPalette) => {
    let newPalette = {
        paletteName:starterPalette.paletteName,
        id:starterPalette.id,
        emoji: starterPalette.emoji,
        colors:{}
    }

    // {colors : [
    //     50:[],
    //     100:[],....
    // ]}
    for(let level of levels){
        newPalette.colors[level] = []
    }

    for(let color of starterPalette.colors){
        let scale = generateScale(color.color,10).reverse();

        for(let i in scale){
            newPalette.colors[levels[i]].push({
                name:`${color.name} ${levels[i]}`,
                id:`${color.name}`.toLowerCase().replace(/ /g,'-'),
                hex:scale[i],
                rgb: chroma(scale[i]).css(),
                hsl:chroma(scale[i]).hsl(),
                rgba:chroma(scale[i]).css().replace('rgb','rgba').replace(')',',1.0)')
            })
        }
    }

    return newPalette;

}
    
function getRange(hexColor){
    let end = '#ffffff';
    return ([chroma(hexColor).darken(1.4),hexColor,end])
}
function generateScale(hexColor,numberOfColors){
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}
export {generatePalette};

