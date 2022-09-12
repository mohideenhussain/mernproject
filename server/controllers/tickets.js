import SeatsModel from "../models/seats.js"
export const getSeats = async (req, res) =>{
    try {
        const findData = await SeatsModel.findOne({name: req.params.type});
        if(!findData) return res.status(400).json({message: 'This bus type does not exist'})
        res.status(200).json({data: findData})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const postSeats = async (req, res) =>{
    let { type, name, total,  seats} = req.body;
    try {
        const isExisting = await SeatsModel.findOne({name});
        if(isExisting) return res.status(400).json({message: 'This bus type already exists'})
        const postData = await SeatsModel.create({type, name, total, seats})
        res.status(200).json({data:postData})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

