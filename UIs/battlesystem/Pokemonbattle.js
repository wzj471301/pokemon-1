var debuging = false;

function log(str) {
    if (debuging) {
        alert(str);
        console.log(str);
    }
}

function PokemonType() {
    this.name = "";
    this.index = 0;
    this.type;
    this.baseState = [];

    this.getBaseState = function () {
        var ary = pokemonDb[this.index]['BaseStats'].split(",");
        this.baseState["hp"] = parseInt(ary[0]);
        this.baseState['atk'] = parseInt(ary[1]);
        this.baseState['def'] = parseInt(ary[2]);
        this.baseState['spd'] = parseInt(ary[3]);
        this.baseState['spAtk'] = parseInt(ary[4]);
        this.baseState['spDef'] = parseInt(ary[5]);
    };

    this.getDatabyIndex = function (dex) {

        if (!pokemonDb[dex]) {
            log(dex + "pokemon dex not found");
            return;
        }
        this.index = dex;
        this.name = pokemonDb[dex]["Name"];
        //	console.log(allData[dex]);
        this.type = pokemonDb[dex]["Type1"].split(",");
        //	console.log(this.type);
        this.getBaseState();
    };


}