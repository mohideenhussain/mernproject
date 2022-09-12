import mongoose from "mongoose";
import createSchedule from "../models/schedule.js";
import Cities from '../models/cities.js';
import Customer from '../models/customer.js'
import BusInfo from '../models/busInfo.js'
import DriverInfo from "../models/driverInfo.js";


const createCustomer_1 = (id, obj) => {
    return Customer.create(obj).then((customer) => {
        return createSchedule.seats.findByIdAndUpdate(id, {
            $push: {
                bookedBy: {
                    _id: customer._id,
                    name: customer.name,
                    mobile: customer.mobile,
                    address: customer.address
                }
            }
        },
            { new: true, useFindAndModify: false }
        )
    })
}

const createCustomer = async (obj) => {
    const getId = await Customer.create(obj)
    return getId._id
}

const createBoarding_2 = async (obj) => {
    const id = await Cities.create(obj)
    return id._id
}

const createBusInfo = (id, obj) => {
    return BusInfo.create(obj).then((bus) => {
        return createSchedule.findByIdAndUpdate(id, {
            $push: {
                bus_info: obj
            }
        },
            { new: true, useFindAndModify: false }
        )
    })
}

const createBoarding = (id, obj) => {
    const { cities, ...rest } = obj;
    console.log(cities)
    return Cities.create(cities).then((data) => {
        return createSchedule.findByIdAndUpdate(id, {
            $push: {
                boarding_point: { 'cities': data._id, 'arrival_time': rest.arrival_time }
            }
        },
            { new: true, useFindAndModify: false }
        )
    })
}
const createDropping = (id, obj) => {
    const { cities, ...rest } = obj;
    return Cities.create(cities).then((data) => {
        return createSchedule.findByIdAndUpdate(id, {
            $push: {
                dropping_point: { 'cities': data._id, 'arrival_time': rest.arrival_time }
            }
        },
            { new: true, useFindAndModify: false }
        )
    })
}
const createDriverInfo = (id, obj) => {
    return DriverInfo.create(obj).then((bus) => {
        return createSchedule.findByIdAndUpdate(id, {
            $push: {
                driver_info: obj
            }
        },
            { new: true, useFindAndModify: false }
        )
    })
}

export const postSchedule = async (req, res) => {
    const { start_time, end_time, starting_point, destination_point, journey_date } = req.body;
    try {
        const check = await createSchedule.findOne({ start_time, end_time, starting_point, destination_point, journey_date })
        if (check) return res.status(400).json({ message: 'This bus chart already exist' })
        if (req.body.seats.length) {
            req.body.seats.forEach(async (seat) => {
                seat.bookedBy = await createCustomer(seat.bookedBy)
            })
        }
        if (req.body.boarding_point.length) {
            req.body.boarding_point.forEach(async (boarding) => {
                boarding.cities = await createBoarding(boarding.cities)
            })
        }
        if (req.body.dropping_point.length) {
            req.body.dropping_point.forEach(async (dropping) => {
                dropping.cities = await createBoarding(dropping.cities)

            })
        }
        if (req.body.bus_info) {
            const user_id = await BusInfo.create(req.body.bus_info)
            req.body.bus_info = user_id._id
        }
        if (req.body.driver_info) {
            const data = await DriverInfo.create(req.body.driver_info)
            req.body.driver_info = data._id
        }
        const saveData = await createSchedule.create(req.body);
        res.status(201).json({ saveData })

    } catch (error) {

    }
}

export const createRoute = async (req, res) => {
    const { starting_point, destination_point, departure_date, arrival_date } = req.body;
    let depart = new Date(departure_date).toISOString();
    let arriv = new Date(arrival_date).toISOString();
    try {
        const check = await createSchedule.findOne({ starting_point, destination_point, departure_date: depart, arrival_date: arriv })
        if (check) {
            return res.status(400).json({ message: 'Data already exists' })
        }
        const createData = await createSchedule.create({ starting_point, destination_point, departure_date: depart, arrival_date: arriv })
        res.status(201).json({ message: createData })
    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }
}

const summarize = (checkCities, createCityId, value) => {

    return {
        _id: (checkCities.length) ? checkCities[0]._id : createCityId._id,
        name: (checkCities.length) ? checkCities[0].name : createCityId.name,
        address: (checkCities.length) ? checkCities[0].address : createCityId.address,
        pincode: (checkCities.length) ? checkCities[0].pincode : createCityId.pincode,
        district: (checkCities.length) ? checkCities[0].district : createCityId.district,
        arrival_time: value

    }

}

