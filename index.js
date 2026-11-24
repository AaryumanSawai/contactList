const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList = [
    {
        name:"Arpan",
        phone:"1111111111"

    },
    {
        name: "Tony Stark",
        phone: "1234567890"

    },
    {
        name:"Coding Ninjas",
        phone: "2316531634"
    }

]
app.get('/',function(req,res){
    // res.send('cool it is running! or is it?');
    // console.log(contactList);
    Contact.find({}).then(contacts => {
       
    return res.render('home',{title:"ContactsList",contact_list:contacts});
        
    })
    .catch(error=>{
        
            console.log('error in fetching contact from db');
            return;
        
    })
})
app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('/');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then (newContact => {
        
        console.log('*********',newContact);
        return res.redirect('back');

    })
    .catch(error => {
       
            console.log('error in creating contact');
            return;
        
    });
});
app.get('/delete-contact/:id',function(req,res){
   let id = req.params.id;
//    console.log(id);
   Contact.findByIdAndDelete(id).then(()=>{return res.redirect('back');})
   .catch(error => {
    if(err)
    {
        console.log('error in deleting the contact');
        return;
    }
   })
//    if(contactIndex != -1)
//    {
//     contactList.splice(contactIndex,1);

//    }
//    return res.redirect('back');
})

// app.post('/delete-contact', (req, res)=>{
//     for (elm in req.body){
//         let contactIndex = contactList.findIndex(contact=>contact.name == elm);
//         if(contactIndex != -1)
//         {
//             contactList.splice(contactIndex,1);

//         }
//     }
//     return res.redirect('back');
// })

app.get('/practice',function(req,res){
    res.render('practice',{
        title:"let us play with ejs"
    });
})




app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup! my express server is running on port :',port);

})