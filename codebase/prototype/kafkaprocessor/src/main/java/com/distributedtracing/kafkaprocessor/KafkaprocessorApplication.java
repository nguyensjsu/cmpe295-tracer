package com.distributedtracing.kafkaprocessor;

import com.distributedtracing.kafkaprocessor.consumer.KafkaConsumer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class KafkaprocessorApplication {

	public static void main(String[] args) {
		SpringApplication.run(KafkaprocessorApplication.class, args);
	}

	@Bean
	public KafkaConsumer messageListener() {
		return new KafkaConsumer();
	}

}
