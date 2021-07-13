module.exports = {
  //第二个字段可以设置要查询的字段，1表示输出该字段，0表示不输出该字段
  find(CollectionName, whereObj, showObj) {
    return new Promise((resolve, reject) => {
      CollectionName.find(whereObj, showObj).lean().exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  insert(CollectionName, insertData) {
    return new Promise((resolve, reject) => {
      CollectionName.insertMany(insertData, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  update(CollectionName, whereObj, updateObj, updateType) {
    updateType = updateType || "updateOne";
    return new Promise((resolve, reject) => {
      CollectionName[updateType](whereObj, updateObj, (err, data) => {
        if (err) throw reject(error);
        resolve(data);
      });
    });
  },
  delete(CollectionName, deleteData, deleteType) {
    // User.deleteOne(deleteData, (err) => {})
    // User.deleteMany(deleteData, (err) => {})

    // style.display = "none"   <===>  style['display'] = "none"
    // style.animation = "test" 兼容性
    // 对象后的属性不可以是变量，如果有变量，写成 对象[属性] 形式

    deleteType = deleteType || "deleteOne"; // 默认为删除单条数据

    return new Promise((resolve, reject) => {
      CollectionName[deleteType](deleteData, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  paging(CollectionName, whereObj, showObj, limitNum, pageCode) {
    return new Promise((resolve, reject) => {
      // limit(limitNum) 每页显示个数
      // skip(limitNum * pageCode) // 每页从哪一个开始
      CollectionName.find(whereObj, showObj)
        .limit(limitNum)
        .skip(limitNum * pageCode)
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  },
  distinct(CollectionName, name) {
    return new Promise((resolve, reject) => {
      CollectionName.distinct(name).exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
};
