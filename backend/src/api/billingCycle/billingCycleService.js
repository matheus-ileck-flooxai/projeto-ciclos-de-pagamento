const billingCycle = require('./billingCycle')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })

billingCycle.route('get', (req, res, next) => {

    billingCycle.find({}, (err, docs) => {

        if (!err) {

            res.json(docs)

        } else {

            res.status(500).json({ errors: [error] })

        }

    })

})

billingCycle.route('count', (req, res, next) => {
    billingCycle.count((err, value) => {
        if (err) {
            res.status(500).json({errors: [err]})
        }
        else{
            res.json({value})
        }

    })
})

billingCycle.route('summary', (req, res, next) => {
    billingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = billingCycle