export const createStop = async (req, res) => {
    try {
        const checkCities = await Cities.aggregate([
            {
                "$match": {
                    name: req.body.name,
                    address: req.body.address,
                    pincode: parseInt(req.body.pincode),
                    district: req.body.district
                }
            }

        ])
        let { arrival_time, type, flag, ...rest } = req.body;
        let createCityId = null;
        let stopping;


        if (!checkCities.length) {
            createCityId = await Cities.create(rest);
            console.log(createCityId)
            if (!createCityId) return res.status(400).json({ message: `error occured in adding ${flag} point` })
            if (flag === 'boarding') {
                stopping = {
                    boarding_point: { cities: createCityId._id, arrival_time: arrival_time }
                }
            } else {
                stopping = {
                    dropping_point: { cities: createCityId._id, arrival_time: arrival_time }
                }
            }

        } else {
            if (flag === 'boarding') {
                stopping = {
                    boarding_point: { cities: checkCities[0]._id, arrival_time: arrival_time }
                }
            } else {
                stopping = {
                    dropping_point: { cities: checkCities[0]._id, arrival_time: arrival_time }
                }
            }

        }

        const value = await createSchedule.findByIdAndUpdate({ _id: req.params.id },
            {
                $addToSet: stopping
            },
            { new: true, useFindAndModify: false }
        )

        if (!value) return res.status(400).json({ message: `error occured in adding ${flag}` })

        res.status(201).json({ result: summarize(checkCities, createCityId, arrival_time) })
        //res.status(201).json({ value })            

    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }
}

