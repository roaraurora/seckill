-- 数据库初始化脚本

-- 创建数据库
CREATE DATABASE seckill;
-- 使用数据库
use seckill;
-- 创建秒杀库存表
create table seckill (
  seckill_id bigint NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
  name VARCHAR(120) NOT NULL comment '商品名称',
  number int not null comment '库存数量',
  start_time TIMESTAMP NOT NULL comment '秒杀开始时间',
  end_time timestamp not null comment '秒杀结束时间',
  create_time TIMESTAMP NOT NULL DEFAULT current_timestamp comment '创建时间',
  PRIMARY key (seckill_id),
  KEY idx_start_time(start_time),
  key id_end_time(end_time),
  KEY idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=UTF8 COMMENT='秒杀库存表';

-- 初始化数据
insert INTO
  seckill(NAME, NUMBER, start_time, end_time)
VALUE
  ('1000元秒杀iphone6', 100, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
  ('500元秒杀iphone6', 200, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
  ('300元秒杀iphone6', 300, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
  ('200元秒杀iphone6', 400, '2015-11-01 00:00:00', '2015-11-02 00:00:00');

-- 秒杀成功明细表
-- 用户登录认证相关的信息
CREATE TABLE success_killed(
  seckill_id bigint not null comment '秒杀商品id',
  user_phone bigint not null comment '用户手机号',
  state tinyint NOT null default -1 comment '状态表示：-1：无效 0:成功 1:已付款',
  create_time TIMESTAMP NOT null DEFAULT current_timestamp comment '创建时间',
  PRIMARY KEY (seckill_id, user_phone),
  KEY idx_create_time(create_time)
)engine=InnoDB DEFAULT charset=utf8 comment='秒杀成功明细表';

-- 连接数据库的控制台
-- mysql -uroot -proot
