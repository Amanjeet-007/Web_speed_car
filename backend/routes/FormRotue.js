// submit form ( Create )
import express from 'express'
import { supabase } from '../db/supabase.js';

const router = express.Router();

 router.post('/submit', async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    const { data, error } = await supabase
      .from('wash_enquiries')
      .insert([{ name, phone, email, service, message }]);

    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    res.status(200).json({ success: true, message: 'Enquiry saved successfully!', data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/messages', async (req,res)=>{
    try{
        const { data, error } = await supabase.from('wash_enquiries').select();
        if(error){
            return res.status(404).json({message:`Message not found${error}`});
        }
        return res.status(200).json({message:"Message Found",data:data})
    }
    catch(err){
        console.error("Error found while Accessing Messages")
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }    
})

export default router