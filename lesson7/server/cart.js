const add = (cart, req) => {
    cart.push(req.body);
    return {name: req.body.product_name, newCart: JSON.stringify(cart, null, 4)};
};

const change = (cart, req) => {
    const find = cart.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return {name: find.product_name, newCart: JSON.stringify(cart, null, 4)};
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    const find = cart.find(el => el.id_product === +req.params.id);
    cart.splice(cart.indexOf(find), 1);
    return {name: find.product_name, newCart: JSON.stringify(cart, null, 4)};
};

module.exports = {
    add,
    change,
    remove,
};
