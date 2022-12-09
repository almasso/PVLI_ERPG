export default class Object{
    constructor(_name, _hp, _mp, _price = 0){
        this.name = _name;
        this.hp = _hp;
        this.mp = _mp;
        this.quantity = 0;
        this.price = _price
    }
}