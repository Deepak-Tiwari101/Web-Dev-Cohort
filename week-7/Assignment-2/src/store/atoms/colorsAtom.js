import { atom } from 'recoil'

export const colorsAtom = atom({
    key: 'colorsAtom',
    default: [
        {
            colorName: "Red",
            color: "red",
            textColor: "black"
        },
        {
            colorName: "Yellow",
            color: "yellow",
            textColor: "black"
        },
        {
            colorName: "Black",
            color: "black",
            textColor: "white"
        },
        {
            colorName: "Purple",
            color: "purple",
            textColor: "white"
        },
        {
            colorName: "Green",
            color: "green",
            textColor: "black"
        },
        {
            colorName: "Blue",
            color: "blue",
            textColor: "white"
        },
        {
            colorName: "Default",
            color: "white",
            textColor: "black"
        },
    ]
});