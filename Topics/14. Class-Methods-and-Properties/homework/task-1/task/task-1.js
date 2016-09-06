'use strict';

class LinkedList {
    constructor() {
        this.list=[];
        return this;
    }
    get first(){
        return this.list[0];
    }

    get last(){
        return this.list[this.length-1];
    }

    get length(){
        return this.list.length;
    }

    append(...args){
        for(let i of args) {
            this.list.push(i);
        }
        return this;
    }

    prepend(...args){
        this.list.unshift(...args);
        return this;
    }

    toString(){
        var result=this.list;
        return result.join(' -> ');
    }

    insert(index,...args){
        this.list.splice(index,0,...args);
        return this;
    }

    at(index, value){
        if(value !==undefined){
            this.list.splice(index,1,value);
        }else{
            return this.list[index];
        }

        return this.list;
    }

    removeAt(index){
        let result=this.list[index];
        this.list.splice(index,1);
        return result;
    }

    *[Symbol.iterator]() {
        let index=0;
        let node = this.list[index];
        while (node) {
            yield node;
            index+=1;
            node = this.list[index];
        }

    }

    toArray(){
        let array=[];
        for(let i of this.list){
            array.push(i);
        }
        return array;
    }

}

module.exports = LinkedList;

/*var l= new LinkedList();
l.append(7,2,3,6);
console.log(l.at(2));*/

