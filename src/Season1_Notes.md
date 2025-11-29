
1. Node.js is an open source run time environment to run javascript code any where and run with help of v8 javascript engine google chrome and it work acyncrounicsly 

2. Now we can run js code ouside the web browser- it means because of node.js we can wright js code on server side 

3. Actually before node.js js is written only on FE side on web and backend done in python, java , we need 2 saperate developers but node.js   help run javascript code on server side so a 1 developers can wright code on both sides called as full stack developer 

4. NOTE- node.js written in 62% in js and v8 engine inside written with 72% c++ code 
5.  V8 can be embedded into any C++ application.
we wright in js and engine read it 
6. ECMA Script ES6 js follow this standerds or rules eg we wright like theis == or === etc [ js engine follow these standards]

7. why v8 written in c++ 
we know computer understand binary code on top of it there is -> assembly code -> Machine Code -> High level language which is c++ and we can not understand these languages 

// ecma script rules website https://tc39.es/ecma262/


8. install node.js / download 
9. control + ~  open terminal on vscode 
10. window + ~  open terminal of window 

11. Here global object is 'global' not 'window' and this is not equal to window in node.js it gives {} just we do in frontend so every browsers have diffrent name for this object so now it gets changed to 'globalThis' so all browser support it 

console.log(window)
console.log(this)
console.log(global)
console.log(globalThis)

12. when we create any single file and wright code inside that we call that module that is why we export like this module.exports = name 
for multiple exports
module.exports = {name1,name2}                   // export
const {name1,name2} = require('./file name ')  // import

in package.json {type:'commandjs or type:'module'}

in node by default                                -     in react angular by default
command.js module                                 -     Es module
module.exports ={}                                -    export function () 
require                                           -    import {} from 
Old way                                           -    New Ways
synchronous                                       -    asynchronous
non strict mode                                   -    strict mode
if we describe variable with out                  -    here will get an error
name z = 10 it will not through error

13. console.log(module.exports) it is empty object 
   and we are putting these in obj module.exports = {name1,name2} 

 14. nested export created - calculate folder  with index.js

 15. when we call require() it wrap whole code of file/module inside a function and then gives to v8 engine to execute. this function is called [ IIFE -> immidately invoke function exprexssion]
 eg. (function (){
 All code of module r
 })() // invoke here called immidately call function, and whole code inside this is private 

 16. This IIFE func is taking module.export and requires in arguments provided by node.js

 17. requires() 5 steps happen inside 
 a. resolving the module -check path
 b. loading the module - file content is loaded 
 c. wrap inside IIFE
 d. Evaluation - executed code and return module.export 
 e. caching - means suppose if we call one module in multiple places so these steps happen once and in caching it maintain data and if we call same file /module other place it just direct give output insted of do steps again and again 

 https://github.com/nodejs/node  node.js repo
 // libuv inside node.js deps file
 require() code inside repo
 go to node-lib-internal-modules-helper.js and loader.js-makerequirefunction

 18. javascript is synchrenous but node make it async with help of libuv js engine does not know async 

 19. node.js is given some super power to v8 engine these super power are inside libuv library in side node.js repo 
 libuv.org its is written in c language it talks to operating system https://github.com/libuv/libuv , https://libuv.org/

 20. core node modules eg fs, https, console are present on node.js documentation https://nodejs.org/docs/latest/api/  

 21. v8 engine episode 8 HOW JS ENGINE WORKS 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
 steps happens between wrighting code to pass to v8 engine 
 A. Parsing 
  1. lexical analysis (Tokenizations) - code gets broken into small tokens 
  2. syntex Analysis ( parsing) - tokens gets convert into abtract syntex tree  for check use this website https://astexplorer.net/ 

   3 types of languages
  interpretted - code given it started executing line by line 

  compiled - first whole code gets compilation convert high level code to machine code then execute

  javascript - it use both interpritter and compiler  

  3. Interpretter - code moves to interpretter v8 engine interpritter name is [ingition interpritter] - it convert the tree code to byte code then execution happen 

  4. compiler - name as [turbofan compiler] interpriteer find code which is repeat and there is chance of optimization so interpretter give that code to compiler and it converts it to optimised machine code then it gets executed 

  5. simultaniously GARBAGE COLLETION works - names as orinoc, oilpan, scavenging
  When a program creates something (like a variable or object), it takes memory.
  When that thing is no longer used, Garbage Collector removes it so memory is free again.

  22. Episode 9 - libuv library HOW LIBUV WORKS 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 

 inside libuv we have Event loop, callback queue, thread pool
 Event loop - preority
 inner loop
 promises.newTrick then
 promise.resolve then 
 outer loop 
 before start any outer step it goes to inner loop then timer phase after this it goes to inner loop again then move to poll phase ...
 Timer - set timeout
 poll - api calls, fs etc
 check - setImmidate
 close 

 if loop has nothing to do suppose call stack is empty and call back queue is empty also just api call is just working not yet complete so the event loop waits at poll phase 

 23. episode 10 event loop documentation  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
 https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick 

 code of event loop (while loop)inside libuv/src/unix/core.

 24. episode 11 Server 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
 we have 2 things Hardware means cpu computer and software means App 
 What is server in terms of hardware :- it is an computer which have huge capacity and where we can deploy our data for storage eg AWS amazon web server 
 server in terms of software :- http server of backend
 Protocol - means rules

 when we make api call to the server it send data in smaller packets 
we can createmultiple http servers eg upGrad -servers workshop, cms, identity - but each have different port number so by which we can know where to send the request 

// when we make api request eg www.google.com it goes to DNS means domain name service and get the IP address and then it goes back to clint and then goes to server 

socket :- when we make any request to server eg www.namastadev.com it creates socket and we get responce this socket gets closed 
web socket :- web socket id not gets close 
when we make server using http it is difficult to handel big application and routing is difficult so there is framwork called as Express 

25. Episode 12 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
What is DataBase:- collection of data in an orgained way so we can intract with it, we intract with it using DATABASE MANAGEMENT SYSTEM(it is a software)which inteact with app and database 
APP  <--> DBMS <--> database

types 
1. Retaional :- Mysql postgresql
2. non Retaional : mongodb nosql
✅ Why MongoDB is Non-Relational?
MongoDB does not use tables, rows, columns like relational databases.
It stores data in JSON-like documents (BSON format).
These documents can have nested objects, arrays, and flexible structures.
It does not require a fixed schema (schema-less).


Codds 12 Rules :- he say if db follows these 12 rules then we call as retaional database
relations:- (means relations between tables )

26. SQL:- structured query language : by which we intract retaional database by wrighting queries get post etc

27. NoSQL MongoDB :- starts from 2009
suppose we have no. of users in json format {id:1,name:Faizan},{id:2,name:'faheem}  
Document: each object is called document 
and sum of document id called collection