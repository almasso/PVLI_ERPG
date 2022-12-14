export default class Inventory{
    constructor(){
        this.inv = [];
        this.money = 10000;
    }

    canBuy(money){
        return this.money >= money;
    }

    buy(item){
        if(this.canBuy(item.price)){
            this.money -= item.price;
            this.addItem(item);
        }
    }

    addItem(obj){
        console.log(this.inv.length);
        let i = this.isItem(obj.name, 0);
        
        if(i !== this.inv.length) this.inv[i].quantity++; 
        else{
            obj.quantity++;
            this.inv.push(obj);
            console.log(this.inv.length);  
        } 
    }

    removeItem(obj){
        let i = this.isItem(obj.name, 0);
        
        if(i !== this.inv.length){
            this.inv[i].quantity--;
            console.log(this.inv[i].name);
            if(this.inv[i].quantity === 0){
                while(i < this.inv.length - 1) {
                    this.inv[i] = this.inv[i + 1];
                    i++;
                }
                this.inv[i] = undefined;
                this.inv.length--;
            }
        }
    }

    isItem(name, i){
        if(this.inv.length === 0) return 0;
        while(i < this.inv.length && this.inv[i].name !== name) i++
        return i;
    }
}