export const editStop = async (req, res) => {
    const { id, flag, ...rest } = req.body;
    let findId, updateData;
    if (flag === 'boarding') {
        findId = { 'boarding_point._id': id };
        updateData = { 'boarding_point.$._arrival_time': rest.arrival_time }
    } else {
        findId = { 'dropping_point._id': id };
        updateData = { 'dropping_point.$._arrival_time': rest.arrival_time }
    }
    try {
        const update = await createSchedule.updateOne({ _id: req.params.id }, {
            $set: updateData
        })
        if (!update) return res.status(400).json({ message: `error occured while updating ${flag} point` })
        if (update) {
            await Cities.findByIdAndUpdate({ _id: id }, {
                $set: {
                    name: rest.name,
                    district: rest.district,
                    pincode: parseInt(rest.pincode),
                    address: rest.address,
                    landmark: rest.landmark
                }
            }).then((response) => {
                res.status(201).json({
                    result: {
                        _id: id,
                        name: response.name,
                        address: response.address,
                        district: response.district,
                        pincode: response.pincode,
                        landmark: response.landmark,
                        arrival_time: rest.arrival_time
                    }
                })
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }
}

export const createStoppings = async (req, res) => {
    const { boarding_point, dropping_point } = req.body;
    try {
        const check = await createSchedule.findOne({ _id: req.params.id })
        if (check && !check.boarding_point.length) {
            boarding_point.forEach(async (boarding) => {
                await createBoarding(check._id, boarding)
            })
        }
        if (check && !check.dropping_point.length) {
            dropping_point.forEach(async (dropping) => {
                await createDropping(check._id, dropping)
            })
        }



        res.status(201).json({ message: check })

    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }
}

export const createSeats = async (req, res) => {
    const { seats } = req.body
    try {
        const checkId = await createSchedule.findOne({ _id: req.params.id })
        if (checkId) {
            //seats.forEach(async (seat)=>{
            //console.log(seat)
            await createSchedule.findByIdAndUpdate(checkId._id, {
                $push: {
                    seats: seats
                }
            },
                { new: true, useFindAndModify: false },
                (err, updatedDoc) => {
                    if (err) {
                        res.status(500).json({ message: err })
                    }
                    res.status(201).json({ message: updatedDoc })
                }
            )
            //})
        } else {
            res.status(400).json({ message: 'Data does not exist' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }

}

export const getItems = async (req, res) => {
    let itemsPerPage = req.query?.pageItems || 5;
    let page = req.query?.page || 0;
    console.log(page)
    try {
        const count = await createSchedule.find().count();

        const items = await createSchedule.find().skip((parseInt(page) - 1) * itemsPerPage).limit(itemsPerPage);

        if (!items) {
            return res.status(401).json({ message: 'No Items Found' })
        }
        res.status(201).json({ items, count })

    } catch (error) {
        res.status(500).json({ message: 'Something error occured' })
    }
}


export const getSearchResults = async (req, res) => {
    try {
        let match = {};
        if (req.query?.from_date && req.query?.to_date) {
            const getData = await createSchedule.aggregate([
                {
                    "$match": {
                        departure_date: {
                            "$gte": new Date(req.query?.from_date),
                            "$lte": new Date(req.query?.to_date)
                        }
                    }
                }
            ])
            res.status(201).json({ getData })
        }

    } catch (error) {
        res.status(500).json({ message: 'something error occured' })
    }
}

export const applyFilter = async (req, res) => {
    let boarding = [];
    let dropping = [];

    if (JSON.parse(req.query?.board.length)) {
        let parseBoard = JSON.parse(req.query.board);
        parseBoard.forEach((item) => boarding.push(item.name))
    }
    if (JSON.parse(req.query?.drop.length)) {
        let parseDrop = JSON.parse(req.query.drop);
        parseDrop.forEach((item) => dropping.push(item.name))
    }
    console.log(boarding);
    console.log(dropping);

    try {
        // let pipeLine = (req.query?.board || req.query?.drop || req.query?.from_date)
        //     ? [
        //         {
        //             "$match": {
        //                 "$and": [
        //                     {
        //                         "$or": [
        //                             //Object.assign(
        //                                 (req.query?.from_date !== 'undefined')
        //                                     ? {
        //                                         "departure_date": (req.query?.to_date !== 'undefined') ? 
        //                                             { "$gte": new Date(req.query.from_date), "$lte": new Date(req.query.to_date) } : { "$eq": new Date(req.query.from_date) }
        //                                     } : {},
        //                                 (req.query?.board)
        //                                     ? { "starting_point": { "$in": boarding } } : {},
        //                                 (req.query?.drop) ?
        //                                     { "departure_point": { "$in": dropping } } : {}
        //                             //)
        //                        ]
        //                    }
        //                 ]
        //             }

        //         },
        //         {
        //             "$count": "Total"
        //         }
        //     ] : {}



        let condition = [
            req.query?.to_date !== "undefined" && { "departure_date": { "$gte": new Date(req.query.from_date), "$lte": new Date(req.query.to_date) } },
            req.query?.to_date === "undefined" && { "departure_date": { "$gte": new Date(req.query.from_date) } },
            (boarding.length > 0) && { "board_city.name": { "$in": boarding } },
            (dropping.length > 0) && { "drop_city.name": { "$in": dropping } }

        ].filter(Boolean)


        console.log(condition)

        let pipeLine = (req.query?.board || req.query?.drop || req.query?.from_date)
            ? [
                {
                    "$match": {
                        "$and": condition
                    }
                },
            ] : {}

        const getResult = await createSchedule.aggregate([

            {
                "$lookup": {
                    from: 'cities',
                    localField: 'boarding_point.cities',
                    foreignField: '_id',
                    as: 'board_city'
                }
            },
            {
                "$lookup": {
                    from: 'cities',
                    localField: 'dropping_point.cities',
                    foreignField: '_id',
                    as: 'drop_city'
                }
            },
            {
                "$match": {
                    "$and": condition
                }
            }
        ]);




        console.log(getResult)

        if (!getResult) return res.status(400).json({ message: 'not items found' })

        res.status(201).json({ getResult })
    } catch (error) {
        res.status(500).json({ message: 'internal error' })
    }

    // if(from_date !== 0 && from_date !== 'undefined'){
    //     if(to_date !== 0 && to_date !== 'undefined'){
    //         date_filter = {
    //             "departure_date": {
    //                 "$gte" : new Date(from_date),
    //                 "$lte" : new Date(to_date)
    //             }
    //         }
    //     }else{
    //         date_filter = {
    //             "departure_date": {
    //                 "$eq" : new Date(from_date)
    //             }
    //         }
    //     }
    // }




    // var pipeline = [
    //     { $match: 
    //         Object.assign(
    //           { 'shop.nameSlug' : req.query.nameSlug },
    //           (req.query.status) 
    //             ? { "status.status": (req.query.status instanceof Array)
    //               ? { "$in": req.query.status } : req.query.status }
    //             : {}
    //         )
    //     },
    //     { $unwind: "$status" },
    //     ...(
    //       (req.query.status)
    //         ? [{ "$match": { 
    //             "status.status": (req.query.status instanceof Array)
    //              ? { "$in": req.query.status } : req.query.status
    //          }}]
    //         : []
    //       ),
    //       { $group: {
    //         _id: "$_id",
    //         status: { $addToSet: "$status" },
    //         number: { $first: "$number" },
    //         date: { $first: "$date" },
    //         comment: { $first: "$comment" }
    //       }}
    //   ];

    // const date = req.params?.value;
    // console.log(dropping)
    //let date_filter;


    // let pipeLine = {
    //     "$match" : {
    //         "starting_point": { "$in": boarding },
    //         "destination_point": { "$in": dropping }
    //     }
    // }

    // const getResult = await createSchedule.aggregate([  
    //     {
    //     "$match" : {
    //         "$and": [
    //             {
    //                 "$or":[
    //                     {"starting_point": { "$in": boarding }},
    //                     {"destination_point": { "$in": dropping }}
    //                 ]
    //             }
    //         ] 
    //         }
    //     }

    // ])
    // console.log(getResult)
}