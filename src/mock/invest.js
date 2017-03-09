import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import initMockAdapter from '../common/initMockAdapter';
import AV from "../common/av-min"
import "../common/initLeanCloud"
import { CONST_PAGESIZE } from "../common/constants"
import { CONST_INVEST_PREFIX, CONST_LIST, CONST_PAGE, CONST_INSERT, CONST_UPDATE, CONST_DELETE, CONST_BATCH_DELETE } from '../common/constants'
import { CONST_TABLE_INVEST } from "../common/constants"

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = initMockAdapter.getMockAdapter();

    // 获取列表
    mock.onGet(CONST_INVEST_PREFIX + CONST_LIST).reply(config => {
      let { name } = config.params;
      let query = new AV.Query(CONST_TABLE_INVEST);
      let dataList = [];

      query.contains('name', name);

      query.find().then(function (results) {
        for (var i = 0; i < results.length; i++) {
          dataList.push({
            name: results[i].get("name"),
            code: results[i].get("code")
          });
        }
      }, function (error) {
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            invests: dataList
          }]);
        }, 1000);
      });
    });

    // 获取列表（分页）
    mock.onGet(CONST_INVEST_PREFIX + CONST_PAGE).reply(config => {
      let { page, name } = config.params;
      let query = new AV.Query(CONST_TABLE_INVEST);
      let total = 0;
      let dataList = [];

      query.contains('name', name);

      query.count().then(function (count) {
        total = count;
      }, function (error) {
      });

      query.limit(CONST_PAGESIZE); // 最多返回数量
      query.skip(CONST_PAGESIZE * (page - 1)); // 跳过数量
      query.find().then(function (results) {
        for (var i = 0; i < results.length; i++) {
          dataList.push({
            objectId: results[i].get("objectId"),
            name: results[i].get("name"),
            code: results[i].get("code")
          });
        }
      }, function (error) {
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            pageSize: CONST_PAGESIZE,
            dataList: dataList
          }]);
        }, 1000);
      });
    });

    // 删除
    mock.onGet(CONST_INVEST_PREFIX + CONST_DELETE).reply(config => {
      let { objectId } = config.params;
      let investObj = AV.Object.createWithoutData(CONST_TABLE_INVEST, objectId);
      investObj.destroy().then(function (success) {
        // 删除成功
      }, function (error) {
        // 删除失败
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 批量删除
    mock.onGet(CONST_INVEST_PREFIX + CONST_BATCH_DELETE).reply(config => {
      let { objectIds } = config.params;
      let objects = [];

      objectIds = objectIds.split(',');
      for (var i = 0; i < objectIds.length; i++) {
        let investObj = AV.Object.createWithoutData(CONST_TABLE_INVEST, objectIds[i]);
        objects[i] = investObj;
      }

      // 批量删除
      AV.Object.destroyAll(objects).then(function () {
        // 成功
      }, function (error) {
        // 异常处理
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 编辑
    mock.onGet(CONST_INVEST_PREFIX + CONST_UPDATE).reply(config => {
      let { objectId, name, code } = config.params;

      let investObj = AV.Object.createWithoutData(CONST_TABLE_INVEST, objectId);
      investObj.set('name', name);
      investObj.set('code', code);
      investObj.save();

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    // 新增
    mock.onGet(CONST_INVEST_PREFIX + CONST_INSERT).reply(config => {
      let { name, code } = config.params;
      let msg = "新增成功";
      let InvestObj = AV.Object.extend(CONST_TABLE_INVEST);
      let investObj = new InvestObj();
      investObj.save({
        name: name,
        code: code
      }).then(function (object) {
        console.log('object id = ' + object.id);
      }, function (error) {
        console.error(error);
        msg = "新增失败，错误信息：" + error;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: msg
          }]);
        }, 500);
      });
    });
  }
};