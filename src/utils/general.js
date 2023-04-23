export const getTotalTransactions=(transactions)=>{
    const sum = transactions.reduce(
        (accumulator, currentValue) => {
            let acc;
            if(currentValue.type === "Depósito"){
                acc = accumulator + Number(currentValue.amount.replace(/[.]/g,''))
            }else{
                acc = accumulator - Number(currentValue.amount.replace(/[.]/g,''))
            }
            return acc
        },0);
    return sum.toLocaleString("de-DE")
}


export const getTotalPrice=(products, curretProduct)=>{
    const sum = curretProduct.reduce(
        (accumulator, currentValue) => {
            const product = products.find(item=> item.id === currentValue.productId);
            return accumulator + (product.precio ? product.precio : 0)
        },0);
    return sum.toLocaleString("de-DE")
}