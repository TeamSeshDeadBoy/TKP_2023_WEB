class IdNode{
    parent
    children
    val
    constructor(val){
        this.parent=null;
        this.children=[];
        this.val=val;
    }
}

class IdTree{
    root
    idLength
    idChars = ['A','B','C']
    constructor(idLength){
        this.root=new IdNode(null);
        this.idLength = idLength;
    }
    pushIdString(idString){ //"ABC"
        if (typeof idString === 'string' && idString.length==this.idLength){
            var idArray = [...idString];
            for (var i=0; i<idArray.length; i++){
                if (!this.idChars.includes(idArray[i])) return 'error: id contains prohibited values';
            }

            return this._pushIdArray(idArray);

        } else{
            return "error: id doesn't match requerements";
        }
    }
    _pushIdArray(idArray){ // ['A','B','C']
        if (Array.isArray(idArray)){
            var visitor = this.root;
            var value, doCreateNode;
            while(value=idArray.pop()){ // for each char in id
                doCreateNode = true;
                for (var i=0; i<visitor.children.length; i++){ // for each child
                    var child = visitor.children[i];
                    if (child instanceof IdNode){
                        if (child.val==value){
                            doCreateNode = false;
                            if (idArray.length==0) return "failed: ID already exists"
                            visitor = child;
                            i=0;
                            break; // next child iteration
                        }
                    } else return "error1"
                }

                if (doCreateNode){
                    var newIdNode = new IdNode(value);
                    newIdNode.parent = visitor;
                    visitor.children.push(newIdNode);
                    visitor = newIdNode;
                }
            }
        } else return "error0"
        return "success"
    }
    getFreeId(){

    }
    visualize() {
        this._visualizeNode(this.root, 0);
    }

    _visualizeNode(node, depth) {
        const indentation = '  '.repeat(depth);
        console.log(`${indentation}${node.val}`);
        
        for (const child of node.children) {
            if (child instanceof IdNode) {
                this._visualizeNode(child, depth + 1);
            } else {
                console.error('Error: Child is not an instance of IdNode');
            }
        }
    }
}

var idTree = new IdTree(3);
console.log(idTree.pushIdString("ABC"));
console.log(idTree.pushIdString("BBC"));
console.log(idTree.pushIdString("BAC"));
// console.log(idTree.pushIdString("ABC"));
// console.log(idTree.pushIdString("SBC"));
// console.log(idTree.pushIdString("ABCA"));

idTree.visualize();

