export default class Inventory{
    constructor(){
        this.inv = [];
    }

    addItem(obj){
        console.log(this.inv.length);
        let i = 0;
        if(this.isItem(obj.name, i)) this.inv[i].quantity++;
        else{
            obj.quantity++;
            this.inv.push(obj);
            console.log(this.inv.length);  
        } 
    }

    removeItem(obj){
        let i = 0;
        if(this.isItem(obj.name, i))
            this.inv[i].quantity--;
            if(this.inv[i].quantity === 0){
                while(i < this.inv.length - 1) {
                    this.inv[i] = this.inv[i + 1];
                    i++;
                }
                this.inv[i] = undefined;
                this.inv.length--;
            }
    }

    isItem(name, i){
        if(this.inv.length === 0) return false;
        while(i < this.inv.length && this.inv[i].name !== name) i++
        return (i === this.inv.length);
    }
}


