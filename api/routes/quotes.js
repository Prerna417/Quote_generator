const router = require("express").Router();
const Quote = require("../models/quote");
const User = require("../models/User");



router.get('/', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomQuote = await Quote.findOne().skip(random);

        res.json(randomQuote);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.post('/:id', async (req, res) => {
    try {

        const user1 = await User.findById(req.params.id);
        if (!user1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newQuote = new Quote({
            user: req.params.id,
            quote: req.body.quote
        });

        const newquote = await newQuote.save();
        res.status(200).json(newquote);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete
router.delete('/:id', async (req, res) => {
    try {
        const user1 = await User.findById(req.params.id);
        if (!user1) {
            return res.status(404).json({ message: 'User not found' });
        }
        const quote = await Quote.findOne({ user: user1._id });

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found for the user' });
        }

        // Delete the quote
        await Quote.findByIdAndDelete(quote._id);

        res.status(200).json('Quote deleted successfully');

    } catch (err) {
        res.status(500).json(err);
    }
})

// update
router.put('/:id', async (req, res) => {
    try {
        const user1 = await User.findById(req.params.id);
        if (!user1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const quote = await Quote.findOne({ user: user1._id });

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found for the user' });
        }
        const updatedquote = await Quote.findByIdAndUpdate(quote._id, {
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedquote);



    } catch (err) {
        res.status(500).json(err);
    }
})

// get quote basend on username
router.get('/:username',async(req,res)=>{
    try{
        const finduser = await User.findOne({username:req.params.username});
        if(!finduser){
            return res.status(404).json({ message: 'User not found' });
        }
        const quote = await Quote.findOne({ user: finduser._id });

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found for the user' });
        }
        res.status(200).json(quote);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router
