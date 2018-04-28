### 数据层技术
- 数据库设计和实现 `手写DDL 设计数据库schema`
- Mybatis: 设计DAO接口
- Mybatis整合Spring：配置包扫描,xml文件扫描,别名等机制 达成一次配置永久生效

### 业务层技术
- 业务接口设计和封装 `应该站在使用者的角度去设计接口`
- SpringIOC配置
    - 第三方类库, 一次性配置(如 声明式事务)： 使用xml配置
    - 自己开发的DAO, controller, service: 使用注解配置
- Spring声明式事务
    - 抛出runtime exception时rollback

### web技术
- Restful接口运用
    - restful设计规范 \
    ![image](https://github.com/roaraurora/pic/blob/master/restful设计规范.png)
    - restful接口设计样例 \
    ![image](https://github.com/roaraurora/pic/blob/master/restful接口设计样例.png)
    - seckill restful url设计
    ![image](https://github.com/roaraurora/pic/blob/master/秒杀restful-url.png)
- SpringMVC
    - ![image](https://github.com/roaraurora/pic/blob/master/SpringMVC.png)
- 前端交互
    - 前端页面逻辑流程 \
    ![image](https://github.com/roaraurora/pic/blob/master/前端页面逻辑流程.png)
    - 秒杀页面逻辑 \
    ![image](https://github.com/roaraurora/pic/blob/master/秒杀页面逻辑.png)
- Bootstrap和JS
    - JS按模块写

### 并发优化
- 系统瓶颈点分析
- 事务, 锁， 网络延迟理解
- 常见架构 \
    ![image](https://github.com/roaraurora/pic/blob/master/常见架构.png)