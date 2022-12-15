module.exports= function sortMiddleware (req, res, next){
    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if(req.query.hasOwnProperty('_sort')){
        // res.locals._sort.enabled = true;
        // res.locals._sort.type =req.query.type;
        // res.locals._sort.name =req.query.column;
        Object.assign(res.locals._sort, { //hợp nhất các Object đọc từ trái sang phải trùng key sẽ ghi đè
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
}