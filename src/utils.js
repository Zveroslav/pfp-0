export  const packageQuery = (order, settings, id) => {
let content = [];
console.log(Poster);
for (var item in order.products) {

    content.push(order.products[item].id)

}
console.log(content);

Poster.makeApiRequest('menu.getProduct', {
  method: 'get',
  product_id: content[1],
},
  (product) => {
    console.log(product);
}
)


return {seller:settings.accountUrl, coiny_id:id, innerid: order.id, amount:order.subtotal, currency:settings.currencyCodeIso, description:order.comment, content:content}
// 0) accountUrl в seller - это единственный уникальный идентификатор заведения которы есть ресторана (или его сети), как такого id самого заведения не нашел.
// 1) Подпись удалена так как она будет отправленна через заголовок (по договоренностью с Poster)
// 2) Вместо названия блюд в запросе ( свойство объекта content) будет отправляться id товаров из системы Poster, так-как пока что не найден способ поиска товаров по ID из Poster API.
}
