package org.seckill.exception;

import org.seckill.dto.SeckillExecution;

/*
* 秒杀挂壁异常 （）
* */
public class SeckillCloseException extends SeckillException {

    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
