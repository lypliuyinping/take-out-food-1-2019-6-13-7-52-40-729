
function bestCharge(selectedItems) {
  // return /*TODO*/;
  let countArray = countItems(selectedItems);
  let itemsArray = getItems(countArray);
  let originPrice=calculate(itemsArray);
  let firstPrice=firstCaculate(itemsArray);
  let secondPrice=secondCaculate(itemsArray);
  let print = printItems(originPrice,firstPrice,secondPrice,itemsArray);
  return print;
}

function countItems(selectedItems) {
  let result = [];
  for (let i = 0; i < selectedItems.length; i++) {
    result.push({
      id: selectedItems[i].substr(0, 8),
      count: selectedItems[i].charAt(selectedItems[i].length - 1)
    });
  }
  return result;
}

function getItems(countArray) {
  const dbData = loadAllItems();
  let items = [];
  for (let i = 0; i < dbData.length; i++) {
    for (let j = 0; j < countArray.length; j++)
      if (dbData[i].id == countArray[j].id) {
        items.push({
          id:dbData[i].id,
          name: dbData[i].name,
          count: countArray[j].count,
          price: dbData[i].price
        });
      }
  }
  return items;
}

function calculate(items) {
  let totalPrice=0;
  for (let i = 0; i < items.length; i++) {
    totalPrice+= items[i].count * items[i].price;
  }
  return totalPrice;
}

function firstCaculate(items) {
  const types = loadPromotions();
  let totalPrice=0;
  for (let i = 0; i < items.length; i++) {
    totalPrice+= items[i].count * items[i].price;
  }
  if (totalPrice>=30){
    totalPrice=totalPrice-6;
  }
  return totalPrice;
}

function secondCaculate(items) {
  let totalPrice=0;
  for (let i = 0; i < items.length; i++) {
    if((items[i].id=='ITEM0001'&&items[i].count>0)||(items[i].id=='ITEM0022'&&items[i].count>0)){
      totalPrice+=items[i].price/2*items[i].count;
    }else{
      totalPrice+=items[i].price*items[i].count;
    }
  }
   // const types = loadPromotions();
   // let totalPrice=0;
   // for (let i = 0; i < items.length; i++) {
   //   for (let  j=0;j<types[1].items.length;j++){
   //     if (items[i].id==types[1].items[j]){
   //       //items[i].price= items[i].price/2;
   //       totalPrice+= items[i].count * items[i].price/2;
   //     }
   //     break;
   //     totalPrice+= items[i].count * items[i].price;
   //   }
   // }
  return totalPrice;
}
function printItems(originPrice, firstPrice, secondPrice, items) {
  let print ="============= 订餐明细 =============\n";
  for (let i = 0; i < items.length; i++) {
    if (items[i].id=='ITEM0001')
      print+=  "黄焖鸡 x "+items[i].count+" = "+(items[i].count*items[i].price)+"元\n";
    if (items[i].id=='ITEM0013')
      print+=  "肉夹馍 x "+items[i].count+" = "+(items[i].count*items[i].price)+"元\n" ;
    if (items[i].id=='ITEM0022')
      print+= "凉皮 x "+items[i].count+" = "+items[i].count*items[i].price+"元\n";
  }
  print+=  "-----------------------------------\n";
  let minPrice=0;
  if (firstPrice>=secondPrice){
    minPrice=secondPrice;
  }else minPrice=firstPrice;

  if(minPrice==originPrice){
    print+="总计："+originPrice+"元" +"\n===================================";
  }
  if ((originPrice!=firstPrice)&&(minPrice==firstPrice)){
    print+="使用优惠:\n" +
      "满30减6元，省"+(originPrice-firstPrice)+"元\n" +  "-----------------------------------\n" +
      "总计："+firstPrice+"元\n" +
      "===================================";
  }
  if((originPrice!=secondPrice)&&(minPrice==secondPrice)){
    print+="使用优惠:\n" +
      "指定菜品半价(黄焖鸡，凉皮)，省"+(originPrice-secondPrice)+"元\n" +
      "-----------------------------------\n" +
      "总计："+secondPrice+"元\n" +
      "===================================";
  }

  return print;
}









