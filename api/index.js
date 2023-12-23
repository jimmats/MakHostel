import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Place from "./models/Place.js";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Booking from "./models/Booking.js";
import Room from "./models/Room.js";




const app = express();
// const port = 3000;
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "hdgdhdyeeevegeegeg";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/roomphotos',express.static(__dirname+'/roomphotos'));


    const corsOptions = {
        origin: 'http://localhost:5173',
        credentials: true,
        optionsSuccessStatus: 200
      };
    
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
    });
});
}

app.get('/test',(req,res)=>{
    res.json('test ok');
});

app.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;

    try{
   const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
} catch(e){
    res.status(422).json(e);
}
});

app.post('/login', async (req, res) => {
    const {email,password} = req.body;

    try {
    const userDoc = await User.findOne({email});

    if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
        jwt.sign({ email:userDoc.email, id:userDoc._id, isAdmin: userDoc.isAdmin}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
            });
     } else {
         res.status(422).json({ error: 'Invalid password' });
        }
    } else {
     res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
  
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = User.findById(userData.id);
        res.json(name, email ,_id);
    });
 } else {
      res.json(null); 
    }
  });

 app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
  });

app.post('/upload-by-link',async(req,res)=>{
    const {link} =req.body;
    const newName = 'Photo' + Date.now() + '.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/'+newName,
    });
    res.json(newName);
})

app.post('/uploadroom-by-link',async(req,res)=>{
    const {link} =req.body;
    const newName = 'Photo' + Date.now() + '.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname + '/roomphotos/'+newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext=parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
});


app.post('/uploadroomphoto',photosMiddleware.array('photos',100),(req,res)=>{
    const photosMiddleware = multer({dest:'roomphotos'});
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext=parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('roomphotos/',''));
    }
    res.json(uploadedFiles);
});

app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
       const placeDoc = await Place.create({
                owner: userData.id,
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
    });
    res.json(placeDoc);
});

});

app.get('/user-places', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Place.find({owner:id}));
});
});

app.get('/places', async (req,res)=>{
        res.json(await Place.find());
});

app.get('/places/:id',async(req,res)=>{
    const {id} =req.params;
    res.json(await Place.findById(id));
});

app.put('/places/:id', async(req,res)=>{
    const {token} = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address,
                photos:addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
           await placeDoc.save();
            res.json('ok');
        }
});
});


app.delete('/places/:id', async (req,res)=>{
    const { id } = req.params;

    try{
    const place = await Place.findById(id);
    await place.deleteOne(); 
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
  }
});

app.post('/bookings', async(req,res)=>{
    const userData = await getUserDataFromReq(req);
    const{place,room,checkIn,duration,numberOfPeople,name,phone,email,price} = req.body;
    Booking.create({
        place,room,checkIn,duration, numberOfPeople,name,phone,email,price,
        user:userData.id,
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });
});




app.get('/bookings',async(req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('room'));
});



app.get("/rooms", async(req,res)=>{
    try{
        const rooms = await Room.find().populate('place');
        res.send(rooms);
    }catch(error){
        return res.status(400).json({message: error});
    }
});

app.get('/user-rooms', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Room.find({owner:id}));
});
});

app.get("/places/:id/rooms", async (req, res) => {
    try {
        const placeId = req.params.id;
        const rooms = await Room.find({ place: placeId });
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.get('/rooms/:id',async(req,res)=>{
    const {id} =req.params;
    res.json(await Room.findById(id));
});

app.get('/getallrooms',async(req,res)=>{
    try{
        const rooms = await Room.find();
        res.json(rooms);
    }catch(error){
        console.log(error);
    }
});

app.put('/rooms/:id', async (req, res) => {
    const { token } = req.cookies;
    
    const {
      id,
      title,
      type,
      addedPhotos,
      roomDescription,
      perks,
      extraInfo,
      maxPeople,
      roomPrice,
      roomNumber,
      currentBookings,
    } = req.body;
  
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
        const roomDoc = await Room.findById(id);
       
          roomDoc.set({
            title,
            type,
            photos: addedPhotos,
            roomDescription,
            perks,
            extraInfo,
            maxPeople,
            roomPrice,
            roomNumber,
            currentBookings,
          });
  
          await roomDoc.save();
          res.json('ok');
        } 
      
    )});

  
  // ...
  
  
 app.post('/rooms', async (req, res) => {
    const { token } = req.cookies;
    
    // Extract room data from the request body
    const {
      title,
      place,
      type,
      addedPhotos,
      roomDescription,
      perks,
      extraInfo,
      maxPeople,
      roomPrice,
      roomNumber,
      currentBookings,
    } = req.body;
    
    // console.log(req.body);
    
    jwt.verify(token, jwtSecret, {}, async (err, userData,placeId) => {
      if (err) throw err;
      
      const roomDoc = await Room.create({
        owner: userData.id,
        place,
        title,
        type,
        photos: addedPhotos,
        roomDescription,
        perks,
        extraInfo,
        maxPeople,
        roomPrice,
        roomNumber,
        currentBookings,
      });
  
      res.json(roomDoc);
    });
  });
  
  app.delete('/rooms/:id', async (req,res)=>{
    const { id } = req.params;

    try{
    const room = await Room.findById(id);
    await room.deleteOne(); 
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
  }
});

app.get('/bookings/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userBookings = await Booking.find({ user: user._id }).populate('room');
        res.json(userBookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/bookings/:id', async (req,res)=>{
    const { id } = req.params;

    try{
    const booking = await Booking.findById(id);
    await booking.deleteOne(); 
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
});
  

app.listen(3000);