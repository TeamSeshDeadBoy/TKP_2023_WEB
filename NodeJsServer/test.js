function generateId(){
    class Tree{
      root;
      constructor(){
        class Node{
          value;
          nextPtr;
          constructor(){
            this.value=null;
            this.nextPtr=null;
            this.nextPtr=new Array;
          }
          constructor(value){
            this.value=value;
            this.nextPtr=null;
          }
        }
        this.root = new Node
      }
      pushId(id) {
        var iterator = 0;
        var nodeVisitor = root;
        while (id.length!=0){
          if (nodeVisitor.nextPtr.includes(new Node(id[iterator]))){

          } else {
            var node = new Node(id[iterator]);
            nodeVisitor.nextPtr.add(node);
          }
        }
      }
    }
  }