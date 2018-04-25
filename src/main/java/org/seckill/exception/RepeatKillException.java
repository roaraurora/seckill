package org.seckill.exception;

/*
* 重复秒杀异常(运行异常)
* Java 异常分运行时异常和编译型异常
* spring只接受运行时异常的回滚策略，编译型异常是不做回滚的
* */

public class RepeatKillException extends SeckillException{

    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause) {
        super(message, cause);
    }
}
