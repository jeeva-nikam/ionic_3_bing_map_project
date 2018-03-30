var db=require('../dbconnection');

var Task={

getAllTasks:function(callback){

return db.query("Select * from task",callback);

},
getTaskById:function(id,callback){
    console.log('id is', id);
    return db.query("select * from task where id=?",[id],callback);
},
addTask:function(Task,callback){
   console.log("inside service ");
   console.log(Task);
   return db.query("Insert into task values(?,?,?,?,?,?,?,?)",[null, Task.title, 'pending', Task.description, '1', new Date(), '1', new Date()],callback);
},

deleteTask:function(id,callback){
    return db.query("delete from task where id=?",[id],callback);
},
updateTask:function(id,Task,callback){
    return  db.query("update task set Status=? where id=?",[Task.status,id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=Task;