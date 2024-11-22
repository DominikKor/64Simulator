class DataStructure {
    items : string[];
    germanColors: { [key: string]: string } = {
            "weiß": "white",
            "schwarz": "black",
            "rot": "red",
            "grün": "green",
            "blau": "blue",
            "gelb": "yellow",
            "grau": "gray",
            "hellgrau": "lightgray",
            "dunkelgrau": "darkgray",
            "hellblau": "lightblue",
            "dunkelblau": "darkblue",
            "pink": "pink",
            "lila": "purple",
            "violett": "violet",
            "orange": "orange",
            "braun": "brown",
            "beige": "beige",
            "gold": "gold",
            "silber": "silver",
            "bronze": "#CD7F32",
            "olivgrün": "olive",
            "türkis": "turquoise",
            "indigo": "indigo",
            "magenta": "magenta",
            "cyan": "cyan",
            "bernstein": "amber",
            "kirschrot": "crimson",
            "flieder": "lavender",
            "dunkelrot": "darkred",
            "dunkelgrün": "darkgreen",
            "hellgelb": "lightyellow",
            "mintgrün": "mintgreen",
            "sandfarben": "sandybrown",
            "karmesinrot": "scarlet",
            "himbeerrot": "raspberry",
            "nachtblau": "midnightblue",
            "limette": "lime",
            "marineblau": "navy",
            "kastanienbraun": "maroon",
            "khaki": "khaki",
            "koralle": "coral",
            "lachs": "salmon",
            "himmelblau": "skyblue",
            "elfenbein": "ivory",
            "creme": "cream",
            "blaugrün": "teal",
        }

    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isColorLight(color: string) {
        // Erstellen eines temporären Elements, um die RGB-Werte zu erhalten
        const tempElem = document.createElement('div');
        tempElem.style.color = color;
        document.body.appendChild(tempElem);

        // Extrahieren der RGB-Werte
        const rgb = window.getComputedStyle(tempElem).color;
        document.body.removeChild(tempElem);

        const rgbValues = rgb.match(/\d+/g)!.map(Number);
        // Berechnung der Helligkeit anhand der RGB-Werte
        const brightness = Math.round(((rgbValues[0] * 299) + (rgbValues[1] * 587) + (rgbValues[2] * 114)) / 1000);
        // Rückgabe true, wenn die Farbe hell ist
        return brightness > 155;
    }

    isColor(strColor: string) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    }

    getColor(color: string) {
        let newColor = color.toLowerCase();

        if (this.germanColors[color]) {
            newColor = this.germanColors[color];
        }

        return this.isColor(newColor) ? newColor : 'grey';
    }
}

export default DataStructure;
